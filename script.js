/* =========================================================================
   script.js — Academic Research Portfolio
   -------------------------------------------------------------------------
   ✏️ = places you are expected to edit.

   0. ✏️ CONFIG ............ name variants, links, CV, contact form, vault
   1. ✏️ I18N .............. every UI string in English + 繁體中文
   2. ✏️ CONTENT DATA ...... news, education, research, publications,
                             projects, skills, certifications
   3.  Utilities & icons
   4.  Theme + hanging lamp (spring physics)
   5.  Language switcher
   6.  Renderers
   7.  Publications: filters, BibTeX, abstract modal
   8.  Certificate vault (admin-only, AES-GCM encrypted files)
   9.  Navigation, scroll spy, reveal animations
   10. Contact form
   11. Init

   Bilingual fields: any text field can be either a plain string
   ("same in both languages") or an object { en: "...", zh: "..." }.
========================================================================= */
'use strict';

/* =========================================================================
   0. ✏️ CONFIG
========================================================================= */
const CONFIG = {
  // Spellings of your name as they appear in author lists — they get bolded.
  ownerNames: ['Hassan Abbas', 'H. Abbas', '阿巴斯'],

  // ✏️ Social & academic links. Leave a value '' to hide that icon.
  links: {
    scholar:  '',   // ✏️ add when you have a Google Scholar profile
    github:   'https://github.com/hassan827163',
    orcid:    '',   // ✏️ add when you have an ORCID iD (free at orcid.org)
    linkedin: 'https://www.linkedin.com/in/hassan-abbas-599ab5270',
    email:    'turihassan8@gmail.com',
  },

  lastUpdated: '2026-11',          // ✏️ shown in footer (YYYY-MM)

  // ✏️ Contact form. With no endpoint the form opens the visitor's mail app.
  // For real form submissions, create a free form at https://formspree.io
  // and paste its endpoint, e.g. 'https://formspree.io/f/abcdwxyz'
  formspreeEndpoint: '',

  defaultLang: 'auto',             // 'en' | 'zh' | 'auto' (follows the browser)
  lampSound: true,                 // tiny "click" when the lamp switches

  // ✏️ PRIVATE VAULT — see SETUP.md.
  // Verifier for YOUR passphrase (the passphrase itself is never stored here).
  // To change the passphrase: make a new verifier AND re-encrypt every file
  // with tools/vault-tool.html, using the same new passphrase.
  vault: {
    verifier: 'OxbV3J0J1CPF2ex3g6eqbGGVyeikB7UHueEnYTcFmjVZR1IH3a/c+726Mk+YSwtJhp4N7rH0A8hbw+sP07s=',
  },
};

/* =========================================================================
   1. ✏️ I18N DICTIONARY
   - HTML elements use  data-i18n="key"        → textContent
                        data-i18n-html="key"   → innerHTML (you may use <a>, <strong>)
                        data-i18n-attr="placeholder:key; aria-label:key2"
   - To add a string: add the same key to both `en` and `zh`.
   - Missing zh keys fall back to English automatically.
========================================================================= */
const I18N = {
  en: {
    'meta.title': 'Hassan Abbas · AI & Data Researcher',
    'a11y.skip': 'Skip to content',

    'nav.about': 'About',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.certifications': 'Certifications',
    'nav.contact': 'Contact',

    // ✏️ HERO
    'hero.eyebrow': 'M.S. Candidate · Master Program in AI Applications and Management · National Taipei University',
    'hero.name': 'Hassan Abbas',
    'hero.title': 'AI & Data Engineer — Deep Learning, Explainable AI & Cybersecurity',
    'hero.bio': 'I build deep learning models end to end in Python — from data preprocessing to evaluation — with a focus on <strong>explainable AI for healthcare</strong> and <strong>AI-driven cybersecurity</strong>. M.S. candidate (GPA 4.3/4.3) and author of three research papers, two as first author.',
    'hero.cv': 'Download CV',
    'hero.contact': 'Get in touch',
    'hero.caption': 'New Taipei City, Taiwan',
    'hero.pullHint': '← pull me',

    // ✏️ ABOUT
    'about.heading': 'About',
    'about.p1': 'I am an M.S. candidate in the <strong>Master Program in Artificial Intelligence Applications and Management</strong> at National Taipei University. My research combines deep learning, radiomics and explainable AI to make medical-imaging models more transparent, and applies AI to security problems such as layered ROS 2 defence and real-time URL threat detection.',
    'about.p2': 'Most recently I was an AI & Cybersecurity Research Intern at <strong>CCRI, Asia University</strong>, where I built an AI-based URL risk-scoring system. Before coming to Taiwan I completed a B.S. in Computer Science at Hazara University and AI/ML training in Pakistan, earning the Microsoft Azure AI Fundamentals certification. I am looking for <strong>AI / big-data roles and research collaborations</strong> that support digital transformation.',
    'about.eduHeading': 'Education',
    'news.heading': 'Recent Updates & Milestones',
    'news.new': 'New',

    'research.heading': 'Research Interests',
    'research.lead': 'The questions I keep coming back to, and the methods I use to answer them.',

    'pubs.heading': 'Publications & Conference Papers',
    'pubs.lead': 'Research papers in AI security, medical imaging and bioinformatics. <strong>Bold</strong> marks my name.',
    'pubs.all': 'All topics',
    'pubs.allYears': 'All years',
    'pubs.allTypes': 'All types',
    'pubs.yearLabel': 'Year',
    'pubs.typeLabel': 'Type',
    'pubs.searchLabel': 'Search publications',
    'pubs.search': 'Search title, author, venue…',
    'pubs.showing': 'Showing {n} of {total} publications',
    'pubs.empty': 'No publications match these filters.',
    'pubs.reset': 'Reset filters',
    'pubs.abstract': 'Abstract',
    'pubs.bibtex': 'BibTeX',
    'pubs.copyBib': 'Copy BibTeX',
    'pubs.copied': 'BibTeX copied to clipboard',
    'pubs.pdf': 'PDF',
    'pubs.code': 'Code',
    'pubs.doi': 'DOI',
    'pubs.slides': 'Slides',
    'pubs.video': 'Video',
    'pubs.noAbstract': 'Abstract coming soon.',

    'projects.heading': 'Projects',
    'projects.lead': 'Research prototypes, open-source tools and side projects.',
    'projects.code': 'Code',
    'projects.demo': 'Demo',
    'projects.paper': 'Paper',

    'skills.heading': 'Skills & Tech Stack',

    'certs.heading': 'Certifications',
    'certs.lead': 'Professional training and credentials.',
    'certs.credential': 'Credential ID',
    'certs.verify': 'Verify',
    'certs.viewPdf': 'View PDF',
    'certs.viewImage': 'View image',

    'admin.title': 'Private vault',
    'admin.desc': 'Enter your password. Certificate files are decrypted locally in this browser tab and never leave it.',
    'admin.passLabel': 'Password',
    'admin.unlock': 'Unlock',
    'admin.cancel': 'Cancel',
    'admin.wrong': 'Incorrect password.',
    'admin.notConfigured': 'Vault is not configured yet — see SETUP.md.',
    'admin.unlocked': 'Vault unlocked — view buttons are now visible.',
    'admin.locked': 'Vault locked.',
    'admin.already': 'Vault is already unlocked.',
    'admin.badge': 'Admin mode',
    'admin.lock': 'Lock',
    'admin.decrypting': 'Decrypting…',
    'admin.decryptFail': 'Could not open this file.',
    'admin.openTab': 'Open in new tab',
    'admin.download': 'Download',
    'admin.cryptoMissing': 'This browser cannot decrypt files here (HTTPS is required).',

    'contact.heading': 'Contact',
    'contact.lead': "I'm always happy to talk about research collaborations, internships, or teaching. The quickest way to reach me is by email.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.note': 'Your message goes straight to my inbox.',
    'contact.noteMail': 'Opens your email app with the message pre-filled.',
    'contact.sent': 'Thanks! Your message has been sent.',
    'contact.error': 'Something went wrong — please email me directly.',
    'contact.invalid': 'Please fill in all fields with a valid email.',
    'contact.subject': 'Message from your portfolio',

    'social.email': 'Email',
    'footer.rights': 'All rights reserved.',
    'footer.updated': 'Last updated',
    'theme.toDark': 'Switch to dark mode (turn the lamp on)',
    'theme.toLight': 'Switch to light mode (turn the lamp off)',
    'lamp.label': 'Pull the lamp cord to toggle dark mode',
    'modal.close': 'Close',
  },

  zh: {
    'meta.title': '阿巴斯 Hassan Abbas · AI 與數據研究',
    'a11y.skip': '跳至主要內容',

    'nav.about': '關於我',
    'nav.research': '研究',
    'nav.publications': '論文發表',
    'nav.projects': '專案',
    'nav.skills': '技能',
    'nav.certifications': '證照',
    'nav.contact': '聯絡',

    // ✏️ HERO
    'hero.eyebrow': '國立臺北大學 · 人工智慧應用與管理英語碩士學位學程',
    'hero.name': '阿巴斯 Hassan Abbas',
    'hero.title': 'AI 與數據工程師 — 深度學習、可解釋 AI 與資訊安全',
    'hero.bio': '能以 Python 完整開發深度學習模型，涵蓋資料前處理至模型評估，專注於<strong>醫療領域的可解釋 AI</strong>與<strong>AI 資訊安全</strong>。碩士生（GPA 4.3/4.3），共發表三篇研究論文，其中兩篇為第一作者。',
    'hero.cv': '下載履歷',
    'hero.contact': '與我聯絡',
    'hero.caption': '台灣・新北市',
    'hero.pullHint': '← 拉一下',

    // ✏️ ABOUT
    'about.heading': '關於我',
    'about.p1': '我目前就讀國立臺北大學<strong>人工智慧應用與管理英語碩士學位學程</strong>。研究結合深度學習、影像組學與可解釋 AI，讓醫學影像模型更透明；也將 AI 應用於資安問題，例如 ROS 2 多層防禦與即時惡意網址偵測。',
    'about.p2': '最近於<strong>亞洲大學 CCRI</strong> 擔任 AI 與資安研究實習生，開發 AI 網址風險評分系統。來台之前，我於巴基斯坦哈扎拉大學取得電腦科學學士，並在當地完成 AI／機器學習培訓，取得 Microsoft Azure AI 基礎認證。目前正在尋找<strong>AI／大數據相關職缺與研究合作</strong>機會，協助數位轉型。',
    'about.eduHeading': '學歷',
    'news.heading': '最新動態與里程碑',
    'news.new': '新',

    'research.heading': '研究興趣',
    'research.lead': '我持續探索的問題，以及我用來回答這些問題的方法。',

    'pubs.heading': '論文與研討會發表',
    'pubs.lead': '涵蓋 AI 資安、醫學影像與生物資訊的研究論文。<strong>粗體</strong>為本人。',
    'pubs.all': '全部主題',
    'pubs.allYears': '所有年份',
    'pubs.allTypes': '所有類型',
    'pubs.yearLabel': '年份',
    'pubs.typeLabel': '類型',
    'pubs.searchLabel': '搜尋論文',
    'pubs.search': '搜尋標題、作者、會議期刊…',
    'pubs.showing': '顯示 {n} / {total} 篇論文',
    'pubs.empty': '沒有符合條件的論文。',
    'pubs.reset': '清除篩選',
    'pubs.abstract': '摘要',
    'pubs.bibtex': 'BibTeX',
    'pubs.copyBib': '複製 BibTeX',
    'pubs.copied': '已複製 BibTeX',
    'pubs.pdf': 'PDF',
    'pubs.code': '程式碼',
    'pubs.doi': 'DOI',
    'pubs.slides': '投影片',
    'pubs.video': '影片',
    'pubs.noAbstract': '摘要即將公開。',

    'projects.heading': '專案',
    'projects.lead': '研究原型、開源工具與個人專案。',
    'projects.code': '程式碼',
    'projects.demo': '展示',
    'projects.paper': '論文',

    'skills.heading': '技能與技術',

    'certs.heading': '證照',
    'certs.lead': '專業訓練與認證。',
    'certs.credential': '證書編號',
    'certs.verify': '驗證',
    'certs.viewPdf': '檢視 PDF',
    'certs.viewImage': '檢視圖片',

    'admin.title': '私人文件庫',
    'admin.desc': '請輸入密碼。證書檔案只會在此分頁中於本機解密，不會傳送到任何地方。',
    'admin.passLabel': '密碼',
    'admin.unlock': '解鎖',
    'admin.cancel': '取消',
    'admin.wrong': '密碼錯誤。',
    'admin.notConfigured': '尚未設定文件庫，請參考 SETUP.md。',
    'admin.unlocked': '已解鎖，現在可以檢視證書檔案。',
    'admin.locked': '文件庫已上鎖。',
    'admin.already': '文件庫已經解鎖。',
    'admin.badge': '管理員模式',
    'admin.lock': '上鎖',
    'admin.decrypting': '解密中…',
    'admin.decryptFail': '無法開啟此檔案。',
    'admin.openTab': '在新分頁開啟',
    'admin.download': '下載',
    'admin.cryptoMissing': '此瀏覽器無法在這裡解密檔案（需要 HTTPS）。',

    'contact.heading': '聯絡我',
    'contact.lead': '歡迎與我討論研究合作、實習或教學相關的機會，最快的方式是寄電子郵件給我。',
    'contact.name': '姓名',
    'contact.email': '電子郵件',
    'contact.message': '訊息',
    'contact.send': '送出訊息',
    'contact.note': '訊息會直接寄到我的信箱。',
    'contact.noteMail': '將開啟你的郵件程式，並自動帶入訊息內容。',
    'contact.sent': '謝謝！訊息已送出。',
    'contact.error': '發生錯誤，請直接寄信給我。',
    'contact.invalid': '請填寫所有欄位並輸入有效的電子郵件。',
    'contact.subject': '來自個人網站的訊息',

    'social.email': '電子郵件',
    'footer.rights': '版權所有。',
    'footer.updated': '最後更新',
    'theme.toDark': '切換為深色模式（開燈）',
    'theme.toLight': '切換為淺色模式（關燈）',
    'lamp.label': '拉動燈繩以切換深色模式',
    'modal.close': '關閉',
  },
};

