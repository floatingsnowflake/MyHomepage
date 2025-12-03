
import { Project, Experience, Skill, Stat } from './types';
import { Bug, Zap, Layers, Gamepad2 } from 'lucide-react';

// Updated to the new Assets repository
export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/floatingsnowflake/MyHomepageAssets/main/public";

/**
 * ASSET CONFIGURATION
 * 
 * Assets are now pointed to: https://raw.githubusercontent.com/floatingsnowflake/MyHomepageAssets/main/public/assets
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
    universe: `${GITHUB_RAW_BASE}/data/project_universe.json`,
    interests: `${GITHUB_RAW_BASE}/data/interests.json`,
    skills: `${GITHUB_RAW_BASE}/data/skills.json`,
    experiences: `${GITHUB_RAW_BASE}/data/experiences.json`,
    minghaiFeatures: `${GITHUB_RAW_BASE}/data/minghai_features.json`
  }
};

// 3D Universe Gallery Images - Default Data
export const PROJECT_UNIVERSE = [
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_1.jpg`,
    title: "Project Alpha",
    date: "2023.10",
    tags: ["Unity ECS", "DOTS"],
    description: "一个基于 Unity ECS 架构的高性能战斗演示，同屏支持 5000+ 单位渲染与逻辑运算。",
    link: "" // Optional link
  },
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_2.jpg`,
    title: "Project Beta",
    date: "2023.08",
    tags: ["Shader Graph", "VFX"],
    description: "专注于次世代渲染效果的实验性项目，包含体积云、动态全局光照以及高度风格化的后处理效果。",
    link: ""
  },
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_3.jpg`,
    title: "UI Design System",
    date: "2023.05",
    tags: ["UGUI", "MVVM"],
    description: "一套高度可复用的 UI 框架，解耦了逻辑与视图，支持复杂动画状态管理与 Lua 热更接口。",
    link: ""
  },
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_4.jpg`,
    title: "Shader Works",
    date: "2023.02",
    tags: ["HLSL", "Compute Shader"],
    description: "基于 Compute Shader 的 GPU 粒子系统与流体模拟，优化了移动端的性能表现。",
    link: ""
  },
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_5.jpg`,
    title: "Character Setup",
    date: "2022.11",
    tags: ["Animation", "Rigging"],
    description: "复杂的角色 IK 与动画状态机设置，实现了脚部贴地、程序化瞄准与自然的布娃娃系统。",
    link: ""
  },
  { 
    url: `${GITHUB_RAW_BASE}/assets/images/universe/proj_6.jpg`,
    title: "Environment Art",
    date: "2022.08",
    tags: ["PCG", "Terrain"],
    description: "程序化生成 (PCG) 地形与植被系统，通过噪声算法自动生成无限延伸的自然地貌。",
    link: ""
  },
];

export const PERSONAL_INFO = {
  name: "Unity Senior Engineer", 
  title: "资深 Unity 游戏开发工程师",
  email: "571876754@qq.com",
  tagline: "3800+ 问题解决专家 | 命骸项目主程 | 极致性能优化",
  summary: "丰富的2D/3D游戏制作经验，主导开发过《命骸》等复杂项目。作为闲鱼平台Unity领域的“外包战士”，累计解决3800+技术难题，拥有极强的Debug能力与架构设计思维。",
  steamLink: "https://store.steampowered.com/app/3007510/_/"
};

// Default Data
export const INTERESTS_DATA = {
    title: "兴趣爱好",
    description: "喜欢动漫、二次元、游戏、宅。喜欢的动漫有：命运石之门，叛逆的鲁路修，游戏人生，进击的巨人，死亡笔记，为美好的世界献上祝福等等。非常期待能参与独立游戏开发。",
    tags: ["命运石之门", "叛逆的鲁路修", "游戏人生", "进击的巨人", "Steam独立游戏", "二次元"]
};

export const SKILLS: Skill[] = [
  { name: "Unity 3D/2D", level: 98, category: "Core" },
  { name: "C# / .NET", level: 95, category: "Core" },
  { name: "Architecture (MVC/ECS)", level: 90, category: "Core" },
  { name: "UI System / UGUI", level: 95, category: "System" },
  { name: "Combat Systems", level: 92, category: "System" },
  { name: "Performance Optimization", level: 88, category: "System" },
  { name: "Odin Inspector", level: 90, category: "Tools" },
  { name: "DOTween / PrimeTween", level: 95, category: "Tools" },
  { name: "MemoryPack", level: 85, category: "Tools" },
  { name: "Behavior Tree / AI", level: 85, category: "Other" },
  { name: "Addressables / AssetBundles", level: 80, category: "Other" },
  { name: "Shader / VFX", level: 75, category: "Other" },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "深圳聚光灯网络有限公司",
    role: "《命骸》项目总程序",
    period: "2023.12 - 至今",
    highlight: true,
    description: [
      "担任项目总程序，编写超过8万行代码，负责从底层架构到上层玩法的全方位实现。",
      "核心实现：复杂的连击战斗系统（状态机驱动）、高性能存档方案（MemoryPack）、模块化任务与对话系统。",
      "系统开发：角色控制、物理交互、物品系统、Buff系统、相机系统（Cinemachine）、ID系统、场景异步加载。",
      "UI/UX：使用UGUI搭建全套UI，包含复杂动画效果与交互逻辑。",
      "性能优化：实现2D专用动画状态机（性能提升1000%），基于GPU渲染的伤害跳字。",
      "工具链：编写大量编辑器扩展、数据编辑器及常用工具库。"
    ]
  },
  {
    company: "成都凯瑞游科技有限公司",
    role: "Unity 游戏开发",
    period: "2023.03 - 2023.12",
    description: [
      "负责《命骸》PC外包程序开发，实现3D平台穿梭、手柄支持、战斗系统基础。",
      "使用Spine插件实现横版2D游戏开发及其他手游维护。",
      "负责Bug修复与功能拓展，与策划美术紧密配合。"
    ]
  }
];

export const FREELANCE_STATS: Stat[] = [
  { label: "Unity 问题解决", value: "3800+", icon: Bug },
  { label: "好评率", value: "100%", icon: Zap },
  { label: "代码协作项目", value: "10+", icon: Layers },
  { label: "涉猎项目类型", value: "20+", icon: Gamepad2 },
];

export const MINGHAI_FEATURES = [
  "MemoryPack 高性能存档框架",
  "自定义 2D 动画状态机 (10x 性能)",
  "复杂连击与打击感调校系统",
  "基于行为树的 Boss AI",
  "AssetBundle 资源加密系统",
  "高度模块化的任务/对话系统"
];
