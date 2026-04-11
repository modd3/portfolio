import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Terminal, Github, Linkedin, Mail, MapPin, ExternalLink, Code, Cpu, Command, Download, Shield, FlaskConical, ChevronRight } from 'lucide-react';

/* ============================================================
   DATA & CONTENT
   ============================================================ */

const BOOT_SEQUENCE = [
  'Initializing system...',
  'Loading kernel modules... [OK]',
  'Starting network services... [OK]',
  'Mounting file systems... [OK]',
  'Loading user profile: mohamed_juma',
  'Checking credentials... [VERIFIED]',
  'Education: BSc. Microbiology ✓',
  'Skills: Full Stack Development ✓',
  'Cybersecurity: HackTheBox Active ✓',
  'Passion: EdTech + Security ✓',
  'Status: Ready for opportunities',
  '',
  'System ready. Welcome to portfolio.sh',
  'Launching interface in 3...',
  '2...',
  '1...',
  ''
];

const ASCII_ART = `
░  ░░░░  ░░░      ░░░  ░░░░  ░░░      ░░░  ░░░░  ░░        ░░       ░░░░░░░░
▒   ▒▒   ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒   ▒▒   ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒▒▒▒
▓        ▓▓  ▓▓▓▓  ▓▓        ▓▓  ▓▓▓▓  ▓▓        ▓▓      ▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓
█  █  █  ██  ████  ██  ████  ██        ██  █  █  ██  ████████  ████  ███████
█  ████  ███      ███  ████  ██  ████  ██  ████  ██        ██       ████████
                                                              
░░░░░░░░░░░░░        ░░  ░░░░  ░░  ░░░░  ░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒   ▒▒   ▒▒  ▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓        ▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
█████████████  ████  ██  ████  ██  █  █  ██        █████████████████████████
██████████████      ████      ███  ████  ██  ████  █████████████████████████
`;

const ASCII_ART_SM = `
███╗   ███╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ███╗███████╗██████╗ 
████╗ ████║██╔═══██╗██║  ██║██╔══██╗████╗ ████║██╔════╝██╔══██╗
██╔████╔██║██║   ██║███████║███████║██╔████╔██║█████╗  ██║  ██║
██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██╔══╝  ██║  ██║
██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║███████╗██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═════╝ 

     ██╗██╗   ██╗███╗   ███╗ █████╗ 
     ██║██║   ██║████╗ ████║██╔══██╗
     ██║██║   ██║██╔████╔██║███████║
██   ██║██║   ██║██║╚██╔╝██║██╔══██║
╚█████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║
 ╚════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
`;

const PROJECTS = [
  {
    title: "BioTrak",
    status: "LIVE IN PRODUCTION",
    isLive: true,
    desc: "Production DNA sequence analysis platform with 10 scientific modules — base composition, ORF detection, primer design, Smith-Waterman alignment, BLAST, and more. Pure-Python bioinformatics algorithms, Celery async workers, JWT auth, and AI-powered sequence interpretation via Claude. Deployed free-tier on Render + Vercel + Neon + Upstash.",
    stack: ["React", "FastAPI", "Python", "PostgreSQL", "Redis", "Celery", "Docker"],
    link: "https://github.com/modd3/BioTrak",
    live: "https://bio-trak.vercel.app"
  },
  {
    title: "EduTrak",
    status: "IN DEVELOPMENT",
    desc: "Next-generation school management system supporting Kenya's multi-curriculum education (CBC + 8-4-4). Multi-tenant architecture allows independent operation per school — students, grades, fee tracking, and reports in one platform.",
    stack: ["React", "Express", "PostgreSQL", "Prisma", "JWT"],
    link: "https://github.com/modd3/edutrak",
    live: null
  },
  {
    title: "School Management System",
    status: "LIVE IN PRODUCTION",
    isLive: true,
    desc: "Full-featured school management platform actively deployed. Handles student records, grading, and report generation. Reduced administrative workload by an estimated 70% for end users.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/modd3/school-management",
    live: "https://school-management-o50k.onrender.com"
  },
  {
    title: "AI Prompt Builder",
    status: "IN DEVELOPMENT",
    desc: "Social platform for AI practitioners to create, test, version, and share prompts. Supports collaboration, iteration, and community discovery of high-performing prompt patterns.",
    stack: ["MERN Stack", "AI APIs", "OAuth", "REST API"],
    link: "https://github.com/modd3/ai-prompt-builder",
    live: null
  },
  {
    title: "Proxy-Xtractor",
    status: "STABLE",
    desc: "Automated tool for penetration testers. Scrapes and validates free SOCKS5 proxies, then auto-configures proxychains4 for Kali Linux security workflows.",
    stack: ["Bash", "Python", "Web Scraping", "Kali Linux"],
    link: "https://github.com/modd3/proxy-xtractor",
    live: null
  },
  {
    title: "IP2Binary",
    status: "STABLE",
    desc: "CLI utility for network engineers and students. Converts IPv4 addresses to binary and back — a practical learning tool for subnetting and network fundamentals.",
    stack: ["Bash", "Python", "Networking"],
    link: "https://github.com/modd3/ip2binary",
    live: null
  }
];

