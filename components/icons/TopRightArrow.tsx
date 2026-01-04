const TopRightArrow = ({ iconColor }: { iconColor: string }) => {
  return (
    <svg
      className={`absolute top-2 right-2 h-8 w-8 group-hover:top-1 group-hover:right-1 sm:h-10 sm:w-10 md:top-4 md:right-4 md:group-hover:top-3 md:group-hover:right-3 ${iconColor} opacity-50 transition-all`}
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
