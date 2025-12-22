import Image from "next/image";
import Link from "next/link";

const books = [
	{
		title: "Atomic Habits",
		author: "James Clear",
		image: "https://m.media-amazon.com/images/I/81YkqyaFVEL._SY466_.jpg",
		progress: 75,
	},
	{
		title: "The Lean Startup",
		author: "Eric Ries",
		image: "https://m.media-amazon.com/images/I/81-QB7nDh4L._SY466_.jpg",
		progress: 45,
	},
	{
		title: "Deep Work",
		author: "Cal Newport",
		image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY466_.jpg",
		progress: 60,
	},
	{
		title: "Thinking, Fast and Slow",
		author: "Daniel Kahneman",
		image: "https://m.media-amazon.com/images/I/71f6DceqZAL._SY466_.jpg",
		progress: 30,
	},
];

const BooksCard = () => {
	return (
		<div className="h-full flex flex-col p-4 sm:p-6">
			<h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">
				Currently Reading
			</h3>
			<div className="grid grid-cols-5 gap-2 sm:gap-3 flex-1">
				{books.map((book) => (
					<div
						key={book.title}
						className="group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
					>
						<Image
							src={book.image}
							alt={book.title}
							fill
							className="object-cover"
						/>

						<div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end p-3">
							<div className="w-full">
								<div className="text-white text-sm font-semibold mb-1">
									{book.title}
								</div>
								<div className="text-zinc-400 text-xs mb-2">{book.author}</div>
								<div className="text-zinc-500 text-xs">
									{book.progress}% complete
								</div>
							</div>
						</div>
					</div>
				))}
				<Link
					href="/books"
					className="bg-[#e5e5e5] hover:bg-[#dddddd] rounded-lg flex items-end justify-start p-3 relative transition-colors cursor-pointer"
				>
					<svg
						className="absolute top-3 right-3 w-6 h-6 text-black opacity-50"
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
					<span className="text-black font-mono font-medium text-sm">
						VIEW ALL
					</span>
				</Link>
			</div>
		</div>
	);
};

export default BooksCard;
