import { BentoItem } from "@/app/components/BentoItem";

const Footer = () => {
	return (
		<BentoItem height={20}>
			<div className="p-4 sm:p-6 flex items-center justify-center">
				<p className="text-zinc-600 text-xs sm:text-sm text-center">
					© 2025 Ayush Singh Kushwah · Built with Next.js & Tailwind CSS
				</p>
			</div>
		</BentoItem>
	);
};

export default Footer;
