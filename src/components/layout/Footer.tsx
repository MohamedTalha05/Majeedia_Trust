import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales';

export const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <footer className="px-6 py-8 border-t border-stone-200 mt-12 text-sm text-stone-500">
      <div className="flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        <div className="flex gap-4">
          <a href="/legal" className="hover:text-stone-900 transition-colors">{t.footer.legal}</a>
          <a href="/contact" className="hover:text-stone-900 transition-colors">{t.footer.contact}</a>
        </div>
      </div>
    </footer>
  );
};
