import DotField from "@/components/DotField";

interface PageContainerProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}

// Same 12px grid and faint white as the old CSS dots, now reacting to the cursor.
const dots = (
  <DotField
    dotRadius={2}
    dotSpacing={10}
    cursorRadius={80}
    bulgeStrength={15}
    activeRadius={60}
    activeColor="rgba(255, 255, 255, 0.9)"
    gradientFrom="rgba(255, 255, 255, 0.14)"
    gradientTo="rgba(255, 255, 255, 0.06)"
    glowColor="rgba(255, 255, 255, 0.05)"
  />
);

// Every page sits in one ruled column, closed off by a dotted band top and bottom.
export function PageContainer({
  children,
  navbar,
  footer,
}: PageContainerProps) {
  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto flex min-h-screen max-w-[40rem] flex-col border-x border-white/[0.06] text-[14.5px] font-light">
        <div
          aria-hidden="true"
          className="relative h-24 overflow-hidden border-b border-white/[0.06]"
        >
          {dots}
        </div>
        {navbar}
        <main
          style={{ animation: "reveal-up 600ms var(--ease-out-expo) both" }}
        >
          {children}
        </main>
        <div className="mt-auto">{footer}</div>
        {/* Tucks under the footer's bottom padding and fades in, so the dots
            blend into it instead of starting at a hard edge. DotField listens on
            window, so pointer-events-none keeps it interactive without blocking the footer. */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative -mt-8 h-24 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_60%)]"
        >
          {dots}
        </div>
      </div>
    </div>
  );
}
