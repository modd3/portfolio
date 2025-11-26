import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Terminal, Github, Linkedin, Mail, MapPin, ExternalLink, Code, Cpu, Shield, Command } from 'lucide-react';

/* --- DATA & CONTENT --- */
const BOOT_SEQUENCE = [
  'Initializing system...',
  'Loading kernel modules... [OK]',
  'Starting network services... [OK]',
  'Mounting file systems... [OK]',
  'Loading user profile: mohamed_juma',
  'Checking credentials... [VERIFIED]',
  'Education: BSc. Microbiology ✓',
  'Skills: Full Stack Development ✓',
  'Experience: Teaching + Coding ✓',
  'Passion: EdTech + Cybersecurity ✓',
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

const COMMANDS = [
  { cmd: 'help', desc: 'List available commands' },
  { cmd: 'about', desc: 'Display profile information' },
  { cmd: 'skills', desc: 'List technical skills' },
  { cmd: 'projects', desc: 'View project portfolio' },
  { cmd: 'contact', desc: 'Display contact information' },
  { cmd: 'gui', desc: 'Switch to standard website view' },
  { cmd: 'clear', desc: 'Clear terminal history' },
  { cmd: 'whoami', desc: 'Display current user' },
];

const PROJECTS = [
  {
    title: "EduTrak",
    status: "IN DEVELOPMENT",
    desc: "Next-generation school management system supporting Kenya's multi-curriculum education (CBC + 8-4-4 system). Features multi-tenant architecture allowing multiple schools to operate independently.",
    stack: ["React", "Express", "PostgreSQL", "Prisma", "JWT"],
    link: "https://github.com/modd3/edutrak",
    live: null
  },
  {
    title: "School Management System",
    status: "LIVE IN PRODUCTION",
    isLive: true,
    desc: "Full-featured school management platform currently deployed. Streamlines student record management, grading, and reports. Reduced admin workload by 70%.",
    stack: ["MongoDB", "Express", "React", "Node.js", "MERN"],
    link: "https://github.com/modd3/school-management",
    live: "https://school-management-o50k.onrender.com"
  },
  {
    title: "AI Prompt Builder",
    status: "IN DEVELOPMENT",
    desc: "Social platform for AI enthusiasts to create, test, edit, and share prompts. Users can collaborate, iterate on prompts, and discover what works best.",
    stack: ["MERN Stack", "AI APIs", "OAuth", "REST API"],
    link: "https://github.com/modd3/ai-prompt-builder",
    live: null
  },
  {
    title: "Proxy-Xtractor",
    status: "STABLE",
    desc: "Automated tool for penetration testers. Scrapes free SOCKS5 proxies and configures them in proxychains4 for use with Kali Linux security tools.",
    stack: ["Bash", "Python", "Web Scraping", "Kali Linux"],
    link: "https://github.com/modd3/proxy-xtractor",
    live: null
  },
  {
    title: "IP2Binary",
    status: "STABLE",
    desc: "CLI utility for network engineers and students. Converts IPv4 addresses to binary representation and vice versa. Educational tool for subnetting.",
    stack: ["Bash", "Python", "Networking"],
    link: "https://github.com/modd3/ip2binary",
    live: null
  }
];

/* --- ANIMATION COMPONENTS --- */

// Hook to check if element is in view
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

// 1. Looping Typewriter for H1 (Type -> Pause -> Delete -> Loop)
const LoopingTypewriter = ({ text, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (displayedText.length < text.length) {
          setDisplayedText((prev) => text.slice(0, prev.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      {displayedText}
      <span className="w-2 h-6 md:h-8 bg-[#ffd700] ml-1 animate-pulse" />
    </span>
  );
};

// 2. One-off Typewriter for H2 and Paragraphs (Trigger on scroll)
const Typewriter = ({ text, speed = 30, delay = 0, className = "", cursorColor = "#00ff41" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, "-50px");

  useEffect(() => {
    if (onScreen) {
      const timer = setTimeout(() => setStartTyping(true), delay);
      return () => clearTimeout(timer);
    }
  }, [onScreen, delay]);

  useEffect(() => {
    if (startTyping && displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [startTyping, displayedText, text, speed]);

  return (
    <span 
      ref={ref} 
      // FIX: Added 'min-h-[1em]' and 'min-w-[5px]' so the IntersectionObserver can detect the element
      className={`${className} inline-block min-h-[1em] min-w-[5px]`}
    >
      {displayedText}
      {/* Cursor logic */}
      {startTyping && displayedText.length < text.length && (
        <span 
          className="inline-block w-2 h-[1em] ml-1 animate-pulse align-middle" 
          style={{ backgroundColor: cursorColor }} 
        />
      )}
    </span>
  );
};
// 3. Matrix Background Component (Fixed)
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

    // Initialize/Reset canvas dimensions and drops
    const initMatrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const columns = Math.ceil(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    // Handle resize
    window.addEventListener('resize', initMatrix);
    initMatrix(); // Initial setup

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41'; // Green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationFrameId = setTimeout(() => requestAnimationFrame(draw), 50);
    };

    draw();

    return () => {
      window.removeEventListener('resize', initMatrix);
      clearTimeout(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 0, opacity: 0.15 }} 
    />
  );
};

// 4. Boot Screen Component
const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += 160;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-start justify-center p-8 font-mono text-[#00ff41] overflow-hidden">
      <div className="max-w-3xl w-full space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="animate-fade-in">{line}</div>
        ))}
      </div>
    </div>
  );
};

