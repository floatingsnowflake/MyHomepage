
import { Project, Experience, Skill, Stat, SiteContent, FreelanceItem } from './types';
import { Bug, Zap, Layers, Gamepad2 } from 'lucide-react';

// Base URL for Assets
export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/floatingsnowflake/MyHomepageAssets/main/public";

/**
 * ASSET CONFIGURATION
 */
export const ASSETS = {
  avatar: `${GITHUB_RAW_BASE}/assets/images/avatar.jpg`, 
  minghai: {
    pv: `${GITHUB_RAW_BASE}/assets/video/minghai_pv.mp4`,
    mainImage: `${GITHUB_RAW_BASE}/assets/images/minghai_main.jpg`, 
    gallery: [
      `${GITHUB_RAW_BASE}/assets/images/minghai_1.jpg`,
      `${GITHUB_RAW_BASE}/assets/images/minghai_2.jpg`,
      `${GITHUB_RAW_BASE}/assets/images/minghai_3.jpg`,
      `${GITHUB_RAW_BASE}/assets/images/minghai_4.jpg`,
    ]
  },
  placeholders: {
    heroBg: `${GITHUB_RAW_BASE}/assets/images/hero_bg.jpg`,
    minghaiFallback: `${GITHUB_RAW_BASE}/assets/images/minghai_fallback.jpg`,
    interests: [
        `${GITHUB_RAW_BASE}/assets/images/interest_1.jpg`,
        `${GITHUB_RAW_BASE}/assets/images/interest_2.jpg`,
        `${GITHUB_RAW_BASE}/assets/images/interest_3.jpg`
    ]
  },
  // Data file paths for dynamic loading
  data: {
    // Content JSONs (The skeleton text)
    content_zh: `${GITHUB_RAW_BASE}/data/content_zh.json`,
    content_en: `${GITHUB_RAW_BASE}/data/content_en.json`,
    
    // Dynamic Lists (Lang suffix will be handled in code)
    universe: `${GITHUB_RAW_BASE}/data/project_universe`, // becomes _zh.json or _en.json
    interests: `${GITHUB_RAW_BASE}/data/interests`,
    skills: `${GITHUB_RAW_BASE}/data/skills`,
    experiences: `${GITHUB_RAW_BASE}/data/experiences`,
    freelanceShowcase: `${GITHUB_RAW_BASE}/data/freelance_showcase`,
    music: `${GITHUB_RAW_BASE}/data/music.json`
  }
};

