import { ethers } from 'ethers';

import { CHAIN, createContract, createRandomWallet, TempWallet } from 'shared/web3';

import {
  OSS_ROUNDS,
  DONATION_CONTRACT_ABI,
  DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID,
} from './constants';
import {
  Application,
  CrossChainDonationData,
  DonationPayload,
  GetApplicationsResponse,
} from './types';
import { Payload } from 'shared/web3/types';

export const selectTwitterApplications = (
  applications: GetApplicationsResponse,
) => {
  const allApplications = [...applications.arbitrum, ...applications.optimism];
  const applicationsGroupedByTwitter =
    groupApplicationsByTwitterName(allApplications);

  const twitterApplications = applicationsGroupedByTwitter
    .map((applications) => {
      return pickApplicationByPriority(applications);
    })
    .filter(Boolean);
  return twitterApplications;
};

const groupApplicationsByTwitterName = (applications: Application[]) => {
  const twitterToApplications: Record<string, Application[]> = {};
  for (const application of applications) {
    if (!application.project.metadata.projectTwitter) {
      continue;
    }

    const twitterHandle = application.project.metadata.projectTwitter;
    const alreadyExistingRecord = twitterToApplications[twitterHandle];
    if (alreadyExistingRecord) {
      alreadyExistingRecord.push(application);
    } else {
      twitterToApplications[twitterHandle] = [application];
    }
  }
  return Object.values(twitterToApplications);
};

const pickApplicationByPriority = (applications: Application[]) => {
  const ossApplication = applications.find((application) => {
    return OSS_ROUNDS.includes(application.roundId);
  });

  return ossApplication ?? applications[0];
};

export const getDefaultDonationOptions = (
  application: Application,
): DonationPayload => {
  return {
    amount: 1,
    tokenAddress: '0x0',
    chainId: application.chainId,
  };
};

export const generateVote = (recipientId: string, amount: number) => {
  const PermitTypeNone = 0; // 0 = native currency transfer
  const NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // Gitcoin internal address for native
  const nonce = 0; // approval specific, always 0 in our case
  const deadline = 0; // approval specific, always 0 in our case
  const signature =
    '0x0000000000000000000000000000000000000000000000000000000000000000'; // approval specific, always 0x in our case
  const types = [
    'address',
    'uint8',
    'tuple(tuple(tuple(address, uint256), uint256, uint256), bytes)',
  ];
  const data = [
    recipientId,
    PermitTypeNone, // PermitType.None as 0
    [
      // Permit2Data
      [
        // ISignatureTransfer.PermitTransferFrom
        [
          // ISignatureTransfer.TokenPermissions
          NATIVE,
          amount, // Amount
        ],
        nonce, // Nonce
        deadline, // Deadline
      ],
      signature, // Signature as an empty byte string
    ],
  ];
  const abiCoder = ethers.utils.defaultAbiCoder;
  return abiCoder.encode(types, data);
};

export const generateDonationData = async (
  roundId: number,
  destinationChainId: number,
  destinationContractAddress: string,
  senderAddress: string,
  voteParameters: string,
) => {
  const nonce = await getNonce(senderAddress, destinationChainId);
  const data: CrossChainDonationData = {
    chainId: destinationChainId,
    roundId: roundId,
    donor: senderAddress,
    voteParams: voteParameters,
    nonce: nonce,
    validUntil: Math.round(Date.now() / 1000) + 3600, // 1 hour
    verifyingContract: destinationContractAddress,
  };
  return data;
};

export const generateEIP712Signature = async (
  signer: ethers.providers.JsonRpcSigner | TempWallet,
  data: CrossChainDonationData,
) => {
  const domain = {
    name: 'IDrissCrossChainDonations',
    version: '1',
  };
  const types = {
    Donation: [
      { name: 'chainId', type: 'uint256' },
      { name: 'roundId', type: 'uint256' },
      { name: 'donor', type: 'address' },
      { name: 'voteParams', type: 'bytes' },
      { name: 'nonce', type: 'uint256' },
      { name: 'validUntil', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
  };
  const signature = await signer._signTypedData(domain, types, data);

  const encoded = encodeDataAndSignature(data, signature);
  return encoded;
};

const encodeDataAndSignature = (
  data: CrossChainDonationData,
  signature: string,
) => {
  const encoded = ethers.utils.defaultAbiCoder.encode(
    [
      'uint256',
      'uint256',
      'address',
      'bytes',
      'uint256',
      'uint256',
      'address',
      'bytes',
    ],
    [
      data.chainId,
      data.roundId,
      data.donor,
      data.voteParams,
      data.nonce,
      data.validUntil,
      data.verifyingContract,
      signature,
    ],
  );
  return encoded;
};

const getNonce = async (donor: string, destinationChainId: number) => {
  const wrapper = createContract({
    abi: DONATION_CONTRACT_ABI,
    address: DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID[destinationChainId]!,
    signerOrProvider: Object.values(CHAIN).find((chain) => {
      return chain.id === destinationChainId;
    })?.rpcUrls[0],
  });

  const result = (await wrapper.functions.nonces?.(
    donor,
  ));

  const chainSpecificNonce = result[0]!.toNumber();
  return chainSpecificNonce;
};

export const getLoadingMessage = (isCrossChain: boolean) => {
  if (isCrossChain) {
    return 'Sign message and confirm transfer';
  }

  return 'Confirm transfer in your wallet';
};


export const generateDummyData = async (payload: Payload) => {
  const wallet = await createRandomWallet();
  const vote = generateVote(payload.application?.project.anchorAddress!, Number(payload.amount));
  const data = await generateDonationData(
    Number(payload.application?.roundId!),
    payload.destinationChainId,
    DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID[payload.destinationChainId] ?? '',
    wallet.account,
    vote,
  );
  return await generateEIP712Signature(
    wallet,
    data,
  );
}