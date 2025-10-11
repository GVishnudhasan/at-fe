import Image from 'next/image';

const Img = ({
  imgClassNames = '',
  classNames = '',
  src = '',
  alt = 'image-pic',
  type = 'block',
  display = 'relative',
  onClickHandler = () => {},
  ...props
}) => {
  const WrapperTag = type === 'block' ? 'div' : 'span';
  return (
    <WrapperTag onClick={onClickHandler} className={`${display} ${classNames}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 100vw"
        priority
        className={imgClassNames}
        {...props}
      />
    </WrapperTag>
  );
};

export default Img;
