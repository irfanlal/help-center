import svgPaths from "./svg-3wn2gdqfpj";

function TextInput() {
  return (
    <div className="absolute bg-white content-stretch flex h-[60px] items-center left-0 overflow-clip pl-[48px] pr-[12px] py-[16px] rounded-[46px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] top-0 w-[720px]" data-name="Text Input">
      <p className="flex-[1_0_0] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px relative text-[16px] text-[rgba(20,20,42,0.5)]" style={{ fontVariationSettings: "'opsz' 9" }}>
        Search for articles or ask a question
      </p>
      <div className="bg-white content-stretch flex gap-[8px] items-center justify-center pl-[6px] pr-[12px] py-[6px] relative rounded-[20px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#d9dbe9] border-solid inset-[-0.5px] pointer-events-none rounded-[20.5px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="sparkle">
          <div className="absolute inset-[4.17%_4.17%_7.29%_7.29%]" data-name="Union">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.25 21.25">
              <path d={svgPaths.p38cc6500} fill="var(--fill-0, #147AE8)" id="Union" />
            </svg>
          </div>
        </div>
        <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#147ae8] text-[14px] tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          Ask AI
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="-translate-y-1/2 absolute left-[16px] size-[20px] top-1/2" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #9497B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #9497B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="relative rounded-[48px] size-full" data-name="SearchBar">
      <TextInput />
      <Icon />
    </div>
  );
}