/* =========================================================================
   2. ✏️ CONTENT DATA
========================================================================= */

/* ---- Topic labels used by publications & filters ---- */
const TOPICS = {
  ml:       { en: 'Machine Learning', zh: '機器學習' },
  xai:      { en: 'Explainable AI', zh: '可解釋 AI' },
  medical:  { en: 'Medical Imaging', zh: '醫學影像' },
  security: { en: 'Cybersecurity', zh: '資訊安全' },
  robotics: { en: 'Robotics / ROS 2', zh: '機器人／ROS 2' },
  bioinfo:  { en: 'Bioinformatics', zh: '生物資訊' },
};

/* ---- Publication types (key → label + BibTeX entry type) ---- */
const PUB_TYPES = {
  conference: { en: 'Conference', zh: '研討會論文', bib: 'inproceedings', venueField: 'booktitle' },
  journal:    { en: 'Journal',    zh: '期刊論文',   bib: 'article',       venueField: 'journal' },
  workshop:   { en: 'Workshop',   zh: '工作坊',     bib: 'inproceedings', venueField: 'booktitle' },
  preprint:   { en: 'Preprint',   zh: '預印本',     bib: 'misc',          venueField: 'howpublished' },
  thesis:     { en: 'Thesis',     zh: '學位論文',   bib: 'mastersthesis', venueField: 'school' },
};

/* ---- ✏️ NEWS / TIMELINE ----
   type: 'paper' | 'talk' | 'award' | 'milestone'
   date: 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'. Items within 60 days get a "New" badge.
   ✏️ Dates marked "approx." are guesses from your CV — please correct them. */
const NEWS = [
  { date: '2026-08', type: 'milestone',
    text: { en: 'Completed the International Summer Research Internship at <strong>CCRI, Asia University</strong> — built an AI-based URL risk-scoring system.',
            zh: '完成<strong>亞洲大學 CCRI</strong> 國際暑期研究實習，開發 AI 網址風險評分系統。' } },
  { date: '2026', type: 'paper',   // approx.
    text: { en: 'First-author paper <em>DIAL-ROS: Defense-in-Depth Analysis of Layered ROS 2 Security</em> accepted. 🎉',
            zh: '第一作者論文〈DIAL-ROS：ROS 2 多層資安縱深防禦分析〉獲接受。🎉' } },
  { date: '2026', type: 'paper',   // approx.
    text: { en: 'Co-authored paper on a transcriptomic signature for LUAD / LUSC classification accepted.',
            zh: '共同作者論文（LUAD／LUSC 轉錄體特徵分類）獲接受。' } },
  { date: '2025', type: 'milestone',   // approx. (start month?)
    text: { en: 'Started my M.S. at National Taipei University; now in the Master Program in AI Applications and Management.',
            zh: '進入國立臺北大學碩士班就讀，現為人工智慧應用與管理英語碩士學位學程。' } },
  { date: '2025', type: 'award',   // approx.
    text: { en: 'Completed Taiwan’s Academic Research Ethics Education course with a 97.14% exam score.',
            zh: '完成臺灣學術倫理教育課程，測驗成績 97.14%。' } },
  { date: '2025-03', type: 'milestone',
    text: { en: 'Completed AI & Machine Learning training at GTTI, Pakistan (Microsoft AI-900 score 945/1000).',
            zh: '完成巴基斯坦政府技術訓練學院 AI 與機器學習培訓（Microsoft AI-900 成績 945/1000）。' } },
  { date: '2025-02-26', type: 'award',
    text: { en: 'Earned <strong>Microsoft Certified: Azure AI Fundamentals</strong> (AI-900).',
            zh: '取得 <strong>Microsoft Azure AI 基礎認證</strong>（AI-900）。' } },
];

