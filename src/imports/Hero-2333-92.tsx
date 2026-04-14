import svgPaths from "./svg-ba4sac7c1z";

function Component() {
  return (
    <div className="absolute contents inset-[17.5%_17.14%_17.14%_17.5%]" data-name="11">
      <div className="absolute inset-[17.5%_17.14%_17.14%_17.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 202.174 168.474">
          <path d={svgPaths.p10843180} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[257.775px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Component />
    </div>
  );
}

export default function Hero() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Hero">
      <Icon />
    </div>
  );
}