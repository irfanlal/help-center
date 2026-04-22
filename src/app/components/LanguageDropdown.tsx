import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const languages = [
  { code: "nb", name: "Norsk Bokmål" },
  { code: "en", name: "English" },
];

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export function LanguageDropdown({ isOpen, onClose, buttonRef }: LanguageDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const stored = localStorage.getItem("selectedLanguage");
    return stored || "en";
  });
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen, buttonRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        const dropdown = document.getElementById("language-dropdown");
        if (dropdown && !dropdown.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose, buttonRef]);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    localStorage.setItem("selectedLanguage", code);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      id="language-dropdown"
      className="bg-white flex flex-col items-start overflow-clip py-[8px] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(104,107,139,0.16),0px_1px_4px_0px_rgba(104,107,139,0.16)] fixed z-50 w-[200px]"
      style={{ top: `${position.top}px`, right: `${position.right}px` }}
    >
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          className={`h-[48px] w-full ${
            selectedLanguage === language.code ? "bg-[#ecf4fd]" : "bg-white hover:bg-[#f7f7fc]"
          }`}
        >
          <div className="flex items-center px-[16px] py-[12px] size-full">
            <div className="flex flex-1 items-center gap-[8px] min-w-0">
              <p className="font-normal leading-[24px] text-[#14142a] text-[16px] flex-1 text-left">
                {language.name}
              </p>
            </div>
            {selectedLanguage === language.code && (
              <div className="relative shrink-0 size-[24px]">
                <div className="absolute inset-[27.08%_18.75%_27.08%_14.58%]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 10.9999">
                    <path d="M15.1464 0.146446C15.3417 -0.0488155 15.6582 -0.0488155 15.8535 0.146446C16.0487 0.341709 16.0487 0.658216 15.8535 0.853478L5.85348 10.8535C5.65822 11.0487 5.34171 11.0487 5.14645 10.8535L0.146447 5.85348C-0.0488155 5.65822 -0.0488155 5.34171 0.146447 5.14645C0.341709 4.95118 0.658216 4.95118 0.853478 5.14645L5.49996 9.79293L15.1464 0.146446Z" fill="#14142A" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>,
    document.body
  );
}
