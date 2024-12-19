import { useMemo } from "preact/hooks";

interface TextProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  color?: string;
}

export const TextProgressBar = ({
  value = 50,
  label = "FUEL",
  color = "#06CE6B",
  ...props
}: TextProgressBarProps) => {
  const getColor = useMemo(() => {
    if (value <= 20) return "#FE2436";
    if (value <= 50) return "#FB8607";
    return color;
  }, [color, value]);

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-[2.5dvw] h-[4dvh] -skew-x-[10deg]"
      }
      {...props}
    >
      <h1
        className={
          "uppercase 4k:text-2xl 2k:text-lg text-base font-geist font-bold"
        }
      >
        {label}
      </h1>

      <div
        className={
          "relative w-[80%] bg-black/20 shadow h-[3.5px] 4k:h-[5px] 4k:mt-1 rounded-full"
        }
      >
        <div
          className="absolute max-w-full transition-all rounded-full shadow left-0 h-full z-20"
          style={{
            width: `${value}%`,
            backgroundColor: getColor,
          }}
        ></div>
      </div>
    </div>
  );
};
