import Image from "next/image";
import { BentoItem } from "../components/BentoItem";

const Navbar = () => {
	return (
		<div className="grid grid-cols-1 gap-2 ">
			<BentoItem className="h-20" height={20}>
				<div className="p-4 sm:p-6 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden">
							<Image src="/profile.jpg" alt="Profile" width={32} height={32} />
						</div>
						<h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
							Ayroid
						</h1>
					</div>

					<nav className="hidden md:flex gap-6 lg:gap-8 text-zinc-400 text-sm lg:text-base">
						<a href="#work" className="hover:text-white transition-colors">
							Work
						</a>
						<a href="#blogs" className="hover:text-white transition-colors">
							Blogs
						</a>
						<a href="#projects" className="hover:text-white transition-colors">
							Projects
						</a>
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