/* ---- ✏️ EDUCATION ---- */
const EDUCATION = [
  { period: { en: '2025 – present', zh: '2025 – 至今' },
    degree: { en: 'M.S., Master Program in Artificial Intelligence Applications and Management', zh: '人工智慧應用與管理英語碩士學位學程' },
    school: { en: 'National Taipei University (International College of Sustainability Innovations), Taiwan', zh: '國立臺北大學 永續創新國際學院' },
    note:   { en: 'GPA 4.3 / 4.3', zh: 'GPA 4.3 / 4.3' } },
  { period: '2020 – 2024',
    degree: { en: 'B.S., Computer Science', zh: '電腦科學學士' },
    school: { en: 'Hazara University, Pakistan', zh: '巴基斯坦哈扎拉大學' } },
];

/* ---- ✏️ RESEARCH INTERESTS ----
   icon: any key from ICONS (lightbulb, chart, users, cpu, book, globe, flask, lock …) */
const RESEARCH = [
  { icon: 'lightbulb',
    title: { en: 'Explainable AI for Medical Imaging', zh: '醫學影像的可解釋 AI' },
    desc:  { en: 'Combining CNNs with radiomics and evidence-bound explanations — including LLM-assisted reports — so clinicians can see why a model flags a mammogram.',
             zh: '結合 CNN、影像組學與有依據的解釋（含大型語言模型輔助說明），讓臨床人員理解模型為何標記乳房攝影影像。' },
    keywords: ['CNN', 'Radiomics', 'XAI', 'LLM'] },
  { icon: 'lock',
    title: { en: 'AI for Cybersecurity', zh: 'AI 資訊安全' },
    desc:  { en: 'Defence-in-depth analysis of ROS 2 robotic systems and machine-learning models that score URL threats in real time.',
             zh: 'ROS 2 機器人系統的縱深防禦分析，以及即時評估網址威脅的機器學習模型。' },
    keywords: ['ROS 2', 'Threat Detection', 'Penetration Testing'] },
  { icon: 'cpu',
    title: { en: 'Deep Learning & Computer Vision', zh: '深度學習與電腦視覺' },
    desc:  { en: 'End-to-end pipelines for recognition, detection and segmentation — from preprocessing and augmentation to rigorous evaluation.',
             zh: '從資料前處理、擴增到嚴謹評估的辨識、偵測與分割完整流程。' },
    keywords: ['TensorFlow', 'YOLOv8', 'OpenCV'] },
  { icon: 'flask',
    title: { en: 'Reproducible Biomedical ML', zh: '可重現的生醫機器學習' },
    desc:  { en: 'Compact, biologically meaningful signatures that generalise across patient cohorts.',
             zh: '建立精簡且具生物意義、可跨族群泛化的特徵標記。' },
    keywords: ['Transcriptomics', 'Cross-cohort Validation'] },
];

/* ---- ✏️ PUBLICATIONS ----
   Required: id (unique, also the BibTeX key), year, type (see PUB_TYPES),
             topics (keys from TOPICS), title, authors, venue
   Optional: month, status, award, abstract, keywords, links {pdf, code, doi, slides, video},
             bibtex (if omitted, a BibTeX entry is generated automatically)
   ✏️ TODO for each paper: full author list, conference/journal name, and the
      official abstract (the text below is a short summary written from your CV). */
const PUBLICATIONS = [
  {
    id: 'abbas2026dialros',
    year: 2026,
    type: 'conference',
    topics: ['security', 'robotics'],
    status: { en: 'Accepted', zh: '已接受' },
    title: 'DIAL-ROS: Defense-in-Depth Analysis of Layered ROS 2 Security',
    authors: 'H. Abbas',                       // ✏️ add co-authors: 'H. Abbas, A. Author, B. Author'
    venue: { en: 'Conference paper — venue to be announced', zh: '研討會論文（會議名稱待公布）' }, // ✏️
    abstract: {
      en: 'A layered, defence-in-depth security analysis of the ROS 2 robotics framework, examining how protections at each layer of the stack combine to resist attacks. (Short summary — replace with the official abstract.)',
      zh: '針對 ROS 2 機器人框架進行多層縱深防禦資安分析，探討各層防護如何共同抵禦攻擊。（簡短摘要，請替換為正式摘要。）',
    },
    links: { pdf: '', code: '', doi: '' },
  },
  {
    id: 'abbas2026mammocad',
    year: 2026,
    type: 'conference',
    topics: ['medical', 'xai', 'ml'],
    status: { en: 'Under review', zh: '審查中' },
    title: 'Reproducible Multimodal Fusion for Mammography CAD: CNN–Radiomics Modelling with Evidence-Bound XAI and LLM-Assisted Explanations on CBIS-DDSM',
    authors: 'H. Abbas',                       // ✏️ add co-authors
    venue: { en: 'Conference paper — under review', zh: '研討會論文（審查中）' },
    abstract: {
      en: 'A reproducible computer-aided detection pipeline for mammography that fuses CNN features with radiomics on the CBIS-DDSM dataset, paired with evidence-bound explainable AI and LLM-assisted explanations. (Short summary — replace with the official abstract.)',
      zh: '以 CBIS-DDSM 資料集建立可重現的乳房攝影電腦輔助偵測流程，融合 CNN 特徵與影像組學，並結合有依據的可解釋 AI 及大型語言模型輔助說明。（簡短摘要，請替換為正式摘要。）',
    },
    links: { pdf: '', code: '' },
  },
  {
    id: 'luad2026signature',
    year: 2026,
    type: 'conference',                        // ✏️ change to 'journal' if it is a journal paper
    topics: ['bioinfo', 'ml'],
    status: { en: 'Accepted', zh: '已接受' },
    title: 'A Compact and Biologically Reproducible Transcriptomic Signature for Cross-Cohort LUAD and LUSC Classification',
    authors: 'Co-authors, H. Abbas',           // ✏️ replace with the real author order
    venue: { en: 'Venue to be announced', zh: '發表處待公布' },
    abstract: {
      en: 'A compact gene-expression signature that distinguishes lung adenocarcinoma (LUAD) from lung squamous cell carcinoma (LUSC) and remains reproducible across independent cohorts. (Short summary — replace with the official abstract.)',
      zh: '提出精簡的基因表現特徵，可區分肺腺癌（LUAD）與肺鱗狀細胞癌（LUSC），並在不同族群資料中維持可重現性。（簡短摘要，請替換為正式摘要。）',
    },
    links: {},
  },
];

/* ---- ✏️ PROJECTS ----
   ✏️ Add your GitHub repo links in `links.code` (e.g. 'https://github.com/hassan827163/repo-name').
   image is optional (e.g. 'assets/projects/yolo.png'). */
const PROJECTS = [
  { title: { en: 'AI-Based URL Risk Scoring System', zh: 'AI 網址風險評分系統' },
    year: '2026',
    desc: { en: 'Extracts lexical and domain features from URLs and classifies them as Safe, Suspicious or Malicious in real time. Built during my CCRI internship; I led its evaluation and documentation.',
            zh: '萃取網址字元與網域特徵，即時判定為安全、可疑或惡意。於 CCRI 實習期間開發，並負責模型評估與技術文件。' },
    tags: ['Python', 'Machine Learning', 'Cybersecurity'],
    links: { code: '' } },
  { title: { en: 'YOLOv8 Real-Time Computer Vision', zh: 'YOLOv8 即時電腦視覺' },
    year: '',
    desc: { en: 'Object detection, segmentation, pose estimation and counting on live video.',
            zh: '於即時影像中進行物件偵測、分割、姿態估計與計數。' },
    tags: ['Python', 'YOLOv8', 'OpenCV'],
    links: { code: '' } },
  { title: { en: 'Facial Expression Recognition (CNN)', zh: '臉部表情辨識（CNN）' },
    year: '',
    desc: { en: 'A full ML pipeline — preprocessing, augmentation, training and evaluation (confusion matrix, precision, recall) — for seven emotions.',
            zh: '涵蓋前處理、資料擴增、訓練與評估（混淆矩陣、精確率、召回率）的七種情緒辨識完整流程。' },
    tags: ['TensorFlow', 'Keras', 'CNN'],
    links: { code: '' } },
  { title: { en: 'Plant Disease Detector', zh: '植物病害辨識' },
    year: '',
    desc: { en: 'Deep-learning image classifier with a custom preprocessing pipeline and disease-severity analysis.',
            zh: '自建前處理流程的深度學習影像分類器，並分析病害嚴重程度。' },
    tags: ['Deep Learning', 'Image Classification'],
    links: { code: '' } },
  { title: { en: 'IoT Flood Monitoring System', zh: '物聯網淹水監測系統' },
    year: '',
    desc: { en: 'End-to-end sensor data pipeline that streams water-level readings and sends real-time mobile alerts.',
            zh: '從感測器到手機的完整資料流程，即時推播淹水警報。' },
    tags: ['IoT', 'Arduino', 'Real-time Alerts'],
    links: { code: '' } },
];

