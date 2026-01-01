import Image from "next/image";
import Link from "next/link";

const books = [
	{
		title: "The Psychology of Money",
		author: "Morgan Housel",
		image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
		progress: 80,
	},
	{
		title: "Zero to One",
		author: "Peter Thiel",
		image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
		progress: 70,
	},
	{
		title: "Richest Man in Babylon",
		author: "George S. Clason",
		image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
		progress: 50,
	},
	{
		title: "Just Keep Buying",
		author: "Nick Maggiulli",
		image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
		progress: 40,
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
					className="bg-[#e5e5e5] hover:bg-[#dddddd] rounded-lg flex items-end justify-start p-3 relative transition-colors cursor-pointer group"
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
