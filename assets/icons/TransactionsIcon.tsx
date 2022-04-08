import React from 'react';

const TransactionsIcon = (props) => {
  const { color } = props;

  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1_8269)">
      <path d="M19.7942 16.9998C20.8862 15.1085 21.2532 12.8846 20.8268 10.7428C20.4004 8.60087 19.2098 6.68708 17.4768 5.35809C15.7439 4.02909 13.5868 3.37557 11.4076 3.51931C9.22842 3.66306 7.17586 4.59427 5.63247 6.13939C4.08907 7.6845 3.16015 9.7381 3.01884 11.9174C2.87753 14.0968 3.53346 16.2531 4.86439 17.9846C6.19532 19.7161 8.11043 20.9046 10.2528 21.3286C12.3951 21.7525 14.6186 21.3831 16.5087 20.289" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      <path d="M10 9L8.08536 10.9146C8.05386 10.9461 8.07617 11 8.12071 11H16" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      <path d="M14 16L15.9146 14.0854C15.9461 14.0539 15.9238 14 15.8793 14H8" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <defs>
      <clipPath id="clip0_1_8269">
      <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
      </clipPath>
      </defs>
    </svg>
  )
}

export default TransactionsIcon;