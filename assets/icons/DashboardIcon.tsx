import React from 'react';

const DashboardIcon = (props) => {
  const { color } = props;
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.75" y="4.25" width="16.5" height="16.5" rx="1.25" stroke={color} strokeWidth="1.5"/>
      <line x1="9.75" y1="4.5" x2="9.75" y2="21.5" stroke={color} strokeWidth="1.5"/>
      <line x1="9" y1="10.75" x2="21" y2="10.75" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}
export default DashboardIcon;
