import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { media, profile, projects, campus, projectExperience } from './content';
import './styles.css';
import './refinements.css';
import './editorial.css';
import './spatial.css';
import './campus.css';
import './interaction.css';
import './motion.css';
import { usePortfolioMotion } from './usePortfolioMotion';
import { usePointerLight } from './usePointerLight';
import { useDragScroll } from './useDragScroll';
const PdfViewer = React.lazy(() => import('./PdfViewer'));

function Icon({ name = 'arrow', size = 20, ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    play: <path d="m9 5 11 7-11 7Z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    layers: <><path d="m12 3 10 6-10 6L2 9Zm-10 9 10 6 10-6M2 17l10 6 10-6" /></>,
    wave: <path d="M3 10v4m4-8v12m5-16v20m5-16v12m4-8v4" />,
    spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    pause: <><path d="M9 5v14M15 5v14" /></>,
    menu: <path d="M4 8h16M4 16h16" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function Modal({ children, title, onClose, wide = false }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const oldFocus = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = document.getElementById('root');
    root.inert = true;
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"],video[controls],audio[controls],iframe');
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; root.inert = false; document.removeEventListener('keydown', onKey); oldFocus?.focus(); };
  }, [onClose]);
  return createPortal(<div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}><div className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" ref={dialogRef} tabIndex={-1}><div className="modal-top"><span id="dialog-title">{title}</span><button className="icon-button" onClick={onClose} aria-label="关闭弹窗"><Icon name="close" /></button></div>{children}</div></div>, document.body);
}

function BrandMark() {
  return <svg className="brand-monogram" viewBox="0 0 104 42" role="img" aria-label="DYJ"><g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 6h10c18 0 18 27 0 27H5Z" /><path d="m39 6 12 15L63 6M51 21v12" /><path d="M77 6h20M91 6v18c0 12-18 12-18 0" /></g><path className="brand-accent" d="M40 40h22" /></svg>;
}

function ProjectArtwork({ item }) {
  const isProduct = item.category === 'AI 产品';
  const screens = item.id === 'lingyan'
    ? ['/assets/product-9.jpg', '/assets/lingyan-screen.jpg']
    : item.id === 'zhiyin'
    ? ['/assets/zhiyin-art.jpg', '/assets/zhiyin-screen.jpg']
    : item.id === 'brand'
    ? ['/assets/video-10.jpg', '/assets/video-9.jpg']
    : [item.image, item.image];
  return <div className={`project-art spatial-stage stage-${item.id}`}>
    <span className="project-art-label">{item.type}</span>
    <div className="stage-halo" aria-hidden="true" />
    <div className="stage-plinth" aria-hidden="true" />
    <div className="spatial-object object-back" aria-hidden="true"><img src={screens[0]} alt="" loading="lazy" /></div>
    <div className={`spatial-object object-front ${isProduct ? 'screen-object' : 'film-object'}`}>
      <div className="object-chrome" aria-hidden="true"><i /><i /><i /><span>{isProduct ? item.title : 'AIGC / VIDEO WORK'}</span></div>
      <img src={screens[1]} alt={item.alt} loading="lazy" />
      {!isProduct && <span className="film-time" aria-hidden="true"><span>▶</span> {media.find(m => m.id === item.mediaId)?.title}</span>}
    </div>
    <span className="stage-caption">{item.id === 'lingyan' ? '从构想到判断' : item.id === 'zhiyin' ? '以乐载道' : item.id === 'brand' ? '让品牌被看见' : item.stageCaption}</span>
    <span className="project-open"><Icon name={isProduct ? 'diagonal' : 'play'} size={21} /></span>
  </div>;
}

