import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

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
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1516895891i/37933908.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
			{
				title: "Focus on what matters",
				progress: 35,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586802804i/52963777.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
			{
				title: "Think Straight",
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559582726i/46128784.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
			{
				title: "Win your inner battles",
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568375747i/46128787.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
			{
				title: "What it takes to be free",
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568375857i/46128790.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
			{
				title: "The Road to Better Habits",
				progress: 100,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586802716i/52963774.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Paulo Coelho",
		books: [
			{
				title: "The Alchemist",
				progress: 100,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
			{
				title: "The Archer",
				progress: 100,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1496085953i/33956703.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Morgan Housel",
		books: [
			{
				title: "The Psychology of Money",
				progress: 80,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Austin Kleon",
		books: [
			{
				title: "Show your work",
				progress: 100,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1404789993i/18290401.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Joseph Murphy",
		books: [
			{
				title: "The Power of your Subconscious Mind",
				progress: 30,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353836249i/68985.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Cal Newport",
		books: [
			{
				title: "Deep Work",
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Peter Thiel",
		books: [
			{
				title: "Zero to One",
				progress: 70,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630663027i/18050143.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Nick Maggiulli",
		books: [
			{
				title: "Just Keep Buying",
				progress: 40,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1638399578i/59522875.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "Mukarami",
		books: [
			{
				title: "Kafka on the Shore",
				progress: 15,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1429638085i/4929.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
			},
		],
	},
	{
		author: "George S. Clason",
		books: [
			{
				title: "Richest Man in Babylon",
				progress: 50,
				image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348336780i/1052.jpg",
				url: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
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
			{/* Header */}
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-xl bg-zinc-900  flex items-center justify-center">
						<BookOpen className="w-6 h-6 text-zinc-400" />
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-white">
						Book Collection
					</h1>
				</div>
				<p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
					My personal reading list, tracking progress across various topics
					including personal development, finance, and philosophy.
				</p>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
				<div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
					<div className="text-2xl sm:text-3xl font-bold text-white mb-1">
						{totalBooks}
					</div>
					<div className="text-zinc-400 text-sm sm:text-base">Total Books</div>
				</div>
				<div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
					<div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">
						{completedBooks}
					</div>
					<div className="text-zinc-400 text-sm sm:text-base">Completed</div>
				</div>
				<div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
					<div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">
						{inProgressBooks}
					</div>
					<div className="text-zinc-400 text-sm sm:text-base">Reading</div>
				</div>
			</div>

			{/* Books Grid */}
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
				{allBooks.map((book) => {
					const BookCard = (
						<div
							className="group relative overflow-hidden rounded-lg bg-zinc-900 hover:border-zinc-700 transition-all cursor-pointer aspect-2/3"
						>
							{book.image && (
								<Image
									src={book.image}
									alt={book.title}
									fill
									className="object-cover"
								/>
							)}

							<div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end p-3">
								<div className="w-full">
									<div className="text-white text-sm font-semibold mb-1">
										{book.title}
									</div>
									<div className="text-zinc-400 text-xs mb-2">{book.author}</div>
									{book.progress !== undefined ? (
										<div className="text-zinc-500 text-xs">
											{book.progress}% complete
										</div>
									) : (
										<div className="text-zinc-500 text-xs">Not started</div>
									)}
								</div>
							</div>
						</div>
					);

					return book.url ? (
						<Link
							key={`${book.author}-${book.title}`}
							href={book.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{BookCard}
						</Link>
					) : (
						<div key={`${book.author}-${book.title}`}>{BookCard}</div>
					);
				})}
			</div>
		</div>
	);
}
