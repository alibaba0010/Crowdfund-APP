import { ReactNode } from "react";
import { checker, loader } from "../assets";

interface LoaderProps {
  text?: string | ReactNode;
  className?: string;
  isChecker?: boolean;
  noText?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ text, isChecker }) => {
  console.log(`Loading ${text}..... ${isChecker}`);
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      {isChecker ? (
        <img
          src={checker}
          alt="checker"
          className="w-[100px] h-[100px] object-contain"
        />
      ) : (
        <img
          src={checker}
          alt="checker"
          className="w-[100px] h-[100px] object-contain checker-animation"
        />
      )}
      {text || (
        <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
          Transaction is in progress <br /> Please wait...
        </p>
      )}
    </div>
  );
};

export default Loader;
