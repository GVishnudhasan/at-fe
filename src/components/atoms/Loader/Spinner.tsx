const Spinner = ({
  size = 'h-4 w-4',
  borderColor = 'border-white/30 border-t-white',
}) => {
  return (
    <div
      className={`mr-1.5 ${size} animate-spin rounded-full border-4 ${borderColor}`}
    />
  );
};

export default Spinner;
