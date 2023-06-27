import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyProps {
  src: any;
  className: string;
  scrollPosition: ScrollPosition;
  handleImageError?: () => void;
}

const Lazy = ({
  src,
  className,
  scrollPosition,
  handleImageError,
}: LazyProps) => {
  return (
    <LazyLoadImage
      className={className}
      effect="blur"
      src={src}
      scrollPosition={scrollPosition}
      onError={handleImageError}
    />
  );
};

export default Lazy;
