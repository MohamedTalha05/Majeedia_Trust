import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { language } = useLanguage();
  return (
    <main className="max-w-prose mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif font-medium text-stone-900 mb-8">{language === 'en' ? 'About Us' : 'Über uns'}</h1>
      <p className="text-lg leading-relaxed text-stone-700 mb-6">
        {language === 'en' 
          ? "Majeedia Trust is a family-led charitable initiative focused on responsible, structured and sustainable giving."
          : "Die Majeedia Stiftung ist eine familiengeführte wohltätige Initiative, die sich auf verantwortungsbewusstes, strukturiertes und nachhaltiges Geben konzentriert."}
      </p>
    </main>
  );
};
