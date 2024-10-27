type TopWaveProperties = {
  className?: string;
};

export const TopWave = ({ className }: TopWaveProperties) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1980 80"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M 2344 80 C 2344 134.762 1737.79 0 990 0 C 242.206 0 -364 134.762 -364 80"
      fill="currentColor"
    ></path>
  </svg>
);
