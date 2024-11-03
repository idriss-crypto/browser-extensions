import Image from 'next/image';

export const TokensFlowImage = () => {
  return (
    <Image
      priority
      width={1985}
      height={1240}
      src="/hero-tokens-flow.png"
      className="z-0 -mt-[22%] w-full min-w-[500px] md:-mt-[18%] lg:-mt-[15%]"
      alt=""
    />
  );
};
