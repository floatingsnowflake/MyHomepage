
import { Project, Experience, Skill, Stat, SiteContent, FreelanceItem } from './types';
import { Bug, Zap, Layers, Gamepad2 } from 'lucide-react';

export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/floatingsnowflake/MyHomepageAssets/main/public";

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
  data: {
    content_zh: `${GITHUB_RAW_BASE}/data/content_zh.json`,
    content_en: `${GITHUB_RAW_BASE}/data/content_en.json`,
    universe: `${GITHUB_RAW_BASE}/data/project_universe`,
    interests: `${GITHUB_RAW_BASE}/data/interests`,
    skills: `${GITHUB_RAW_BASE}/data/skills`,
    experiences: `${GITHUB_RAW_BASE}/data/experiences`,
    freelanceShowcase: `${GITHUB_RAW_BASE}/data/freelance_showcase`,
    music: `${GITHUB_RAW_BASE}/data/music.json`
  }
};

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
    saveSystem: {
      title: "高性能可视化存档加载系统",
      subtitle: "架构专题: MemoryPack + AES + 编辑器预收集技术",
      nav: { prev: "上一页", next: "下一页" },
      slides: [
        {
          title: "系统概览与核心亮点",
          desc: "针对复杂 3D 横版 RPG 打造的存档架构，重点解决存档对象丢失与加载性能瓶颈。",
          points: [
             "可存档对象全可视化：编辑器内一键查重与校验",
             "极致性能：基于 MemoryPack 二进制序列化",
             "无缝加载：数据驱动更新，无需重新加载场景",
             "高安全性：AES 加密防止玩家非法篡改数据"
          ],
          techTag: "Architecture Overview"
        },
        {
          title: "GameStartSetting (ScriptableObject)",
          desc: "负责主菜单与游戏场景的解耦通信，是存档流程的“第一驱动力”。",
          points: [
            "判定流程：区分 [New Game] 或 [Load Game]",
            "上下文传递：携带存档索引 (SaveIndex) 与初始场景名",
            "状态持久：作为全局配置文件在跨场景中保持唯一性"
          ],
          techTag: "SO Communication"
        },
        {
          title: "GameData (数据实体模型)",
          desc: "存放游戏运行时的所有快照数据，采用 MemoryPack 进行二进制化压缩。",
          points: [
            "玩家状态：位置、朝向、血量、蓝量、属性",
            "世界状态：机关触发情况、地图索引、Boss 活跃状态",
            "系统状态：背包、任务列表、进度计数器"
          ],
          techTag: "MemoryPack DTO"
        },
        {
          title: "ISave 接口与编辑器工具",
          desc: "规范化存档行为，通过 InterfaceCollector 工具在编辑器阶段完成对象绑定。",
          points: [
            "ISave 定义：每个存档对象需拥有唯一字符串 ID",
            "InterfaceCollector：编辑器内一键搜集场景中所有 ISave 对象",
            "校验机制：自动检测 ID 重复或不合规的继承关系",
            "性能优势：避免运行时的 OnEnable/Disable 动态注册开销"
          ],
          techTag: "Editor Tooling"
        },
        {
          title: "ISaveList 与 Bridge 机制",
          desc: "负责将编辑器搜集到的静态接口列表转化为运行时的交互实例。",
          points: [
            "解耦设计：相比传统单体脚本更简便，降低脚本复杂性",
            "初始化流程：关卡开始时由初始化系统将列表注入 GameDataManager",
            "静态存储：保证在序列化加载时能瞬间匹配对应 ID 实例"
          ],
          techTag: "System Bridge"
        },
        {
          title: "GameDataManager (运行时中枢)",
          desc: "处理所有保存与加载逻辑，管理存档路径与文件后缀常量。",
          points: [
            "保存逻辑：遍历 ISaveList 调用 Save() 填充 GameData 后持久化",
            "加载逻辑：调用本地反序列化获取 GameData，通过 ID 映射回传数据",
            "场景无感：数据注入后直接更新 Object 状态，无需 Scene Reload"
          ],
          techTag: "Runtime Engine"
        },
        {
          title: "DataManager (底层加密 IO)",
          desc: "静态类实现，基于 MemoryPack 负责数据类与本地物理文件的安全转换。",
          points: [
            "泛型设计：支持任意类型的 DataClass 自动序列化",
            "AES 加密：集成 AES 加密流，确保存档文件的安全性",
            "极致速度：MemoryPack 的高性能使百万级数据几乎瞬间落盘"
          ],
          techTag: "Low-level IO"
        },
        {
          title: "总结：对比传统方案",
          desc: "为什么我们不采用常见的 MStudio 或 PlayerPrefs 方案？",
          points: [
            "比 PlayerPrefs 更规范：结构化数据，易于维护",
            "比 Runtime 搜集更稳健：编辑器预校验，杜绝运行时空指针",
            "比传统 JSON 更高效：MemoryPack 体积更小，解析快 5-10 倍",
            "扩展性：新增存档对象只需点一下编辑器按钮，零代码变动"
          ],
          techTag: "Optimization Result"
        }
      ]
    },
    dialogSystem: {
      title: "高扩展对话与行为系统",
      subtitle: "架构解析: 类 DNF MMO 逻辑 + Galgame 触发机制",
      nodes: {
        config: { name: "DialogConfig (数据驱动)", desc: "基于 ScriptableObject，支持 SpeakerData (立绘/情绪) 与 DialogData 的多维映射。" },
        logic: { name: "DialogManager (状态机控制)", desc: "管理 None/对话/打字/选择四种状态，通过正则解析 condStr 实现动态条件匹配。" },
        action: { name: "ActionHandler (工厂+策略)", desc: "IDialogActionHandler 接口实现。支持接受任务、移除物品、立绘震动、切片视频播放等 20+ 种行为。" },
        eval: { name: "CondGroup (嵌套布尔逻辑)", desc: "底层工具类。支持复杂的 (A & B) | !C 嵌套逻辑评估，广泛应用于任务接取与 NPC 状态更新。" }
      },
      highlights: [
        "类 DNF MMO：支持一个 NPC 同时发布/引导/处理多个任务对话，按优先级排序。",
        "高度解耦：DialogActionHandlerFactory 动态解析行为，UI 层与业务层零耦合。",
        "Galgame 体验：支持分支选项、立绘情绪切换、音效同步及屏幕震动等沉浸式指令。"
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
    desc: '自2024年以来，我在闲鱼平台累计处理超过 3,800+ 单 Unity 相关问题。',
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
