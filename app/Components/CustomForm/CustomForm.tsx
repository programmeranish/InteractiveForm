"use client";
import React, { useEffect, useState, useMemo, ReactNode } from "react";

import { set, TypeOf } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import CustomLabel from "../CustomLabel";
import CustomSelect from "../CustomSelect";
import { CustomFieldsType } from "../Dashboard";
import { CustomTextInput } from "../CustomText";
import { SelectInput } from "./SelectInput";
import TextInput from "./TextInput";

type selectOptionType = {
  label: string;
  value: string;
};

type FieldsName = {
  id?: number;
  field_label: string;
  field_slug: string;
  field_type: string;
  required_field: string;
  field_options?: selectOptionType[] | any | string; //string in multiple select the old one but we need object[] of label and value
  not_custom_fields?: boolean;
  disabled?: boolean;
}[];

type customFieldsPair = {
  info_value: any;
  customfield: number;
  paramaters?: any;
  info_path?: any;
}[];

type PropsType = { dropedItems: CustomFieldsType[] };
export default function CustomForm(props: PropsType) {
  const { dropedItems } = props;

  const [pfields, setPfields] = useState<FieldsName>([]);

  const useCustomFieldsDynamicSchema = (schema: any, config: any) => {
    const { field_slug, validationType, validations = [] } = config;
    if (!yup[validationType as keyof typeof yup]) {
      return schema;
    }
    const yupMethod = validationType as keyof typeof yup;
    let validator = yup[yupMethod] as Function;
    validator = validator();

    validations.forEach((validation: any) => {
      const { params, type } = validation;
      if (!validator[type as keyof typeof validator]) {
        return;
      }
      validator = validator[type as keyof typeof validator](...params);
    });
    schema[field_slug] = validator;
    return schema;
  };

  const useCustomFieldsExtendValidation = (customFields: any) => {
    return customFields.map((customField: any) => {
      switch (customField.field_type) {
        case "text":
          return customField;
        case "select":
          if (Number(customField.required_field) === 1) {
            return {
              ...customField,
              validationType: "string",
              validations: [
                {
                  type: "required",
                  params: ["This field is required"],
                },
              ],
            };
          } else {
            return customField;
          }

        default:
          return customField;
      }
    });
  };

  const dynamicFormData = useCustomFieldsExtendValidation(pfields);
  const customFieldsSchema = dynamicFormData.reduce(
    useCustomFieldsDynamicSchema,
    {}
  );

  const loading = false;
  const dynamicValidationSchema = yup.object().shape(customFieldsSchema);

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    control,
    reset,
  } = useForm<TypeOf<typeof customFieldsSchema>>({
    defaultValues: {},
    resolver: yupResolver(dynamicValidationSchema), // Here we use our dynamic schema
    mode: "onTouched",
  });

  const preFields: FieldsName = useMemo(
    () => [
      {
        field_label: "Full Name",
        field_slug: "fullname",
        field_type: "text",
        required_field: "1",
        not_custom_fields: true,
        disabled: false,
      },
    ],
    []
  );

  useEffect(() => {
    const customFields = [...preFields];
    dropedItems.forEach((item) => {
      customFields.push({
        field_label: item.field_label,
        field_slug: item.field_slug,
        field_type: item.pfield_type,
        required_field: "1",
        not_custom_fields: false,
        disabled: false,
        field_options: [],
      });
    });
    setPfields(customFields);
  }, [reset, preFields, dropedItems]);

  const onFormSubmit: SubmitHandler<TypeOf<typeof customFieldsSchema>> = (
    data
  ) => {
    const formdata = new FormData();

    pfields.forEach((field) => {
      if (!data[field.field_slug]) {
        delete data[field.field_slug];
      }

      if (Object.hasOwn(data, field.field_slug) && field.not_custom_fields) {
        formdata.append(field.field_slug, data[field.field_slug]);
      }
    });

    const infos: customFieldsPair = [];
    data?.employeefields?.forEach((cfield: any) => {
      if (data[cfield.field_slug]) {
        if (
          Array.isArray(data[cfield.field_slug]) &&
          data[cfield.field_slug].length > 0
        ) {
          infos.push({
            info_value: data[cfield.field_slug].join(","),
            customfield: cfield.id,
            paramaters: "",
          });
        } else {
          infos.push({
            info_value: data[cfield.field_slug],
            customfield: cfield.id,
            paramaters: "",
          });
        }
      }
    });

    if (infos.length > 0) {
      formdata.append("infos", JSON.stringify(infos));
      data.infos = infos;
    }
  };

  return (
    <div className="grid gap-2 w-full">
      <div className="ouerLayer">
        <div className="">
          <div>
            <div className="">
              <div className=" rounded  shadow-lg">
                <div className="">
                  <form
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "4px",
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit(onFormSubmit)}
                  >
                    {loading && (
                      <div className="grid grid-cols-12 mt-5 min-h-[50%]">
                        <div className="col-span-12 flex justify-center">
                          Progressing
                        </div>
                      </div>
                    )}
                    {!loading && (
                      <>
                        <div className="grid gap-2 w-full">
                          {pfields.length > 0 &&
                            pfields.map((pfield, index) => {
                              if (pfield.field_type === "text")
                                return (
                                  <div
                                    className="grid  "
                                    key={`grid-text-${index}`}
                                  >
                                    <TextInput
                                      index={index}
                                      pfield={pfield}
                                      register={register}
                                      errors={errors}
                                    />
                                  </div>
                                );

                              if (pfield.field_type === "select")
                                return (
                                  <div
                                    className="grid  "
                                    key={`grid-select-${index}`}
                                  >
                                    <SelectInput
                                      pfield={pfield}
                                      errors={errors}
                                      control={control}
                                    />
                                  </div>
                                );

                              return null;
                            })}
                        </div>
                        <div className="p-2 flex flex-end">
                          <button className={"relative text-white"}>
                            Save
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
