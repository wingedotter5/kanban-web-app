export default function Loader({ className }) {
  return (
    <span
      className={`h-6 w-6 animate-spin rounded-full border-3 border-[#ededed] border-t-[#635fc7] ${className}`}
    />
  );
}
