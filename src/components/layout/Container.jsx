const Container = ({ children, className = "", size = "default" }) => {
  const sizes = {
    sm: "max-w-[1080px]",
    default: "max-w-container",
    lg: "max-w-page",
    full: "max-w-full",
  };

  return (
    <div className={`w-full ${sizes[size] || sizes.default} mx-auto px-5 sm:px-8 lg:px-15 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
