import React from "react";
import CustomLabel from "../CustomLabel";
import { CustomTextInput } from "../CustomText";

type PropsType = {
  pfield: any;
  index: number;
  register: any;
  errors: any;
  handleChangeLabel: (id: string, label: string) => void;
};

export default function TextInput(props: PropsType) {
  const { index, pfield, register, errors, handleChangeLabel } = props;
  const [label, setLabel] = React.useState<string>(pfield.field_label);
  const [isEditLabel, setIsEditLabel] = React.useState<boolean>(false);

  const handleLabelChangeClick = () => {
    setIsEditLabel(false);
    handleChangeLabel(pfield.field_slug, label);
  };
  return (
    <div className="flex flex-col ">
      <CustomLabel
        className="mb-1 text-white"
        required={Number(pfield.required_field) === 1 ? true : false}
      >
        {!isEditLabel && (
          <>
            {pfield.field_label}
            <span
              className="text-sm text-blue-600"
              onClick={() => setIsEditLabel(true)}
            >
              edit
            </span>
          </>
        )}
        {isEditLabel && (
          <>
            <input
              className="text-black"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <button type="button" onClick={handleLabelChangeClick}>
              Save
            </button>
          </>
        )}
      </CustomLabel>

      <CustomTextInput
        className="w-full h-[48px] py-4"
        id={`text-${index}`}
        key={`text-${index}`}
        placeholder={pfield.field_label}
        required={Number(pfield.required_field) === 1 ? true : false}
        {...register(pfield.field_slug)}
        isError={!!errors[pfield.field_slug]}
      />
      <span className="text-red-500 text-xs">
        {errors[pfield.field_slug] &&
          (errors[pfield.field_slug]?.message as string)}
      </span>
    </div>
  );
}
