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