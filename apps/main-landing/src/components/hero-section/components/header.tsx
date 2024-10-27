type HeaderProperties = {
  children: string
}

export const Header = ({children}: HeaderProperties) => {
  return (
    <h1 className=" z-1 max-w-[300px] md:max-w-[550px] text-display4 text-center font-normal uppercase bg-[linear-gradient(130deg,_theme(colors.mint.700)_0%,_theme(colors.mint.700)_20%,_theme(colors.neutralGreen.900)_45%,_theme(colors.mint.700)_65%,_theme(colors.mint.700)_100%)] lg:bg-[linear-gradient(160deg,_theme(colors.mint.700)_0%,_theme(colors.mint.700)_20%,_theme(colors.neutralGreen.900)_45%,_theme(colors.mint.700)_60%,_theme(colors.mint.700)_100%)] bg-clip-text text-transparent lg:text-display1 mx-auto my-0 lg:max-w-[1400px]">
      {children}
    </h1>
  );
};
