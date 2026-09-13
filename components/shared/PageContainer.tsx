interface PageContainerProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}

const dots = {
  backgroundImage:
    "radial-gradient(rgb(255 255 255 / 0.09) 1px, transparent 1px)",
  backgroundSize: "12px 12px",
};

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
          className="h-16 border-b border-white/[0.06]"
          style={dots}
        />
        {navbar}
        <main
          style={{ animation: "reveal-up 600ms var(--ease-out-expo) both" }}
        >
          {children}
        </main>
        <div className="mt-auto">{footer}</div>
        <div aria-hidden="true" className="h-16" style={dots} />
      </div>
    </div>
  );
}
