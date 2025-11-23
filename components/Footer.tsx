import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Let's Create Something Amazing</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            无论是复杂的游戏系统架构，还是棘手的 Bug 修复，我随时准备接受挑战。
        </p>
        <div className="flex justify-center space-x-6 mb-8">
            <a href="mailto:example@email.com" className="text-slate-400 hover:text-game-accent transition">Email Me</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="text-slate-400 hover:text-game-accent transition">GitHub</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="text-slate-400 hover:text-game-accent transition">Xianyu</a>
        </div>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Unity Senior Engineer Portfolio. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;