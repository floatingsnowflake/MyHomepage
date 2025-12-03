
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent } from '../types';
import { ASSETS, DEFAULT_CONTENT } from '../constants';

type Lang = 'zh' | 'en';

interface LanguageContextType {
  lang: Lang;
  content: SiteContent;
  toggleLanguage: () => void;
  setLanguage: (lang: Lang) => void;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('zh');
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(false);

  // Initial load
  useEffect(() => {
    // Check URL param first: ?lang=en
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    const storedLang = localStorage.getItem('app_lang');
    
    let initialLang: Lang = 'zh';
    if (urlLang === 'en' || urlLang === 'zh') {
        initialLang = urlLang as Lang;
    } else if (storedLang === 'en' || storedLang === 'zh') {
        initialLang = storedLang as Lang;
    }
    
    setLanguage(initialLang);
  }, []);

  const fetchContent = async (targetLang: Lang) => {
    setLoading(true);
    try {
        const url = targetLang === 'zh' ? ASSETS.data.content_zh : ASSETS.data.content_en;
        const res = await fetch(url);
        if (res.ok) {
            const json = await res.json();
            // Merge with default to ensure no missing keys crash the app
            setContent(prev => ({ ...prev, ...json }));
        } else {
            // Fallback to default if fetch fails, but if default is ZH and we want EN, 
            // we might be stuck. Ideally default content should be separated if critical.
            // For now, we assume ZH is default fallback.
            console.warn(`Failed to fetch content for ${targetLang}, reverting to default.`);
            if (targetLang === 'zh') setContent(DEFAULT_CONTENT);
        }
    } catch (e) {
        console.error("Language fetch error", e);
    } finally {
        setLoading(false);
    }
  };

  const setLanguage = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
    
    // Update URL without reload (safely)
    try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.pushState({}, '', url);
    } catch (e) {
        // Ignored: Likely running in a sandboxed environment (blob URL) where pushState is restricted
        console.debug("Skipped URL update due to environment restrictions", e);
    }

    fetchContent(newLang);
  };

  const toggleLanguage = () => {
    const next = lang === 'zh' ? 'en' : 'zh';
    setLanguage(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, content, toggleLanguage, setLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
