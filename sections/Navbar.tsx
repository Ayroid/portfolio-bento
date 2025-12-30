import Image from "next/image";
import Link from "next/link";
import { BentoItem } from "../components/BentoItem";

/**
 * LATTICE STRUCTURE (30 columns × 2 rows)
 * Base row height: 50px
 */

const Navbar = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2"
			style={{
				gridAutoRows: "35px", // Base row height
			}}
		>
			{/* Navbar - 30 cols × 2 rows */}
			<BentoItem
				colSpan={30}
				rowSpan={2}
				className="md:col-span-2 lg:col-span-30"
			>
				<div className="p-4 sm:p-6 flex items-center justify-between">
					<Link className="flex items-center gap-3" href="/">
						<div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden">
							<Image src="/profile.jpg" alt="Profile" width={32} height={32} />
						</div>
						<h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
							Ayroid
						</h1>
					</Link>

					<nav className="hidden md:flex gap-6 lg:gap-8 text-zinc-400 text-sm lg:text-base">
						<Link href="/blogs" className="hover:text-white transition-colors">
							Blogs
						</Link>
						<Link href="/projects" className="hover:text-white transition-colors">
							Projects
						</Link>
					</nav>

					<button className="md:hidden text-zinc-400 hover:text-white transition-colors">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</BentoItem>
		</div>
	);
};

export default Navbar;
