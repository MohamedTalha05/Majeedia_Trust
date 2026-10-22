import { useLanguage } from '../context/LanguageContext';

export const Vision = () => {
  const { language } = useLanguage();
  return (
    <main className="max-w-prose mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif font-medium text-stone-900 mb-8">{language === 'en' ? 'Our Vision' : 'Unsere Vision'}</h1>
      <p className="text-lg leading-relaxed text-stone-700">
        {language === 'en' ? "Building a Legacy That Can Last for Generations." : "Ein Vermächtnis für Generationen aufbauen."}
      </p>
    </main>
  );
};
