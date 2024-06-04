import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { ckEditorConfig } from "../../configs/ckeditor/CkEditorConfig";

const CkEditor = (props) => {
  const { name, label } = props;
  const { setValue, control, getValues } = useFormContext();
  return (
    <Fragment>
      <Label className="form-label" for={name}>
        {label}
      </Label>
      <Controller
        render={({ field }) => (
          <CKEditor
            {...field}
            config={ckEditorConfig}
            data={getValues(name)}
            editor={Editor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValue(name, data);
            }}
          />
        )}
        name="about"
        control={control}
      />
    </Fragment>
  );
};
export default CkEditor;
