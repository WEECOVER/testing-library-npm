import React from "react";
import { BUTTON_ICON_SIZE } from "../common/enums";

export const GetIcon = (size, icon) => {
  const props = {
    size: BUTTON_ICON_SIZE[size],
  };
  const cloned = React.cloneElement(icon, props);
  return cloned;
};
