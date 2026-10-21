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
    { date: '2026.07 — 2026.09', company: '珀莱雅化妆品股份有限公司', role: 'AI 项目组 · AIGC 内容营销', detail: '围绕品牌营销场景，连接 AI 工作流、内容制作与多渠道分发。', highlights: [['中台与工具', '负责 AI 营销中台搭建，开发品牌营销 Skill，支持内容生产流程。'], ['内容创作', '运用 AIGC 产出图文、音视频及抖音千川投流素材，支持品牌多渠道内容产出。'], ['视听制作', '主导 AI 数字人创作与企业宣传片配乐，将音乐制作能力应用于品牌表达。']] },
    { date: '2026.03 — 2026.05', company: '青岛泰鹰科技有限公司', role: 'AI 产品经理', detail: '参与公司旗下「赤壤」创业平台，将用户需求整理为可交付的产品功能。', highlights: [['需求定义', '完成用户调研与 PRD 撰写，梳理创业平台的用户需求和功能方案。'], ['分析与交付', '输出 3 份竞品分析，推动 2 项功能上线，并将调研、设计与交付成果沉淀为《2026 AI 产品作品集》。']] },
    { date: '2025.04 — 2025.07', company: '科大讯飞股份有限公司', role: '音频编辑', detail: '围绕合成语音的自然度，开展精细化音频处理与语音数据标注。', highlights: [['音频处理', '负责长语流数据标注、字音精标与高精度音频编辑，优化合成语音自然度。']] },
    { date: '2024.09 — 2024.12', company: '扬州市邗江区公道中学', role: '高中音乐教师', detail: '独立承担高一年级音乐课程，将专业训练带入课堂与校园艺术实践。', highlights: [['课程教学', '完成教案、课件制作与期末评价，参与教研组集体备课、听评课及公开课准备。'], ['艺术实践', '协助组织校园合唱、艺术节等活动，负责选曲、排练与钢琴伴奏。'], ['教学协作', '配合班主任开展课堂管理与家校沟通，获评优秀实习生。']] },
  ],
};

// These are project collaborations listed separately from the resume's internships.
// Preserve brand names until the user confirms the contracting legal entities.
export const projectExperience = [
  { id: 'multimodal', number: '01', company: '字节跳动', role: '数据评测 · 项目合作', title: '让模型评测建立在清晰的数据之上', summary: '设计并标注多模态测试数据，参与模型评测流程的迭代。', outcomes: ['100+ 条测试数据', '改进方案被采纳'], work: [['测试数据设计', '设计并标注 100+ 条多模态测试数据，覆盖长文本理解、图像识别与逻辑推理等场景。'], ['流程迭代', '参与模型评测流程迭代，基于评测过程提出数据改进方案，相关建议被采纳。']] },
  { id: 'music-evaluation', number: '02', company: '阿里巴巴', role: '音乐数据评测 · 项目合作', title: '把音乐听感转化为评测标准', summary: '将音乐专业判断转化为可用于数据标注和质量评价的维度。', outcomes: ['7 大音频质量维度', '音乐评测体系'], work: [['体系构建', '构建音乐类数据评测体系，制定涵盖音质清晰度、情感表达等 7 大维度的音频质量标准。'], ['标注规范', '将评测标准应用于音乐类数据质量判断，提升数据标注的规范性。']] },
  { id: 'content-operation', number: '03', company: '滴滴科技有限公司', role: '内容运营 · 项目合作', title: '从内容策划走向多渠道传播', summary: '主导核心内容营销项目，将数据驱动策划与全渠道分发结合。', outcomes: ['80 余篇内容', '多渠道分发'], work: [['策划与发布', '通过数据驱动策划与全渠道分发，策划并发布内容 80 余篇。'], ['内容成果', '产出多篇行业爆款内容，支持品牌影响力与用户粘性的提升。']] },
  { id: 'music-production', number: '04', company: '一寸光年', role: '「声想无界」编曲人 · 项目合作', title: '用编曲建立作品的情绪与叙事', summary: '深耕抒情流行与古风风格编曲，将音乐训练延伸至商业音乐制作。', outcomes: ['抒情流行', '古风编曲'], work: [['创作方向', '围绕抒情流行与古风风格开展编曲，注重音乐情绪与整体表达。'], ['代表作品', '代表作包括《秋风过矮山》《江城谣》等，积累商业音乐制作实践。']] },
  { id: 'innovation', number: '05', company: '中国国际大学生创新大赛（2026）', role: '项目负责人 · 产品设计', title: '知音 AI 乐坊：从音乐教育问题到产品原型', summary: '主导产品全流程设计，探索传统音乐文化与 AI 音乐学习的结合。', outcomes: ['一图 · 四核 · 双闭环', '产品原型'], work: [['产品架构', '提出「一图、四核、双闭环」架构，组织音乐文化、学习与创作的产品体验。'], ['原型交付', '完成核心功能设计与技术选型，搭建产品原型。']], projectId: 'zhiyin' },
];

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
