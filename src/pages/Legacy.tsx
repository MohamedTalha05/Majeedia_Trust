import { useLanguage } from '../context/LanguageContext';

export const Legacy = () => {
  const { language } = useLanguage();
  return (
    <main className="max-w-prose mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif font-medium text-stone-900 mb-8">{language === 'en' ? 'Our Legacy' : 'Unsere Geschichte'}</h1>
      <p className="text-lg leading-relaxed text-stone-700">
        {language === 'en' ? "From Family Land to a Legacy of Giving..." : "Vom Familienland zum Vermächtnis des Gebens..."}
      </p>
    </main>
  );
};
