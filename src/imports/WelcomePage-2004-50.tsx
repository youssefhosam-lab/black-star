import clsx from "clsx";
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
type AboutTextProps = {
  text: string;
  additionalClassNames?: string;
};

function AboutText({ text, additionalClassNames = "" }: AboutTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[40.797px] items-start left-[32px] pb-[10px] pt-0 px-0 top-[32px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Arial:Bold',sans-serif] leading-[30.8px] not-italic relative shrink-0 text-[#0b0b0b] text-[22px] text-nowrap">{text}</p>
    </div>
  );
}

function About() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[110px] items-start left-[32px] top-[112.8px] w-[179px]" data-name="About">
      <ListItemText text="Designs garments" />
      <ListItemText text="Selects manufacturers" />
      <ListItemText text="Tracks production" />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[280.797px] left-[105px] top-[261px] w-[244px]" data-name="Container">
      <AboutText text="Customer" additionalClassNames="w-[99.453px]" />
      <About />
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

function About1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[136px] items-start left-[32px] top-[112.8px] w-[179px]" data-name="About">
      <ListItemText text="Designs collections" />
      <ListItemText text="Manages products" />
      <ListItem />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[280.797px] left-[349px] top-[261px] w-[244px]" data-name="Container">
      <AboutText text="Local Brand" additionalClassNames="w-[121.047px]" />
      <About1 />
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

function About2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[136px] items-start left-[32px] top-[112.8px] w-[179px]" data-name="About">
      <ListItemText text="Accepts production jobs" />
      <ListItem1 />
      <ListItemText text="Operates transparently" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[280.797px] left-[593px] top-[261px] w-[244px]" data-name="Container">
      <AboutText text="Manufacturer" additionalClassNames="w-[141.547px]" />
      <About2 />
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

function About3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[136px] items-start left-[32px] top-[112.8px] w-[180px]" data-name="About">
      <ListItem2 />
      <ListItemText text="Participates in campaigns" />
      <ListItemText text="Connects with brands" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[280.797px] left-[837px] top-[261px] w-[244px]" data-name="Container">
      <AboutText text="Model" additionalClassNames="w-[66.281px]" />
      <About3 />
    </div>
  );
}

function About4() {
  return (
    <div className="bg-[#fafafa] h-[583px] relative shrink-0 w-[1116px]" data-name="About">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[37.333px] left-[558px] not-italic text-[#0b0b0b] text-[28px] text-center top-[96px] translate-x-[-50%] w-[848px]">Black Star is infrastructure, not a marketplace.</p>
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
      <About4 />
    </div>
  );
}