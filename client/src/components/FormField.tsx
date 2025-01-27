import React from "react";

interface FormFieldProps {
  labelName?: string;
  placeholder: string;
  inputType?: string;
  isTextArea?: boolean;
  className?: string;
  step?: string;
}

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ labelName, placeholder, inputType, isTextArea, ...rest }, ref) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          required
          rows={5}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          {...rest}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          required
          type={inputType}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          {...rest}
        />
      )}
    </label>
  );
});

FormField.displayName = "FormField";

export default FormField;
