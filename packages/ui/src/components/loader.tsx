import React from "react";
import { ScaleLoader } from "react-spinners";

interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const Loader = ({ height = 20, width = 5, color = "#079669" }: Props) => {
  return <ScaleLoader height={height} width={width} color={color} />;
};

export default Loader;
