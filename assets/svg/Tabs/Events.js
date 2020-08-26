import React from 'react';
import PropsType from 'prop-types';
import Svg, { Rect } from 'react-native-svg';

import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_INACTIVE_MENU
} from '../../../app/styles';

const Events = props => {
  const color = props.active ? COLOR_BASE_PRIMARY_MAIN : COLOR_INACTIVE_MENU;

  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width="8.75" height="7.5" rx="1" fill={color} />
      <Rect y="10" width="8.75" height="10" rx="1" fill={color} />
      <Rect
        width="8.75"
        height="6.25"
        rx="1"
        transform="matrix(1 0 0 -1 11.25 20)"
        fill={color}
      />
      <Rect
        width="8.75"
        height="11.25"
        rx="1"
        transform="matrix(1 0 0 -1 11.25 11.25)"
        fill={color}
      />
    </Svg>
  );
};

Events.propTypes = {
  active: PropsType.bool
};

Events.defaultProps = {
  active: false
};

export default Events;