// FIX: Certifications section added
const CERTIFICATIONS = [
  { name: "HackTheBox — Active Member", issuer: "HackTheBox", year: "2024–Present", color: "border-red-500/60 text-red-400" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023", color: "border-[#00ff41]/60 text-[#00ff41]" },
  { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2023", color: "border-[#00ff41]/60 text-[#00ff41]" },
];

const BUTTONS = [
  { label: 'About Me', cmd: 'about', icon: <Terminal size={14} /> },
  { label: 'My Skills', cmd: 'skills', icon: <Cpu size={14} /> },
  { label: 'View Projects', cmd: 'projects', icon: <Code size={14} /> },
  { label: 'Contact Info', cmd: 'contact', icon: <Mail size={14} /> },
  { label: 'Switch to GUI', cmd: 'gui', icon: <ExternalLink size={14} /> },
  { label: 'Clear Screen', cmd: 'clear', icon: <Command size={14} /> },
];

/* ============================================================
   HOOKS & ANIMATION COMPONENTS
   ============================================================ */

function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIntersecting(true); observer.disconnect(); } },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

const LoopingTypewriter = ({ text, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (displayedText.length < text.length) setDisplayedText(text.slice(0, displayedText.length + 1));
        else setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        if (displayedText.length > 0) setDisplayedText(prev => prev.slice(0, -1));
        else setIsDeleting(false);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, typeSpeed, deleteSpeed, pauseTime]);
  return (
    <span className="relative inline-flex items-center">
      <span className="invisible whitespace-nowrap" aria-hidden="true">{text}</span>
      <span className="absolute left-0 inline-flex items-center whitespace-nowrap">
        {displayedText}
        <span className="w-2 h-6 md:h-8 bg-[#ffd700] ml-1 animate-pulse" />
      </span>
    </span>
  );
};

const Typewriter = ({ text, speed = 30, delay = 0, className = "", cursorColor = "#00ff41" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, "-50px");
  useEffect(() => {
    if (onScreen) { const t = setTimeout(() => setStartTyping(true), delay); return () => clearTimeout(t); }
  }, [onScreen, delay]);
  useEffect(() => {
    if (startTyping && displayedText.length < text.length) {
      const t = setTimeout(() => setDisplayedText(text.slice(0, displayedText.length + 1)), speed);
      return () => clearTimeout(t);
    }
  }, [startTyping, displayedText, text, speed]);
  return (
    <span ref={ref} className={`${className} inline-block min-h-[1em] min-w-[5px]`}>
      {displayedText}
      {startTyping && displayedText.length < text.length && (
        <span className="inline-block w-2 h-[1em] ml-1 animate-pulse align-middle" style={{ backgroundColor: cursorColor }} />
      )}
    </span>
  );
};

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let drops = [];
    const fontSize = 14;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/~';
    const initMatrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.ceil(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', initMatrix);
    initMatrix();
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationFrameId = setTimeout(() => requestAnimationFrame(draw), 50);
    };
    draw();
    return () => { window.removeEventListener('resize', initMatrix); clearTimeout(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity: 0.15 }} />;
};

const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += 160;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) setTimeout(onComplete, 800);
      }, delay);
    });
  }, [onComplete]);
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-start justify-center p-8 font-mono text-[#00ff41] overflow-hidden">
      <button
        onClick={onComplete}
        className="fixed top-6 right-6 text-xs text-[#008f11] border border-[#008f11]/50 px-3 py-1 hover:border-[#00ff41] hover:text-[#00ff41] transition-colors"
      >
        [skip →]
      </button>
      <div className="max-w-3xl w-full space-y-1">
        {lines.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    </div>
  );
};

/* ============================================================
   MAIN APP
   ============================================================ */

