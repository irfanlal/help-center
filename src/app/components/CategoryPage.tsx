import { useParams, Link } from "react-router";
import { Home, ChevronRight } from "lucide-react";
import { articles, categories, categoryI18nKeys } from "@/app/data/articles";
import Quantum360Logo from "@/imports/Quantum360Logo-45-29";
import { LoginToggleButton } from "./LoginToggleButton";
import { useTranslation } from "react-i18next";

export function CategoryPage() {
  const { category } = useParams();
  const { t } = useTranslation();

  const decodedCategory = category ? decodeURIComponent(category) : "";

  const getTranslatedCategory = (cat: string) =>
    categoryI18nKeys[cat] ? (t(categoryI18nKeys[cat]) as string) : cat;

  const getTranslatedTitle = (article: (typeof articles)[0]) =>
    article.i18nKey ? (t(`${article.i18nKey}.title`) as string) : article.title;

  const getDescription = (article: (typeof articles)[0]): string => {
    if (article.i18nKey) {
      return t(`${article.i18nKey}.description`) as string;
    }
    return (article.content ?? '').replace(/<[^>]*>/g, ' ').substring(0, 150) + '...';
  };

  if (!categories.includes(decodedCategory)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2>{t('ui.articleNotFound')}</h2>
          <Link to="/" className="text-primary hover:underline">
            {t('ui.returnToHub')}
          </Link>
        </div>
      </div>
    );
  }

  const categoryArticles = articles.filter(a => a.category === decodedCategory);
  const translatedCategory = getTranslatedCategory(decodedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border h-[80px]">
        <div className="w-full px-6 h-full">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="hover:opacity-80 transition-opacity inline-block">
              <div className="w-[169px] h-[44px]">
                <Quantum360Logo />
              </div>
            </Link>
            <LoginToggleButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            {t('ui.home')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{translatedCategory}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <h2 className="mb-4" style={{ fontSize: 'var(--text-h2)', lineHeight: '1.3' }}>
            {translatedCategory}
          </h2>
          <p className="text-muted-foreground">
            {t('ui.browseArticles')}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map(article => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="bg-card border border-border rounded-lg p-6 hover:bg-secondary hover:border-primary hover:shadow-elevation-sm transition-all group"
              >
                <h4 className="group-hover:text-primary transition-colors mb-3">
                  {getTranslatedTitle(article)}
                </h4>
                <p className="text-muted-foreground line-clamp-3">
                  {getDescription(article)}
                </p>
              </Link>
            )
          )}
        </div>

        {categoryArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-muted-foreground mb-4">
            {t('ui.stillNeedHelp')} <a href="#" className="text-primary hover:underline">{t('ui.contactSupportLink')}</a>
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