/* ---- ✏️ SKILLS ---- icon: any key from ICONS below */
const SKILLS = [
  { icon: 'code', group: { en: 'Programming', zh: '程式語言' },
    items: [{ en: 'Python (primary)', zh: 'Python（主要）' }, 'Java', 'C / C++', 'JavaScript', 'SQL'] },
  { icon: 'cpu', group: { en: 'AI / ML', zh: '人工智慧' },
    items: ['TensorFlow', 'Keras', 'scikit-learn', 'CNN', 'XAI', 'LLM', 'Generative AI', { en: 'Prompt engineering', zh: '提示工程' }] },
  { icon: 'chart', group: { en: 'Data', zh: '資料處理' },
    items: [{ en: 'Preprocessing', zh: '資料前處理' }, { en: 'Augmentation', zh: '資料擴增' }, { en: 'Model evaluation', zh: '模型評估' }, { en: 'Excel reporting', zh: 'Excel 報表' }] },
  { icon: 'lock', group: { en: 'Cybersecurity', zh: '資訊安全' },
    items: [{ en: 'Penetration testing', zh: '滲透測試' }, { en: 'Vulnerability assessment', zh: '弱點評估' }, { en: 'ROS 2 security', zh: 'ROS 2 資安' }, { en: 'URL threat detection', zh: '惡意網址偵測' }] },
  { icon: 'globe', group: { en: 'Web, Database & Tools', zh: '網頁、資料庫與工具' },
    items: ['React', 'Next.js', 'REST API', 'MySQL', 'PostgreSQL', 'Git', 'Azure AI', 'Arduino', 'OpenCV', 'Photoshop', 'Canva'] },
  { icon: 'users', group: { en: 'Languages', zh: '語言能力' },
    items: [{ en: 'English — Professional', zh: '英文 — 專業' }, { en: 'Mandarin — TOCFL A2', zh: '華語 — TOCFL A2' }, { en: 'Urdu — Native', zh: '烏爾都語 — 母語' }, { en: 'Pashto', zh: '普什圖語' }] },
];

/* ---- ✏️ CERTIFICATIONS ----
   PUBLIC fields (everyone sees): name, issuer, date, credentialId, verifyUrl
   PRIVATE field (admin mode only): file → an ENCRYPTED copy in /certificates
   Easiest: double-click tools/vault-tool.html, pick your original files,
            and move the downloaded .enc files into /certificates.
            (The names below already match what the tool produces from your file names.)
   Leave file: '' if you don't have a separate file — the entry still shows publicly.
   Never commit the original, unencrypted files. */
const CERTIFICATIONS = [
  { name: { en: 'Certificate of Presentation — DIAL-ROS (TAAI 2026)', zh: '論文發表證書 — DIAL-ROS（TAAI 2026）' },
    issuer: { en: '31st Intl. Conf. on Technologies and Applications of AI (TAAI 2026)', zh: '第 31 屆人工智慧之技術與應用國際研討會（TAAI 2026）' },
    date: '2026-11-21',
    credentialId: 'TAAI2026-I07-#60',
    file: 'certificates/taai-2026-dial-ros.jpeg.enc' },
  { name: { en: 'Certificate of Presentation — LUAD/LUSC Transcriptomic Signature (TAAI 2026)', zh: '論文發表證書 — LUAD／LUSC 轉錄體特徵（TAAI 2026）' },
    issuer: { en: '31st Intl. Conf. on Technologies and Applications of AI (TAAI 2026)', zh: '第 31 屆人工智慧之技術與應用國際研討會（TAAI 2026）' },
    date: '2026-11-21',
    credentialId: 'TAAI2026-D02-#133',
    file: 'certificates/taai-2026-luad-lusc.jpeg.enc' },
  { name: { en: 'International Summer Research Internship (Online)', zh: '國際暑期研究實習（線上）' },
    issuer: { en: 'CCRI, Asia University, Taiwan', zh: '亞洲大學 人工智慧與資安研究創新國際中心（CCRI）' },
    date: '2026-08',
    file: 'certificates/asia-university-ccri.png.enc' },
  { name: { en: 'Academic Research Ethics Education (6 hours) — exam score 97.14%', zh: '學術倫理教育課程（6 小時）— 測驗成績 97.14%' },
    issuer: { en: 'Taiwan AREE Center · National Taipei University', zh: '臺灣學術倫理教育資源中心 · 臺北大學' },
    date: '2025-12',   // ✏️ adjust if the certificate shows another month
    credentialId: 'S114027967',
    // Several private files: each gets its own button in admin mode.
    file: [
      { file: 'certificates/cert-reserch-ethics.pdf.enc' },
      { file: 'certificates/reserch-ethics-cer.jpg.enc', label: { en: 'Certificate (EN)', zh: '證書（英文）' } },
      { file: 'certificates/reserch-ethics-score.png.enc', label: { en: 'Exam score', zh: '測驗成績' } },
    ] },
  { name: { en: 'AI & Machine Learning Training (Microsoft AI-900 score 945/1000)', zh: 'AI 與機器學習培訓（Microsoft AI-900 成績 945/1000）' },
    issuer: { en: 'Govt. Technical Training Institute (GTTI), Rawalpindi', zh: '巴基斯坦拉瓦爾品第 政府技術訓練學院（GTTI）' },
    date: '2025-03-07',
    file: 'certificates/intership-letter-with-international-certification.pdf.enc' },
  { name: { en: 'Microsoft Certified: Azure AI Fundamentals (AI-900)', zh: 'Microsoft Azure AI 基礎認證（AI-900）' },
    issuer: 'Microsoft',
    date: '2025-02-26',
    verifyUrl: '',   // ✏️ optional: your Microsoft Learn credential link (public)
    file: 'certificates/supported-documents-page-0001.jpg.enc' },
  { name: { en: 'Getting Started with Flutter Development', zh: 'Flutter 開發入門' },
    issuer: 'Google Cloud · Coursera',
    date: '2023-09-01',
    file: 'certificates/supported-documents-page-0007.jpg.enc' },
  { name: { en: 'Work Smarter with Microsoft Excel', zh: 'Microsoft Excel 高效應用' },
    issuer: 'Microsoft · Coursera',
    date: '2023-07-15',
    file: 'certificates/supported-documents-page-0006.jpg.enc' },
  { name: { en: 'Programming for Everybody (Getting Started with Python)', zh: 'Python 程式設計入門' },
    issuer: 'University of Michigan · Coursera',
    date: '2023-03-30',
    file: 'certificates/supported-documents-page-0005.jpg.enc' },
  { name: { en: 'Introduction to Networking and Storage', zh: '網路與儲存入門' },
    issuer: 'IBM · Coursera',
    date: '2023-03-01',
    file: 'certificates/supported-documents-page-0004.jpg.enc' },
  { name: { en: 'Digital Citizenship Training — Certificate of Appreciation', zh: '數位公民培訓 — 感謝狀' },
    issuer: { en: 'Hazara University', zh: '巴基斯坦 哈扎拉大學' },
    date: '2022-12',
    file: 'certificates/supported-documents-page-0002.jpg.enc' },
  { name: { en: 'Leadership Training — Certificate of Appreciation', zh: '領導力培訓 — 感謝狀' },
    issuer: { en: 'Hazara University', zh: '巴基斯坦 哈扎拉大學' },
    date: '2022-12',
    file: 'certificates/supported-documents-page-0003.jpg.enc' },
];

