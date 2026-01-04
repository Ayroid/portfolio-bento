const TopRightArrow = () => {
  return (
    <svg
      className="absolute top-4 right-4 h-6 w-6 text-white opacity-50 transition-all group-hover:top-3 group-hover:right-3 sm:h-10 sm:w-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TopRightArrow;
