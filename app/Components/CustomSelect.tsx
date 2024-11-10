import React, { useEffect } from "react";
import Select, { SingleValue } from "react-select";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    height: "40px",
    width: "100%",
    borderRadius: "0.375rem",
    backgroundColor: "var(--shadcn-background-color)",
    padding: "0 0.15rem",
    fontSize: "0.875rem",
    boxShadow: state.isFocused ? "0 0 0 2px black" : "none",
    outline: "none",
    "&:hover": {
      borderColor: "var(--shadcn-border-hover)",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: "0.5",
      backgroundColor: "var(--shadcn-disabled-background-color)",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--shadcn-text-color)",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "var(--shadcn-placeholder-color)",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "var(--shadcn-icon-color)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

type OptionType = {
  value: string | number;
  label: string;
};

type PropsType = {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id: string;
  isError: boolean;
  errorMessage: string | undefined;
  onChange: (selected: OptionType | null) => void;
  value: string | number | undefined;
  options: OptionType[];
  isClearable?: boolean;
};

const CustomSelect = (props: PropsType) => {
  const {
    disabled = false,
    loading = false,
    className,
    id,
    isError,
    errorMessage,
    onChange,
    value,
    options,
    isClearable = false,
  } = props;

  const [selectedOption, setSelectedOption] = React.useState<OptionType | null>(
    null
  );

  useEffect(() => {
    console.log("value", value, options);
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected || null);
  }, [value, options]);

  const handleSelect = (selectedOption: SingleValue<OptionType>) => {
    onChange(selectedOption as OptionType); //this will change the hook form value and the useeffect will run chaging the current selected option
  };

  return (
    <div>
      <Select
        id={id}
        name={id}
        isClearable={isClearable}
        className={className}
        classNamePrefix="select"
        value={selectedOption}
        isDisabled={disabled}
        isLoading={loading}
        options={options}
        onChange={(selectedOption) => {
          handleSelect(selectedOption);
        }}
        styles={customStyles}
      />
      {isError && <span className="text-red-500 text-xs">{errorMessage}</span>}
    </div>
  );
};

export default CustomSelect;
