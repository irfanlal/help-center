import { useState, useEffect, useRef } from "react";
import { Quantum360Icon } from "./Quantum360Icon";
import { MicrosoftIcon } from "./MicrosoftIcon";
import { LanguagePickerIcon } from "./LanguagePickerIcon";
import { LanguageDropdown } from "./LanguageDropdown";

export function LoginToggleButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem("isLoggedIn");
    return stored === "true";
  });
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLanguageClick = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  return (
    <div className="hidden sm:flex gap-[8px] items-center shrink-0">
      {/* Language picker button */}
      <button
        ref={languageButtonRef}
        onClick={handleLanguageClick}
        className="bg-white p-[4px] rounded-[4px] border border-[#d9dbe9] transition-colors hover:bg-[#F7F7FC] relative shrink-0"
      >
        <LanguagePickerIcon />
      </button>

      <LanguageDropdown
        isOpen={isLanguageDropdownOpen}
        onClose={() => setIsLanguageDropdownOpen(false)}
        buttonRef={languageButtonRef}
      />

      {/* Login/Open Q360 button */}
      <button onClick={handleLoginClick} className="relative shrink-0">
        <div className="flex gap-[8px] items-center pl-[4px] pr-[10px] py-[4px] rounded-[4px] border border-[#d9dbe9] bg-white transition-colors hover:bg-[#F7F7FC]">
          {isLoggedIn ? (
            <>
              <Quantum360Icon />
              <p className="font-medium leading-[16px] text-[#147ae8] text-[14px] tracking-[1px] whitespace-nowrap">
                Open Q360
              </p>
            </>
          ) : (
            <>
              <MicrosoftIcon />
              <p className="font-medium leading-[16px] text-[#147ae8] text-[14px] tracking-[1px] whitespace-nowrap">
                Login
              </p>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
