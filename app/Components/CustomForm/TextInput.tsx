import CustomLabel from "../CustomLabel";
import { CustomTextInput } from "../CustomText";

type PropsType = {
  pfield: any;
  index: number;
  register: any;
  errors: any;
};

export default function TextInput(props: PropsType) {
  const { index, pfield, register, errors } = props;

  return (
    <div className="flex flex-col ">
      <CustomLabel
        className="mb-1 text-white"
        required={Number(pfield.required_field) === 1 ? true : false}
      >
        {pfield.field_label}
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
