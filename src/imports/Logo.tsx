import svgPaths from "./svg-h9jtv6qxgc";

interface LogoProps {
  showText?: boolean;
  fill?: string;
  className?: string;
}

function Component({ fill }: { fill?: string }) {
  return (
    <div className="absolute right-0 top-0 w-full h-full scale-150 -translate-x-8" data-name="11">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 151 126">
        <g id="11">
          <path d={svgPaths.p4262600} fill={fill || "var(--fill-0, black)"} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Logo({ showText = true, fill, className }: LogoProps) {
  return (
    <div className={`relative ${className || 'size-full'}`} data-name="logo">
      <Component fill={fill} />
      {showText && (
        <>
          <div className="absolute flex h-[30.413px] items-center justify-center left-[17.42px] top-[18.85px] w-[73.485px]" style={{ "--transform-inner-width": "20", "--transform-inner-height": "45" } as React.CSSProperties}>
            <div className="flex-none rotate-[277.764deg]">
              <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[71.306px] leading-[normal] not-italic relative text-[40px] text-black w-[20.972px]">k</p>
            </div>
          </div>
          <div className="absolute flex h-[73.184px] items-center justify-center left-[23px] top-[67px] w-[35.477px]" style={{ "--transform-inner-width": "8.890625", "--transform-inner-height": "45" } as React.CSSProperties}>
            <div className="flex-none rotate-[15.726deg]">
              <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[71.306px] leading-[normal] not-italic relative text-[40px] text-black w-[16.778px]">l</p>
            </div>
          </div>
          <div className="absolute flex h-[22.458px] items-center justify-center left-[78.14px] top-[81.95px] w-[72.424px]" style={{ "--transform-inner-width": "20", "--transform-inner-height": "45" } as React.CSSProperties}>
            <div className="flex-none rotate-[265.387deg]">
              <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[71.306px] leading-[normal] not-italic relative text-[40px] text-black w-[16.778px]">c</p>
            </div>
          </div>
          <div className="absolute flex h-[68.617px] items-center justify-center left-[73.01px] top-[9.22px] w-[62.352px]" style={{ "--transform-inner-width": "26.6875", "--transform-inner-height": "45" } as React.CSSProperties}>
            <div className="flex-none rotate-[13.124deg]">
              <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[58.722px] leading-[normal] not-italic relative text-[40px] text-black w-[50.333px]">B</p>
            </div>
          </div>
          <div className="absolute flex h-[64.009px] items-center justify-center left-[56.38px] top-[33.98px] w-[41.177px]" style={{ "--transform-inner-width": "22.25", "--transform-inner-height": "45" } as React.CSSProperties}>
            <div className="flex-none rotate-[20.691deg]">
              <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[60.416px] leading-[normal] not-italic relative text-[40px] text-black w-[21.198px]">a</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}