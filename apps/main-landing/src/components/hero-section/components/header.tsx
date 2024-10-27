type HeaderProperties = {
  children: string;
};

export const Header = ({ children }: HeaderProperties) => {
  return (
    <h1 className="z-1 mx-auto my-0 max-w-[300px] bg-[linear-gradient(130deg,_theme(colors.mint.700)_0%,_theme(colors.mint.700)_20%,_theme(colors.neutralGreen.900)_45%,_theme(colors.mint.700)_65%,_theme(colors.mint.700)_100%)] bg-clip-text text-center text-display4 font-normal uppercase text-transparent md:max-w-[550px] lg:max-w-[1400px] lg:bg-[linear-gradient(160deg,_theme(colors.mint.700)_0%,_theme(colors.mint.700)_20%,_theme(colors.neutralGreen.900)_45%,_theme(colors.mint.700)_60%,_theme(colors.mint.700)_100%)] lg:text-display1">
      {children}
    </h1>
  );
};
