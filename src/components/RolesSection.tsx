import React from 'react';
import svgPaths from "../imports/svg-ktwi3m8apt";

type RolesListItemTextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function RolesListItemTextText({ text, additionalClassNames = "" }: RolesListItemTextTextProps) {
  return (
    <div className={`absolute h-[23.4px] left-0 ${additionalClassNames}`}>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] text-nowrap top-[-2.2px]">{text}</p>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphText({ text, additionalClassNames = "" }: ParagraphTextProps) {
  return (
    <div className={`absolute content-stretch flex h-[27.717px] items-start ${additionalClassNames}`}>
      <p className="font-['Arial:Bold',sans-serif] leading-[30.8px] not-italic relative shrink-0 text-[#0b0b0b] text-[22px] text-nowrap">{text}</p>
    </div>
  );
}

function RolesStar() {
  return <div className="absolute h-[291.6px] left-[385.2px] top-[232.2px] w-[303.3px]" data-name="RolesStar" />;
}

function StarShape() {
  return (
    <div className="absolute inset-[17.5%_17.14%_17.14%_17.5%]" data-name="11">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 294 275">
        <g id="11">
          <path d={svgPaths.p2fb3c200} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function StarContainer() {
  return (
    <div className="absolute h-[419.688px] left-[334px] overflow-clip top-[232px] w-[448.985px]" data-name="Icon">
      <StarShape />
    </div>
  );
}

function BrandSeparator() {
  return <div className="absolute border-[0px_0px_2px] border-[rgba(0,0,0,0)] border-solid h-[36.717px] left-0 top-0 w-[108.942px]" data-name="Container" />;
}

function RolesBrandHeader() {
  return (
    <div className="absolute h-[36.717px] left-[-20.7px] top-[55.8px] w-[108.942px]" data-name="RolesBrandHeader">
      <BrandSeparator />
      <ParagraphText text="Local Brand" additionalClassNames="left-0 top-0 w-[108.942px]" />
    </div>
  );
}

function RolesListItemLong() {
  return (
    <div className="absolute h-[46.8px] left-0 top-[73.8px] w-[121.5px]" data-name="RolesListItemLong">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-2.2px] w-[121px]">Works directly with production</p>
    </div>
  );
}

function RolesBrandList() {
  return (
    <div className="absolute h-[122.4px] left-[-13.5px] top-[92.7px] w-[161.1px]" data-name="RolesBrandList">
      <RolesListItemTextText text="Designs collections" additionalClassNames="top-[-1.8px] w-[121.219px]" />
      <RolesListItemTextText text="Manages products" additionalClassNames="top-[36px] w-[117.984px]" />
      <RolesListItemLong />
    </div>
  );
}

function RolesBrandSection() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid inset-[44.59%_2.54%_2.19%_77.96%]" data-name="RolesBrandSection">
      <RolesBrandHeader />
      <RolesBrandList />
    </div>
  );
}

function CustomerSeparator() {
  return <div className="absolute border-[0px_0px_2px] border-[rgba(0,0,0,0)] border-solid h-[36.9px] left-0 top-0 w-[97.2px]" data-name="Container" />;
}

function RolesCustomerHeader() {
  return (
    <div className="absolute h-[36.9px] left-[52.2px] top-[42.3px] w-[97.2px]" data-name="RolesCustomerHeader">
      <CustomerSeparator />
      <ParagraphText text="Customer" additionalClassNames="left-0 top-0 w-[89.508px]" />
    </div>
  );
}

function RolesCustomerList() {
  return (
    <div className="absolute h-[99px] left-[28.8px] top-[86.4px] w-[161.1px]" data-name="RolesCustomerList">
      <RolesListItemTextText text="Designs garments" additionalClassNames="top-[-1.8px] w-[113.794px]" />
      <RolesListItemTextText text="Selects manufacturers" additionalClassNames="top-[36px] w-[138.98px]" />
      <RolesListItemTextText text="Tracks production" additionalClassNames="top-[73.8px] w-[112.641px]" />
    </div>
  );
}

function RolesCustomerSection() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[266.839px] left-[437px] top-[38px] w-[262.463px]" data-name="RolesCustomerSection">
      <RolesCustomerHeader />
      <RolesCustomerList />
    </div>
  );
}

function RolesListItemManufacturer() {
  return (
    <div className="absolute h-[46.8px] left-0 top-[36px] w-[128.7px]" data-name="RolesListItemManufacturer">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-2.2px] w-[129px]">Defines services and capacity</p>
    </div>
  );
}

