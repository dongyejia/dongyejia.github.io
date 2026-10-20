import mediaData from './media.json';

const featuredOrder = ['video-9', 'video-11', 'audio-5', 'video-6', 'audio-3', 'video-10'];
export const media = [
  ...featuredOrder.map(id => mediaData.find(item => item.id === id)),
  ...mediaData.filter(item => !featuredOrder.includes(item.id)),
];
export const profile = {
  email: '13801458870@163.com',
  phone: '13801458870',
  experience: [
    { date: '2026.07 — 2026.09', company: '珀莱雅化妆品股份有限公司', role: 'AI 项目组 · AIGC 内容营销', detail: '参与 AI 营销中台搭建与品牌营销 Skill 开发，创作图文、音视频及投流素材。' },
    { date: '2026.03 — 2026.05', company: '青岛泰鹰科技有限公司', role: 'AI 产品经理', detail: '参与「赤壤」创业平台，完成用户调研、PRD 与竞品分析，推动 2 项功能上线。' },
    { date: '2025.04 — 2025.07', company: '科大讯飞股份有限公司', role: '音频编辑', detail: '长语流数据标注、字音精标与高精度音频编辑，关注合成语音的自然度。' },
    { date: '2024.09 — 2024.12', company: '扬州市邗江区公道中学', role: '高中音乐教师', detail: '独立承担高一年级音乐课程，参与合唱与艺术节活动，获评优秀实习生。' },
  ],
};

export const projects = [
  {
    id: 'lingyan', number: '01', title: '灵验 AI', subtitle: '让创业想法，走向有依据的判断。', category: 'AI 产品', type: 'AI PRODUCT / 创业决策', year: '2026',
    image: '/assets/product-7.jpg', detailImage: '/assets/product-9.jpg', alt: '灵验 AI 创业可行性分析产品界面',
    description: '面向早期创业构想的 AI 可行性分析产品。围绕用户当前分散的信息搜集与判断流程，梳理分析路径，将想法输入、分析报告与创业者数字画像连接为可体验的产品原型。',
    facts: [['项目内容', 'AI 创业可行性分析'], ['核心工作', '用户调研 / 功能设计 / 原型'], ['交付形式', '可体验产品 + 产品作品集']],
    pdf: '/media/product-portfolio.pdf', url: 'https://ideacheck-nxz9.onrender.com/',
  },
  {
    id: 'zhiyin', number: '02', title: '知音 AI 乐坊', subtitle: '当传统音乐，遇见新的学习方式。', category: 'AI 产品', type: 'AI PRODUCT / 音乐教育', year: '2026',
    image: '/assets/zhiyin-art.jpg', detailImage: '/assets/zhiyin-screen.jpg', alt: '知音 AI 乐坊产品首页及文化地图界面',
    description: '以古琴为切入点，探索 AI、文化与音乐教育的融合。主导产品全流程设计，提出「一图、四核、双闭环」架构，连接情境对话、AI 习琴、经典赏析和创作体验，完成核心功能设计、技术选型与产品原型。',
    facts: [['我的角色', '项目负责人 / 产品设计'], ['产品架构', '一图 · 四核 · 双闭环'], ['项目场景', '中国国际大学生创新大赛（2026）']],
    pdf: '/media/zhiyin-report.pdf', url: 'https://zhiyin-ai.onrender.com',
  },
  {
    id: 'brand', number: '03', title: '品牌叙事，新的表达', subtitle: '从 AI 内容生产，到有记忆点的品牌影像。', category: 'AIGC 创作', type: 'AIGC / BRAND FILM', year: '2026',
    image: '/assets/brand-cover.jpg', alt: '珀莱雅品牌宣传作品视频画面',
    description: '在品牌营销场景中运用 AIGC 创作图文、音视频与投流素材，参与 AI 数字人制作与企业宣传片配乐。作品包含珀莱雅项目宣传片、产品宣传与场景化短片。',
    facts: [['创作方向', '品牌影像 / 内容营销'], ['工作内容', 'AI 创作 / 配乐 / 视听表达'], ['观看方式', '站内原生视频播放器']], mediaId: 'video-9',
  },
  {
    id: 'winter', number: '04', title: '当镜头对准你，整个冬天都暖了', subtitle: '用影像记录冬日里的温暖。', category: 'AIGC 创作', type: 'AIGC / VISUAL STORY', year: '2026',
    image: '/assets/video-7.jpg', alt: '当镜头对准你，整个冬天都暖了视频画面',
    description: '以冬日场景为主题的影像创作，关注画面、色彩与情绪的呼应。完整作品可在站内播放。',
    facts: [['创作方向', '场景影像 / 情绪表达'], ['作品形式', '视频'], ['观看方式', '站内视频播放']], mediaId: 'video-7', stageCaption: '把温暖留在镜头里',
  },
  {
    id: 'animation', number: '05', title: '修红精华（动漫场景）', subtitle: '以动漫场景，探索产品表达的另一种可能。', category: 'AIGC 创作', type: 'AIGC / PRODUCT FILM', year: '2026',
    image: '/assets/video-2.jpg', alt: '修红精华动漫场景视频画面',
    description: '围绕修红精华展开的动漫场景视频创作，探索 AIGC 在产品视觉与场景化叙事中的表达。完整作品可在站内播放。',
    facts: [['创作方向', '产品影像 / 动漫场景'], ['作品形式', '视频'], ['观看方式', '站内视频播放']], mediaId: 'video-2', stageCaption: '产品与想象，相遇',
  },
];

export const campus = [
  { number: '01', label: 'ACADEMIC JOURNEY', title: '在音乐中学习，也在教育中思考', detail: '2021 年考入武汉音乐学院音乐教育学院，2025 年继续攻读音乐教育硕士。从声乐、钢琴到词曲创作与编曲，持续积累音乐表达与教学的专业基础。', tags: ['本科 2021—2025', '硕士 2025—2028 在读'] },
  { number: '02', label: 'MUSIC × RESEARCH', title: '在人工智能与音乐之间提出问题', detail: '发表省级期刊论文《人工智能音乐创作中“情感计算”的本体论局限》，关注 AI 音乐创作与情感表达。将专业学习中的问题，延伸到音乐与技术的交叉探索。', tags: ['音乐教育', 'AI 音乐研究'] },
  { number: '03', label: 'CREATION & PRACTICE', title: '把课堂之外的探索，变成作品', detail: '获得武汉音乐学院“学院杯”作词、作曲奖项及湖北省“挑战杯”大学生创新创业大赛铜奖。参与中国国际大学生创新大赛（2026），负责知音 AI 乐坊的产品设计与原型搭建。', tags: ['词曲创作', '创新实践'] },
];