// Default Chinese Content (Fallback)
export const DEFAULT_CONTENT: SiteContent = {
  nav: {
    home: '首页',
    minghai: '命骸 Project',
    skills: '技能', 
    experience: '工作经历',
    freelance: '闲鱼传说',
  },
  hero: {
    role: 'Senior Unity Engineer',
    title: '资深 Unity 游戏开发工程师',
    tagline: '3800+ 问题解决专家 | 命骸项目主程 | 极致性能优化',
    summary: '丰富的2D/3D游戏制作经验，主导开发过《命骸》等复杂项目。作为闲鱼平台Unity领域的“外包战士”，累计解决3800+技术难题，拥有极强的Debug能力与架构设计思维。',
    cta_project: '查看核心项目 (命骸)',
    cta_contact: '联系我',
    scroll: 'SCROLL_DOWN'
  },
  minghai: {
    subtitle: 'Flagship Project',
    title: '命骸 (Ming Hai)',
    video_label: 'PV 展示',
    desc_html: '作为项目<b>总程序</b>，编写超过<b>8万行代码</b>。负责从底层架构到上层玩法的全方位实现。这是一个复杂的 3D 横版 RPG，核心包含连击战斗系统、MemoryPack 高性能存档、高度模块化的任务与对话系统。',
    steam_btn: '在 Steam 上查看命骸',
    internal_btn: '查看内部技术文档',
    features: [
      "MemoryPack 高性能存档框架",
      "自定义 2D 动画状态机",
      "Cinemachine 动态相机系统",
      "高度模块化的任务与对话架构"
    ],
    tags: ["Unity 2021+", "C#", "MemoryPack", "Cinemachine", "UGUI"],
    questSystem: {
      title: "仿 MMO 高扩展任务系统",
      subtitle: "架构解析: 工厂模式 + 策略模式 + 数据驱动",
      intro: "在《命骸》中我实现了一套支持多种任务类型和复杂子任务逻辑的系统，核心解决了可扩展性与存档持久化的痛点。",
      architecture: "系统架构图",
      nodes: {
        static: { name: "QuestData (静态配置)", desc: "只读配置，包含任务描述、奖励及 TaskData 列表，类似 MMO 任务表。" },
        runtime: { name: "QuestInfo (运行时实例)", desc: "玩家接取后生成的动态数据，维护状态、接收时间并广播事件给子任务。" },
        logic: { name: "TaskBase (逻辑基类)", desc: "核心抽象。利用多态实现 KillTask、TalkTask 等，支持 MemoryPack 高性能存档。" },
        event: { name: "QuestChangeInfo (解耦事件)", desc: "轻量级事件包 (Dictionary<string, object>)，使任务系统与战斗、背包系统完全解耦。" }
      },
      highlights: [
        "开闭原则：新增子任务类型只需继承 TaskBase，零侵入现有逻辑",
        "极致性能：结合 MemoryPack 序列化，实现百万级任务状态秒级存取",
        "高度解耦：QuestChangeInfo 驱动，任务进度不依赖具体业务函数"
      ]
    }
  },
  skills: {
    title: '技术栈与能力',
    subtitle: '深耕 Unity 生态，追求极致性能与架构之美'
  },
  experience: {
    title: '工作经历'
  },
  freelance: {
    title: '闲鱼',
    title_highlight: 'Unity 外包战士',
    desc: '自2024年以来，我在闲鱼平台累计处理超过 3,800+ 单 Unity 相关问题。这不仅是数字，更是处理过数千个不同项目架构、不同Bug类型的经验积累。无论是大语言模型对接、无人机仿真，还是传统的2D/3D游戏开发，我都拥有极速定位问题和解决问题的能力。',
    tags: ["数据可视化", "3D钓鱼", "车企UI交互", "人脸识别"]
  },
  universe: {
    title: '项目宇宙',
    subtitle: '拖拽旋转 · 点击查看详情',
    drag_hint: '拖拽旋转 · 点击查看详情',
    view_btn: '查看详情',
    internal_btn: '内部项目',
    locked_btn: 'Access Denied'
  },
  gallery: {
    quote: '"Everything is connected to the choice of Steins;Gate."'
  },
  footer: {
    title: "Let's Create Something Amazing",
    desc: "无论是复杂的游戏系统架构，还是棘手的 Bug 修复，我随时准备接受挑战。"
  }
};

export const PERSONAL_INFO = {
  email: "571876754@qq.com",
  steamLink: "https://store.steampowered.com/app/3007510/_/"
};

// Default Fallback Data (Will be replaced by fetch)
export const PROJECT_UNIVERSE = [
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_1.jpg`,
    title: "Project Alpha",
    date: "2023.10",
    tags: ["Unity ECS", "DOTS"],
    description: "一个基于 Unity ECS 架构的高性能战斗演示。",
    link: "https://github.com/floatingsnowflake" 
  },
];

export const INTERESTS_DATA = {
    title: "兴趣爱好",
    description: "喜欢动漫、二次元、游戏、宅。",
    tags: ["命运石之门", "Steam独立游戏"]
};

export const SKILLS: Skill[] = [
  { name: "Unity 3D/2D", level: 98, category: "Core" }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "深圳聚光灯网络有限公司",
    role: "《命骸》项目总程序",
    period: "2023.12 - 至今",
    highlight: true,
    description: ["担任项目总程序，编写超过8万行代码。"]
  }
];

export const FREELANCE_STATS: Stat[] = [
  { label: "Unity 问题解决", value: "3800+", icon: Bug },
  { label: "好评率", value: "100%", icon: Zap },
  { label: "代码协作项目", value: "10+", icon: Layers },
  { label: "涉猎项目类型", value: "20+", icon: Gamepad2 },
];

export const FREELANCE_SHOWCASE_DATA: FreelanceItem[] = [];

export const DEFAULT_MUSIC_PLAYLIST = [
    `${GITHUB_RAW_BASE}/assets/music/bgm_1.mp3`,
    `${GITHUB_RAW_BASE}/assets/music/bgm_2.mp3`,
    `${GITHUB_RAW_BASE}/assets/music/bgm_3.mp3`
];
