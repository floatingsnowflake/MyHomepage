
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectMinghai from './components/ProjectMinghai';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import FreelanceStats from './components/FreelanceStats';
import ProjectUniverse from './components/ProjectUniverse';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { LanguageProvider } from './utils/LanguageContext';

function App() {
  return (
    <LanguageProvider>
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-game-accent selection:text-white">
          <Navbar />
          <main>
            <Hero />
            <ProjectMinghai />
            <Skills />
            <ExperienceTimeline />
            <FreelanceStats />
            <ProjectUniverse />
            <Gallery />
          </main>
          <Footer />
        </div>
    </LanguageProvider>
  );
}

export default App;
