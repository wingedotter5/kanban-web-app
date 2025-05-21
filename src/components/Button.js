import Loader from "@/components/Loader";

export default function Button({
  children,
  className,
  loading = false,
  ...props
}) {
  return (
    <button
      className={`disabled:opacity-1/2 flex cursor-pointer flex-row items-center justify-center rounded-full bg-[#635fc7] px-4 py-2 font-bold text-white disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}
