import svgPaths from "./svg-4jvi70hdxu";
import clsx from "clsx";
type Icon1TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Icon1Text({ text, additionalClassNames = "" }: Icon1TextProps) {
  return (
    <div className={clsx("flex-none h-[75px]", additionalClassNames)}>
      <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] leading-[normal] not-italic relative text-[64px] text-black w-full">{text}</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute h-[121.281px] left-[-67.38px] top-0 w-[218.844px]" data-name="Hero">
      <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[121.284px] left-0 text-[#0b0d10] text-[134.76px] text-nowrap top-[-1px] tracking-[-6.738px]">The</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[242.563px] left-[1.5px] top-[21.02px] w-[896px]" data-name="Heading 1">
      <Hero />
      <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[121.284px] left-0 text-[#0b0d10] text-[134.76px] text-nowrap top-[120.28px] tracking-[-6.738px]">BLACK STAR</p>
    </div>
  );
}

function Hero1() {
  return (
    <div className="h-[106.656px] relative shrink-0 w-full" data-name="Hero">
      <p className="absolute font-['Inter:Light',sans-serif] font-light leading-[53.333px] left-0 not-italic text-[#0b0d10] text-[48px] text-nowrap top-[52.33px]">Fashion, without illusion.</p>
    </div>
  );
}

function Hero2() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal h-[56px] leading-[28px] not-italic relative shrink-0 text-[#364153] text-[18px] text-nowrap tracking-[1.8px] uppercase w-full" data-name="Hero">
      <p className="absolute left-0 top-0">Design. Manufacture. Wear.</p>
      <p className="absolute left-0 top-[28px]">Every role. One system.</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[186px] items-start left-[-0.5px] pl-[10px] pr-0 py-0 top-[275.02px] w-[601px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e6c36a] border-[0px_0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <Hero1 />
      <Hero2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[241.42px] size-[24px] top-[3.39px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, #0B0D10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 5L19 12L12 19" id="Vector_2" stroke="var(--stroke-0, #0B0D10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[30.797px] left-0 top-[509.22px] w-[265.422px]" data-name="Button">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30.8px] left-[113px] not-italic text-[#0b0d10] text-[22px] text-center text-nowrap top-px tracking-[2.2px] translate-x-[-50%] uppercase">Be a Black Star</p>
      <Icon />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents inset-[22.86%_17.14%_22.67%_17.5%]" data-name="11">
      <div className="absolute inset-[22.86%_17.14%_22.67%_17.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 251 210">
          <path d={svgPaths.p25f41500} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[384px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Component1 />
      <div className="absolute flex inset-[36.98%_38.54%_40.96%_44.53%] items-center justify-center">
        <Icon1Text text="a" additionalClassNames="rotate-[20.691deg] w-[41.164px]" />
      </div>
      <div className="absolute flex inset-[59.11%_63.69%_19.39%_21.09%] items-center justify-center">
        <Icon1Text text="l" additionalClassNames="rotate-[19.471deg] w-[35.462px]" />
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-96px] size-[384px] top-[-64px]" data-name="Component2">
      <Icon1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[30.408px] relative w-[73.476px]" data-name="Paragraph">
      <p className="absolute font-['Edwardian_Script_ITC:Regular',sans-serif] leading-[normal] left-[-48.84px] not-italic text-[64px] text-black text-nowrap top-[-40.17px]">k</p>
    </div>
  );
}

function Paragraph1() {
  return <div className="h-[73.172px] w-[35.462px]" data-name="Paragraph" />;
}

function Paragraph2() {
  return (
    <div className="h-[22.445px] relative w-[72.414px]" data-name="Paragraph">
      <p className="absolute font-['Edwardian_Script_ITC:Regular',sans-serif] leading-[normal] left-[-145.34px] not-italic text-[64px] text-black text-nowrap top-[47.62px]">c</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[68.613px] items-start relative w-[62.346px]" data-name="Paragraph">
      <p className="basis-0 font-['Edwardian_Script_ITC:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[64px] text-black">B</p>
    </div>
  );
}

function Paragraph4() {
  return <div className="h-[63.996px] w-[41.164px]" data-name="Paragraph" />;
}

function Logo() {
  return (
    <div className="absolute left-[788.5px] size-[256px] top-[240.02px]" data-name="Logo">
      <Component />
      <div className="absolute flex h-[76.91px] items-center justify-center left-[17.4px] top-[-53.95px] w-[40.056px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[277.764deg]">
          <Paragraph />
        </div>
      </div>
      <div className="absolute flex h-[80.045px] items-center justify-center left-[3.16px] top-[67px] w-[53.967px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[15.726deg]">
          <Paragraph1 />
        </div>
      </div>
      <div className="absolute flex h-[73.985px] items-center justify-center left-[72.3px] top-[7.96px] w-[28.197px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[265.387deg]">
          <Paragraph2 />
        </div>
      </div>
      <div className="absolute flex h-[80.977px] items-center justify-center left-[134px] top-[10px] w-[76.297px]" style={{ "--transform-inner-width": "42.6875", "--transform-inner-height": "74" } as React.CSSProperties}>
        <div className="flex-none rotate-[13.124deg]">
          <Paragraph3 />
        </div>
      </div>
      <div className="absolute flex h-[74.413px] items-center justify-center left-[33.76px] top-[33.97px] w-[61.121px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[20.691deg]">
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[540.016px] left-[69.5px] top-[68.98px] w-[896px]" data-name="Container">
      <Heading />
      <Container />
      <Button />
      <Logo />
    </div>
  );
}

export default function Hero3() {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] relative size-full to-[#4a5565] via-50% via-[#e5e7eb]" data-name="Hero">
      <Container1 />
    </div>
  );
}