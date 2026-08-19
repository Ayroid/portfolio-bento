import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { FadeUpReveal, Separator } from "@/components/shared";
import { bookCollection, Book } from "@/data/books";
import { BsBookmarkStarFill, BsBookmarkCheckFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="relative aspect-2/3 overflow-hidden border border-zinc-800 bg-surface-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/50">
      {book.image && (
        <div className="absolute -top-1 right-1 z-10 bg-transparent">
          {book.completedReading ? (
            <Tooltip>
              <TooltipTrigger>
                <BsBookmarkCheckFill
                  height={40}
                  width={40}
                  className="h-7 w-7 text-black"
                />
              </TooltipTrigger>
              <TooltipContent className="">
                <span>Completed</span>
              </TooltipContent>
            </Tooltip>
          ) : book.currentlyReading ? (
            <Tooltip>
              <TooltipTrigger>
                <BsBookmarkStarFill
                  height={40}
                  width={40}
                  className="h-7 w-7 text-black"
                />
              </TooltipTrigger>
              <TooltipContent className="">
                <span>Reading</span>
              </TooltipContent>
            </Tooltip>
          ) : (
            ""
          )}
        </div>
      )}
      {book.image && (
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover"
        />
      )}
      {"z "}
    </div>
  );
};

export default function BooksPage() {
  const allBooks = bookCollection;
  const flattenedBooks: Book[] = allBooks.flatMap((category) => category.books);

  const totalBooks = flattenedBooks.length;
  const completedBooks = flattenedBooks.filter(
    (book) => book.completedReading === true
  ).length;
  const inProgressBooks = flattenedBooks.filter(
    (book) => book.currentlyReading === true
  ).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="relative overflow-hidden border p-12 sm:p-16">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute right-3 bottom-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px)",
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <BookOpen className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
              <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
                BOOKS
              </h1>
            </div>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              My personal reading list, tracking progress across various topics
              including personal development, finance, and philosophy.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Stats */}
      <FadeUpReveal>
        <div className="grid grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center border bg-surface-card p-4 sm:p-6">
            <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
              {totalBooks}
            </div>
            <div className="text-sm text-zinc-400 sm:text-base">
              Total Books
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border bg-surface-card p-4 sm:p-6">
            <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
              {completedBooks}
            </div>
            <div className="text-sm text-zinc-400 sm:text-base">Completed</div>
          </div>
          <div className="flex flex-col items-center justify-center border bg-surface-card p-4 sm:p-6">
            <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
              {inProgressBooks}
            </div>
            <div className="text-sm text-zinc-400 sm:text-base">Reading</div>
          </div>
        </div>
      </FadeUpReveal>

      {/* Books Grid */}
      <div className="flex flex-col gap-12">
        {allBooks.map((categories) => (
          <div key={categories.category} className="flex flex-col gap-6">
            <FadeUpReveal key={categories.category + "header"}>
              <h2 className="text-2xl font-bold text-white">
                {categories.category}
              </h2>
            </FadeUpReveal>
            <div className="mx-2 grid grid-cols-1 gap-4 md:mx-0 md:grid-cols-2 md:gap-10">
              {categories.books.map((book, index) => (
                <FadeUpReveal key={index}>
                  <BookCard book={book} />
                </FadeUpReveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Other Lifestyle Pages */}
      <FadeUpReveal>
        <div className="mb-12 flex flex-col gap-4 pt-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            More Lifestyle
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/tools"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">
                Tools & Setup
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/recommendations"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
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
