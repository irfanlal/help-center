import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, ChevronRight } from "lucide-react";
import { articles, categories, categoryI18nKeys } from "@/app/data/articles";
import Quantum360Logo from "@/imports/Quantum360Logo-45-29";
import illustrationImage from "figma:asset/89895aecadff518547a32e4207f6b085fec9ea31.png";
import speechBubbleImage from "figma:asset/874a11895e6cb0645342f747598bf4b4a6432060.png";
import backgroundImage from "figma:asset/5cb354acd7cc77f3edcd208b2407f7180d152b67.png";
import { SearchBar } from "./SearchBar";
import { LoginToggleButton } from "./LoginToggleButton";
import { useTranslation } from "react-i18next";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  const getTranslatedTitle = (article: (typeof articles)[0]) =>
    article.i18nKey ? (t(`${article.i18nKey}.title`) as string) : article.title;

  const getTranslatedCategory = (category: string) =>
    categoryI18nKeys[category] ? (t(categoryI18nKeys[category]) as string) : category;

  const filteredArticles = searchQuery
    ? articles.filter(article => {
        const title = getTranslatedTitle(article).toLowerCase();
        const category = getTranslatedCategory(article.category).toLowerCase();
        const query = searchQuery.toLowerCase();
        return title.includes(query) || category.includes(query);
      })
    : articles;

  const articlesByCategory = categories.map(category => ({
    category,
    articles: filteredArticles.filter(article => article.category === category)
  })).filter(group => group.articles.length > 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border h-[80px]">
        <div className="w-full px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between gap-4 h-full">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-[135px] h-[35px] sm:w-[169px] sm:h-[44px]">
                <Quantum360Logo />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <LoginToggleButton />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with Search */}
        <section className="text-primary-foreground py-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt="" 
              className="absolute w-full pointer-events-none object-cover"
              style={{ 
                top: '-20%',
                height: '140%',
                transform: `translateY(${scrollY * 0.5}px)` 
              }}
              aria-hidden="true"
            />
          </div>
          
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h1 className="mb-8 text-center text-[32px] drop-shadow-md font-bold">{t('ui.heroTitle')}</h1>

            {/* Search Bar */}
            <SearchBar
              variant="large"
              placeholder={t('ui.searchPlaceholder')}
              className="w-full"
            />
          </div>
        </section>

        {/* All Articles by Category */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="mb-8" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.4', color: 'var(--foreground)' }}>
            {searchQuery ? t('ui.searchResults') : t('ui.browseByCategory')}
          </h3>
          
          {articlesByCategory.length === 0 ? (
            <div className="bg-card p-12 rounded-lg border border-border text-center">
              <p className="text-muted-foreground">No articles found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlesByCategory.map(({ category, articles }) => (
                <div key={category} className="bg-card rounded-[16px] border border-border overflow-hidden flex flex-col pb-2">
                  <div className="px-5 pt-5 pb-3">
                    <h4 style={{ fontSize: '20px', fontWeight: 'var(--font-weight-normal)', lineHeight: '1.4', color: '#9497B1' }}>{getTranslatedCategory(category)}</h4>
                  </div>
                  <div className="flex-1">
                    {articles.map(article => (
                        <Link
                          key={article.id}
                          to={`/article/${article.id}`}
                          className="block px-5 py-3 hover:bg-[#F7F7FC] transition-colors group"
                        >
                          <span className="text-card-foreground group-hover:text-primary transition-colors leading-snug">
                            {getTranslatedTitle(article)}
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-center text-muted-foreground mb-4">
            {t('ui.cantFind')} <a href="#" className="text-primary hover:underline">{t('ui.contactSupportLink')}</a>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground text-sm">
            <p>© Quantum Software 2026</p>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="text-primary hover:underline">GDPR</a>
          </div>
        </div>
      </footer>
    </div>
  );
}