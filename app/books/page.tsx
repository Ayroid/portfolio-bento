import Image from "next/image";
import { PageHeader, Section } from "@/components/shared/Section";
import { bookCollection } from "@/data/books";

export default function BooksPage() {
  const books = bookCollection.flatMap((category) => category.books);
  const read = books.filter((book) => book.completedReading).length;
  const reading = books.filter((book) => book.currentlyReading).length;

  return (
    <>
      <PageHeader
        title="Books"
        description="My reading list across personal development, finance and philosophy."
      >
        <p className="tabular mt-3 text-[13px] text-neutral-500">
          {books.length} books · {read} read · {reading} reading
        </p>
      </PageHeader>

      {bookCollection.map(({ category, books }) => (
        <Section
          key={category}
          label={category.toLowerCase().replace(/\s+/g, "-")}
        >
          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
            {books.map((book) => {
              const status = book.completedReading
                ? "Read"
                : book.currentlyReading
                  ? "Reading"
                  : null;
              return (
                <li key={book.title}>
                  <div className="relative aspect-2/3 overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]">
                    {book.image && (
                      <Image
                        src={book.image}
                        alt=""
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-neutral-200">
                    {book.title}
                  </p>
                  <p className="text-[12px] text-neutral-500">
                    {book.author}
                    {status && ` · ${status}`}
                  </p>
                </li>
              );
            })}
          </ul>
        </Section>
      ))}
    </>
  );
}
