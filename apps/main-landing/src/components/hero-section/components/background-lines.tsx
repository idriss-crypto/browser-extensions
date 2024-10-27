export const BackgroundLines = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/background-lines.svg)',
        backgroundPosition: 'top',
      }}
      className="absolute left-0 top-0 hidden h-full w-screen bg-center bg-no-repeat opacity-40 lg:block"
    />
  );
};
