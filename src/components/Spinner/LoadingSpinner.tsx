import React from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

type LoadingIndicatorProps = {
  size: number;
  isDefaultCss: boolean;
  color: string;
};

const defaultCss = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
  border-color: #808191;
`;

export function LoadingSpinner({
  size,
  isDefaultCss,
  color,
}: LoadingIndicatorProps) {
  const spinnerCss = isDefaultCss ? defaultCss : "";

  return <ClipLoader css={spinnerCss} loading size={size} color={color} />;
}
