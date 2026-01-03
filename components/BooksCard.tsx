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
		<div className="h-full flex flex-col p-4 sm:p-6">
			<div className="grid grid-cols-6 gap-2 sm:gap-3 flex-1">
				{books.map((book) => (
					<div
						key={book.title}
						className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
					>
						<Image
							src={book.image}
							alt={book.title}
							fill
							className="object-cover"
						/>

						<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end p-3">
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
					className="bg-white hover:bg-[#dddddd] flex items-end justify-start p-3 relative transition-colors cursor-pointer group"
				>
					<svg
						className={`absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 text-black opacity-50 group-hover:top-2 group-hover:right-2 transition-all`}
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
					<span className="text-black font-mono font-medium text-2xl">
						COMPLETE COLLECTION
					</span>
				</Link>
			</div>
		</div>
	);
};

export default BooksCard;
