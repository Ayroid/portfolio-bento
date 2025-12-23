import { BentoItem } from "@/app/components/BentoItem"

const OpenToWorkSection = () => {
    return (
        <BentoItem>
            <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
                        Let&apos;s Work Together
                    </h3>
                    <p className="text-zinc-500 text-sm sm:text-base">
                        Open to new opportunities and collaborations
                    </p>
                </div>
                <a
                    href="mailto:ramxcodes@gmail.com"
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black rounded-lg text-sm sm:text-base font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap"
                >
                    Get in Touch
                </a>
            </div>
        </BentoItem>
    )
}

export default OpenToWorkSection;