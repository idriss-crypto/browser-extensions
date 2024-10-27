import { TopWave } from "./components/top-wave";

export const SuperpowersSection = () => {
  return (
    <section className="relative">
      <TopWave className="absolute top-0 left-0 translate-y-[-90%] w-full text-white" />
      <div className="z-1 w-full bg-white">
        <h1>Hey!</h1>
      </div>
    </section>
  );
};
