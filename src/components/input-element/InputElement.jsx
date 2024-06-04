import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFeedback, Label } from "reactstrap";

const InputElement = (props) => {
  const { name, label, type, rules, placeholder, innerElement, children, required, disabled } = props;
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const Element = innerElement;
  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <Label className={`form-label ${required ? "required" : ""}`} for={label}>
          {label}
        </Label>
        {children}
      </div>
      <Controller
        render={({ field }) => (
          <Element
            {...field}
            onBlur={(e) => {
              setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
            }}
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
        name={name}
        control={control}
        type={type || "text"}
        placeholder={placeholder}
        rules={rules}
      />
      {errors[name] && <FormFeedback className="d-block">{errors[name].message}</FormFeedback>}
    </Fragment>
  );
};
export default InputElement;
