import svgPaths from "./svg-gh948u88wd";

function About() {
  return (
    <div className="absolute font-['Arial:Bold',sans-serif] h-[240px] leading-[60px] left-0 not-italic text-[#0b0b0b] text-[48px] top-0 w-[584px]" data-name="About">
      <p className="absolute css-4hzbpn left-0 top-[-5.4px] w-[560px]">Black Star is not built for speed.</p>
      <p className="absolute css-4hzbpn left-0 top-[114.6px] w-[560px]">It is built for clarity, accountability, and craft.</p>
    </div>
  );
}

function About1() {
  return (
    <div className="absolute bg-[#0b0b0b] h-[60px] left-0 top-[272px] w-[213.575px]" data-name="About">
      <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[28px] left-[107px] not-italic text-[18px] text-center text-white top-[14.6px] translate-x-[-50%]">Enter the Platform</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-[109.85px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0b0b0b] text-[14px] top-[-1.2px]">© Black Star 2025</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.75px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0b0b0b] text-[14px] top-[-1.2px]">Instagram</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.75px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0b0b0b] text-[14px] top-[-1.2px]">Twitter</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[52.088px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0b0b0b] text-[14px] top-[-1.2px]">LinkedIn</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[20px] relative shrink-0 w-[203.588px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Link />
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function About2() {
  return (
    <div className="absolute content-stretch flex h-[52.8px] items-start justify-between left-0 pt-[32.8px] top-[380px] w-[584px]" data-name="About">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <Paragraph />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="col-[1] css-3foyfs relative row-[1] self-stretch shrink-0" data-name="Container">
      <About />
      <About1 />
      <About2 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0b0b0b] text-[12px] tracking-[1.2px] uppercase">Name</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="h-[40.8px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[64.787px] items-start left-0 top-0 w-[584px]" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0b0b0b] text-[12px] tracking-[1.2px] uppercase">Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="h-[40.8px] relative shrink-0 w-full" data-name="Email Input">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[64.787px] items-start left-0 top-[88.79px] w-[584px]" data-name="Container">
      <Label1 />
      <EmailInput />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0b0b0b] text-[12px] tracking-[1.2px] uppercase">Role</p>
    </div>
  );
}

function Option() {
  return (
    <div className="absolute bg-white left-[-675.2px] size-0 top-[-2976.19px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-3px] w-0">Customer</p>
    </div>
  );
}

function Option1() {
  return (
    <div className="absolute bg-white left-[-675.2px] size-0 top-[-2976.19px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-3px] w-0">Brand</p>
    </div>
  );
}

function Option2() {
  return (
    <div className="absolute bg-white left-[-675.2px] size-0 top-[-2976.19px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-3px] w-0">Manufacturer</p>
    </div>
  );
}

function Option3() {
  return (
    <div className="absolute bg-white left-[-675.2px] size-0 top-[-2976.19px]" data-name="Option">
      <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-3px] w-0">Other</p>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="h-[40.8px] relative shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[64.787px] items-start left-0 top-[177.57px] w-[584px]" data-name="Container">
      <Label2 />
      <Dropdown />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0b0b0b] text-[12px] tracking-[1.2px] uppercase">Message</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="h-[88.8px] relative shrink-0 w-full" data-name="Text Area">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[118.388px] items-start left-0 top-[266.36px] w-[584px]" data-name="Container">
      <Label3 />
      <TextArea />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[115.88px] size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[20px] left-0 top-[408.75px] w-[131.875px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Bold',sans-serif] leading-[20px] left-[50px] not-italic text-[#0b0b0b] text-[14px] text-center top-[-1.2px] tracking-[1.4px] translate-x-[-50%] uppercase">Contact us</p>
      <Icon />
    </div>
  );
}

function Form() {
  return (
    <div className="col-[2] css-3foyfs h-[428.75px] relative row-[1] shrink-0" data-name="Form">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Button />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[476.75px] relative shrink-0 w-[1280px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-[64px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] px-[24px] relative size-full">
        <Container1 />
        <Form />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center pl-[3.2px] pt-[0.8px] relative size-full" data-name="Section">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <Container6 />
    </div>
  );
}