import { Project, Experience, Skill, Stat } from './types';
import { Code, Bug, Zap, Layers, Gamepad2, Cpu, PenTool, Server } from 'lucide-react';

/**
 * ASSET CONFIGURATION
 * 
 * IMPORTANT: To make these images work, your folder structure in Vercel/GitHub must be:
 * /public/assets/images/hero_bg.jpg
 * /public/assets/images/avatar.jpg
 * ...etc
 */
export const ASSETS = {
  avatar: "/assets/images/avatar.jpg", 
  minghai: {
    pv: "/assets/video/minghai_pv.mp4",
    mainImage: "/assets/images/minghai_main.jpg", 
    gallery: [
      "/assets/images/minghai_1.jpg",
      "/assets/images/minghai_2.jpg",
      "/assets/images/minghai_3.jpg",
      "/assets/images/minghai_4.jpg",
    ]
  },
  // Updated to point to local files so you can replace them
  placeholders: {
    heroBg: "/assets/images/hero_bg.jpg", // Name your background image this
    minghaiFallback: "/assets/images/minghai_fallback.jpg", // Name your fallback image this
    interests: [
        "/assets/images/interest_1.jpg", // Anime/Game images
        "/assets/images/interest_2.jpg",
        "/assets/images/interest_3.jpg"
    ]
  }
};

export const PERSONAL_INFO = {
  name: "Unity Senior Engineer", 
  title: "资深 Unity 游戏开发工程师",
  email: "571876754@qq.com",
  tagline: "3800+ 问题解决专家 | 命骸项目主程 | 极致性能优化",
  summary: "丰富的2D/3D游戏制作经验，主导开发过《命骸》等复杂项目。作为闲鱼平台Unity领域的“外包战士”，累计解决3800+技术难题，拥有极强的Debug能力与架构设计思维。",
  steamLink: "https://store.steampowered.com/app/3007510/_/"
};

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