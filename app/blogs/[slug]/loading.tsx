const bar = "rounded bg-white/[0.04]";

export default function BlogLoading() {
  return (
    <div className="animate-pulse px-5 py-8">
      <div className={`h-7 w-3/4 ${bar}`} />
      <div className={`mt-3 h-4 w-full ${bar}`} />
      <div className={`mt-2 h-4 w-1/3 ${bar}`} />

      <div className="mt-12 space-y-3">
        <div className={`h-4 w-full ${bar}`} />
        <div className={`h-4 w-full ${bar}`} />
        <div className={`h-4 w-5/6 ${bar}`} />
        <div className={`h-32 w-full ${bar}`} />
        <div className={`h-4 w-full ${bar}`} />
        <div className={`h-4 w-2/3 ${bar}`} />
      </div>
    </div>
  );
}
