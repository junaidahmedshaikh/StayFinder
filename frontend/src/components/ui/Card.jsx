export const Card = ({ children, className = "", ...props }) => {
  const baseClasses =
    "rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm";

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
