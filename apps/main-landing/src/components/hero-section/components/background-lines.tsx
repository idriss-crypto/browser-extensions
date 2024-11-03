import Image from 'next/image';


export const BackgroundLines = () => {
  return (
    <Image
      priority
      width={1820}
      height={3702.656}
      src={'/hero-background-lines.png'}
      className="absolute top-0 hidden opacity-40 lg:block"
      alt=""
    />
  );
};
