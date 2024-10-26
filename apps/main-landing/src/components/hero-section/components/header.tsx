type HeaderProperties = {
  children: string
}

export const Header = ({children}: HeaderProperties) => {
  return (
    <h1 className=" z-1 max-w-[300px] md:max-w-[550px] text-display4 text-center font-normal uppercase gradient-text lg:text-display1 mx-auto my-0 lg:max-w-[1400px]">
      {children}
    </h1>
  );
};