function App() {
  usePointerLight();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('全部作品');
  const [project, setProject] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [allMedia, setAllMedia] = useState(false);
  const [mediaKind, setMediaKind] = useState('video');
  const [paused, setPaused] = useState(false);
  const [allowMotion, setAllowMotion] = useState(() => sessionStorage.getItem('portfolio-motion') !== 'false');
  const [railPaused, setRailPaused] = useState(false);
  useDragScroll(allowMotion && !railPaused);
  const [openingRun, setOpeningRun] = useState(0);
  const videoRef = useRef(null);
  const [mediaError, setMediaError] = useState(false);
  usePortfolioMotion([filter, allMedia, mediaKind], allowMotion, openingRun);
  useEffect(() => setMediaError(false), [selectedMedia]);
  function toggleVideo() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play().then(() => setPaused(false)).catch(() => setPaused(true)); }
    else { videoRef.current.pause(); setPaused(true); }
  }
  const libraryMedia = media.filter(item => item.kind === mediaKind);
  const shownProjects = filter === '全部作品' ? projects : projects.filter(p => p.category === filter);
  return <>
    <div className="opening"><div className="opening-center" aria-hidden="true"><div className="opening-mask"><div className="opening-monogram">DYJ</div></div><div className="opening-caption">MUSIC · EDUCATION · CREATIVE TECHNOLOGY</div><div className="opening-line" /></div><button className="opening-skip" onClick={() => window.dispatchEvent(new Event('portfolio:skip-opening'))}>跳过开场 ↗</button></div>
    <div className="motion-controls">{allowMotion && <button className="motion-toggle" onClick={() => { window.history.replaceState(null, '', '#home'); window.scrollTo({ top: 0, behavior: 'instant' }); setOpeningRun(value => value + 1); }}>重播开场 ↗</button>}<button className="motion-toggle" aria-pressed={allowMotion} onClick={() => setAllowMotion(value => { sessionStorage.setItem('portfolio-motion', String(!value)); return !value; })}><span className="motion-indicator" />动态效果：{allowMotion ? '开启' : '关闭'}</button></div>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header"><div className="nav-inner">
      <a href="#home" className="wordmark" aria-label="董烨嘉，返回首页"><BrandMark /></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="主导航">{[['about', '关于我'], ['work', '精选作品'], ['strengths', '个人优势']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<button className="nav-resume" onClick={() => { setPdf({ title: '董烨嘉 · 个人简历', src: '/media/resume.pdf' }); setMenuOpen(false); }}>查看简历 <Icon name="diagonal" size={13} /></button></nav>
      <a className="contact-pill" href="#contact">聊一聊 <Icon name="diagonal" size={15} /></a>
      <button className="menu-toggle icon-button" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div></header>

    <main id="main">
      <section id="home" className="hero">
        <div className="hero-background" aria-hidden="true"><video ref={videoRef} autoPlay={allowMotion} preload={allowMotion ? 'metadata' : 'none'} loop muted playsInline poster="/assets/hero-poster.jpg" onError={() => setPaused(true)} onPlay={() => setPaused(false)}>{allowMotion && <source src="/assets/hero.mp4" type="video/mp4" />}</video><div className="hero-veil" /></div>
        <div className="hero-content container">
          <div className="hero-eyebrow"><span className="status-dot" /> MASTER’S STUDENT <span className="eyebrow-divider" /> MUSIC × TECHNOLOGY</div>
          <h1 className="hero-title"><span className="hero-title-mask"><span className="hero-title-first">让技术有温度</span></span><span className="hero-title-mask"><span className="hero-title-second">让想法有回响</span></span></h1>
          <p className="hero-intro">你好，我是董烨嘉。<br className="mobile-break" />一名探索音乐教育与 AI 的硕士研究生。<br />以产品思维连接技术与人，<br className="mobile-break" />把创意变成可以体验的作品。</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">探索我的作品 <Icon name="arrow" size={17} /></a><a className="text-link" href="#about">认识我 <Icon name="diagonal" size={16} /></a></div>
        </div>
        <div className="hero-footer container"><div className="hero-note"><span className="micro-label">A DIFFERENT PERSPECTIVE</span><span>产品的理性，创作的感性。</span></div><a href="#about" className="scroll-hint">向下探索 <span>↓</span></a><button className="hero-play-control" onClick={toggleVideo} aria-label={paused ? '播放背景视频' : '暂停背景视频'}><Icon name={paused ? 'play' : 'pause'} size={15} /><span>影像选自个人作品</span></button></div>
      </section>

      <section id="about" className="about section container">
        <div className="section-word" aria-hidden="true"><span>ABOUT ME</span></div><div className="section-label" data-reveal><span>01 / ABOUT ME</span><span>交叉背景，不设边界</span></div>
        <div className="about-grid" data-reveal>
          <div className="portrait-card"><img src="/assets/portrait.jpg" alt="董烨嘉个人照片" loading="lazy" /><div className="portrait-caption"><span>DONG YEJIA</span><span>硕士研究生 · 音乐教育与 AI</span></div><span className="portrait-badge"><span className="status-dot" /> OPEN TO OPPORTUNITIES</span></div>
          <div className="about-copy"><span className="small-kicker">从音乐课堂，到学习与体验。</span><h2>理性构建产品，<br /><span className="muted">感性理解体验。</span></h2><p>我叫董烨嘉，目前在武汉音乐学院攻读音乐教育硕士。曾在高中承担音乐教学，参与合唱与艺术节活动。我关注音乐如何被理解、体验与表达，也关注不同学习者的需求。</p><p>从课堂教学到 AI 产品实践，我尝试将教育中的学习者视角带入用户调研、功能设计与内容创作，探索 AI 如何支持音乐学习、文化理解和创意表达。</p><div className="about-tags"><span>音乐教育</span><span>AI 产品设计</span><span>多模态评测</span><span>AIGC 创作</span><span>音乐 × AI</span></div><div className="about-links"><span>{profile.email}</span><button onClick={() => setPdf({ title: '董烨嘉 · 个人简历', src: '/media/resume.pdf' })}>阅读完整简历 <Icon name="diagonal" size={15} /></button></div></div>
        </div>
        <div className="stats" data-reveal>{[['02', '推动产品功能上线', '用户调研 → PRD → 交付'], ['100+', '多模态测试数据', '理解 · 识别 · 推理'], ['07', '音频质量评测维度', '从听感走向标准'], ['80+', '内容策划与发布', '策略 · 创作 · 分发']].map(([value, label, detail]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>)}</div>
      <section id="campus" className="campus-section about-campus" aria-labelledby="campus-heading"><div><div className="section-word" aria-hidden="true"><span>ON CAMPUS</span></div>
        <div className="section-label" data-reveal><span>ON CAMPUS</span><span>学习、研究与创作</span></div>
        <div className="campus-layout"><div className="campus-lead" data-reveal><span className="micro-label">WUHAN CONSERVATORY OF MUSIC</span><h2 id="campus-heading">以音乐为起点<br /><span className="muted">让探索延伸</span></h2><p>武汉音乐学院 · 音乐教育<br />硕士研究生在读</p><figure className="campus-photo"><div className="campus-photo-frame"><img src="/assets/campus-performance.jpg" alt="董烨嘉在钢琴伴奏下进行舞台演唱" loading="lazy" decoding="async" /></div><figcaption><span>ON STAGE / 在音乐现场</span><span>音乐学习，也发生在舞台上。</span></figcaption></figure></div>
        <div className="campus-stories">{campus.map(item => <article className="campus-story" key={item.number} data-reveal><span className="campus-number">{item.number}</span><div><span className="micro-label">{item.label}</span><h3>{item.title}</h3><p>{item.detail}</p><div className="campus-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></div>
      </div></section>

        <div className="experience" data-reveal><div className="experience-title"><span className="micro-label">PROFESSIONAL PRACTICE / 企业实践</span><h3>每一段经历，<br />都成为新的视角。</h3><p>武汉音乐学院 · 音乐教育<br />本科 2021—2025 / 硕士 2025—2028（在读）</p></div><div className="timeline">{profile.experience.map(item => <div className="timeline-row" key={item.company}><span className="timeline-date">{item.date}</span><div><h4>{item.company}<span>{item.role}</span></h4><p>{item.detail}</p><ul className="experience-highlights">{item.highlights.map(([label, text]) => <li key={label}><strong>{label}</strong><span>{text}</span></li>)}</ul></div></div>)}</div></div>
        <section className="project-practice" aria-labelledby="project-practice-title"><div className="creative-orbit" aria-hidden="true"><i /><i /><i /><span>✳</span></div><div className="practice-heading"><div><span className="micro-label">PROJECT EXPERIENCE / 项目经历</span><h3 id="project-practice-title">在真实项目中<br /><span className="muted">把能力做具体</span></h3></div><p>数据评测、内容运营与音乐制作，<br />以及从零搭建音乐教育产品的探索。</p></div><div className="practice-rail-toolbar"><p className="practice-scroll-hint">缓慢流动 · 按住卡片左右拖动</p><button className="rail-toggle" onClick={() => setRailPaused(!railPaused)} aria-pressed={railPaused}>{railPaused ? "继续滚动" : "暂停滚动"}<Icon name={railPaused ? "play" : "pause"} size={13} /></button></div><div className="practice-grid" tabIndex={0} role="region" aria-label="项目经历，可按住拖动或横向滚动查看更多">{projectExperience.map(item => <article className="practice-card" key={item.id}><div className="practice-top"><span className="micro-label">{item.role}</span><span className="practice-number">{item.number}</span></div><h4>{item.company}</h4><h5>{item.title}</h5><p className="practice-summary">{item.summary}</p><div className="practice-outcomes">{item.outcomes.map(outcome => <span key={outcome}>{outcome}</span>)}</div><dl className="practice-details">{item.work.map(([label,text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>{item.projectId && <button className="practice-link" onClick={() => setProject(projects.find(project => project.id === item.projectId))}>查看项目详情 <Icon name="diagonal" size={15} /></button>}</article>)}</div></section>
      </section>

      <section id="work" className="work section"><div className="container">
        <div className="section-word" aria-hidden="true"><span>SELECTED WORK</span></div><div className="section-label" data-reveal><span>02 / SELECTED WORK</span><span>从想法，到真实体验</span></div>
        <div className="section-heading" data-reveal><h2>思考的痕迹<br /><span className="muted">也是行动的答案</span></h2><p>音乐教育、产品设计与 AI 音视频创作。<br />不同的表达，同样关注真实的体验。</p></div>
        <div className="filter-bar" role="group" aria-label="筛选作品">{['全部作品', 'AI 产品', 'AIGC 创作'].map(label => <button key={label} className={filter === label ? 'active' : ''} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}{label === '全部作品' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div>
        {['AI 产品', 'AIGC 创作'].map(category => {
          const items = shownProjects.filter(item => item.category === category);
          return items.length > 0 && <div className={`work-group ${category === 'AIGC 创作' ? 'aigc-group' : 'product-group'}`} key={category}><div className="work-group-label"><span>{category === 'AIGC 创作' ? 'AIGC / MOTION & IMAGINATION' : 'AI / PRODUCT & EXPERIENCE'}</span><span>{category}</span></div><div className={`project-grid ${category === 'AIGC 创作' ? 'aigc-grid' : ''}`}>{items.map(item => <button className={`project-card project-${item.id}`} key={item.id} onClick={() => setProject(item)} data-reveal><ProjectArtwork item={item} /><div className="project-info"><div><span className="project-overline">{item.category} <span> / </span> {item.year}</span><h3>{item.title}</h3><p>{item.subtitle}</p></div><span className="project-number">{item.number}</span></div></button>)}</div></div>;
        })}

        <div className="media-section" data-reveal><div className="media-heading"><div><span className="micro-label">THE CREATIVE LIBRARY</span><h3>一些想法，值得被看见、被听见。</h3></div><span>{media.length} 件音视频作品</span></div><div className="filter-bar library-filters" role="group" aria-label="音视频分类">{[['video', '视频'], ['audio', '音频']].map(([kind, label]) => <button key={kind} aria-pressed={mediaKind === kind} className={mediaKind === kind ? 'active' : ''} onClick={() => { setMediaKind(kind); setAllMedia(false); }}>{label}<span>{media.filter(item => item.kind === kind).length}</span></button>)}</div><div className="media-grid">{(allMedia ? libraryMedia : libraryMedia.slice(0, 6)).map(item => <button className={`media-item ${item.kind}`} onClick={() => setSelectedMedia(item)} key={item.id}><div className="media-cover">{item.kind === 'video' ? <img src={item.poster} alt={`${item.title}视频封面`} loading="lazy" /> : <div className="audio-art"><Icon name="wave" size={34} /></div>}<span className="media-play"><Icon name="play" size={16} /></span><span className="media-kind">{item.kind === 'video' ? 'VIDEO' : 'AUDIO'}</span></div><div className="media-item-title"><span>{item.title}</span><Icon name="diagonal" size={14} /></div></button>)}</div>{libraryMedia.length > 6 && <button className="button button-outline media-more" onClick={() => setAllMedia(!allMedia)}>{allMedia ? '收起作品' : `查看全部${mediaKind === 'video' ? '视频' : '音频'}`}<Icon name={allMedia ? 'close' : 'plus'} size={16} /></button>}</div>
      </div></section>

      <section id="strengths" className="strengths section container"><div className="section-word" aria-hidden="true"><span>WHAT I BRING</span></div><div className="section-label" data-reveal><span>03 / WHAT I BRING</span><span>让不同的能力，相互成就</span></div><div className="section-heading" data-reveal><h2>跨界，是起点；<br /><span className="muted">落地，才是答案。</span></h2><p>将音乐教育、产品方法与 AI 创作，<br />带进同一个解决问题的过程。</p></div><div className="strength-grid">{[
        ['layers', '01', '把问题，定义清楚。', '产品思考与设计', '从用户调研、竞品分析到 PRD 和原型设计，梳理需求优先级，推动功能从想法走向上线。', ['用户研究', 'PRD', '原型设计']],
        ['target', '02', '让判断，有据可依。', 'AI 与数据评测', '参与多模态测试数据设计与模型评测，构建音乐类数据的 7 维质量标准，让体验判断形成可复用的方法。', ['多模态评测', '数据标注', '质量标准']],
        ['spark', '03', '把工具，变成生产力。', 'AI 应用与实现', '运用 Python 基础编程与 Vibe Coding 搭建 AI 产品原型，结合品牌营销 Skill 探索内容生产流程。', ['Python', 'Vibe Coding', 'AI 工作流']],
        ['wave', '04', '让音乐，走近学习者。', '音乐教育与创意表达', '结合音乐教育训练与高中教学经历，关注音乐欣赏、课堂体验与艺术实践；将词曲编创和 AI 音视频工具用于探索更丰富的音乐学习方式。', ['音乐教学', '艺术实践', 'AI 音乐创作']],
      ].map(([icon, num, title, label, text, tags]) => <article className="strength-card" data-reveal key={num}><div className="strength-top"><Icon name={icon} size={29} /><span>{num}</span></div><span className="strength-label">{label}</span><h3>{title}</h3><p>{text}</p><div className="strength-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>

      <section id="contact" className="contact-section"><div className="contact-glow" /><div className="container contact-content"><div className="section-word" aria-hidden="true"><span>LET’S CONNECT</span></div><div className="section-label"><span>04 / LET’S CONNECT</span><span><span className="status-dot" /> 期待新的合作与机会</span></div><div className="contact-main" data-reveal><span className="small-kicker">下一个有意思的产品，或许始于一次对话。</span><h2>让好想法，<br /><span>有下一步。</span></h2><div className="contact-layout"><div className="contact-details"><div><span className="micro-label">EMAIL / 邮箱</span><p>{profile.email}</p></div><div><span className="micro-label">PHONE / 手机</span><p>+86 {profile.phone.slice(0, 3)} {profile.phone.slice(3, 7)} {profile.phone.slice(7)}<small>微信同号</small></p></div></div><figure className="wechat-card"><img src="/assets/wechat-qr.jpg" alt="董烨嘉的微信二维码，扫码添加微信" loading="lazy" decoding="async" /><figcaption>扫一扫，微信联系</figcaption></figure></div></div><footer><a href="#home" className="wordmark"><BrandMark /></a><span>© {new Date().getFullYear()} 董烨嘉 · 用思考构建，用创作表达。</span><a href="#home">回到顶部 ↑</a></footer></div></section>
    </main>

    {project && <Modal title={project.title} onClose={() => setProject(null)} wide><div className="project-dialog"><span className="small-kicker">{project.type} / {project.year}</span><h2>{project.title}</h2><p className="dialog-intro">{project.description}</p><div className="dialog-facts">{project.facts.map(([label, value]) => <div key={label}><small>{label}</small><span>{value}</span></div>)}</div><img className="dialog-image" src={project.detailImage || project.image} alt={project.alt} /><div className="dialog-actions">{project.url && <a className="button button-dark" href={project.url} target="_blank" rel="noreferrer">体验产品 <Icon name="diagonal" size={16} /></a>}{project.pdf && <button className="button button-outline" onClick={() => { setPdf({ title: project.title + ' · 项目文档', src: project.pdf }); setProject(null); }}>阅读项目文档 <Icon name="arrow" size={16} /></button>}{project.mediaId && <button className="button button-dark" onClick={() => { setSelectedMedia(media.find(m => m.id === project.mediaId)); setProject(null); }}>播放代表作品 <Icon name="play" size={16} /></button>}</div>{project.url && <p className="dialog-note">产品托管于 Render，首次唤醒可能需要约 30 秒。</p>}</div></Modal>}
    {selectedMedia && <Modal title={selectedMedia.title} onClose={() => setSelectedMedia(null)} wide><div className="player-wrap">{selectedMedia.kind === 'video' ? <video key={selectedMedia.id} src={selectedMedia.src} poster={selectedMedia.poster} controls autoPlay playsInline preload="metadata" onError={() => setMediaError(true)} /> : <div className="audio-player"><div className="audio-player-art"><Icon name="wave" size={60} /></div><span className="micro-label">AI × MUSIC / ORIGINAL SOUND</span><h2>{selectedMedia.title}</h2><audio key={selectedMedia.id} src={selectedMedia.src} controls autoPlay preload="metadata" onError={() => setMediaError(true)} /></div>}<div className="player-description"><span>{selectedMedia.kind === 'video' ? '视频作品' : '音频作品'} · 董烨嘉作品集</span><a href={selectedMedia.src} target="_blank" rel="noreferrer">单独打开 <Icon name="diagonal" size={14} /></a></div>{mediaError && <p className="error-note">浏览器未能播放此文件，请尝试单独打开或下载后查看。</p>}</div></Modal>}
    {pdf && <Modal title={pdf.title} onClose={() => setPdf(null)} wide><div className="pdf-toolbar"><p>在线阅读或下载原文件。</p><a href={pdf.src} target="_blank" rel="noreferrer" className="text-link">打开 PDF <Icon name="diagonal" size={16} /></a><a href={pdf.src} download className="text-link">下载 <Icon name="download" size={16} /></a></div><React.Suspense fallback={<p className="pdf-loading">正在加载阅读器…</p>}><PdfViewer src={pdf.src} title={pdf.title} /></React.Suspense></Modal>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

import './updates.css';