export default function App() {
  const [booting, setBooting] = useState(() => {
    try { return !sessionStorage.getItem('portfolio_booted'); } catch { return true; }
  });

  const [mode, setMode] = useState('terminal');
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const autoExecuted = useRef(false);

  const addToHistory = useCallback((content) => {
    setHistory(prev => [...prev, content]);
  }, []);

  const handleCommand = useCallback((cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addToHistory({ type: 'command', content: trimmedCmd });

    switch (trimmedCmd) {
      case 'clear':
        setHistory([]);
        break;
      case 'whoami':
        addToHistory({ type: 'output', content: 'root@portfolio:~/mohamed_juma' });
        setTimeout(() => handleCommand('about'), 500);
        break;
      case 'gui':
        addToHistory({ type: 'output', content: 'Switching to GUI mode...' });
        setTimeout(() => setMode('gui'), 500);
        break;
      case 'about':
        addToHistory({
          type: 'output',
          content: (
            <div className="space-y-4 max-w-3xl">
              <div className="w-full flex justify-center">
                <pre className="text-[5px] xs:text-[7px] sm:text-[10px] md:text-xs leading-none text-[#008f11] select-none whitespace-pre overflow-x-hidden">{ASCII_ART}</pre>
              </div>
              <div className="p-4 border-l-2 border-[#00ff41] bg-[#00ff41]/5 mt-4">
                <p className="leading-relaxed">
                  Full Stack Developer & Microbiology graduate building at the intersection of <span className="text-[#ffd700]">software</span>, <span className="text-[#ffd700]">education technology</span>, and <span className="text-[#ffd700]">cybersecurity</span>. Currently developing EduTrak — a multi-tenant school management system for Kenya's CBC curriculum.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div><div className="text-[#008f11] text-sm">{'// EDUCATION'}</div><div>BSc. Microbiology, Karatina University</div></div>
                  <div><div className="text-[#008f11] text-sm">{'// SEEKING'}</div><div className="text-[#ffd700]">Internship / Junior Dev Role</div></div>
                  <div><div className="text-[#008f11] text-sm">{'// LOCATION'}</div><div>Nairobi, Kenya</div></div>
                  <div><div className="text-[#008f11] text-sm">{'// INTERESTS'}</div><div>EdTech, Cybersecurity, DevOps</div></div>
                </div>
              </div>
            </div>
          )
        });
        break;
      case 'skills':
        addToHistory({
          type: 'output',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#ffd700] mb-2">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'React', 'Python', 'Bash', 'PostgreSQL', 'MongoDB'].map(s => (
                    <span key={s} className="px-2 py-1 border border-[#00ff41] bg-[#00ff41]/10 text-sm hover:bg-[#00ff41] hover:text-black transition-colors cursor-default">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[#ffd700] mb-2">Tools & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {['Prisma ORM', 'Linux CLI', 'Git/GitHub', 'RESTful APIs', 'JWT Auth', 'Docker'].map(s => (
                    <span key={s} className="px-2 py-1 border border-[#008f11] bg-[#008f11]/10 text-[#008f11] text-sm">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[#ffd700] mb-2">Cybersecurity</h3>
                <div className="flex flex-wrap gap-2">
                  {['Kali Linux', 'Nmap', 'Gobuster', 'SQLMap', 'HackTheBox', 'x64 Assembly', 'Proxychains'].map(s => (
                    <span key={s} className="px-2 py-1 border border-red-500/50 bg-red-900/10 text-red-400 text-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        });
        break;
      case 'projects':
        addToHistory({
          type: 'output',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PROJECTS.map((p, idx) => (
                <div key={idx} className="border border-[#008f11] bg-black/50 p-4 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[#ffd700] text-lg font-bold">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 border ${p.isLive ? 'border-[#00ff41] text-[#00ff41]' : 'border-[#ffd700] text-[#ffd700]'}`}>{p.status}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map(t => <span key={t} className="text-xs text-[#008f11] bg-[#008f11]/10 px-1">{t}</span>)}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#ffd700]"><Github size={14} /> Code</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#ffd700]"><ExternalLink size={14} /> Live Demo</a>}
                  </div>
                </div>
              ))}
            </div>
          )
        });
        break;
      case 'contact':
        addToHistory({
          type: 'output',
          content: (
            <div className="space-y-2 max-w-lg">
              <p>Open to internships and junior roles in Full Stack Dev, EdTech, or Cybersecurity.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <a href="mailto:mohamj876@gmail.com" className="flex items-center gap-2 p-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                  <Mail size={16} /> mohamj876@gmail.com
                </a>
                <a href="https://github.com/modd3" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                  <Github size={16} /> github.com/modd3
                </a>
                <a href="https://www.linkedin.com/in/mohamed-juma-165288317" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                  <Linkedin size={16} /> LinkedIn Profile
                </a>
                <div className="flex items-center gap-2 p-2 text-[#008f11]">
                  <MapPin size={16} /> Nairobi, Kenya
                </div>
              </div>
            </div>
          )
        });
        break;
      case '': break;
      default:
        addToHistory({ type: 'output', content: <span className="text-red-400">Command not found: {trimmedCmd}. Try: about, skills, projects, contact, gui, clear</span> });
    }
  }, [addToHistory]);

  const simulateCommand = useCallback(async (cmd) => {
    if (isTyping) return;
    setIsTyping(true);
    const chars = cmd.split('');
    let typed = '';
    const typeChar = (index) => {
      if (index < chars.length) {
        typed += chars[index];
        setCurrentInput(typed);
        setTimeout(() => typeChar(index + 1), 30 + Math.random() * 50);
      } else {
        setTimeout(() => { handleCommand(cmd); setCurrentInput(''); setIsTyping(false); }, 300);
      }
    };
    typeChar(0);
  }, [isTyping, handleCommand]);

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, currentInput, isTyping]);

  useEffect(() => {
    if (!booting && mode === 'terminal' && !autoExecuted.current) {
      autoExecuted.current = true;
      setTimeout(() => simulateCommand('whoami'), 500);
    }
  }, [booting, mode, simulateCommand]);

  const handleBootComplete = useCallback(() => {
    try { sessionStorage.setItem('portfolio_booted', '1'); } catch {}
    setBooting(false);
  }, []);

  if (booting) return <BootScreen onComplete={handleBootComplete} />;

  /* ---- GUI MODE ---- */
  if (mode === 'gui') {
    return (
      <div className="font-mono bg-[#0a0a0a] text-[#00ff41] min-h-screen relative">
        <MatrixBackground />
        <div className="relative z-10">

          {/* Header */}
          <header className="sticky top-0 bg-[#1a1a1a]/90 backdrop-blur-md border-b-2 border-[#00ff41] p-4 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[#008f11] text-xs">root@portfolio:~$</span>
                <div className="text-xl sm:text-2xl text-[#ffd700] font-bold tracking-wider min-h-[32px] flex items-center">
                  <LoopingTypewriter text="MOHAMED_JUMA" typeSpeed={150} deleteSpeed={70} pauseTime={2500} />
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="/cv.pdf"
                  download="Mohamed_Juma_CV.pdf"
                  className="flex items-center gap-2 px-3 py-1 border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all text-sm"
                >
                  <Download size={14} /> CV
                </a>
                <button
                  onClick={() => setMode('terminal')}
                  className="flex items-center gap-2 px-3 py-1 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all text-sm"
                >
                  <Terminal size={14} /> Terminal
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-6xl mx-auto p-6 space-y-20">

            {/* ── ABOUT ── */}
            <section id="about" className="pt-8">
              <SectionHeader cmd="whoami" delay={200} />
              <div className="bg-[#1a1a1a] border-2 border-[#00ff41] p-6 sm:p-8 rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                <div className="w-full flex justify-center mb-6">
                  <pre className="hidden sm:block text-[5px] xs:text-[8px] sm:text-[10px] md:text-xs text-[#008f11] leading-none whitespace-pre select-none overflow-x-hidden">{ASCII_ART}</pre>
                  <pre className="block sm:hidden text-[4px] leading-none text-[#008f11] whitespace-pre select-none overflow-x-hidden">{ASCII_ART_SM}</pre>
                </div>
                <div className="text-lg leading-relaxed mb-6 min-h-[80px]">
                  <Typewriter
                    text="Full Stack Developer & Microbiology graduate building at the intersection of software, education tech, and security. I bridge wet-lab science and production code — developing EduTrak, a multi-tenant school management system for Kenya's CBC curriculum."
                    speed={18}
                    delay={800}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'EDUCATION', val: 'BSc. Microbiology' },
                    { label: 'SEEKING', val: 'Internship / Junior Role', highlight: true },
                    { label: 'LOCATION', val: 'Nairobi, Kenya' },
                    { label: 'FOCUS', val: 'EdTech & Security' }
                  ].map((item, i) => (
                    <div key={i} className={`bg-[#00ff41]/5 p-4 border-l-2 ${item.highlight ? 'border-[#ffd700]' : 'border-[#00ff41]'}`}>
                      <div className="text-[#008f11] text-xs mb-1">{`// ${item.label}`}</div>
                      <div className={`text-sm font-bold ${item.highlight ? 'text-[#ffd700]' : ''}`}>{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SKILLS ── */}
            <section id="skills">
              <SectionHeader cmd="tech_stack --list" delay={200} />
              <div className="bg-[#1a1a1a] border-2 border-[#00ff41] p-6 sm:p-8 rounded-lg">
                <div className="space-y-8">
                  <SkillGroup
                    icon={<Cpu size={20} />}
                    title="Core Technologies"
                    skills={['Node.js', 'Express.js', 'React', 'Python', 'Bash', 'PostgreSQL', 'MongoDB']}
                    borderColor="border-[#00ff41]"
                    bgColor="bg-[#00ff41]/10"
                    textColor="text-[#00ff41]"
                  />
                  <SkillGroup
                    icon={<Command size={20} />}
                    title="Tools & DevOps"
                    skills={['Prisma ORM', 'Linux CLI', 'Git/GitHub', 'REST APIs', 'JWT', 'Docker']}
                    borderColor="border-[#008f11]"
                    bgColor="bg-[#008f11]/10"
                    textColor="text-[#008f11]"
                  />
                  <SkillGroup
                    icon={<Shield size={20} />}
                    title="Cybersecurity"
                    skills={['Kali Linux', 'Nmap', 'Gobuster', 'SQLMap', 'HackTheBox', 'x64 Assembly', 'Proxychains']}
                    borderColor="border-red-500/60"
                    bgColor="bg-red-900/10"
                    textColor="text-red-400"
                  />
                  <SkillGroup
                    icon={<FlaskConical size={20} />}
                    title="Domain Knowledge"
                    skills={['Microbiology', 'Laboratory Methods', 'Curriculum Design (CBC)', 'Education Systems']}
                    borderColor="border-purple-500/60"
                    bgColor="bg-purple-900/10"
                    textColor="text-purple-400"
                  />
                </div>
              </div>
            </section>

            {/* ── PROJECTS ── */}
            <section id="projects">
              <SectionHeader cmd="ls -la ~/projects" delay={200} />
              <div className="space-y-8">
                {PROJECTS.map((p, idx) => (
                  <div key={idx} className="bg-[#000]/50 border border-[#008f11] p-6 hover:border-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.15)] transition-all transform hover:-translate-y-1">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                      <h3 className="text-2xl text-[#ffd700] font-bold">{p.title}</h3>
                      <span className={`px-3 py-1 text-xs border ${p.isLive ? 'border-[#00ff41] bg-[#00ff41]/20 text-[#00ff41]' : 'border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]'}`}>{p.status}</span>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.stack.map(t => <span key={t} className="px-2 py-1 text-xs border border-[#008f11]/50 text-[#008f11]">{t}</span>)}
                    </div>
                    <div className="flex gap-4">
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="border-2 border-[#00ff41] text-[#00ff41] px-4 py-2 hover:bg-[#00ff41] hover:text-black transition-colors font-bold text-sm flex items-center gap-2"><Github size={14}/> View Code</a>}
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="border-2 border-[#ffd700] text-[#ffd700] px-4 py-2 hover:bg-[#ffd700] hover:text-black transition-colors font-bold text-sm flex items-center gap-2"><ExternalLink size={14}/> Live Demo</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── CERTIFICATIONS ── */}
            <section id="certifications">
              <SectionHeader cmd="cat certifications.log" delay={200} />
              <div className="bg-[#1a1a1a] border-2 border-[#00ff41] p-6 sm:p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className={`p-4 border ${cert.color} bg-black/30 flex items-start gap-3`}>
                      <ChevronRight size={16} className="mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-sm">{cert.name}</div>
                        <div className="text-[#008f11] text-xs mt-1">{cert.issuer} · {cert.year}</div>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 border border-[#008f11]/30 bg-black/10 flex items-center gap-3 text-[#008f11] text-sm col-span-full">
                    <span>{'// Currently studying: x64 Assembly · Hacking: The Art of Exploitation · HTB machines'}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CONTACT ── */}
            <section id="contact" className="pb-10">
              <SectionHeader cmd="contact --verbose" delay={200} />
              <p className="text-gray-400 mb-6 text-sm">
                Open to <span className="text-[#ffd700]">internships</span> and <span className="text-[#ffd700]">junior developer roles</span> in Full Stack, EdTech, or Cybersecurity. Based in Nairobi — available remotely.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <a href="mailto:mohamj876@gmail.com" className="flex flex-col items-center justify-center p-8 bg-[#00ff41]/5 border-2 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group">
                  <Mail size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                  <span>Email Me</span>
                  <span className="text-xs mt-1 text-[#008f11] group-hover:text-black">mohamj876@gmail.com</span>
                </a>
                <a href="https://github.com/modd3" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-[#00ff41]/5 border-2 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group">
                  <Github size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                  <span className="text-xs mt-1 text-[#008f11] group-hover:text-black">github.com/modd3</span>
                </a>
                <a href="https://www.linkedin.com/in/mohamed-juma-165288317" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-[#00ff41]/5 border-2 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group">
                  <Linkedin size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                  <span className="text-xs mt-1 text-[#008f11] group-hover:text-black">Connect with me</span>
                </a>
              </div>
              <div className="flex justify-center">
                <a
                  href="/cv.pdf"
                  download="Mohamed_Juma_CV.pdf"
                  className="flex items-center gap-3 px-8 py-4 border-2 border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all font-bold text-lg"
                >
                  <Download size={20} /> Download My CV
                </a>
              </div>
            </section>
          </main>

          <footer className="text-center p-8 border-t-2 border-[#00ff41] mt-16 text-[#008f11] bg-[#1a1a1a]/90 backdrop-blur-md">
            <p>root@portfolio:~$ exit</p>
            <p className="mt-4">© {new Date().getFullYear()} Mohamed Juma | Built with passion, powered by curiosity</p>
            <p className="mt-2 text-sm">From Microbiology to Microservices 🧬 → 💻</p>
          </footer>
        </div>
      </div>
    );
  }

  /* ---- TERMINAL MODE ---- */
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono overflow-hidden relative">
      <MatrixBackground />
      <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col max-w-5xl mx-auto">
        <div className="flex justify-between items-center pb-2 border-b border-[#008f11]/50 mb-4 bg-[#0a0a0a]/80 backdrop-blur">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-[#008f11] text-xs">root@portfolio: ~</div>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pb-48 sm:pb-32">
          <div className="mb-6 space-y-2">
            <p>Mohamed Juma Portfolio [Version 1.0.0]</p>
            <p>(c) {new Date().getFullYear()} Mohamed Juma. All rights reserved.</p>
          </div>
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'command' ? (
                <div className="flex items-center gap-2 text-[#00ff41]">
                  <span className="text-[#ffd700]">root@portfolio:~$</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <div className="text-[#cccccc] ml-0 md:ml-4 mt-1">{item.content}</div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[#00ff41]">
            <span className="text-[#ffd700] shrink-0">root@portfolio:~$</span>
            <div className="relative flex items-center">
              <span className="whitespace-pre-wrap min-h-6 flex items-center">{currentInput}</span>
              <div className="w-2.5 h-5 bg-[#00ff41] animate-pulse ml-0.5"></div>
            </div>
          </div>
          <div className="h-4"></div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-[#00ff41]/30 z-50 p-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {BUTTONS.map((btn) => (
              <button
                key={btn.cmd}
                onClick={() => simulateCommand(btn.cmd)}
                disabled={isTyping}
                className={`flex items-center justify-center gap-2 px-3 py-3 text-sm border transition-all duration-200 ${isTyping ? 'border-[#008f11]/30 text-[#008f11]/50 cursor-not-allowed' : 'border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black cursor-pointer'}`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */

function SectionHeader({ cmd, delay }) {
  return (
    <div className="flex items-center gap-4 mb-6 text-[#ffd700] text-3xl">
      <span className="text-[#00ff41] text-4xl font-light">&gt;</span>
      <Typewriter text={cmd} delay={delay} speed={100} cursorColor="#ffd700" />
    </div>
  );
}

function SkillGroup({ icon, title, skills, borderColor, bgColor, textColor }) {
  return (
    <div>
      <h3 className={`text-[#ffd700] mb-4 flex items-center gap-2`}>{icon} {title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map(s => (
          <div key={s} className={`px-4 py-2 ${bgColor} border ${borderColor} ${textColor} hover:scale-105 transition-transform text-sm`}>{s}</div>
        ))}
      </div>
    </div>
  );
}
