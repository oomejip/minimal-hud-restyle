import React from "react";
import { FaCompass } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface IconLabelBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

const IconLabelBox: React.FC<IconLabelBoxProps> = ({
  Icon: Icon = FaCompass,
  label = "NW",
  className = "",
  textClassName = "",
  iconClassName = "",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        `flex items-center h-[2.5dvh] justify-center text-y_white bg-[#06CE6B]/30 rounded-[8px] p-[1px] min-w-[5dvw]`,
        className
      )}
      {...props}
    >
      <Icon
        className={twMerge(
          "mr-2 2k:text-lg 4k:text-2xl",
          iconClassName
        )}
      />
      <p
        className={twMerge(
          `text-center text-y_white font-bold 4k:text-2xl text-sm 2k:text-base`,
          textClassName
        )}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default IconLabelBox;
