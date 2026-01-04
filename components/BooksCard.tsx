import Image from "next/image";
import Link from "next/link";

const books = [
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: "/books/the-psychology-of-money.jpg",
    progress: 80,
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    image: "/books/zero-to-one.jpg",
    progress: 70,
  },
  {
    title: "Richest Man in Babylon",
    author: "George S. Clason",
    image: "/books/richest-man-in-babylon.jpg",
    progress: 50,
  },
  {
    title: "The Road to Better Habits",
    author: "Darius Foroux",
    image: "/books/the-road-to-better-habits.jpg",
    progress: 70,
  },
  {
    title: "Focus on what matters",
    author: "Darius Foroux",
    image: "/books/focus-on-what-matters.jpg",
    progress: 50,
  },
];

const BooksCard = () => {
  return (
    <div className="flex h-full flex-col p-4 sm:p-6">
      <div className="grid flex-1 grid-cols-6 gap-2 sm:gap-3">
        {books.map((book) => (
          <div
            key={book.title}
            className="group relative overflow-hidden border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700"
          >
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex translate-y-full items-end bg-linear-to-t from-black/90 via-black/40 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
              <div className="w-full">
                <div className="mb-1 text-sm font-semibold text-white">
                  {book.title}
                </div>
                <div className="mb-2 text-xs text-zinc-400">{book.author}</div>
                <div className="text-xs text-zinc-500">
                  {book.progress}% complete
                </div>
              </div>
            </div>
          </div>
        ))}
        <Link
          href="/books"
          className="group relative flex cursor-pointer items-end justify-start bg-white p-3 transition-colors hover:bg-[#dddddd]"
        >
          <svg
            className={`absolute top-3 right-3 h-8 w-8 text-black opacity-50 transition-all group-hover:top-2 group-hover:right-2 sm:h-10 sm:w-10`}
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
          <span className="font-mono text-2xl font-medium text-black">
            COMPLETE COLLECTION
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BooksCard;
