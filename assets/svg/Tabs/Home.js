import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_INACTIVE_MENU
} from '../../../app/styles';
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgHome = props => {
  const color = props.active ? COLOR_BASE_PRIMARY_MAIN : COLOR_INACTIVE_MENU;
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.3526 14.1472C12.3526 13.8546 12.0861 13.6193 11.7667 13.6193H8.2328C7.90882 13.6193 7.64688 13.8546 7.64688 14.1472V19.379C7.64688 20.2486 6.85643 20.9524 5.88221 20.9524H1.76466C0.790452 20.9524 0 20.2506 0 19.383V9.82383C0 8.95633 0.558353 7.75732 1.24538 7.14348L8.75462 0.458842C9.44166 -0.152947 10.5583 -0.152947 11.2454 0.458842L18.7546 7.14348C19.4417 7.75732 20 8.95423 20 9.82383V19.383C20 20.2506 19.2095 20.9524 18.2353 20.9524H14.1178C13.1436 20.9524 12.3531 20.2485 12.3531 19.379L12.3526 14.1472Z"
        fill={props.color ? props.color : color}
      />
    </Svg>
  );
};

export default SvgHome;
