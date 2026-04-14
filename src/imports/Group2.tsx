import svgPaths from "./svg-yrp794b2jr";
import clsx from "clsx";
type IconTextProps = {
  text: string;
  additionalClassNames?: string;
};

function IconText({ text, additionalClassNames = "" }: IconTextProps) {
  return (
    <div className={clsx("flex-none h-[75px]", additionalClassNames)}>
      <p className="font-['Arial:Bold',sans-serif] leading-[75px] not-italic relative text-[40px] text-black text-nowrap tracking-[-1.5px]">{text}</p>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute inset-[22.86%_17.14%_22.67%_17.5%]" data-name="11">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 224 184">
        <g id="11">
          <path d={svgPaths.p5156a00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute h-[337px] left-0 overflow-clip top-0 w-[342px]" data-name="Icon">
      <Component />
      <div className="absolute flex inset-[21.11%_15.12%_57.68%_64.44%] items-center justify-center">
        <IconText text="F" additionalClassNames="rotate-[43.711deg] w-[25px]" />
      </div>
      <div className="absolute flex inset-[44.99%_4.97%_45.08%_72.63%] items-center justify-center">
        <IconText text="A" additionalClassNames="rotate-[93.457deg] w-[29px]" />
      </div>
      <div className="absolute flex inset-[19.79%_60.07%_58.8%_18.06%] items-center justify-center">
        <IconText text="N" additionalClassNames="rotate-[312.679deg] w-[29px]" />
      </div>
      <div className="absolute flex inset-[45.14%_73.81%_45.24%_4.21%] items-center justify-center">
        <IconText text="O" additionalClassNames="rotate-[270.309deg] w-[32px]" />
      </div>
      <p className="absolute font-['Arial:Bold',sans-serif] inset-[65.91%_45.79%_11.83%_45.73%] leading-[75px] not-italic text-[40px] text-black text-nowrap tracking-[-1.5px]">H</p>
      <div className="absolute flex inset-[62.35%_64.79%_20.94%_15.91%] items-center justify-center">
        <IconText text="I" additionalClassNames="rotate-[51.25deg] w-[12px]" />
      </div>
      <div className="absolute flex inset-[61.76%_12.5%_20.64%_64.44%] items-center justify-center">
        <IconText text="S" additionalClassNames="rotate-[118.289deg] w-[27px]" />
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Icon />
    </div>
  );
}