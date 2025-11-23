import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectMinghai from './components/ProjectMinghai';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import FreelanceStats from './components/FreelanceStats';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-game-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProjectMinghai />
        <Skills />
        <ExperienceTimeline />
        <FreelanceStats />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;