/* =========================================================================
   3. UTILITIES & ICONS
========================================================================= */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const state = {
  lang: 'en',
  theme: document.documentElement.getAttribute('data-theme') || 'light',
  pubFilter: { topic: 'all', year: 'all', type: 'all', q: '' },
  firstRender: true,
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

/** Look up a UI string; returns undefined when missing everywhere. */
function lookup(key) {
  const v = I18N[state.lang] && I18N[state.lang][key];
  return v !== undefined ? v : I18N.en[key];
}
/** Translate with {placeholders}. */
function t(key, vars) {
  let s = lookup(key);
  if (s === undefined) return key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));
  return s;
}
/** Pick the current language from a bilingual field. */
function L(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  return v[state.lang] !== undefined ? v[state.lang] : (v.en !== undefined ? v.en : '');
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmtDate(str) {
  if (!str) return '';
  const [y, m, d] = String(str).split('-').map(Number);
  if (state.lang === 'zh') return d ? `${y} 年 ${m} 月 ${d} 日` : m ? `${y} 年 ${m} 月` : `${y} 年`;
  const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return d ? `${M[m - 1]} ${d}, ${y}` : m ? `${M[m - 1]} ${y}` : String(y);
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

/* Inline SVG icons (24×24, stroke-based) — no external icon library needed */
const ICONS = {
  scholar: '<path d="M21.4 10.9a1 1 0 0 0 0-1.8l-8.6-3.9a2 2 0 0 0-1.7 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5-2.6-.5-5.4-.5-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.9 1.7-.2.6-.2 1.2-.1 1.8v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
  orcid: '<circle cx="12" cy="12" r="10"/><path d="M8.5 10.5V17"/><path d="M8.5 7.5v.01"/><path d="M12 10.5h2.2a3.25 3.25 0 0 1 0 6.5H12z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
  copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/>',
  slides: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6.5L4.5 19A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2L14 9.5V3"/><path d="M7 15h10"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
};
function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* =========================================================================
   4. THEME + HANGING LAMP
   Dark mode  = lamp ON  (warm study-lamp glow)
   Light mode = lamp OFF (clean academic paper)
========================================================================= */
let audioCtx;
function playClick(on) {
  if (!CONFIG.lampSound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(on ? 1900 : 1500, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch { /* audio not available — ignore */ }
}

function setTheme(theme, { animate = true, persist = true } = {}) {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  const root = document.documentElement;
  root.setAttribute('data-theme', state.theme);
  if (persist) store.set('theme', state.theme);

  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#13110f' : '#f7f5f0');

  updateThemeControls();

  if (animate) {
    playClick(state.theme === 'dark');
    if (navigator.vibrate) navigator.vibrate(8);
    if (state.theme === 'dark' && !reduceMotion.matches && Lamp.el) {
      Lamp.el.classList.remove('flicker');
      void Lamp.el.offsetWidth; // restart animation
      Lamp.el.classList.add('flicker');
    }
  }
}
function toggleTheme() { setTheme(state.theme === 'dark' ? 'light' : 'dark'); }

function updateThemeControls() {
  const dark = state.theme === 'dark';
  const btn = $('#themeBtn');
  if (btn) {
    btn.innerHTML = icon(dark ? 'sun' : 'moon');
    btn.setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
    btn.title = t(dark ? 'theme.toLight' : 'theme.toDark');
  }
  const pull = $('#lampPull');
  if (pull) {
    pull.setAttribute('aria-pressed', String(dark));
    pull.setAttribute('aria-label', t('lamp.label'));
  }
}

/**
 * Lamp physics: two damped springs.
 *  - y / vy : how far the cord is pulled (SVG units, ≈ px)
 *  - a / va : swing angle of the whole lamp (degrees)
 * Drag the bead down past THRESH and release → toggle.
 * A simple click / Enter does a short "tug" and toggles.
 */
const Lamp = {
  el: null, svg: null, pull: null, cord: null, bead: null, hint: null,
  y: 0, vy: 0, a: 0, va: 0,
  dragging: false, moved: false, startX: 0, startY: 0, raf: 0,
  BASE_Y2: 112,   // resting end of the cord line (matches the SVG)
  MAX: 95,        // maximum pull distance
  THRESH: 36,     // pull distance needed to switch

  init() {
    this.el = $('#lamp');
    if (!this.el) return;
    this.svg = $('.lamp-svg', this.el);
    this.pull = $('#lampPull');
    this.cord = $('#lampCord');
    this.bead = $('#lampBead');
    this.hint = $('#lampHint');

    if (store.get('lampHintSeen')) this.hint.classList.add('hide');

    this.pull.addEventListener('pointerdown', (e) => this.onDown(e));
    this.pull.addEventListener('pointermove', (e) => this.onMove(e));
    this.pull.addEventListener('pointerup', (e) => this.onUp(e));
    this.pull.addEventListener('pointercancel', (e) => this.onUp(e, true));
    this.pull.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.tug(); }
    });
  },

  scale() { return (this.svg.getBoundingClientRect().width / 140) || 1; },

  hideHint() {
    if (!this.hint.classList.contains('hide')) {
      this.hint.classList.add('hide');
      store.set('lampHintSeen', '1');
    }
  },

  onDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    this.dragging = true;
    this.moved = false;
    this.startX = e.clientX;
    this.startY = e.clientY;
    try { this.pull.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    this.pull.classList.add('grabbing');
    this.hideHint();
  },

  onMove(e) {
    if (!this.dragging) return;
    const s = this.scale();
    const dx = (e.clientX - this.startX) / s;
    const dy = (e.clientY - this.startY) / s;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this.moved = true;
    // Rubber-band: stretches easily at first, then resists.
    const raw = Math.max(0, dy);
    this.y = this.MAX * (1 - Math.exp(-raw / this.MAX));
    this.a = Math.max(-6, Math.min(6, -dx * 0.06));
    this.render();
  },

  onUp(e, cancelled = false) {
    if (!this.dragging) return;
    this.dragging = false;
    this.pull.classList.remove('grabbing');
    if (cancelled) { this.animate(); return; }
    if (!this.moved) { this.tug(); return; }          // it was a click
    if (this.y > this.THRESH) {
      toggleTheme();
      this.va += (this.a >= 0 ? 1 : -1) * 0.25;
    }
    this.vy = 0;
    this.animate();
  },

  /** Short downward tug + toggle (click / keyboard). */
  tug() {
    this.hideHint();
    if (reduceMotion.matches) { toggleTheme(); return; }
    this.vy = 9;
    this.va += 0.22;
    this.animate();
    setTimeout(toggleTheme, 110);
  },

  /** Swing the lamp a little (used when the theme changes from the navbar). */
  nudge() {
    if (reduceMotion.matches || !this.el) return;
    this.va += 0.3;
    this.animate();
  },

  animate() {
    if (this.raf) return;
    const step = () => {
      if (!this.dragging) {
        // cord spring
        this.vy += -0.14 * this.y;
        this.vy *= 0.78;
        this.y += this.vy;
        if (this.y < -6) { this.y = -6; this.vy = 0; }
      }
      // pendulum
      this.va += -0.0085 * this.a;
      this.va *= 0.985;
      this.a += this.va;

      this.render();
      const settled = !this.dragging &&
        Math.abs(this.y) < 0.05 && Math.abs(this.vy) < 0.05 &&
        Math.abs(this.a) < 0.02 && Math.abs(this.va) < 0.004;
      if (settled) {
        this.y = this.vy = this.a = this.va = 0;
        this.render();
        this.raf = 0;
        return;
      }
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  },

  render() {
    this.cord.setAttribute('y2', (this.BASE_Y2 + this.y).toFixed(2));
    this.bead.setAttribute('transform', `translate(0 ${this.y.toFixed(2)})`);
    this.el.style.transform = `rotate(${this.a.toFixed(3)}deg)`;
  },
};

/* =========================================================================
   5. LANGUAGE SWITCHER
========================================================================= */
function applyTranslations() {
  $$('[data-i18n]').forEach((el) => {
    const v = lookup(el.dataset.i18n);
    if (v !== undefined) el.textContent = v;
  });
  // NOTE: data-i18n-html inserts HTML from YOUR dictionary only (trusted).
  $$('[data-i18n-html]').forEach((el) => {
    const v = lookup(el.dataset.i18nHtml);
    if (v !== undefined) el.innerHTML = v;
  });
  $$('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s && s.trim());
      const v = attr && key ? lookup(key) : undefined;
      if (v !== undefined) el.setAttribute(attr, v);
    });
  });
  // Scholar link inside translated text
  $$('[data-scholar-link]').forEach((a) => {
    if (CONFIG.links.scholar) { a.href = CONFIG.links.scholar; a.target = '_blank'; a.rel = 'noopener'; }
  });
}

