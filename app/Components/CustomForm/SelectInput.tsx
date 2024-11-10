import { Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import CustomLabel from "../CustomLabel";

type PropsType = {
  pfield: any;
  control: any;
  errors: any;
};
export function SelectInput(props: PropsType) {
  const { pfield, control, errors } = props;
  return (
    <div className="flex flex-col">
      <CustomLabel
        className="mb-1"
        required={Number(pfield.required_field) === 1 ? true : false}
      >
        {pfield.field_label}
      </CustomLabel>

      <Controller
        name={pfield.field_slug}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            id={pfield.field_slug}
            onChange={(selected: any) => {
              onChange(selected.value);
            }}
            value={value}
            className="w-full h-[48px]"
            options={pfield.field_options}
            isError={!!errors[pfield.field_slug]}
            errorMessage={
              errors[pfield.field_slug]
                ? (errors[pfield.field_slug]?.message as string)
                : ""
            }
          />
        )}
      />
    </div>
  );
}
