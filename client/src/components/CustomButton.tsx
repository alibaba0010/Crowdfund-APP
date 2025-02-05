interface CustomButtonProps {
  btnType: "button" | "submit" | "reset";
  title: string;
  handleClick?: () => void;
  styles: string;
  disabled?: boolean;
}

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
}: CustomButtonProps) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] cursor-pointer text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
