export default function IconButton({ children, className, ...props }) {
  return (
    <button
      className={`flex flex-row items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
