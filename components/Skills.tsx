
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SKILLS as DEFAULT_SKILLS, ASSETS } from '../constants';
import { Skill } from '../types';
import { useLanguage } from '../utils/LanguageContext';

const Skills: React.FC = () => {
  const { content, lang } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const categories = ['Core', 'System', 'Tools', 'Other'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const url = `${ASSETS.data.skills}_${lang}.json`;
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json) && json.length > 0) {
            setSkills(json);
          }
        }
      } catch (e) {
        // Silent fail, use default
      }
    };
    fetchSkills();
  }, [lang]);

  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">{content.skills.title}</h2>
          <p className="mt-4 text-slate-400">{content.skills.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl font-semibold text-game-secondary mb-6 border-b border-slate-800 pb-2">
                {cat}
              </h3>
              <div className="space-y-4">
                {skills.filter(s => s.category === cat).map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-slate-300 font-medium text-sm">{skill.name}</span>
      <span className="text-slate-500 text-xs">{skill.level}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-gradient-to-r from-game-accent to-game-secondary h-2 rounded-full"
      />
    </div>
  </div>
);

export default Skills;
