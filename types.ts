

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Core' | 'System' | 'Tools' | 'Other';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  highlight?: boolean;
}

export interface Project {
  title: string;
  role: string;
  description: string;
  techStack: string[];
  features: string[];
  image?: string;
  video?: string;
  link?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: any;
}

export interface FreelanceItem {
  image: string;
  title: string;
  description?: string;
}

export interface SiteContent {
  nav: {
    home: string;
    minghai: string;
    skills: string;
    experience: string;
    freelance: string;
  };
  hero: {
    role: string;
    title: string;
    tagline: string;
    summary: string;
    cta_project: string;
    cta_contact: string;
    scroll: string;
  };
  minghai: {
    subtitle: string;
    title: string;
    video_label: string;
    desc_html: string;
    steam_btn: string;
    internal_btn: string;
    features: string[];
    tags: string[];
    saveSystem: {
      title: string;
      subtitle: string;
      slides: {
        title: string;
        desc: string;
        points: string[];
        techTag?: string;
      }[];
      nav: { prev: string; next: string };
    };
    dialogSystem: {
      title: string;
      subtitle: string;
      nodes: {
        config: { name: string; desc: string };
        logic: { name: string; desc: string };
        action: { name: string; desc: string };
        eval: { name: string; desc: string };
      };
      highlights: string[];
    };
    // Fix: Added missing questSystem definition to match the data structure used in the component
    questSystem?: {
      title: string;
      subtitle: string;
      nodes: {
        static: { name: string; desc: string };
        runtime: { name: string; desc: string };
        logic: { name: string; desc: string };
        event: { name: string; desc: string };
      };
      highlights: string[];
    };
  };
  skills: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
  };
  freelance: {
    title: string;
    title_highlight: string;
    desc: string;
    tags: string[];
  };
  universe: {
    title: string;
    subtitle: string;
    drag_hint: string;
    view_btn: string;
    internal_btn: string;
    locked_btn: string;
  };
  gallery: {
    quote: string;
  };
  footer: {
    title: string;
    desc: string;
  }
}