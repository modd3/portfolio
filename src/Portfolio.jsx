import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Terminal, Github, Linkedin, Mail, MapPin, ExternalLink, Code, Cpu, Shield, Command as CommandIcon, User, Layers, Monitor } from 'lucide-react';

/* --- DATA & CONTENT --- */
const BOOT_SEQUENCE = [
  'Initializing system...',
  'Loading kernel modules... [OK]',
  'Mounting file systems... [OK]',
  'Loading user profile: mohamed_juma',
  'Verifying identity... [SUCCESS]',
  'Starting interactive shell...',
  'System ready.',
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
███╗   ███╗ ██████╗ ██╗  ██╗ 
████╗ ████║██╔═══██╗██║  ██║
██╔████╔██║██║   ██║███████║
██║╚██╔╝██║██║   ██║██╔══██║
██║ ╚═╝ ██║╚██████╔╝██║  ██║
`;

const PROJECTS = [
  {
    title: "EduTrak",
    status: "IN DEVELOPMENT",
    desc: "Next-gen school management system supporting CBC + 8-4-4 curriculums. Multi-tenant architecture.",
    stack: ["React", "Express", "PostgreSQL", "Prisma"],
    link: "https://github.com/modd3/edutrak",
    live: null
  },
  {
    title: "School Management System",
    status: "LIVE",
    isLive: true,
    desc: "Deployed platform managing student records & grading. Reduced admin workload by 70%.",
    stack: ["MERN", "Node.js", "MongoDB"],
    link: "https://github.com/modd3/school-management",
    live: "https://school-management-o50k.onrender.com"
  },
  {
    title: "AI Prompt Builder",
    status: "DEV",
    desc: "Social platform for AI enthusiasts to create, test, and share prompts.",
    stack: ["MERN", "AI APIs", "OAuth"],
    link: "https://github.com/modd3/ai-prompt-builder",
    live: null
  },
  {
    title: "Proxy-Xtractor",
    status: "STABLE",
    desc: "Automated penetration testing tool. Scrapes SOCKS5 proxies for Kali Linux chains.",
    stack: ["Bash", "Python", "Kali Linux"],
    link: "https://github.com/modd3/proxy-xtractor",
    live: null
  },
  {
    title: "IP2Binary",
    status: "STABLE",
    desc: "CLI utility converting IPv4 to binary. Educational tool for subnetting.",
    stack: ["Bash", "Python"],
    link: "https://github.com/modd3/ip2binary",
    live: null
  }
];

// --- HELPER COMPONENTS ---

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let drops = [];
    const fontSize = 14;
    const chars = '01'; // Binary look for the background

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
      ctx.fillStyle = '#003300'; // Darker matrix for less distraction
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
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += 100 + Math.random() * 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-start justify-end sm:justify-center p-8 font-mono text-[#00ff41] overflow-hidden">
      <div className="max-w-3xl w-full space-y-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState([]);
  
  // Typing simulation state
  const [currentInput, setCurrentInput] = useState('');
  const [targetCommand, setTargetCommand] = useState(null); // The command we WANT to type
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const scrollRef = useRef(null);
  
  // Auto-scroll to bottom
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, currentInput, showMenu]);

  // Initial Auto-Start
  useEffect(() => {
    if (!booting && history.length === 0) {
      // Small delay after boot before typing "intro"
      setTimeout(() => triggerCommand('intro'), 500);
    }
  }, [booting, history]);

  // --- TYPING ENGINE ---
  useEffect(() => {
    if (targetCommand) {
      setIsTyping(true);
      setShowMenu(false); // Hide menu while typing
      
      let index = 0;
      const typeChar = () => {
        if (index < targetCommand.cmd.length) {
          setCurrentInput(targetCommand.cmd.slice(0, index + 1));
          index++;
          // Random typing speed variation for realism (30ms to 80ms)
          setTimeout(typeChar, 30 + Math.random() * 50); 
        } else {
          // Finished typing
          setTimeout(() => {
            executeCommand(targetCommand.cmd, targetCommand.type);
            setCurrentInput('');
            setTargetCommand(null);
            setIsTyping(false);
            setShowMenu(true); // Show menu again after result
          }, 400); // Pause briefly at end of line before "Enter"
        }
      };
      
      typeChar();
    }
  }, [targetCommand]);

  // Function called when user clicks a button
  const triggerCommand = (type) => {
    if (isTyping) return; // Prevent double clicks
    
    let cmdText = "";
    switch(type) {
      case 'intro': cmdText = "whoami"; break;
      case 'about': cmdText = "cat profile.txt"; break;
      case 'skills': cmdText = "grep -r 'Skills' ./system"; break;
      case 'projects': cmdText = "ls -la ~/projects"; break;
      case 'contact': cmdText = "curl contact_info"; break;
      case 'gui': cmdText = "startx --gui"; break;
      case 'clear': cmdText = "clear"; break;
      default: cmdText = type;
    }

    setTargetCommand({ cmd: cmdText, type: type });
  };

  const executeCommand = (cmd, type) => {
    // 1. Add the command line to history
    if (type !== 'intro') {
        setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    }

    // 2. Handle Logic
    if (type === 'clear') {
        setHistory([]);
        return;
    }

    if (type === 'gui') {
        setHistory(prev => [...prev, { type: 'output', content: 'Launching Graphical User Interface...' }]);
        setTimeout(() => {
            window.alert("In a real app, this would route to /gui. For this demo, we stay in terminal!");
        }, 1000);
        return;
    }

    let output = null;

    switch (type) {
      case 'intro':
        output = (
            <div className="space-y-4 mb-4">
                <div className="w-full overflow-hidden">
                    <pre className="text-[6px] sm:text-[10px] text-[#008f11] leading-none select-none">
                        {ASCII_ART}
                    </pre>
                </div>
                <p className="text-gray-300">
                    Hello! I'm <span className="text-[#ffd700] font-bold">Mohamed Juma</span>.
                </p>
                <p className="text-gray-300">
                    I am a Full Stack Developer transitioning from Microbiology. 
                    I build accessible, secure, and performant web applications.
                </p>
                <p className="text-[#008f11]">
                    Select an option below to navigate the system:
                </p>
            </div>
        );
        break;

      case 'about':
        output = (
          <div className="p-4 border-l-2 border-[#00ff41] bg-[#00ff41]/5 space-y-2 animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="text-[#ffd700] font-bold text-lg">USER_PROFILE: mohamed_juma</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                   <div className="text-[#008f11] text-xs">// CURRENT STATUS</div>
                   <div>High School Teacher (Bio/Chem) & Full Stack Dev</div>
                </div>
                <div>
                   <div className="text-[#008f11] text-xs">// EDUCATION</div>
                   <div>BSc. Microbiology, Karatina University</div>
                </div>
                <div>
                   <div className="text-[#008f11] text-xs">// LOCATION</div>
                   <div>Nairobi, Kenya</div>
                </div>
                <div>
                   <div className="text-[#008f11] text-xs">// INTERESTS</div>
                   <div>EdTech, Cybersecurity, DevOps</div>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-300 italic">
                "Bridging the gap between biological systems and digital logic."
            </p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
              <h3 className="text-[#ffd700] mb-2 flex items-center gap-2"><Code size={16}/> Languages & Runtimes</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript (ES6+)', 'Node.js', 'Python', 'Bash', 'HTML5/CSS3'].map(s => (
                  <span key={s} className="px-2 py-1 bg-[#00ff41]/10 text-[#00ff41] text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[#ffd700] mb-2 flex items-center gap-2"><Layers size={16}/> Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Express', 'Vite', 'Tailwind CSS'].map(s => (
                  <span key={s} className="px-2 py-1 bg-[#008f11]/10 text-[#008f11] text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[#ffd700] mb-2 flex items-center gap-2"><Shield size={16}/> Security & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Kali Linux', 'Git/GitHub', 'Docker', 'PostgreSQL', 'MongoDB', 'Nmap'].map(s => (
                  <span key={s} className="px-2 py-1 border border-red-500/30 text-red-400 text-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="border border-[#008f11] bg-black/40 p-3 hover:border-[#00ff41] transition-colors group">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[#ffd700] font-bold group-hover:underline">{p.title}</h3>
                  <span className={`text-[10px] px-1 border ${p.isLive ? 'border-[#00ff41] text-[#00ff41]' : 'border-yellow-600 text-yellow-600'}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.stack.slice(0,3).map(t => (
                    <span key={t} className="text-[10px] text-[#008f11] bg-[#008f11]/10 px-1">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3 text-xs">
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><Github size={10} /> Code</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><ExternalLink size={10} /> Live</a>}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-2 max-w-lg animate-in slide-in-from-bottom-4">
             <p className="text-gray-300">Initiating communication protocols...</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
               <a href="mailto:mohamj876@gmail.com" className="flex items-center gap-2 p-2 border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black transition-colors cursor-pointer">
                 <Mail size={16} /> <span className="text-sm">Email Me</span>
               </a>
               <a href="https://github.com/modd3" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black transition-colors cursor-pointer">
                 <Github size={16} /> <span className="text-sm">GitHub</span>
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black transition-colors cursor-pointer">
                 <Linkedin size={16} /> <span className="text-sm">LinkedIn</span>
               </a>
               <div className="flex items-center gap-2 p-2 text-[#008f11]">
                 <MapPin size={16} /> <span className="text-sm">Nairobi, KE</span>
               </div>
             </div>
          </div>
        );
        break;
        
      default:
        output = <span className="text-red-400">Error: Command execution failed.</span>;
    }

    if (output) {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
    }
  };

  if (booting) {
    return <BootScreen onComplete={() => setBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono overflow-hidden relative selection:bg-[#00ff41] selection:text-black">
      <MatrixBackground />
      
      {/* Main Terminal Window */}
      <div className="absolute inset-0 z-10 flex flex-col max-w-4xl mx-auto md:my-8 md:rounded-lg overflow-hidden md:border border-[#008f11] bg-black/80 shadow-2xl backdrop-blur-sm">
        
        {/* Title Bar */}
        <div className="flex justify-between items-center p-3 border-b border-[#008f11]/50 bg-[#111]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-[#008f11] text-xs font-bold tracking-widest opacity-80">
            root@portfolio:~
          </div>
          <div className="w-10"></div> {/* spacer for centering */}
        </div>

        {/* Content Area */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#00ff41]/30 scrollbar-track-transparent"
        >
          {history.map((item, index) => (
            <div key={index} className="animate-in fade-in duration-200">
              {item.type === 'command' ? (
                <div className="flex items-center gap-2 text-[#00ff41] opacity-70">
                  <span className="text-[#ffd700]">➜</span>
                  <span className="text-[#008f11]">~</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <div className="ml-0 md:ml-6 mt-2 mb-6">
                  {item.content}
                </div>
              )}
            </div>
          ))}

          {/* Active Line (Typing Area) */}
          <div className="flex items-center gap-2 text-[#00ff41] min-h-[1.5em]">
             <span className="text-[#ffd700]">➜</span>
             <span className="text-[#008f11]">~</span>
             <span className="whitespace-pre-wrap">{currentInput}</span>
             {isTyping && <span className="w-2 h-5 bg-[#00ff41] animate-pulse"></span>}
          </div>
        
          <div className="h-12"></div> {/* Spacer for scroll */}
        </div>

        {/* Interactive Footer Menu */}
        <div className={`p-4 border-t border-[#008f11]/30 bg-[#111] transition-all duration-300 transform ${showMenu ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-3">
                <MenuButton icon={<User size={16}/>} label="About Me" onClick={() => triggerCommand('about')} />
                <MenuButton icon={<Code size={16}/>} label="Projects" onClick={() => triggerCommand('projects')} />
                <MenuButton icon={<Cpu size={16}/>} label="Skills" onClick={() => triggerCommand('skills')} />
                <MenuButton icon={<Mail size={16}/>} label="Contact" onClick={() => triggerCommand('contact')} />
                <div className="w-px h-8 bg-[#008f11]/30 mx-2 hidden sm:block"></div>
                <MenuButton icon={<Monitor size={16}/>} label="GUI Mode" onClick={() => triggerCommand('gui')} variant="outline" />
                <MenuButton icon={<CommandIcon size={16}/>} label="Clear" onClick={() => triggerCommand('clear')} variant="ghost" />
            </div>
            <div className="text-center mt-3 text-[10px] text-[#008f11]/50 uppercase tracking-widest">
                System Interactive • Click options to execute
            </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const MenuButton = ({ icon, label, onClick, variant = 'primary' }) => {
    const baseClass = "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95";
    
    const variants = {
        primary: "bg-[#00ff41] text-black hover:bg-[#00cc33] shadow-[0_0_10px_rgba(0,255,65,0.3)]",
        outline: "border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black",
        ghost: "text-[#008f11] hover:text-[#00ff41] hover:bg-[#00ff41]/10"
    };

    return (
        <button 
            onClick={onClick}
            className={`${baseClass} ${variants[variant]}`}
        >
            {icon}
            {label}
        </button>
    );
};
