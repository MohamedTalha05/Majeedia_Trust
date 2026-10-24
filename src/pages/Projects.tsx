import { useLanguage } from '../context/LanguageContext';

export const Projects = () => {
  const { language } = useLanguage();
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif font-medium text-stone-900 mb-8">{language === 'en' ? 'Projects' : 'Projekte'}</h1>
      <p className="text-lg leading-relaxed text-stone-700">
        {language === 'en' ? "Explore our charitable initiatives." : "Entdecken Sie unsere wohltätigen Initiativen."}
      </p>
    </main>
  );
};
