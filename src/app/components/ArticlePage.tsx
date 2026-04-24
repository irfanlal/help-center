import { useParams, Link, useNavigate } from 'react-router';
import {
  Home,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
  Menu,
} from 'lucide-react';
import {
  articles,
  categories,
  categoryI18nKeys,
  generateArticleContent,
} from '@/app/data/articles';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Quantum360Logo from '@/imports/Quantum360Logo-45-29';
import { Resizable } from 're-resizable';
import { SearchBar } from './SearchBar';
import { LoginToggleButton } from './LoginToggleButton';

export function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const article = articles.find(a => a.id === id);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    article ? [article.category] : [],
  );
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  // Scroll to top whenever article ID changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [id]);

  // Reset feedback when article changes
  useEffect(() => {
    setFeedback(null);
  }, [id]);

  const getTranslatedTitle = (a: (typeof articles)[0]) =>
    a.i18nKey ? (t(`${a.i18nKey}.title`) as string) : a.title;

  const getTranslatedCategory = (cat: string) =>
    categoryI18nKeys[cat] ? (t(categoryI18nKeys[cat]) as string) : cat;

  if (!article) {
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

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    );
  };

  const articlesByCategory = categories.map(category => ({
    category,
    articles: articles.filter(a => a.category === category),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 h-[80px]">
        <div className="w-full px-4 sm:px-6 h-full relative">
          <div className="flex items-center justify-between gap-4 h-full">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-[135px] h-[35px] sm:w-[169px] sm:h-[44px]">
                <Quantum360Logo />
              </div>
            </Link>

            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[280px] lg:w-[448px]">
              <SearchBar
                variant="small"
                placeholder={t('ui.searchPlaceholder')}
                className="w-full"
                useBorder={true}
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Open Q360 Button - Desktop */}
              <LoginToggleButton />

              {/* Mobile Search Icon */}
              <button
                onClick={() => navigate('/')}
                className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (below header on mobile) */}
          <div className="md:hidden mt-4">
            <SearchBar
              variant="small"
              placeholder="Search for articles or ask a question"
              className="w-full"
              useBorder={true}
            />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation - Desktop */}
        <Resizable
          defaultSize={{
            width: 256,
            height: '100%',
          }}
          minWidth={200}
          maxWidth={500}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            right: {
              width: '4px',
              right: 0,
              cursor: 'col-resize',
            },
          }}
          handleClasses={{
            right: 'hover:bg-primary/20 transition-colors',
          }}
          className="hidden lg:block bg-sidebar border-r border-sidebar-border overflow-y-auto h-full"
        >
          <div className="p-4">
            <nav className="space-y-1">
              {articlesByCategory.map(
                ({ category, articles: categoryArticles }) => {
                  const isExpanded = expandedCategories.includes(category);

                  return (
                    <div key={category}>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between px-3 py-3 lg:py-2 text-left text-sidebar-foreground hover:bg-muted rounded-md transition-colors text-sm group"
                      >
                        <span className="font-medium group-hover:text-foreground transition-colors">
                          {getTranslatedCategory(category)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="ml-2 mt-1 space-y-0.5">
                          {categoryArticles.map(a => (
                            <Link
                              key={a.id}
                              to={`/article/${a.id}`}
                              className={`block px-3 py-1.5 rounded-md transition-colors text-sm ${
                                a.id === article.id
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'text-sidebar-foreground hover:bg-muted hover:text-foreground'
                              }`}
                            >
                              {getTranslatedTitle(a)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </nav>
          </div>
        </Resizable>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-foreground/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="w-[280px] h-full bg-sidebar border-r border-sidebar-border overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-4 h-4" />
                    <span>{t('ui.returnToHub')}</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                    aria-label="Close menu"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {articlesByCategory.map(
                    ({ category, articles: categoryArticles }) => {
                      const isExpanded = expandedCategories.includes(category);

                      return (
                        <div key={category}>
                          <button
                            onClick={() => toggleCategory(category)}
                            className="w-full flex items-center justify-between px-3 py-2 text-left text-sidebar-foreground hover:bg-muted rounded-md transition-colors text-sm group"
                          >
                            <span className="font-medium group-hover:text-foreground transition-colors">
                              {getTranslatedCategory(category)}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="ml-2 mt-1 space-y-0.5">
                              {categoryArticles.map(a => (
                                <Link
                                  key={a.id}
                                  to={`/article/${a.id}`}
                                  className={`block px-3 py-3 lg:py-1.5 rounded-md transition-colors text-sm ${
                                    a.id === article.id
                                      ? 'bg-primary/10 text-primary font-medium'
                                      : 'text-sidebar-foreground hover:bg-muted hover:text-foreground'
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {getTranslatedTitle(a)}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8"
          ref={mainContentRef}
        >
          <div className="max-w-[1800px] mx-auto">
            {/* Article Content */}
            <article className="bg-card rounded-[16px] border border-border p-4 sm:p-6 lg:p-8 shadow-elevation-sm">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Text Content */}
                <div className="flex-1 min-w-0 lg:min-w-[500px] lg:max-w-[700px]">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm overflow-x-auto">
                      <Link
                        to="/"
                        className="hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {t('ui.home')}
                      </Link>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      <Link
                        to={`/category/${encodeURIComponent(article.category)}`}
                        className="hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {getTranslatedCategory(article.category)}
                      </Link>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      <span className="text-foreground truncate">
                        {getTranslatedTitle(article)}
                      </span>
                    </div>
                  </div>

                  <h2
                    className="mb-6 sm:mb-8 text-[34px]"
                    style={{
                      lineHeight: '1.2',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {getTranslatedTitle(article)}
                  </h2>

                  <div
                    className="prose prose-slate max-w-none text-card-foreground space-y-6"
                    dangerouslySetInnerHTML={{
                      __html: article.i18nKey
                        ? generateArticleContent(article.i18nKey, t)
                        : (article.content ?? ''),
                    }}
                  />

                  {/* Video on mobile - shown at end */}
                  {article.video && (
                    <div className="lg:hidden mt-8">
                      <video
                        key={`mobile-${article.id}`}
                        controls
                        poster={article.video.poster}
                        className="w-full rounded-lg"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <source src={article.video.src} type="video/mp4" />
                      </video>
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: '0.875rem',
                          color: 'var(--foreground)',
                          marginTop: '0.5rem',
                        }}
                      >
                        {t(article.video.captionKey)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column - Video (Desktop only, sticky) */}
                {article.video && (
                  <div className="hidden lg:block flex-1 lg:min-w-[400px] lg:max-w-[600px]">
                    <div className="sticky top-[76px]">
                      <video
                        controls
                        poster={article.video.poster}
                        className="w-full rounded-lg"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <source src={article.video.src} type="video/mp4" />
                      </video>
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: '0.875rem',
                          color: 'var(--foreground)',
                          marginTop: '0.5rem',
                        }}
                      >
                        {t(article.video.captionKey)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Helpful Section */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-muted rounded-lg border border-border">
              {!feedback ? (
                <>
                  <p className="mb-4">{t('ui.wasHelpful')}</p>
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 bg-card border border-border rounded-md hover:bg-[#F7F7FC] transition-colors"
                      onClick={() => setFeedback('yes')}
                    >
                      {t('ui.yes')}
                    </button>
                    <button
                      className="px-4 py-2 bg-card border border-border rounded-md hover:bg-[#F7F7FC] transition-colors"
                      onClick={() => setFeedback('no')}
                    >
                      {t('ui.no')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  {feedback === 'yes' ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: 'var(--chart-4)' }}
                        />
                        <p className="text-foreground">{t('ui.thankYes')}</p>
                      </div>
                      <p className="text-card-foreground">
                        {t('ui.thankYesMsg')}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-foreground mb-2">{t('ui.thankNo')}</p>
                      <p className="text-card-foreground">
                        {t('ui.thankNoMsg')}{' '}
                        <a href="#" className="text-primary hover:underline">
                          {t('ui.contactSupport')}
                        </a>{' '}
                        {t('ui.furtherAssistance')}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Related Articles */}
            <div className="mt-6 sm:mt-8">
              <h4 className="mb-4">{t('ui.relatedArticles')}</h4>
              <div className="space-y-3">
                {(article.related
                  ? article.related
                  : articles
                      .filter(
                        a =>
                          a.category === article.category &&
                          a.id !== article.id,
                      )
                      .slice(0, 3)
                      .map(a => ({
                        link: `/article/${a.id}`,
                        label: getTranslatedTitle(a),
                      }))
                ).map(related => (
                  <Link
                    key={related.link}
                    to={related.link}
                    className="block p-4 bg-card border border-border rounded-lg hover:bg-secondary hover:border-primary hover:shadow-elevation-sm transition-all group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-card-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                        {related.labelKey ? t(related.labelKey) : related.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">
                {t('ui.stillNeedHelp')}{' '}
                <a href="#" className="text-primary hover:underline">
                  {t('ui.contactSupportLink')}
                </a>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground text-sm">
                <p>© Quantum Software 2026</p>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="text-primary hover:underline">
                  GDPR
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
