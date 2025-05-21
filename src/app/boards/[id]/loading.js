import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <Loader className="h-8 w-8" />
    </div>
  );
}
