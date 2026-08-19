const TopRightArrow = ({ iconColor }: { iconColor: string }) => {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-2 right-2 h-8 w-8 overflow-hidden sm:h-10 sm:w-10 md:top-4 md:right-4"
    >
      {/* Two stacked arrows: the resting one slides out to the top-right while
          its twin slides in from the bottom-left, so the glyph reads as a
          single arrow launching away. */}
      <svg
        className={`absolute inset-0 h-full w-full opacity-50 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-full group-hover:translate-x-full group-hover:opacity-0 ${iconColor}`}
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
      <svg
        className={`absolute inset-0 h-full w-full translate-x-[-100%] translate-y-full opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 ${iconColor}`}
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
    </span>
  );
};

export default TopRightArrow;
