import svgPaths from "./svg-wnvdpku0ci";
type ListItemTextProps = {
  text: string;
};

function ListItemText({ text }: ListItemTextProps) {
  return (
    <div className="h-[26px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] text-nowrap top-[-2px]">{text}</p>
    </div>
  );
}

function Banner() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[23px] items-center justify-center left-[962px] px-[16px] py-0 rounded-[999px] top-[724px] w-[143px]" data-name="Banner">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.25] not-italic relative shrink-0 text-[14px] text-black text-center text-nowrap">Choose your role</p>
      <div className="basis-0 flex grow h-[0.008px] items-center justify-center min-h-px min-w-px relative shrink-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.55deg] w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-7.36px_-100%_-7.36px_-636.4%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 15">
                <path d={svgPaths.p2dceadc0} fill="var(--stroke-0, black)" id="Arrow 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute h-[324px] left-[428px] top-[258px] w-[337px]" data-name="11">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 337 324">
        <g id="11">
          <path d={svgPaths.p7b28b00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function About() {
  return (
    <div className="absolute content-stretch flex h-[41px] items-start left-[58px] pb-[10px] pt-0 px-0 top-[47px] w-[108px]" data-name="About">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Arial:Bold',sans-serif] leading-[30.8px] not-italic relative shrink-0 text-[#0b0b0b] text-[22px] text-nowrap">Customer</p>
    </div>
  );
}

function About1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[110px] items-start left-[32px] top-[96px] w-[179px]" data-name="About">
      <ListItemText text="Designs garments" />
      <ListItemText text="Selects manufacturers" />
      <ListItemText text="Tracks production" />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[206px] left-[487px] top-[109px] w-[197px]" data-name="Container">
      <About />
      <About1 />
    </div>
  );
}

function About2() {
  return (
    <div className="absolute content-stretch flex h-[40.797px] items-start left-[-23px] pb-[10px] pt-0 px-0 top-[62px] w-[121.047px]" data-name="About">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Arial:Bold',sans-serif] leading-[30.8px] not-italic relative shrink-0 text-[#0b0b0b] text-[22px] text-nowrap">Local Brand</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-2px] w-[135px]">Works directly with production</p>
    </div>
  );
}

function About3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[136px] items-start left-[-15px] top-[103px] w-[179px]" data-name="About">
      <ListItemText text="Designs collections" />
      <ListItemText text="Manages products" />
      <ListItem />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[281px] left-[740px] top-[339px] w-[147px]" data-name="Container">
      <About2 />
      <About3 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-2px] w-[143px]">Defines services and capacity</p>
    </div>
  );
}

function About4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[136px] items-start left-[65px] top-[56px] w-[179px]" data-name="About">
      <ListItemText text="Accepts production jobs" />
      <ListItem1 />
      <ListItemText text="Operates transparently" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[195px] left-[243px] top-[374px] w-[244px]" data-name="Container">
      <p className="absolute font-['Arial:Bold',sans-serif] leading-[30.8px] left-[95px] not-italic text-[#0b0b0b] text-[22px] text-nowrap top-[25px]">Manufacturer</p>
      <About4 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-2px] w-[159px]">Maintains professional profile</p>
    </div>
  );
}

function About5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[136px] items-center justify-between right-[32px] top-[109px] w-[180px]" data-name="About">
      <ListItem2 />
      <ListItemText text="Participates in campaigns" />
      <ListItemText text="Connects with brands" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[280.797px] left-[509px] top-[479px] w-[244px]" data-name="Container">
      <p className="absolute font-['Arial:Bold',sans-serif] leading-[30.8px] left-[60px] not-italic text-[#0b0b0b] text-[22px] text-nowrap top-[51px]">Model</p>
      <About5 />
    </div>
  );
}

function About6() {
  return (
    <div className="bg-[#fafafa] h-[760px] relative shrink-0 w-[1116px]" data-name="About">
      <Banner />
      <Component />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.25] left-[203.5px] not-italic text-[64px] text-black text-center text-nowrap top-[13px] translate-x-[-50%]">Roles</p>
      <Container />
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

export default function WelcomePage() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] items-start relative size-full to-[#4a5565] via-50% via-[#e5e7eb]" data-name="WelcomePage">
      <About6 />
    </div>
  );
}