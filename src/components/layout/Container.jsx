const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-container mx-auto px-5 sm:px-8 lg:px-15 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
