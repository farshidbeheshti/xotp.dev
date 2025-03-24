import Slider from "@mui/material/Slider";

export function OptionSlider(props) {
  const { onChangeHandler, name, ...fields } = props;
  function onValueChanged(e, value) {
    if (onChangeHandler) onChangeHandler({ ...e, name, value });
  }
  return <Slider {...fields} onChangeCommitted={onValueChanged} />;
}
