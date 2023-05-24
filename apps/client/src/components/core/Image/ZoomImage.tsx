import React, { useRef, useState } from 'react';

type PropsType = {
  img: string,
  zoomScale: number,
  height: number,
  width: number,
  transitionTime?: number,
}
const ZoomImage = (props: PropsType) => {
  const {
    img,
    zoomScale,
    height,
    width,
    transitionTime,
  } = props;

  const [zoom, setZoom] = useState(false);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const outerDivStyle = {
    height: `${height}px`,
    width: `${width}px`,
    overflow: 'hidden',
  };

  const innerDivStyle = {
    height: `${height}px`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    transition: `transform ${transitionTime}s ease-out`,
    backgroundImage: `url('${img}')`,
  };

  const imageRef: any = useRef();

  const handleMouseOver = () => {
    setZoom(true);
  };

  const handleMouseOut = () => {
    setZoom(false);
  };

  const handleMouseMovement = (e: any) => {
    const {
      left: offsetLeft,
      top: offsetTop,
    } = imageRef.current.getBoundingClientRect();

    const {
      current: {
        style: { height, width },
      },
    } = imageRef;

    const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
    const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;

    setMouseX(x);
    setMouseY(y);
  };

  const transform = {
    transformOrigin: `${mouseX}% ${mouseY}%`,
  };

  return (
    <div
      style={outerDivStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMovement}
      ref={imageRef}
    >
      <div
        style={{
          ...transform,
          ...innerDivStyle,
          transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
          willChange: "transform"
        }}
      />
    </div>
  );
};

export default ZoomImage;
