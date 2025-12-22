import { BentoItem } from "@/app/components/BentoItem";

const Footer = () => {
	return (
		<BentoItem height={20}>
			<div className="p-4 sm:p-6 flex items-center justify-center">
				<p className="text-zinc-600 text-xs sm:text-sm text-center">
					Designed & Developed by{" "}
					<span className="text-zinc-400 font-bold"> Ayush Singh Kushwah </span>
					<br />© 2025 All rights reserved.
				</p>
			</div>
		</BentoItem>
	);
};

export default Footer;
