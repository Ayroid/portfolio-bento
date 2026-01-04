import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FadeUpReveal from "@/components/FadeUpReveal";

interface Book {
  title: string;
  progress?: number;
  image?: string;
  url?: string;
}

interface AuthorBooks {
  author: string;
  books: Book[];
}

const bookCollection: AuthorBooks[] = [
  {
    author: "Darius Foroux",
    books: [
      {
        title: "Do it Today",
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
      {
        title: "Focus on what matters",
        progress: 35,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
      {
        title: "Think Straight",
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
      {
        title: "Win your inner battles",
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
      {
        title: "What it takes to be free",
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
      {
        title: "The Road to Better Habits",
        progress: 100,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Paulo Coelho",
    books: [
      {
        title: "The Alchemist",
        progress: 100,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
      {
        title: "The Archer",
        progress: 100,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Morgan Housel",
    books: [
      {
        title: "The Psychology of Money",
        progress: 80,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Austin Kleon",
    books: [
      {
        title: "Show your work",
        progress: 100,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Joseph Murphy",
    books: [
      {
        title: "The Power of your Subconscious Mind",
        progress: 30,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Cal Newport",
    books: [
      {
        title: "Deep Work",
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Peter Thiel",
    books: [
      {
        title: "Zero to One",
        progress: 70,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Nick Maggiulli",
    books: [
      {
        title: "Just Keep Buying",
        progress: 40,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "Mukarami",
    books: [
      {
        title: "Kafka on the Shore",
        progress: 15,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
  {
    author: "George S. Clason",
    books: [
      {
        title: "Richest Man in Babylon",
        progress: 50,
        image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
      },
    ],
  },
];

export default function BooksPage() {
  // Flatten all books into a single array
  const allBooks = bookCollection.flatMap((author) =>
    author.books.map((book) => ({
      ...book,
      author: author.author,
    }))
  );

  const totalBooks = allBooks.length;
  const completedBooks = allBooks.filter(
    (book) => book.progress === 100
  ).length;
  const inProgressBooks = allBooks.filter(
    (book) => book.progress && book.progress > 0 && book.progress < 100
  ).length;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="border p-12 sm:p-16">
            <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
              BOOKS
            </h1>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              My personal reading list, tracking progress across various topics
              including personal development, finance, and philosophy.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Stats */}
      <FadeUpReveal>
        <div className="grid grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center border bg-zinc-900 p-4 sm:p-6">
            <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
              {totalBooks}
            </div>
            <div className="text-sm text-zinc-400 sm:text-base">
              Total Books
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border bg-zinc-900 p-4 sm:p-6">
            <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
              {completedBooks}
            </div>
            <div className="text-sm text-zinc-400 sm:text-base">Completed</div>
          </div>
          <div className="flex flex-col items-center justify-center border bg-zinc-900 p-4 sm:p-6">
            <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
              {inProgressBooks}
            </div>
            <div className="text-sm text-zinc-400 sm:text-base">Reading</div>
          </div>
        </div>
      </FadeUpReveal>

      {/* Books Grid */}
      <FadeUpReveal>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {allBooks.map((book) => {
            const BookCard = (
              <div className="group relative aspect-2/3 cursor-pointer overflow-hidden bg-zinc-900 transition-all hover:border-zinc-700">
                {book.image && (
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                )}

                <div className="absolute inset-0 flex translate-y-full items-end bg-linear-to-t from-black/95 via-black/60 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <div className="w-full">
                    <div className="mb-1 font-sans text-sm font-semibold text-white">
                      {book.title}
                    </div>
                    <div className="mb-2 font-sans text-xs text-zinc-400">
                      {book.author}
                    </div>
                    {book.progress !== undefined ? (
                      <div className="text-xs text-zinc-500">
                        {book.progress}% complete
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-500">Not started</div>
                    )}
                  </div>
                </div>
              </div>
            );

            return <div key={`${book.author}-${book.title}`}>{BookCard}</div>;
          })}
        </div>
      </FadeUpReveal>

      {/* Other Lifestyle Pages */}
      <FadeUpReveal>
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            More Lifestyle
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/tools"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">
                Tools & Setup
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/recommendations"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">
                Recommendations
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>
    </div>
  );
}
