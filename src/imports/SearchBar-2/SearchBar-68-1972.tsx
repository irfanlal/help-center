import svgPaths from "./svg-2eraqqub54";

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-[40px] overflow-clip top-[10.5px] w-[311.125px]" data-name="Text Input">
      <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(20,20,42,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        Search articles...
      </p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p126da180} id="Vector" stroke="var(--stroke-0, #9497B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M15.75 15.75L12.525 12.525" id="Vector_2" stroke="var(--stroke-0, #9497B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[32px] top-[6px] w-[40.875px]" data-name="Paragraph">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#147ae8] text-[12px] text-center tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Ask AI
      </p>
    </div>
  );
}

function Container() {
  return <div className="absolute border border-[#d9dbe9] border-solid h-[29px] left-[-0.5px] rounded-[16.5px] top-[-0.5px] w-[83.875px]" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="h-[17.719px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7188 17.7188">
        <path d={svgPaths.p39009f80} fill="var(--fill-0, #147AE8)" id="Vector" />
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col h-[17.719px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4px] overflow-clip pl-[1.453px] pr-[0.828px] pt-[0.828px] size-[20px] top-[4px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white h-[28px] left-[356.13px] rounded-[16px] top-[7px] w-[82.875px]" data-name="Button">
      <Paragraph />
      <Container />
      <Container1 />
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="bg-white border border-[#d9dbe9] border-solid overflow-clip relative rounded-[24px] size-full" data-name="SearchBar">
      <TextInput />
      <Icon />
      <Button />
    </div>
  );
}