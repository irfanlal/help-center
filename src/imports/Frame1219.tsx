import imgBackgroundWithWhiteRoundLines1 from "figma:asset/c99f402049ec91eb478a7c40951d19794ac317b5.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[2803px] left-0 top-0 w-[4096px]" data-name="background-with-white-round-lines 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackgroundWithWhiteRoundLines1} />
      </div>
      <div className="absolute bg-[#147ae8] h-[2803px] left-0 mix-blend-multiply top-0 w-[4096px]" />
    </div>
  );
}