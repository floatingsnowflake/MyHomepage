
import React, { useState, useEffect } from 'react';
import { EXPERIENCES as DEFAULT_EXPERIENCES, ASSETS } from '../constants';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';
import { useLanguage } from '../utils/LanguageContext';

const ExperienceTimeline: React.FC = () => {
  const { content, lang } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>(DEFAULT_EXPERIENCES);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const url = `${ASSETS.data.experiences}_${lang}.json`;
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json) && json.length > 0) {
            setExperiences(json);
          }
        }
      } catch (e) {
        // Silent fail
      }
    };
    fetchExperiences();
  }, [lang]);

  return (
    <section id="experience" className="py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">{content.experience.title}</h2>
        </div>

        <div className="relative border-l border-slate-700 ml-4 md:ml-10 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Dot */}
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-game-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-game-accent" />
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-game-secondary transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-game-secondary" />
                      {exp.role}
                    </h3>
                    <h4 className="text-game-accent font-medium">{exp.company}</h4>
                  </div>
                  <span className="text-slate-400 text-sm font-mono mt-2 md:mt-0 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start">
                      <span className="text-game-secondary mr-2 mt-1.5">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
