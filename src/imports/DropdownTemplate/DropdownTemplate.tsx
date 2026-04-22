import svgPaths from "./svg-khlqyyvdex";

export default function DropdownTemplate() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_4px_16px_0px_rgba(104,107,139,0.16),0px_1px_4px_0px_rgba(104,107,139,0.16)] size-full" data-name="Dropdown template">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Drop-down list">
        <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Dropdown list item">
          <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative size-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
                  <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#14142a] text-[16px] w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Norsk Bokmål
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ecf4fd] h-[48px] relative shrink-0 w-full" data-name="Dropdown list item">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
                  <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#14142a] text-[16px] w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    English
                  </p>
                </div>
              </div>
              <div className="relative shrink-0 size-[24px]" data-name="Checkmark">
                <div className="absolute inset-[27.08%_18.75%_27.08%_14.58%]" data-name="Union">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 10.9999">
                    <path d={svgPaths.p237d7e00} fill="var(--fill-0, #14142A)" id="Union" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}