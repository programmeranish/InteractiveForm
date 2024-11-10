import React, { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  required: boolean;
  htmlFor?: string;
  className?: string;
};
export default function CustomLabel(props: PropsType) {
  const { required, htmlFor, className, children } = props;
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
      <span className="text-red-500">{required && " * "}</span>
    </label>
  );
}
