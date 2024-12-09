import { createConfig, getQuote } from '@lifi/sdk'

createConfig({
  integrator: 'IDRISS',
})

export const getQuoteFromLifi = async (fromAddress, originChain, destinationChain, originToken, destinationToken, amount) => {
  const quote = await getQuote({
    fromAddress: fromAddress,
    fromChain: originChain,
    toChain: destinationChain,
    fromToken: originToken,
    toToken: destinationToken,
    fromAmount: amount,
  })

  return quote;

}
