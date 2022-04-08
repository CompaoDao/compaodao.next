import React from 'react';

const Button = (props) => {
  const { children, onClick } = props;

  return (
    <div className="button" onClick={() => onClick()}>
      {children}
    </div>
  )
};

export default Button;