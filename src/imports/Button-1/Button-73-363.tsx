function Microsoft() {
  return (
    <div className="absolute contents inset-[15.63%]" data-name="microsoft">
      <div className="absolute bg-[#feba08] inset-[53.13%_15.63%_15.63%_53.13%]" data-name="yeloow" />
      <div className="absolute bg-[#05a6f0] inset-[53.13%_53.13%_15.63%_15.63%]" data-name="blue" />
      <div className="absolute bg-[#80bc06] inset-[15.63%_15.63%_53.13%_53.13%]" data-name="green" />
      <div className="absolute bg-[#f25325] inset-[15.63%_53.13%_53.13%_15.63%]" data-name="red" />
    </div>
  );
}

export default function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center pl-[6px] pr-[12px] py-[6px] relative rounded-[4px] size-full" data-name="Button">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="microsoft">
        <Microsoft />
      </div>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#147ae8] text-[14px] tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Login
      </p>
    </div>
  );
}