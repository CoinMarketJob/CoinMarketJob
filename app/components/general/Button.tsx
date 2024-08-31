import React, { useState } from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderLine?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  clickedBackgroundColor?: string;
  clickedTextColor?: string;
  clickedBorderColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  hoverUnderlineText?: boolean;
  disabled?: boolean;
  changeColorOnPress?: boolean;
  isWhite?: boolean;
  isLoading?: boolean; // Yeni eklenen prop
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  backgroundColor = "#242220",
  textColor = "#FFFFFF",
  borderLine = 0,
  borderColor = "#242220",
  fontSize,
  fontWeight,
  paddingTop = 10,
  paddingBottom = 10,
  paddingLeft = 21,
  paddingRight = 21,
  clickedBackgroundColor = "#242220CC",
  clickedTextColor,
  clickedBorderColor,
  hoverBackgroundColor,
  hoverTextColor,
  hoverBorderColor,
  hoverUnderlineText = false,
  disabled = false,
  changeColorOnPress = backgroundColor === "#242220",
  isWhite = false,
  isLoading = false, // Yeni eklenen prop
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (!disabled) setIsPressed(false);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false);
      setIsPressed(false);
    }
  };

  const buttonStyle = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor: disabled 
      ? '#d3d3d3' // Set a default disabled color
      : (isPressed && changeColorOnPress)
        ? clickedBackgroundColor 
        : isHovered 
          ? hoverBackgroundColor || backgroundColor 
          : backgroundColor,
    color: disabled ? '#888888' : isPressed 
      ? clickedTextColor || textColor 
      : isHovered 
        ? hoverTextColor || textColor 
        : textColor,
    border: `${borderLine}px solid ${
      disabled ? '#cccccc' : isPressed 
      ? clickedBorderColor || borderColor 
      : isHovered ? hoverBorderColor || borderColor 
      : borderColor
    }`,
    fontSize,
    fontWeight,
    textDecoration: isHovered && hoverUnderlineText ? 'underline' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer', // Change cursor if disabled
    transition: 'all 0.1s ease-in-out',
  };

  return (
    <button
      className={`form-button ${isLoading ? 'loading' : ''} ${isWhite ? 'white-button' : ''}`}
      style={buttonStyle}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
    >
      <span className={`button-content ${isLoading ? 'hidden' : ''}`}>
        {text}
      </span>
      {isLoading && <div className="loading-spinner"></div>}
    </button>
  );
};

export default Button;