function setLang(lang, { fade = true } = {}) {
  const next = lang === 'zh' ? 'zh' : 'en';
  const apply = () => {
    state.lang = next;
    store.set('lang', next);
    document.documentElement.lang = next === 'zh' ? 'zh-Hant-TW' : 'en';
    document.title = t('meta.title');
    $('#langSwitch').dataset.active = next;
    $$('.lang-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    applyTranslations();
    renderAll();
    updateThemeControls();
  };
  if (!fade || reduceMotion.matches) { apply(); return; }
  document.documentElement.classList.add('is-switching');
  setTimeout(() => {
    apply();
    requestAnimationFrame(() => document.documentElement.classList.remove('is-switching'));
  }, 160);
}

function initialLang() {
  const saved = store.get('lang');
  if (saved === 'en' || saved === 'zh') return saved;
  if (CONFIG.defaultLang === 'en' || CONFIG.defaultLang === 'zh') return CONFIG.defaultLang;
  const langs = navigator.languages || [navigator.language || 'en'];
  return langs.some((l) => /^zh/i.test(l)) ? 'zh' : 'en';
}

/* =========================================================================
   6. RENDERERS
========================================================================= */
function renderAll() {
  renderSocial();
  renderEducation();
  renderNews();
  renderResearch();
  renderPubFilters();
  renderPubs();
  renderProjects();
  renderSkills();
  renderCerts();
  $('#lastUpdated').textContent = fmtDate(CONFIG.lastUpdated);
  state.firstRender = false;
}

const SOCIAL = [
  ['scholar', 'Google Scholar'],
  ['github', 'GitHub'],
  ['orcid', 'ORCID'],
  ['linkedin', 'LinkedIn'],
  ['email', null],
];
function renderSocial() {
  const html = SOCIAL.filter(([k]) => CONFIG.links[k]).map(([k, label]) => {
    const isMail = k === 'email';
    const href = isMail ? `mailto:${CONFIG.links.email}` : CONFIG.links[k];
    const text = label || t('social.email');
    const extra = isMail ? '' : ' target="_blank" rel="noopener"';
    return `<li><a class="social-link" href="${esc(href)}"${extra} title="${esc(text)}">${icon(k)}<span>${esc(text)}</span></a></li>`;
  }).join('');
  $$('[data-social]').forEach((ul) => { ul.innerHTML = html; });
}

function renderEducation() {
  $('#eduList').innerHTML = EDUCATION.map((e) => `
    <li class="edu-item">
      <span class="edu-period">${esc(L(e.period))}</span>
      <div>
        <p class="edu-degree">${esc(L(e.degree))}</p>
        <p class="edu-school">${esc(L(e.school))}</p>
        ${e.note ? `<p class="edu-note">${esc(L(e.note))}</p>` : ''}
      </div>
    </li>`).join('');
}

const NEWS_ICONS = { paper: 'file', talk: 'mic', award: 'award', milestone: 'flag' };
function renderNews() {
  const now = Date.now();
  const items = NEWS.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  $('#newsList').innerHTML = items.map((n) => {
    const ts = Date.parse(n.date.length === 7 ? `${n.date}-01` : n.date);
    const isNew = !Number.isNaN(ts) && now - ts < 60 * 864e5 && now >= ts;
    return `
      <li class="news-item">
        <span class="news-dot">${icon(NEWS_ICONS[n.type] || 'flag')}</span>
        <div>
          <time datetime="${esc(n.date)}">${fmtDate(n.date)}</time>${isNew ? `<span class="news-new">${esc(t('news.new'))}</span>` : ''}
          <p>${L(n.text)}</p>
        </div>
      </li>`;
  }).join('');
}

function renderResearch() {
  $('#researchGrid').innerHTML = RESEARCH.map((r) => `
    <article class="card hoverable research-card">
      <div class="research-icon">${icon(r.icon)}</div>
      <h3>${esc(L(r.title))}</h3>
      <p>${esc(L(r.desc))}</p>
      ${r.keywords ? `<div class="chip-row">${r.keywords.map((k) => `<span class="tag static">${esc(L(k))}</span>`).join('')}</div>` : ''}
    </article>`).join('');
}

function renderProjects() {
  const linkBtn = (href, iconName, label) => href
    ? `<a class="btn-sm" href="${esc(href)}"${href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${icon(iconName)}${esc(label)}</a>` : '';
  $('#projectGrid').innerHTML = PROJECTS.map((p) => `
    <article class="card hoverable project-card">
      ${p.image ? `<div class="project-media"><img src="${esc(p.image)}" alt="" loading="lazy"></div>` : ''}
      <div class="project-body">
        <div class="project-head"><h3>${esc(L(p.title))}</h3><span class="project-year">${esc(L(p.year))}</span></div>
        <p>${esc(L(p.desc))}</p>
        <div class="chip-row">${(p.tags || []).map((tg) => `<span class="tag static">${esc(L(tg))}</span>`).join('')}</div>
        <div class="project-links">
          ${linkBtn(p.links && p.links.code, 'code', t('projects.code'))}
          ${linkBtn(p.links && p.links.demo, 'play', t('projects.demo'))}
          ${linkBtn(p.links && p.links.paper, 'file', t('projects.paper'))}
        </div>
      </div>
    </article>`).join('');
}

function renderSkills() {
  $('#skillsGrid').innerHTML = SKILLS.map((g) => `
    <div class="card skill-group">
      <h3>${icon(g.icon || 'code')}${esc(L(g.group))}</h3>
      <div class="chip-row">${g.items.map((s) => `<span class="skill-chip">${esc(L(s))}</span>`).join('')}</div>
    </div>`).join('');
}

/* =========================================================================
   7. PUBLICATIONS — filters, BibTeX, abstract modal
========================================================================= */
const ownerRegex = (() => {
  const names = CONFIG.ownerNames.filter(Boolean).map(esc)
    .sort((a, b) => b.length - a.length)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return names.length ? new RegExp(`(${names.join('|')})`, 'g') : null;
})();
function formatAuthors(str) {
  const safe = esc(str);
  return ownerRegex ? safe.replace(ownerRegex, '<strong class="me">$1</strong>') : safe;
}

function pubById(id) { return PUBLICATIONS.find((p) => p.id === id); }

function pubMatches(p) {
  const f = state.pubFilter;
  if (f.topic !== 'all' && !(p.topics || []).includes(f.topic)) return false;
  if (f.year !== 'all' && String(p.year) !== f.year) return false;
  if (f.type !== 'all' && p.type !== f.type) return false;
  if (f.q) {
    const hay = [L(p.title), p.authors, L(p.venue), (p.keywords || []).join(' '),
      ...(p.topics || []).map((k) => L(TOPICS[k]))].join(' ').toLowerCase();
    if (!f.q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w))) return false;
  }
  return true;
}

function renderPubFilters() {
  // Topic chips (only topics that are actually used), with counts
  const counts = {};
  PUBLICATIONS.forEach((p) => (p.topics || []).forEach((k) => { counts[k] = (counts[k] || 0) + 1; }));
  const chip = (key, label, n) => `<button type="button" class="chip" data-topic="${esc(key)}" aria-pressed="${state.pubFilter.topic === key}">${esc(label)}${n !== undefined ? ` <span class="chip-count">${n}</span>` : ''}</button>`;
  $('#topicFilters').innerHTML = chip('all', t('pubs.all'), PUBLICATIONS.length) +
    Object.keys(TOPICS).filter((k) => counts[k]).map((k) => chip(k, L(TOPICS[k]), counts[k])).join('');

  const years = [...new Set(PUBLICATIONS.map((p) => String(p.year)))].sort((a, b) => b - a);
  $('#yearFilter').innerHTML = `<option value="all">${esc(t('pubs.allYears'))}</option>` +
    years.map((y) => `<option value="${y}"${state.pubFilter.year === y ? ' selected' : ''}>${y}</option>`).join('');

  const types = Object.keys(PUB_TYPES).filter((k) => PUBLICATIONS.some((p) => p.type === k));
  $('#typeFilter').innerHTML = `<option value="all">${esc(t('pubs.allTypes'))}</option>` +
    types.map((k) => `<option value="${k}"${state.pubFilter.type === k ? ' selected' : ''}>${esc(L(PUB_TYPES[k]))}</option>`).join('');
}

function pubLinks(p) {
  const l = p.links || {};
  const btn = (href, iconName, label) => href ? `<a class="btn-sm" href="${esc(href)}" target="_blank" rel="noopener">${icon(iconName)}${esc(label)}</a>` : '';
  return btn(l.pdf, 'file', t('pubs.pdf')) + btn(l.code, 'code', t('pubs.code')) +
         btn(l.doi, 'link', t('pubs.doi')) + btn(l.slides, 'slides', t('pubs.slides')) +
         btn(l.video, 'play', t('pubs.video'));
}

