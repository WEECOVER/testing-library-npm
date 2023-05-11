import React from "react";

import style from "./styles/button.css";
import { BUTTON_COLOR_TYPES, BUTTON_STYLE, SIZE } from "./common/enums";
import { GetIcon } from "./functions/buttonFunctions";

//TODO: PropsTypes

const Button = ({
  text,
  type,
  buttonStyle,
  size,
  disabled,
  icon,
  styles,
  children,
}) => {
  const { iconLeft, iconRight } = icon || {
    iconLeft: null,
    iconRight: null,
  };

  const { buttonSelectedType, buttonSelectedStyle } = buttonStyle || {
    buttonSelectedType: BUTTON_COLOR_TYPES.primary,
    buttonSelectedStyle: BUTTON_STYLE.filled,
  };

  const buttonType = type || "button";
  const buttonSize = size || SIZE.medium;

  const buttonStyleColor = `${
    style[buttonSelectedType + "__" + buttonSelectedStyle]
  } ${style[buttonSize]}`;

  // funcion para el evento OnClick
  const onClickEvent = () => {
    if (!disabled && onClick) onClick();
  };

  const ComposeButton = (
    <button
      type={buttonType}
      className={buttonStyleColor}
      onClick={onClickEvent}
      disabled={disabled}
      style={styles}
    >
      <div className={style.buttonBody}>
        <span>{iconLeft && GetIcon(size, iconLeft)}</span>
        <div>{text || children}</div>
        <span>{iconRight && GetIcon(size, iconRight)}</span>
      </div>
    </button>
  );

  const IconButton = (
    <button
      type={buttonType}
      className={buttonStyleColor}
      onClick={onClickEvent}
      disabled={disabled}
    >
      <div className={style.buttonBody}>
        <span>{iconLeft && GetIcon(size, iconLeft)}</span>
      </div>
    </button>
  );

  const RenderComponent =
    text || React.Children.count(children) > 0 ? ComposeButton : IconButton;

  return RenderComponent;
};

export default Button;