// 5. Main Application
export default function App() {
  const [booting, setBooting] = useState(true);
  const [mode, setMode] = useState('terminal'); // 'terminal' or 'gui'
  
  // Terminal State
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  const focusInput = () => inputRef.current?.focus();

  const addToHistory = (content) => {
    setHistory(prev => [...prev, content]);
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command line to history
    addToHistory({
      type: 'command',
      content: trimmedCmd
    });

    // Add to command history for up/down arrows
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
    }

    // Process Command
    switch (trimmedCmd) {
      case 'help':
        addToHistory({
          type: 'output',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {COMMANDS.map(c => (
                <div key={c.cmd} className="flex items-center gap-4">
                  <span className="text-[#ffd700] min-w-[100px]">{c.cmd}</span>
                  <span className="text-[#008f11]">{c.desc}</span>
                </div>
              ))}
            </div>
          )
        });
        break;
      
      case 'clear':
        setHistory([]);
        break;

      case 'whoami':
        addToHistory({ type: 'output', content: 'root@portfolio:~/mohamed_juma' });
        break;

      case 'gui':
        addToHistory({ type: 'output', content: 'Switching to GUI mode...' });
        setTimeout(() => setMode('gui'), 500);
        break;

      case 'about':
        addToHistory({
          type: 'output',
          content: (
            <div className="space-y-4 max-w-3xl animate-in fade-in duration-300">
              <pre className="text-[10px] sm:text-xs leading-none text-[#008f11] select-none overflow-hidden">{ASCII_ART}</pre>
              <div className="p-4 border-l-2 border-[#00ff41] bg-[#00ff41]/5 mt-4">
                <p className="leading-relaxed">
                  Self-taught Full Stack Developer with a unique journey from <span className="text-[#ffd700]">Microbiology</span> to <span className="text-[#ffd700]">Code</span>. 
                  Currently teaching Biology & Chemistry while building production-ready web applications.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                   <div>
                      <div className="text-[#008f11] text-sm">// EDUCATION</div>
                      <div>BSc. Microbiology, Karatina University</div>
                   </div>
                   <div>
                      <div className="text-[#008f11] text-sm">// CURRENT_ROLE</div>
                      <div>High School Teacher (Bio & Chem)</div>
                   </div>
                   <div>
                      <div className="text-[#008f11] text-sm">// LOCATION</div>
                      <div>Nairobi, Kenya</div>
                   </div>
                   <div>
                      <div className="text-[#008f11] text-sm">// INTERESTS</div>
                      <div>EdTech, Cybersecurity, DevOps</div>
                   </div>
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
            <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
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
                  {['Prisma ORM', 'Linux CLI', 'Git/GitHub', 'RESTful APIs', 'JWT Auth'].map(s => (
                    <span key={s} className="px-2 py-1 border border-[#008f11] bg-[#008f11]/10 text-[#008f11] text-sm">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[#ffd700] mb-2">Cybersecurity</h3>
                <div className="flex flex-wrap gap-2">
                  {['Kali Linux', 'Nmap', 'Gobuster', 'SQLMap', 'HackTheBox'].map(s => (
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {PROJECTS.map((p, idx) => (
                <div key={idx} className="border border-[#008f11] bg-black/50 p-4 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[#ffd700] text-lg font-bold group-hover:underline">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 border ${p.isLive ? 'border-[#00ff41] text-[#00ff41]' : 'border-[#ffd700] text-[#ffd700]'}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map(t => (
                      <span key={t} className="text-xs text-[#008f11] bg-[#008f11]/10 px-1">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#ffd700]">
                        <Github size={14} /> Code
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#ffd700]">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
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
            <div className="space-y-2 max-w-lg animate-in slide-in-from-bottom-4">
              <p>Looking for opportunities in Full Stack Dev & DevOps.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <a href="mailto:mohamj876@gmail.com" className="flex items-center gap-2 p-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                  <Mail size={16} /> mohamj876@gmail.com
                </a>
                <a href="https://github.com/modd3" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                  <Github size={16} /> github.com/modd3
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
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

      case '':
        break;
        
      default:
        addToHistory({
          type: 'output',
          content: (
            <span className="text-red-400">
              Command not found: {trimmedCmd}. Type <span className="text-[#ffd700]">'help'</span> for available commands.
            </span>
          )
        });
    }
    
    setCurrentInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find(c => c.cmd.startsWith(currentInput.toLowerCase()));
      if (match) {
        setCurrentInput(match.cmd);
      }
    }
  };

  if (booting) {
    return <BootScreen onComplete={() => setBooting(false)} />;
  }

  // GUI Mode Render
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
                <button 
                  onClick={() => setMode('terminal')}
                  className="flex items-center gap-2 px-3 py-1 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all text-sm"
                >
                  <Terminal size={14} /> Terminal Mode
                </button>
             </div>
          </header>

          <main className="max-w-6xl mx-auto p-6 space-y-20">
             {/* About Section */}
             <section id="about" className="pt-8">
                <div className="flex items-center gap-4 mb-6 text-[#ffd700] text-3xl">
                  <span className="text-[#00ff41] text-4xl font-light">&gt;</span>
                  <Typewriter text="whoami" delay={200} speed={100} cursorColor="#ffd700" />
                </div>
                <div className="bg-[#1a1a1a] border-2 border-[#00ff41] p-6 sm:p-8 rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                   <pre className="text-[8px] sm:text-[10px] text-[#008f11] leading-none mb-6 overflow-hidden hidden sm:block">
                     {ASCII_ART}
                   </pre>
                   <div className="text-lg leading-relaxed mb-6 min-h-[80px]">
                     {/* The Typewriter component now renders a <span>, resolving the div inside p error. */}
                     <Typewriter 
                       text="Self-taught Full Stack Developer with a unique journey from Microbiology to Code. Currently teaching Biology & Chemistry while building production-ready web applications." 
                       speed={20}
                       delay={1000}
                     />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {[
                       { label: 'EDUCATION', val: 'BSc. Microbiology' },
                       { label: 'ROLE', val: 'High School Teacher' },
                       { label: 'LOCATION', val: 'Nairobi, Kenya' },
                       { label: 'FOCUS', val: 'EdTech & Security' }
                     ].map((item, i) => (
                       <div key={i} className="bg-[#00ff41]/5 p-4 border-l-2 border-[#00ff41]">
                         <div className="text-[#008f11] text-xs mb-1">// {item.label}</div>
                         <div className="text-sm font-bold">{item.val}</div>
                       </div>
                     ))}
                   </div>
                </div>
             </section>

             {/* Skills Section */}
             <section id="skills &">
                <div className="flex items-center gap-4 mb-6 text-[#ffd700] text-3xl">
                  <span className="text-[#00ff41] text-4xl font-light">&gt;</span>
                  <Typewriter text="tech_stack --list" delay={200} speed={100} cursorColor="#ffd700" />
                </div>
                <div className="bg-[#1a1a1a] border-2 border-[#00ff41] p-6 sm:p-8 rounded-lg">
                  <div className="space-y-8">
                     <div>
                       <h3 className="text-[#ffd700] mb-4 flex items-center gap-2"><Cpu size={20}/> Core Technologies</h3>
                       <div className="flex flex-wrap gap-3">
                         {['Node.js', 'Express.js', 'React', 'Python', 'Bash', 'PostgreSQL', 'MongoDB'].map(s => (
                           <div key={s} className="px-4 py-2 bg-[#00ff41]/10 border border-[#00ff41] hover:scale-105 transition-transform">{s}</div>
                         ))}
                       </div>
                     </div>
                     <div>
                       <h3 className="text-[#ffd700] mb-4 flex items-center gap-2"><Command size={20}/> Tools & Frameworks</h3>
                       <div className="flex flex-wrap gap-3">
                         {['Prisma', 'Linux', 'Git', 'REST APIs', 'JWT'].map(s => (
                           <div key={s} className="px-4 py-2 bg-[#008f11]/10 border border-[#008f11] text-[#008f11]">{s}</div>
                         ))}
                       </div>
                     </div>
                  </div>
                </div>
             </section>

             {/* Projects Section */}
             <section id="projects">
                <div className="flex items-center gap-4 mb-6 text-[#ffd700] text-3xl">
                  <span className="text-[#00ff41] text-4xl font-light">&gt;</span>
                  <Typewriter text="ls -la ~/projects" delay={200} speed={80} cursorColor="#ffd700" />
                </div>
                <div className="space-y-8">
                   {PROJECTS.map((p, idx) => (
                     <div key={idx} className="bg-[#000]/50 border border-[#008f11] p-6 hover:border-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.15)] transition-all transform hover:-translate-y-1">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                           <h3 className="text-2xl text-[#ffd700] font-bold">{p.title}</h3>
                           <span className={`px-3 py-1 text-xs border ${p.isLive ? 'border-[#00ff41] bg-[#00ff41]/20' : 'border-[#ffd700] bg-[#ffd700]/20'}`}>
                             {p.status}
                           </span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            <Typewriter text={p.desc} speed={10} delay={500} />
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                           {p.stack.map(t => (
                             <span key={t} className="px-2 py-1 text-xs border border-[#008f11]/50 text-[#008f11]">{t}</span>
                           ))}
                        </div>
                        <div className="flex gap-4">
                           {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="btn border-2 border-[#00ff41] text-[#00ff41] px-4 py-2 hover:bg-[#00ff41] hover:text-black transition-colors font-bold">View Code</a>}
                           {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn border-2 border-[#ffd700] text-[#ffd700] px-4 py-2 hover:bg-[#ffd700] hover:text-black transition-colors font-bold">Live Demo</a>}
                        </div>
                     </div>
                   ))}
                </div>
             </section>

             {/* Contact */}
             <section id="contact" className="pb-10">
                <div className="flex items-center gap-4 mb-6 text-[#ffd700] text-3xl">
                  <span className="text-[#00ff41] text-4xl font-light">&gt;</span>
                  <Typewriter text="contact --verbose" delay={200} speed={100} cursorColor="#ffd700" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <a href="mailto:mohamj876@gmail.com" className="flex flex-col items-center justify-center p-8 bg-[#00ff41]/5 border-2 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group">
                      <Mail size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                      <span>Email Me</span>
                   </a>
                   <a href="https://github.com/modd3" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-[#00ff41]/5 border-2 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group">
                      <Github size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                      <span>GitHub</span>
                   </a>
                   <a href="#" className="flex flex-col items-center justify-center p-8 bg-[#00ff41]/5 border-2 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group">
                      <Linkedin size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                      <span>LinkedIn</span>
                   </a>
                </div>
             </section>
          </main>

          {/* Footer */}
          <footer className="text-center p-8 border-t-2 border-[#00ff41] mt-16 text-[#008f11] bg-[#1a1a1a]/90 backdrop-blur-md">
            <p>root@portfolio:~$ exit</p>
            <p className="mt-4">© {new Date().getFullYear()} Mohamed Juma | Built with passion, powered by curiosity</p>
            <p className="mt-2 text-sm">From Microbiology to Microservices 🧬 → 💻</p>
          </footer>
        </div>
      </div>
    );
  }

  // Terminal Mode Render
  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono overflow-hidden relative"
      onClick={focusInput}
    >
      <MatrixBackground />
      
      {/* Terminal Window */}
      <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col max-w-5xl mx-auto">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center pb-2 border-b border-[#008f11]/50 mb-4 bg-[#0a0a0a]/80 backdrop-blur">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-[#008f11] text-xs">root@portfolio: ~</div>
        </div>

        {/* Scrollable Content Area */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pb-20"
        >
          {/* Welcome Message */}
          <div className="mb-6 space-y-2">
            <p>Mohamed Juma Portfolio [Version 1.0.0]</p>
            <p>(c) {new Date().getFullYear()} Mohamed Juma. All rights reserved.</p>
            <p className="pt-4">Type <span className="text-[#ffd700]">'help'</span> to view available commands.</p>
            <p>Type <span className="text-[#ffd700]">'gui'</span> to switch to standard website view.</p>
          </div>

          {/* History */}
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'command' ? (
                <div className="flex items-center gap-2 text-[#00ff41]">
                  <span className="text-[#ffd700]">root@portfolio:~$</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <div className="text-[#cccccc] ml-0 md:ml-4 mt-1">
                  {item.content}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-[#00ff41]">
             <span className="text-[#ffd700] shrink-0">root@portfolio:~$</span>
             
             {/* Input Wrapper */}
             <div className="relative flex items-center">
                {/* Visible Text */}
                <span className="whitespace-pre-wrap min-h-6 flex items-center">{currentInput}</span>
                
                {/* Blinking Cursor */}
                <div className="w-2.5 h-5 bg-[#00ff41] animate-pulse ml-0.5"></div>
                
                {/* Hidden Input for capturing typing */}
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 opacity-0"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
             </div>
          </div>
          
          {/* Mobile Keyboard Helper (optional visual cue) */}
          <div className="h-4"></div>
        </div>

        {/* Hint Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] text-[#008f11] text-xs p-2 text-center border-t border-[#00ff41]/30 hidden md:block">
           <span className="mx-2">[TAB] Auto-complete</span>
           <span className="mx-2">[↑/↓] History</span>
           <span className="mx-2">[GUI] Switch Mode</span>
        </div>
      </div>
    </div>
  );
}
