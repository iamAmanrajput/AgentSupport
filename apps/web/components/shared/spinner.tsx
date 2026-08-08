import Image from "next/image";
import React from "react";

interface SpinnerProps {
  size?: number;
  imageClassName?: string;
  alt?: string;
}

const Spinner = ({
  size = 20,
  imageClassName = "",
  alt = "Loading",
}: SpinnerProps) => {
  return (
    <Image
      src="/logo.svg"
      alt={alt}
      width={size}
      height={size}
      className={`animate-spin ${imageClassName}`}
    />
  );
};

export default Spinner;