function RolesManufacturerList() {
  return (
    <div className="absolute h-[122.4px] left-[58.5px] top-[50.4px] w-[161.1px]" data-name="RolesManufacturerList">
      <RolesListItemTextText text="Accepts production jobs" additionalClassNames="top-[-1.8px] w-[154.111px]" />
      <RolesListItemManufacturer />
      <RolesListItemTextText text="Operates transparently" additionalClassNames="top-[97.2px] w-[144.942px]" />
    </div>
  );
}

function RolesManufacturerSection() {
  return (
    <div className="absolute border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[252.59px] left-[120px] top-[342px] w-[325.081px]" data-name="RolesManufacturerSection">
      <ParagraphText text="Manufacturer" additionalClassNames="left-[85.5px] top-[22.5px] w-[127.392px]" />
      <RolesManufacturerList />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[120px] top-[38px]">
      <StarContainer />
      <RolesBrandSection />
      <RolesCustomerSection />
      <RolesManufacturerSection />
    </div>
  );
}

function RolesListItemModel() {
  return (
    <div className="absolute h-[46.8px] left-0 top-[-1.8px] w-[143.1px]" data-name="RolesListItemModel">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#0b0b0b] text-[16px] top-[-2.2px] w-[143px]">Maintains professional profile</p>
    </div>
  );
}

function RolesModelList() {
  return (
    <div className="absolute h-[122.4px] left-[28.8px] top-[98.1px] w-[162px]" data-name="RolesModelList">
      <RolesListItemModel />
      <RolesListItemTextText text="Participates in campaigns" additionalClassNames="top-[59.4px] w-[160.65px]" />
      <RolesListItemTextText text="Connects with brands" additionalClassNames="top-[97.2px] w-[137.18px]" />
    </div>
  );
}

function RolesModelSection() {
  return (
    <div className="absolute h-[242px] left-[462px] top-[615px] w-[217px]" data-name="RolesModelSection">
      <ParagraphText text="Model" additionalClassNames="left-[54px] top-[45.9px] w-[59.653px]" />
      <RolesModelList />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[13.43px] relative w-[7.627px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g clipPath="url(#clip0_2010_70)" id="Icon">
          <path d={svgPaths.p24c01100} fill="var(--fill-0, black)" id="Arrow 1" />
        </g>
        <defs>
          <clipPath id="clip0_2010_70">
            <rect fill="white" height="13.4297" width="7.62726" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute border border-black border-solid h-[21px] left-0 rounded-[999px] top-0 w-[142px]" data-name="Container">
      <div className="absolute flex h-[13.489px] items-center justify-center left-[119px] top-[2px] w-[7.732px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.55deg]">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[15.75px] left-[12.84px] top-[2.48px] w-[94.936px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[47.5px] not-italic text-[14px] text-black text-center text-nowrap top-[-1.9px] translate-x-[-50%]">Choose your role</p>
    </div>
  );
}

function Container3() {
  return <div className="h-[13.306px] shrink-0 w-full" data-name="Container" />;
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[0.007px] items-start pb-0 pl-[-5.775px] pr-[-0.952px] pt-[-6.63px] relative w-[0.9px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function RolesBanner() {
  return (
    <div className="absolute h-[21px] left-[140px] rounded-[999px] top-[17px] w-[142px]" data-name="RolesBanner">
      <Container2 />
      <Paragraph />
      <div className="absolute flex h-[0.014px] items-center justify-center left-[114.97px] top-[10.34px] w-[0.9px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.55deg]">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function RolesContainer() {
  return (
    <div className="absolute bg-[#fafafa] h-[684px] left-[25px] top-[72.23px] w-[1004.4px]" data-name="Container">
      <RolesStar />
      <Group />
      <RolesModelSection />
      <RolesBanner />
    </div>
  );
}

function RolesTitle() {
  return (
    <div className="absolute h-[108px] left-[25px] top-[-11.77px] w-[202.542px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[120px] left-[101px] not-italic text-[96px] text-black text-center text-nowrap top-[-8.6px] translate-x-[-50%]">Roles</p>
    </div>
  );
}

export default function RolesSection() {
  return (
    <div className="bg-[#fafafa] relative size-full" data-name="Section">
      <RolesContainer />
      <RolesTitle />
    </div>
  );
}