function renderPubs({ animate = false } = {}) {
  const list = PUBLICATIONS.filter(pubMatches)
    .sort((a, b) => (b.year - a.year) || ((b.month || 0) - (a.month || 0)));
  $('#pubCount').textContent = t('pubs.showing', { n: list.length, total: PUBLICATIONS.length });

  if (!list.length) {
    $('#pubList').innerHTML = `<li class="card pub-empty">${esc(t('pubs.empty'))}<br><br>
      <button type="button" class="btn-sm" data-reset-filters>${esc(t('pubs.reset'))}</button></li>`;
    return;
  }

  let prevYear = null;
  $('#pubList').innerHTML = list.map((p, i) => {
    const same = p.year === prevYear;
    prevYear = p.year;
    const type = PUB_TYPES[p.type] || { en: p.type };
    return `
    <li class="pub${same ? ' same-year' : ''}${animate ? ' enter' : ''}" style="--i:${i}">
      <div class="pub-year">${p.year}</div>
      <article class="card pub-card">
        <div class="pub-badges">
          <span class="badge badge-${esc(p.type)}">${esc(L(type))}</span>
          ${p.status ? `<span class="badge badge-status">${esc(L(p.status))}</span>` : ''}
          ${p.award ? `<span class="badge badge-award">${icon('award')}${esc(L(p.award))}</span>` : ''}
        </div>
        <h3 class="pub-title">${esc(L(p.title))}</h3>
        <p class="pub-authors">${formatAuthors(p.authors)}</p>
        <p class="pub-venue">${esc(L(p.venue))}</p>
        <div class="pub-foot">
          <div class="chip-row">${(p.topics || []).map((k) => `<button type="button" class="tag" data-topic="${esc(k)}">${esc(L(TOPICS[k]) || k)}</button>`).join('')}</div>
          <div class="pub-actions">
            <button type="button" class="btn-sm" data-abstract="${esc(p.id)}">${icon('file')}${esc(t('pubs.abstract'))}</button>
            <button type="button" class="btn-sm" data-copy-bib="${esc(p.id)}">${icon('braces')}${esc(t('pubs.copyBib'))}</button>
            ${pubLinks(p)}
          </div>
        </div>
      </article>
    </li>`;
  }).join('');
}

/** Build a BibTeX entry from the publication fields (unless p.bibtex is given). */
function bibtexFor(p) {
  if (p.bibtex) return p.bibtex.trim();
  const type = PUB_TYPES[p.type] || PUB_TYPES.conference;
  const authors = p.authors.split(',').map((s) => s.trim()).filter(Boolean).join(' and ');
  const title = typeof p.title === 'string' ? p.title : p.title.en;
  const venue = typeof p.venue === 'string' ? p.venue : p.venue.en;
  const fields = [
    ['title', `{${title}}`],
    ['author', authors],
    [type.venueField, venue],
    ['year', p.year],
  ];
  if (p.links && p.links.doi) fields.push(['doi', p.links.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')]);
  if (p.links && p.links.pdf && /^https?:/.test(p.links.pdf)) fields.push(['url', p.links.pdf]);
  return `@${type.bib}{${p.id},\n${fields.map(([k, v]) => `  ${k.padEnd(9)}= {${v}}`).join(',\n')}\n}`;
}

async function copyBib(id) {
  const p = pubById(id);
  if (!p) return;
  const ok = await copyText(bibtexFor(p));
  toast(ok ? t('pubs.copied') : bibtexFor(p));
}

function openAbstract(id) {
  const p = pubById(id);
  if (!p) return;
  const abs = L(p.abstract);
  openInfoModal(L(p.title), `
    <p class="modal-meta">${formatAuthors(p.authors)}</p>
    <p class="modal-meta"><em>${esc(L(p.venue))}</em> · ${p.year}</p>
    <h4>${esc(t('pubs.abstract'))}</h4>
    <p class="abstract">${abs ? esc(abs) : `<span class="muted">${esc(t('pubs.noAbstract'))}</span>`}</p>
    <h4>${esc(t('pubs.bibtex'))}</h4>
    <div class="bibtex-block">
      <div class="bibtex-head"><span>${esc(p.id)}.bib</span>
        <button type="button" class="btn-sm" data-copy-bib="${esc(p.id)}">${icon('copy')}${esc(t('pubs.copyBib'))}</button>
      </div>
      <pre><code>${esc(bibtexFor(p))}</code></pre>
    </div>
    <div class="modal-links">${pubLinks(p)}</div>`);
}

function initPublications() {
  $('#topicFilters').addEventListener('click', (e) => {
    const b = e.target.closest('[data-topic]');
    if (!b) return;
    state.pubFilter.topic = b.dataset.topic;
    renderPubFilters();
    renderPubs({ animate: true });
  });
  $('#yearFilter').addEventListener('change', (e) => { state.pubFilter.year = e.target.value; renderPubs({ animate: true }); });
  $('#typeFilter').addEventListener('change', (e) => { state.pubFilter.type = e.target.value; renderPubs({ animate: true }); });
  let qTimer;
  $('#pubSearch').addEventListener('input', (e) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { state.pubFilter.q = e.target.value.trim(); renderPubs({ animate: true }); }, 150);
  });

  $('#pubList').addEventListener('click', (e) => {
    const topic = e.target.closest('[data-topic]');
    if (topic) {
      state.pubFilter.topic = topic.dataset.topic;
      renderPubFilters();
      renderPubs({ animate: true });
      $('#publications').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      return;
    }
    const abs = e.target.closest('[data-abstract]');
    if (abs) { openAbstract(abs.dataset.abstract); return; }
    const bib = e.target.closest('[data-copy-bib]');
    if (bib) { copyBib(bib.dataset.copyBib); return; }
    if (e.target.closest('[data-reset-filters]')) {
      state.pubFilter = { topic: 'all', year: 'all', type: 'all', q: '' };
      $('#pubSearch').value = '';
      renderPubFilters();
      renderPubs({ animate: true });
    }
  });
}

/* ---------- Generic info modal (abstracts + certificate viewer) ---------- */
function openInfoModal(title, html, { wide = false } = {}) {
  const d = $('#infoModal');
  $('#infoModalTitle').textContent = title;
  $('#infoModalBody').innerHTML = html;
  d.classList.toggle('modal-wide', wide);
  if (!d.open) d.showModal();
}

function initModals() {
  $$('.modal').forEach((d) => {
    // close buttons
    d.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { d.close(); return; }
      if (e.target === d) d.close();                      // click on backdrop
      const bib = e.target.closest('[data-copy-bib]');
      if (bib) copyBib(bib.dataset.copyBib);
    });
  });
  $$('.modal [data-close].icon-btn').forEach((b) => { b.innerHTML = icon('x'); });
  $('#infoModal').addEventListener('close', () => {
    $('#infoModalBody').innerHTML = '';
    Vault.releaseUrls();
  });
}

/* =========================================================================
   8. CERTIFICATE VAULT (admin-only)
   -----------------------------------------------------------------------
   How it stays private on a static site:
   • Certificate files are stored ENCRYPTED (AES-256-GCM, key derived from
     your passphrase with PBKDF2-SHA256, 600 000 iterations).
   • Visitors only ever see names / issuers / dates. The "View" buttons are
     not even in the page until the vault is unlocked.
   • Decryption happens entirely in your browser; the passphrase is kept in
     memory only and forgotten on reload or when you press "Lock".
   File format (.enc): [16-byte salt][12-byte IV][ciphertext + GCM tag]
   Must match tools/encrypt-cert.mjs.
========================================================================= */
const VAULT_ITERATIONS = 600000;
const VAULT_VERIFIER_TEXT = 'portfolio-vault-ok';

const Vault = {
  pass: null,
  urls: [],
  get unlocked() { return this.pass !== null; },
  get supported() { return !!(window.crypto && window.crypto.subtle); },

  b64ToBytes(b64) {
    const bin = atob(b64.trim());
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  },

  async decrypt(buffer, pass) {
    const bytes = new Uint8Array(buffer);
    if (bytes.length < 29) throw new Error('File too small / not encrypted');
    const salt = bytes.slice(0, 16);
    const iv = bytes.slice(16, 28);
    const data = bytes.slice(28);
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: VAULT_ITERATIONS, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  },

  async unlock(pass) {
    if (!CONFIG.vault.verifier || CONFIG.vault.verifier.startsWith('__')) throw new Error('not-configured');
    if (!this.supported) throw new Error('no-crypto');
    const plain = await this.decrypt(this.b64ToBytes(CONFIG.vault.verifier), pass); // throws if wrong
    if (new TextDecoder().decode(plain) !== VAULT_VERIFIER_TEXT) throw new Error('bad-verifier');
    this.pass = pass;
  },

  lock() {
    this.pass = null;
    this.releaseUrls();
  },

  releaseUrls() {
    this.urls.forEach((u) => URL.revokeObjectURL(u));
    this.urls = [];
  },
};

