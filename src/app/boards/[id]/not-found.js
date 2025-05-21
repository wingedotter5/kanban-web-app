import Link from "next/link";

export default function BoardNotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <h1>404 – Not Found</h1>
      <p>The board you're looking for does not exist.</p>
      <Link
        className="rounded-full bg-[#635fc7] px-4 py-2 font-bold text-white"
        href="/boards"
      >
        Return home
      </Link>
    </div>
  );
}
