import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

const Terminal = ({ activeTheme, setActiveTheme, onClose }) => {
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~'); // '~' or '~/projects'
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input on load and click anywhere in terminal content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to bottom of terminal scrollback
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Initial boot sequence on mount - matching custom terminal screenshot
  useEffect(() => {
    const bootLines = [
      {
        isHtml: true,
        html: <span>Welcome to my terminal portfolio. (Version 1.3.1)</span>,
        type: 'default'
      },
      { text: '----', type: 'system' },
      {
        isHtml: true,
        html: (
          <span>
            This project's source code can be found in this project's{' '}
            <a 
              href={portfolioData.personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#ffb800', textDecoration: 'underline', fontWeight: 600 }}
            >
              GitHub repo
            </a>.
          </span>
        ),
        type: 'default'
      },
      { text: '----', type: 'system' },
      {
        isHtml: true,
        html: (
          <span>
            For a list of available commands, type <span style={{ color: '#39ff14' }}>`help`</span>.
          </span>
        ),
        type: 'default'
      },
      { text: '', type: 'default' }
    ];
    setHistory(bootLines);
  }, []);

  // Colored prompt generator helper
  const getPromptPrefixHtml = (dir) => {
    return (
      <span className="terminal-prompt-prefix" style={{ userSelect: 'none' }}>
        <span style={{ color: '#ff8c00', fontWeight: 600 }}>visitor</span>
        <span style={{ color: '#10b981', fontWeight: 600 }}>@terminal.bhande.dev</span>
        <span style={{ color: '#ffffff' }}>:</span>
        <span style={{ color: '#06b6d4', fontWeight: 600 }}>{dir}</span>
        <span style={{ color: '#ffffff', marginRight: '6px' }}>$</span>
      </span>
    );
  };

  const handleCommandSubmit = (cmdText) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    // Add prompt line to history with colored spans
    const promptLineHtml = (
      <div>
        {getPromptPrefixHtml(currentDir)}
        <span style={{ color: '#ffffff' }}>{rawCmd}</span>
      </div>
    );
    let newHistory = [...history, { isHtml: true, html: promptLineHtml, type: 'prompt' }];

    // Parse command and arguments
    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    // Store in keyboard command history
    const newCmdHistory = [rawCmd, ...commandHistory.filter(c => c !== rawCmd)];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);

    // Command matching execution
    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'highlight' },
          { text: '  whoami          Display background details about Adarsh Bhande', type: 'system' },
          { text: '  ls [path]       List files and directories in the current folder', type: 'system' },
          { text: '  cd <dir>        Change directories', type: 'system' },
          { text: '  cat <file>      Display the text content of a file', type: 'system' },
          { text: '  pwd             Print the path of the current directory', type: 'system' },
          { text: '  open <phase>    Launch a specific project phase (e.g. open phase-1)', type: 'system' },
          { text: '  theme <theme>   Change terminal themes (theme dark | theme light)', type: 'system' },
          { text: '  resume          Trigger mock resume download', type: 'system' },
          { text: '  contact         Show email and social networking links', type: 'system' },
          { text: '  history         Show list of commands typed in this session', type: 'system' },
          { text: '  clear           Flush terminal log buffer', type: 'system' },
          { text: '  exit            Close the terminal and return to the desktop UI', type: 'system' }
        );
        break;

      case 'whoami':
        portfolioData.personalInfo.bio.forEach(para => {
          newHistory.push({ text: para, type: 'default' });
        });
        break;

      case 'ls':
        const targetPath = arg ? arg.trim() : '';
        if (targetPath === '') {
          // List current dir
          if (currentDir === '~') {
            newHistory.push(
              { text: 'about.md          [File]', type: 'default' },
              { text: 'skills.json       [File]', type: 'default' },
              { text: 'contact.txt       [File]', type: 'default' },
              { text: 'projects/         [Directory]', type: 'highlight' }
            );
          } else {
            // in projects directory
            Object.keys(portfolioData.fileSystem.projects).forEach(f => {
              newHistory.push({ text: `${f}      [File]`, type: 'default' });
            });
          }
        } else if (targetPath === 'projects' || targetPath === './projects' || targetPath === '~/projects') {
          if (currentDir === '~') {
            Object.keys(portfolioData.fileSystem.projects).forEach(f => {
              newHistory.push({ text: `${f}      [File]`, type: 'default' });
            });
          } else {
            newHistory.push({ text: "ls: projects: No such file or directory", type: 'error' });
          }
        } else {
          newHistory.push({ text: `ls: path not found: ${targetPath}`, type: 'error' });
        }
        break;

      case 'cd':
        const dirName = arg ? arg.trim() : '';
        if (!dirName || dirName === '~') {
          setCurrentDir('~');
        } else if (dirName === '..') {
          setCurrentDir('~');
        } else if (dirName === 'projects' || dirName === './projects') {
          if (currentDir === '~') {
            setCurrentDir('~/projects');
          } else {
            newHistory.push({ text: "cd: projects: No such directory", type: 'error' });
          }
        } else {
          newHistory.push({ text: `cd: directory not found: ${dirName}`, type: 'error' });
        }
        break;

      case 'pwd':
        newHistory.push({ text: currentDir, type: 'default' });
        break;

      case 'cat':
        const fileName = arg ? arg.trim() : '';
        if (!fileName) {
          newHistory.push({ text: "cat: missing file parameter. Usage: cat <filename>", type: 'error' });
        } else {
          if (currentDir === '~') {
            if (portfolioData.fileSystem[fileName]) {
              newHistory.push({ text: portfolioData.fileSystem[fileName], type: 'default' });
            } else if (fileName === 'projects') {
              newHistory.push({ text: "cat: projects: Is a directory", type: 'error' });
            } else {
              newHistory.push({ text: `cat: ${fileName}: File not found`, type: 'error' });
            }
          } else {
            // inside projects directory
            if (portfolioData.fileSystem.projects[fileName]) {
              newHistory.push({ text: portfolioData.fileSystem.projects[fileName], type: 'default' });
            } else {
              newHistory.push({ text: `cat: ${fileName}: File not found`, type: 'error' });
            }
          }
        }
        break;

      case 'open':
        const projName = arg ? arg.trim().toLowerCase() : '';
        if (!projName) {
          newHistory.push({ text: "open: specify project phase (e.g. open phase-1)", type: 'error' });
        } else {
          const match = portfolioData.projects.find(p => p.id === projName);
          if (match) {
            newHistory.push({ text: `[system] opening ${match.name} demo link: ${match.demo}`, type: 'success' });
            if (match.demo && match.demo !== '#') {
              window.open(match.demo, '_blank');
            } else {
              newHistory.push({ text: `[info] project demo uses a local mock placeholder.`, type: 'warning' });
            }
          } else {
            newHistory.push({ text: `open: project not found: ${projName}. Choose from: phase-1, phase-2, phase-3, phase-4`, type: 'error' });
          }
        }
        break;

      case 'theme':
        const themeVal = arg ? arg.trim().toLowerCase() : '';
        if (themeVal === 'light') {
          setActiveTheme('light');
          newHistory.push({ text: 'Active theme changed to LIGHT.', type: 'success' });
        } else if (themeVal === 'dark') {
          setActiveTheme('dark');
          newHistory.push({ text: 'Active theme changed to DARK.', type: 'success' });
        } else if (!themeVal) {
          const toggled = activeTheme === 'dark' ? 'light' : 'dark';
          setActiveTheme(toggled);
          newHistory.push({ text: `Toggled active theme to ${toggled.toUpperCase()}.`, type: 'success' });
        } else {
          newHistory.push({ text: `theme: option not supported: ${themeVal}. Usage: theme dark | theme light`, type: 'error' });
        }
        break;

      case 'resume':
        newHistory.push({ text: '[system] opening resume document in new tab...', type: 'success' });
        if (portfolioData.personalInfo.resumeUrl && portfolioData.personalInfo.resumeUrl !== '#') {
          window.open(portfolioData.personalInfo.resumeUrl, '_blank');
        } else {
          newHistory.push({ text: '[error] resume URL is not configured.', type: 'error' });
        }
        break;

      case 'contact':
        newHistory.push(
          { text: `Email:    ${portfolioData.personalInfo.email}`, type: 'default' },
          { text: `GitHub:   ${portfolioData.personalInfo.github}`, type: 'default' },
          { text: `LinkedIn: ${portfolioData.personalInfo.linkedin}`, type: 'default' },
          { text: `Resume:   ${portfolioData.personalInfo.resumeUrl}`, type: 'default' }
        );
        break;


      case 'history':
        const revHistory = [...newCmdHistory].reverse();
        revHistory.forEach((c, idx) => {
          newHistory.push({ text: `  ${idx + 1}  ${c}`, type: 'system' });
        });
        break;

      case 'clear':
        newHistory = [];
        break;

      case 'exit':
      case 'close':
        newHistory.push({ text: '[system] closing interactive terminal environment...', type: 'system' });
        setTimeout(() => {
          onClose();
        }, 300);
        break;

      case 'sudo':
        newHistory.push({ text: "Permission denied: Nice try! But you do not have root privilege on this server.", type: 'error' });
        break;

      default:
        newHistory.push({ text: `Command not found: '${cmd}'. Type 'help' to see active directives.`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  // Keyboard navigation & tab completion
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommandSubmit(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prevIdx = historyIndex - 1;
      if (prevIdx >= 0) {
        setHistoryIndex(prevIdx);
        setInput(commandHistory[prevIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    }
  };

  const handleAutocomplete = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const commands = ['help', 'whoami', 'ls', 'cd', 'cat', 'pwd', 'open', 'theme', 'resume', 'contact', 'history', 'clear', 'exit', 'sudo'];
    const filesInRoot = ['about.md', 'skills.json', 'contact.txt', 'projects'];
    const filesInProjects = ['phase-1.md', 'phase-2.md', 'phase-3.md', 'phase-4.md'];

    const parts = trimmedInput.split(/\s+/);
    
    // Autocompleting commands
    if (parts.length === 1) {
      const match = commands.find(c => c.startsWith(parts[0].toLowerCase()));
      if (match) {
        setInput(match + ' ');
      }
    } 
    // Autocompleting file paths for commands like cat/cd/open
    else if (parts.length === 2) {
      const cmd = parts[0].toLowerCase();
      const searchTarget = parts[1].toLowerCase();

      if (cmd === 'cat') {
        const fileList = currentDir === '~' ? filesInRoot : filesInProjects;
        const match = fileList.find(f => f.toLowerCase().startsWith(searchTarget));
        if (match) {
          setInput(`${cmd} ${match}`);
        }
      } else if (cmd === 'cd' && currentDir === '~') {
        if ('projects'.startsWith(searchTarget)) {
          setInput('cd projects/');
        }
      } else if (cmd === 'open') {
        const match = ['phase-1', 'phase-2', 'phase-3', 'phase-4'].find(p => p.startsWith(searchTarget));
        if (match) {
          setInput(`open ${match}`);
        }
      }
    }
  };

  return (
    <div 
      className="terminal-content" 
      onClick={focusInput} 
      style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}
    >
      <div className="terminal-scrollback" style={{ flex: 1, overflowY: 'auto' }}>
        {history.map((line, idx) => (
          <div key={idx} className={`terminal-line terminal-log-${line.type}`}>
            {line.isHtml ? line.html : line.text}
          </div>
        ))}
        
        {/* Active typed line input */}
        <div className="terminal-input-line">
          {getPromptPrefixHtml(currentDir)}
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
          <span className="cursor-blink"></span>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default Terminal;
