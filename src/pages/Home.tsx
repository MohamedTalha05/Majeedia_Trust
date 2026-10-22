import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

export const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="bg-[#FBF9F5] text-stone-900">
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <img 
            src="/src/assets/images/hero_charitable_legacy_1792644492896.jpg" 
            alt="Family charitable initiative" 
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="relative z-10 px-6 max-w-3xl text-white">
          <h1 className="text-5xl lg:text-6xl font-serif font-medium mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 font-medium bg-[#9A3412] text-white rounded-lg hover:bg-[#7C2D12] transition-colors">
              {t.hero.cta_story}
            </button>
            <a href="https://donate.myfundbox.com/multi?data=2Afko6t8UhbezCYW9xO40g" target="_blank" rel="noopener noreferrer" className="px-6 py-3 font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors">
              {language === 'en' ? 'Donate' : 'Spenden'}
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif font-medium mb-12 text-stone-900">What We Support</h2>
        <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Widow Support", img: "/src/assets/images/widow_disability_support_1792645208660.jpg" },
          { title: "Orphan & Child Education", img: "/src/assets/images/community_education_1792644492952.jpg" },
          { title: "Madrasa Education", img: "/src/assets/images/community_education_1792644492952.jpg" },
          { title: "Girls' Education", img: "/src/assets/images/girls_education_init_1792645209002.jpg" },
          { title: "Disability Support", img: "/src/assets/images/widow_disability_support_1792645208660.jpg" },
          { title: "Family Welfare", img: "/src/assets/images/community_support_1792644493806.jpg" },
          { title: "Community Welfare", img: "/src/assets/images/community_support_1792644493806.jpg" },
          { title: "Masjid Projects", img: "/src/assets/images/masjid_community_1792645209276.jpg" },
          { title: "Other Initiatives", img: "/src/assets/images/hero_charitable_legacy_1792644492896.jpg" }
        ].map((item, idx) => (
          <div key={idx} className="border border-stone-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <img src={item.img} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-6" />
            <h3 className="text-xl font-medium mb-3 text-stone-900">{item.title}</h3>
            <button className="text-sm font-bold text-[#9A3412] hover:underline">Explore This Area</button>
          </div>
        ))}
        </div>
      </section>
    </main>
  );
};
