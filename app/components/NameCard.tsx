"use client";

export function NameCard() {
	return (
		<div className="p-6 sm:p-8 h-full flex flex-col">
			<div className="flex-1 flex flex-col justify-end space-y-6">
				<div className="flex items-start gap-4">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono">
						AYUSH
						<br />
						SINGH
						<br />
						KUSHWAH
					</h1>
				</div>
			</div>
		</div>
	);
}
