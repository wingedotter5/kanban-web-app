export default function Form({ children, className, ...props }) {
  return (
    <form className={`rounded bg-[#2b2c37] p-2 md:p-4 ${className}`} {...props}>
      {children}
    </form>
  );
}

function Title({ children, className, ...props }) {
  return (
    <p className={`text-xl font-bold text-white ${className}`} {...props}>
      {children}
    </p>
  );
}

Form.Title = Title;
