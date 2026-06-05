import React from 'react';
import { ProgressBar } from 'react-loader-spinner';

const Loader = ({
  visible,
  height,
  width,
  color,
  ariaLabel,
  wrapperStyle,
  wrapperClass,
  borderColor,
  barColor,
}) => {
  if (!visible) {
    return null; // If loading is not visible, render nothing
  }

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <ProgressBar
        height={height}
        width={width}
        color={color}
        ariaLabel={ariaLabel}
        barColor={barColor}
        borderColor={borderColor}
      />
    </div>
  );
};

export default Loader;
