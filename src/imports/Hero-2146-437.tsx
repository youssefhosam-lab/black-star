import svgPaths from "./svg-pqpjllnovh";

function Hero() {
  return <div className="absolute h-[97.025px] left-[-53.9px] top-[-0.8px] w-[175.075px]" data-name="Hero" />;
}

function Hero1() {
  return <div className="absolute h-[97.025px] left-[-39.2px] top-[58.19px] w-[605.063px]" data-name="Hero" />;
}

function Container() {
  return (
    <div className="absolute h-[194.05px] left-[40px] top-[50px] w-[716.8px]" data-name="Container">
      <Hero />
      <Hero1 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute h-[257.785px] left-[370px] top-[108px] w-[309.342px]" data-name="11">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 309.342 257.785">
        <g id="11">
          <path d={svgPaths.p267ca180} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute contents left-[370px] top-[108px]" data-name="logo">
      <Component />
      <div className="absolute flex h-[62.304px] items-center justify-center left-[425px] top-[135px] w-[150.543px]" style={{ "--transform-inner-width": "20", "--transform-inner-height": "45" } as React.CSSProperties}>
        <div className="flex-none rotate-[277.764deg]">
          <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[146.078px] leading-[normal] not-italic relative text-[40px] text-black w-[42.964px]">k</p>
        </div>
      </div>
      <div className="absolute flex h-[149.493px] items-center justify-center left-[410.14px] top-[271.22px] w-[78.397px]" style={{ "--transform-inner-width": "8.890625", "--transform-inner-height": "45" } as React.CSSProperties}>
        <div className="flex-none rotate-[18.253deg]">
          <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[146.078px] leading-[normal] not-italic relative text-[40px] text-black w-[34.371px]">l</p>
        </div>
      </div>
      <div className="absolute flex h-[140.57px] items-center justify-center left-[551px] top-[147px] w-[127.736px]" style={{ "--transform-inner-width": "26.6875", "--transform-inner-height": "45" } as React.CSSProperties}>
        <div className="flex-none rotate-[13.124deg]">
          <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[120.3px] leading-[normal] not-italic relative text-[40px] text-black w-[103.114px]">B</p>
        </div>
      </div>
      <div className="absolute flex h-[131.131px] items-center justify-center left-[484px] top-[206px] w-[84.356px]" style={{ "--transform-inner-width": "22.25", "--transform-inner-height": "45" } as React.CSSProperties}>
        <div className="flex-none rotate-[20.691deg]">
          <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[123.77px] leading-[normal] not-italic relative text-[40px] text-black w-[43.426px]">a</p>
        </div>
      </div>
      <div className="absolute flex h-[46.008px] items-center justify-center left-[560px] top-[260px] w-[148.369px]" style={{ "--transform-inner-width": "20", "--transform-inner-height": "45" } as React.CSSProperties}>
        <div className="flex-none rotate-[265.387deg]">
          <p className="font-['Edwardian_Script_ITC:Regular',sans-serif] h-[146.078px] leading-[normal] not-italic relative text-[40px] text-black w-[34.371px]">c</p>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[370px] top-[108px]">
      <Logo />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[432.012px] left-[150px] top-[123px] w-[716.8px]" data-name="Container">
      <Container />
      <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[121.284px] left-[45px] text-[#0b0d10] text-[134.76px] text-nowrap top-[209px] tracking-[-6.738px]">STAR</p>
      <p className="absolute font-['Playfair_Display:Bold',sans-serif] font-bold leading-[121.284px] left-[-48px] text-[#0b0d10] text-[134.76px] text-nowrap top-[101px] tracking-[-6.738px]">{`BLACK `}</p>
      <Group />
      <p className="absolute font-['Inter:Light',sans-serif] font-light leading-[53.333px] left-[145px] not-italic text-[#0b0d10] text-[48px] text-nowrap top-[359px]">Fashion, without illusion.</p>
    </div>
  );
}

export default function Hero2() {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] relative size-full to-[#4a5565] via-50% via-[#e5e7eb]" data-name="Hero">
      <Container1 />
    </div>
  );
}