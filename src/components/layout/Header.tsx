import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales';

export const Header = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-stone-200">
      <Link to="/" className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 font-serif">
        {t.brand}
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
        <Link to="/about" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">{t.nav.about}</Link>
        <Link to="/legacy" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">{t.nav.legacy}</Link>
        <Link to="/projects" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">{t.nav.projects}</Link>
        <Link to="/transparency" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">{t.nav.transparency}</Link>
        <Link to="/vision" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">{t.nav.vision}</Link>
      </nav>

      <div className="flex items-center gap-3 shrink-0">
        <button onClick={() => setLanguage(language === 'en' ? 'de' : 'en')} className="text-xs font-bold text-stone-600 hover:text-stone-900">
          {language === 'en' ? 'EN' : 'DE'}
        </button>
        <a href="https://donate.myfundbox.com/multi?data=2Afko6t8UhbezCYW9xO40g" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-medium text-white bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0">
          {t.nav.donate}
        </a>
      </div>
    </header>
  );
};
