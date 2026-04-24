import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { Search } from "lucide-react";
import { articles, categoryI18nKeys, type Article } from "@/app/data/articles";
import { SparkleIcon } from "./SparkleIcon";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  variant?: "large" | "small";
  useBorder?: boolean;
}

export function SearchBar({ className, inputClassName, placeholder = "Search for articles or ask a question", variant = "large", useBorder = false }: SearchBarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getTranslatedTitle = (article: Article) =>
    article.i18nKey ? (t(`${article.i18nKey}.title`) as string) : article.title;

  const getTranslatedCategory = (category: string) =>
    categoryI18nKeys[category] ? (t(categoryI18nKeys[category]) as string) : category;

  const getSearchableText = (article: Article): string => {
    if (article.i18nKey) {
      const title = t(`${article.i18nKey}.title`) as string;
      const description = t(`${article.i18nKey}.description`) as string;
      const steps = t(`${article.i18nKey}.steps`, { returnObjects: true });
      const tips = t(`${article.i18nKey}.tips`, { returnObjects: true });
      const stepsText = Array.isArray(steps) ? steps.join(' ') : '';
      const tipsText = Array.isArray(tips) ? tips.join(' ') : '';
      return `${title} ${description} ${stepsText} ${tipsText}`;
    }
    const contentText = article.content ? article.content.replace(/<[^>]*>/g, '') : '';
    return `${article.title} ${contentText}`;
  };

  const getContentPreview = (article: Article): string => {
    if (article.i18nKey) {
      const description = t(`${article.i18nKey}.description`) as string;
      return description.length > 120 ? description.substring(0, 120) + '...' : description;
    }
    const plainText = (article.content ?? '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
  };

  // Filter articles based on search query against translated content
  const searchResults = searchQuery.trim()
    ? articles.filter(article => {
        const query = searchQuery.toLowerCase();
        const searchText = getSearchableText(article).toLowerCase();
        const categoryText = getTranslatedCategory(article.category).toLowerCase();
        return searchText.includes(query) || categoryText.includes(query);
      }).slice(0, 5)
    : [];

  // Update dropdown position
  const updateDropdownPosition = () => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // Check if click is outside both the search input AND the dropdown
      if (
        searchRef.current && 
        !searchRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show dropdown when there are results
  useEffect(() => {
    if (searchResults.length > 0) {
      updateDropdownPosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchResults.length]);

  // Update position on scroll and resize
  useEffect(() => {
    if (isOpen) {
      const handleUpdate = () => updateDropdownPosition();
      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);
      
      return () => {
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }
  }, [isOpen]);

  const isLarge = variant === "large";

  return (
    <div
      ref={searchRef}
      className={`relative bg-white flex items-center overflow-clip ${
        useBorder ? "border border-[#d9dbe9]" : "shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]"
      } ${
        isLarge
          ? "h-[60px] rounded-[46px] pl-[48px] pr-[12px] py-[16px] max-w-[720px]"
          : "h-[44px] rounded-[24px] pl-[40px] pr-[8px] py-[10px]"
      } ${className || ''}`}
    >
      <Search className={`absolute text-[#9497B1] pointer-events-none ${isLarge ? "left-[16px] size-[20px]" : "left-[12px] size-[18px]"}`} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          if (searchResults.length > 0) setIsOpen(true);
        }}
        className={`flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-[rgba(20,20,42,0.5)] ${
          isLarge ? "text-[16px]" : "text-[14px]"
        } ${inputClassName || ''}`}
      />

      {/* Ask AI Button */}
      <button
        onClick={() => navigate('/chat')}
        className={`bg-white flex gap-[8px] items-center justify-center relative shrink-0 transition-colors hover:bg-[#F7F7FC] ${
        isLarge ? "rounded-[20px] pl-[6px] pr-[12px] py-[6px]" : "rounded-[16px] pl-[4px] pr-[10px] py-[4px]"
      }`}>
        <div aria-hidden="true" className={`absolute border border-[#d9dbe9] border-solid inset-[-0.5px] pointer-events-none ${
          isLarge ? "rounded-[20.5px]" : "rounded-[16.5px]"
        }`} />
        {isLarge && <SparkleIcon />}
        {!isLarge && (
          <div className="overflow-clip relative shrink-0 size-[20px]">
            <div className="absolute inset-[4.17%_4.17%_7.29%_7.29%]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.25 21.25">
                <path d="M8.75 3.75C9.0037 3.75005 9.25173 3.82774 9.45996 3.97266C9.66829 4.11783 9.82705 4.32432 9.91504 4.5625L11.7373 9.50977L16.6875 11.334C16.9255 11.4219 17.1312 11.581 17.2764 11.7891C17.4215 11.9974 17.4999 12.2461 17.5 12.5C17.5 12.7539 17.4215 13.0016 17.2764 13.21C17.1312 13.4183 16.9257 13.5771 16.6875 13.665L11.7383 15.4883L9.91504 20.4375C9.82705 20.6757 9.66828 20.8812 9.45996 21.0264C9.25164 21.1715 9.00389 21.25 8.75 21.25C8.49606 21.2499 8.24741 21.1715 8.03906 21.0264C7.83096 20.8812 7.67188 20.6755 7.58398 20.4375L5.75977 15.4873L0.8125 13.665C0.574319 13.5771 0.367827 13.4183 0.222656 13.21C0.0777359 13.0017 4.84614e-05 12.7537 0 12.5C4.95832e-05 12.2461 0.077473 11.9974 0.222656 11.7891C0.367857 11.5807 0.574281 11.4219 0.8125 11.334L5.75977 9.50977L7.58398 4.5625L7.66309 4.38965C7.75462 4.22468 7.88292 4.08148 8.03906 3.97266C8.24741 3.82747 8.49606 3.75005 8.75 3.75ZM8.75 4.75C8.70051 4.75005 8.65194 4.76565 8.61133 4.79395C8.57084 4.82219 8.53965 4.86194 8.52246 4.9082L6.61914 10.0732C6.56851 10.2104 6.46039 10.3185 6.32324 10.3691L1.1582 12.2725C1.11193 12.2897 1.07219 12.3208 1.04395 12.3613C1.01565 12.4019 1.00005 12.4505 1 12.5C1.00005 12.5494 1.01577 12.5981 1.04395 12.6387C1.07217 12.679 1.11204 12.7104 1.1582 12.7275L6.32324 14.6299L6.41992 14.6787C6.51065 14.7369 6.58114 14.8238 6.61914 14.9268L8.52246 20.0908C8.53959 20.1372 8.57079 20.1777 8.61133 20.2061C8.6519 20.2343 8.70058 20.2499 8.75 20.25C8.79948 20.25 8.84807 20.2343 8.88867 20.2061C8.92928 20.1777 8.96039 20.1373 8.97754 20.0908L10.8799 14.9268L10.9287 14.8291C10.9869 14.7385 11.0739 14.6678 11.1768 14.6299L16.3408 12.7275C16.3873 12.7104 16.4277 12.6793 16.4561 12.6387C16.4843 12.5981 16.5 12.5495 16.5 12.5C16.4999 12.4506 16.4843 12.4019 16.4561 12.3613C16.4277 12.3208 16.3872 12.2896 16.3408 12.2725L11.1768 10.3691C11.0396 10.3185 10.9305 10.2105 10.8799 10.0732L8.97754 4.9082C8.96039 4.86204 8.92902 4.82218 8.88867 4.79395C8.84812 4.76577 8.79938 4.75005 8.75 4.75ZM19.25 5.25C19.5261 5.25 19.75 5.47386 19.75 5.75V6.75H20.75C21.0261 6.75 21.25 6.97386 21.25 7.25C21.25 7.52614 21.0261 7.75 20.75 7.75H19.75V8.75C19.75 9.02614 19.5261 9.25 19.25 9.25C18.9739 9.25 18.75 9.02614 18.75 8.75V7.75H17.75C17.4739 7.75 17.25 7.52614 17.25 7.25C17.25 6.97386 17.4739 6.75 17.75 6.75H18.75V5.75C18.75 5.47386 18.9739 5.25 19.25 5.25ZM14.75 0C15.0261 0 15.25 0.223858 15.25 0.5V2.25H17C17.2761 2.25 17.5 2.47386 17.5 2.75C17.5 3.02614 17.2761 3.25 17 3.25H15.25V5C15.25 5.27614 15.0261 5.5 14.75 5.5C14.4739 5.5 14.25 5.27614 14.25 5V3.25H12.5C12.2239 3.25 12 3.02614 12 2.75C12 2.47386 12.2239 2.25 12.5 2.25H14.25V0.5C14.25 0.223858 14.4739 0 14.75 0Z" fill="#147AE8" />
              </svg>
            </div>
          </div>
        )}
        <p className={`font-medium leading-[16px] text-[#147ae8] tracking-[1px] whitespace-nowrap ${
          isLarge ? "text-[14px]" : "text-[12px]"
        }`}>
          Ask AI
        </p>
      </button>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-card border border-border rounded-lg shadow-elevation-soft max-h-[400px] overflow-y-auto z-[100]"
            style={{
              top: `${dropdownPosition.top + 8}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {searchResults.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  onClick={() => {
                    setSearchQuery("");
                    setIsOpen(false);
                  }}
                  className="block p-4 hover:bg-secondary border-b border-border last:border-b-0 transition-colors"
                >
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {getTranslatedCategory(article.category)}
                    </div>
                    <div className="font-medium text-foreground mb-1">
                      {getTranslatedTitle(article)}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {getContentPreview(article)}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>,
          document.body
        )
      )}
    </div>
  );
}