const MIME = { pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
function certMime(file) {
  const ext = file.replace(/\.enc$/i, '').split('.').pop().toLowerCase();
  return MIME[ext] || 'application/octet-stream';
}

/** Normalise `file` (string | array of strings / {file,label}) -> [{file,label}] */
function certFiles(c) {
  const arr = Array.isArray(c.file) ? c.file : (c.file ? [c.file] : []);
  return arr.map((f) => (typeof f === 'string' ? { file: f } : f)).filter((f) => f && f.file);
}

function renderCerts() {
  const list = CERTIFICATIONS.map((c, i) => ({ ...c, _i: i }))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

  $('#certList').innerHTML = list.map((c) => {
    // ⚠️ The view buttons are only generated while the vault is unlocked.
    const viewBtn = Vault.unlocked
      ? certFiles(c).map((f, j) => {
          const label = f.label ? L(f.label) : t(certMime(f.file) === 'application/pdf' ? 'certs.viewPdf' : 'certs.viewImage');
          return `<button type="button" class="btn-sm btn-vault" data-cert="${c._i}" data-sub="${j}">${icon('unlock')}${esc(label)}</button>`;
        }).join('') : '';
    const verify = c.verifyUrl
      ? `<a class="btn-sm" href="${esc(c.verifyUrl)}" target="_blank" rel="noopener">${icon('external')}${esc(t('certs.verify'))}</a>` : '';
    return `
      <li class="card cert">
        <span class="cert-icon">${icon('award')}</span>
        <div class="cert-body">
          <h3>${esc(L(c.name))}</h3>
          <p class="cert-meta"><span>${esc(L(c.issuer))}</span>${c.date ? `<span aria-hidden="true">·</span><time datetime="${esc(c.date)}">${fmtDate(c.date)}</time>` : ''}</p>
          ${c.credentialId ? `<p class="cert-id">${esc(t('certs.credential'))}: ${esc(c.credentialId)}</p>` : ''}
        </div>
        ${verify || viewBtn ? `<div class="cert-actions">${verify}${viewBtn}</div>` : ''}
      </li>`;
  }).join('');
}

async function openCert(index, sub = 0) {
  const entry = CERTIFICATIONS[index];
  const f = entry && certFiles(entry)[sub];
  if (!f || !Vault.unlocked) return;
  const c = { ...entry, file: f.file };
  const name = L(entry.name) + (f.label ? ` — ${L(f.label)}` : '');
  openInfoModal(name, `<div class="viewer-loading"><span class="spinner"></span>${esc(t('admin.decrypting'))}</div>`, { wide: true });

  try {
    const res = await fetch(c.file, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${c.file}`);
    let buf = await res.arrayBuffer();
    if (/\.enc$/i.test(c.file)) buf = await Vault.decrypt(buf, Vault.pass);
    else console.warn(`[vault] ${c.file} is NOT encrypted — anyone can download it from your repo.`);

    const mime = certMime(c.file);
    const url = URL.createObjectURL(new Blob([buf], { type: mime }));
    Vault.urls.push(url);
    const fileName = c.file.split('/').pop().replace(/\.enc$/i, '');
    const viewer = mime === 'application/pdf'
      ? `<iframe class="viewer-frame" src="${url}" title="${esc(name)}"></iframe>`
      : `<img class="viewer-img" src="${url}" alt="${esc(name)}">`;
    if (!$('#infoModal').open) return; // closed while decrypting
    $('#infoModalBody').innerHTML = `${viewer}
      <div class="viewer-actions">
        <a class="btn-sm" href="${url}" target="_blank" rel="noopener">${icon('external')}${esc(t('admin.openTab'))}</a>
        <a class="btn-sm" href="${url}" download="${esc(fileName)}">${icon('download')}${esc(t('admin.download'))}</a>
      </div>`;
  } catch (err) {
    const msg = err && err.name === 'OperationError' ? 'wrong key / corrupted file' : (err && err.message) || String(err);
    $('#infoModalBody').innerHTML = `<p class="form-error">${esc(t('admin.decryptFail'))} <code>${esc(msg)}</code></p>`;
  }
}

function openAdmin() {
  if (Vault.unlocked) { toast(t('admin.already')); return; }
  const d = $('#adminModal');
  const configured = CONFIG.vault.verifier && !CONFIG.vault.verifier.startsWith('__');
  $('#adminError').textContent = !configured ? t('admin.notConfigured') : (!Vault.supported ? t('admin.cryptoMissing') : '');
  $('#adminPass').value = '';
  d.showModal();
  setTimeout(() => $('#adminPass').focus(), 50);
}

function setAdminUi(on) {
  $('#adminBar').hidden = !on;
  renderCerts();
}

function initVault() {
  $('#vaultTrigger').innerHTML = icon('lock');
  $('#vaultTrigger').addEventListener('click', openAdmin);

  // Secret shortcut: Ctrl + Shift + L  (⌘ + Shift + L on macOS)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      openAdmin();
    }
  });

  $('#adminForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('#adminSubmit');
    const pass = $('#adminPass').value;
    if (!pass) return;
    btn.disabled = true;
    $('#adminError').textContent = '';
    try {
      await Vault.unlock(pass);
      $('#adminModal').close();
      setAdminUi(true);
      toast(t('admin.unlocked'));
      $('#certifications').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    } catch (err) {
      await sleep(600); // slow down guessing a little
      const m = err && err.message;
      $('#adminError').textContent = m === 'not-configured' ? t('admin.notConfigured')
        : m === 'no-crypto' ? t('admin.cryptoMissing') : t('admin.wrong');
      $('#adminPass').select();
    } finally {
      btn.disabled = false;
    }
  });

  $('#adminLock').addEventListener('click', () => {
    Vault.lock();
    setAdminUi(false);
    toast(t('admin.locked'));
  });

  $('#certList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cert]');
    if (b) openCert(Number(b.dataset.cert), Number(b.dataset.sub || 0));
  });
}

/* =========================================================================
   9. NAVIGATION, SCROLL SPY, REVEAL
========================================================================= */
function initNav() {
  const nav = $('#topnav');
  const menuBtn = $('#menuBtn');

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $('#navLinks').addEventListener('click', (e) => {
    if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Language buttons
  $$('.lang-btn').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang !== state.lang) setLang(b.dataset.lang);
  }));

  // Navbar theme button (also swings the lamp)
  $('#themeBtn').addEventListener('click', () => { toggleTheme(); Lamp.nudge(); });

  // Scroll spy
  if ('IntersectionObserver' in window) {
    const links = new Map($$('.nav-links a').map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.remove('active'));
        const a = links.get(en.target.id);
        if (a) a.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }
}

function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    els.forEach((el) => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => io.observe(el));
}

/* =========================================================================
   10. CONTACT FORM
========================================================================= */
function initContact() {
  const form = $('#contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const from = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) { toast(t('contact.invalid')); return; }

    if (CONFIG.formspreeEndpoint) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const res = await fetch(CONFIG.formspreeEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        toast(t('contact.sent'));
      } catch {
        toast(t('contact.error'));
      } finally {
        btn.disabled = false;
      }
    } else {
      // No backend: open the visitor's email app with the message pre-filled
      const subject = encodeURIComponent(`${t('contact.subject')} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} <${from}>`);
      window.location.href = `mailto:${CONFIG.links.email}?subject=${subject}&body=${body}`;
    }
  });
}

/* =========================================================================
   11. INIT
========================================================================= */
function init() {
  $('#year').textContent = new Date().getFullYear();
  // Form note text depends on whether a Formspree endpoint is configured
  $('.form-note').dataset.i18n = CONFIG.formspreeEndpoint ? 'contact.note' : 'contact.noteMail';

  Lamp.init();
  setTheme(state.theme, { animate: false, persist: false });

  // Follow the OS theme until the visitor makes a choice
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!store.get('theme')) setTheme(e.matches ? 'dark' : 'light', { animate: false, persist: false });
  });

  initModals();
  initPublications();
  initVault();
  initContact();
  setLang(initialLang(), { fade: false });   // renders all dynamic content
  initNav();
  initReveal();
}

init();
