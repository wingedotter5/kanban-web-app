export default function FormControl({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

function Label({ children, className, ...props }) {
  return (
    <label className={`block font-bold text-white ${className}`} {...props}>
      {children}
    </label>
  );
}

function Input({ className, ...props }) {
  return (
    <input
      className={`block w-full rounded border border-[rgba(130,143,163,0.25)] px-4 py-2 text-white focus:outline focus:outline-[#635fc7] ${className}`}
      {...props}
    />
  );
}

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`resize-vertical block w-full rounded border border-[rgba(130,143,163,0.25)] bg-transparent px-4 py-2 text-white focus:outline focus:outline-[#635fc7] ${className}`}
      {...props}
    ></textarea>
  );
}

FormControl.Label = Label;
FormControl.Input = Input;
FormControl.Textarea = Textarea;
