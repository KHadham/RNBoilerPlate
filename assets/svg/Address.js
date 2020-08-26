import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgAddress = props => (
  <Svg
    width="13"
    height="13"
    viewBox="0 0 13 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13 6.51562L10.5625 4.07812V0.421875H8.9375V2.45312L6.5 0.015625L0 6.51562V6.92188H1.625V10.9844H5.6875V8.54688H7.3125V10.9844H11.375V6.92188H13V6.51562Z"
      fill={props.color}
    />
  </Svg>
);

export default SvgAddress;
