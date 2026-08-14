const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'px-6 py-3 rounded-full font-medium transition-all duration-300';

  const variants = {
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg',

    secondary:
      'border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
