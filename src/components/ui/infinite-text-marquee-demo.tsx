import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee"

const InfiniteTextMarqueeDemo = () => {
    return (
        <>
        <div className="overflow-x-hidden border rounded-xl">
            <InfiniteTextMarquee
                text="Portfolio"
                link="/"
                speed={20}
                tooltipText="Check out my work! 🚀✨"
                fontSize="8rem"
                textColor="bg-primary"
                hoverColor="#FC5212"
                showTooltip={true}
            />
        </div>
        </>
    )
}

export {InfiniteTextMarqueeDemo}
