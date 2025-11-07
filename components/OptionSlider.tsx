import React from 'react';
import Slider, { SliderProps } from "@mui/material/Slider";

interface OptionSliderProps extends Omit<SliderProps, 'onChangeCommitted'> {
  onChangeHandler?: (event: { name: string; value: number }) => void;
  name: string;
}

export function OptionSlider({ onChangeHandler, name, ...fields }: OptionSliderProps) {
  function onValueChanged(event: Event | React.SyntheticEvent, value: number | number[]) {
    if (onChangeHandler && typeof value === 'number') {
      onChangeHandler({ name, value });
    }
  }
  return <Slider {...fields} onChangeCommitted={onValueChanged} />;
}
