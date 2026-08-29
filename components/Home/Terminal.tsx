'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Minimize, Maximize, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminalCommand {
  command: string;
  output: string[];
  delay?: number;
}

const commands: Record<string, TerminalCommand> = {
  whoami: {
    command: 'whoami',
    output: [
      'Dixit Saini - Android Developer',
      '📍 Mohali, Punjab, India',
    ],
  },
  experience: {
    command: 'cat experience.txt',
    output: [
      '3+ years of professional Android development',
      'Currently Senior Developer @ Scramble Apps',
      'Previously Intern @ Deftsoft (6 months)',
    ],
  },
  skills: {
    command: 'ls skills/',
    output: [
      'android_dev/     realtime_systems/   databases/',
      'architecture/    devops/             concurrency/',
    ],
  },
  projects: {
    command: 'npm run featured-projects',
    output: [
      '✓ Taktide - Real-time Chat App',
      '✓ Konektor - Location-based Social',
      '✓ HookzApp - Swipe-based Social Platform',
      '✓ Genome Homeopathy - Healthcare App',
      '✓ Colossal Store - E-commerce Platform',
    ],
  },
  contact: {
    command: 'contact me',
    output: [
      '📧 dixit.appinnovator@gmail.com',
      '📱 +91 9728643374',
      '💼 linkedin.com/in/dixitsaini2',
    ],
  },
  help: {
    command: 'help',
    output: [
      'Available commands:',
      '  whoami      - Display profile info',
      '  experience  - Show work experience',
      '  skills      - List skill categories',
      '  projects    - Show featured projects',
      '  contact     - Display contact info',
      '  clear       - Clear terminal',
      '  help        - Show this help',
    ],
  },
};

const commandOrder = ['whoami', 'experience', 'skills', 'projects', 'contact'];

export function TerminalComponent() {
  const [lines, setLines] = useState<Array<{ type: 'input' | 'output'; content: string; command?: string }>>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const typeCommand = async (cmd: string) => {
    setIsTyping(true);
    const command = commands[cmd];
    if (!command) return;

    setLines((prev) => [...prev, { type: 'input', content: command.command, command: cmd }]);
    
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    for (let i = 0; i < command.output.length; i++) {
      setLines((prev) => [...prev, { type: 'output', content: command.output[i] }]);
      await new Promise((resolve) => setTimeout(resolve, command.delay || 100));
    }
    
    setIsTyping(false);
  };

  const runAutoDemo = async () => {
    for (let i = 0; i < commandOrder.length; i++) {
      if (currentCommandIndex !== i) continue;
      await typeCommand(commandOrder[i]);
      setCurrentCommandIndex(i + 1);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    setShowPrompt(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      runAutoDemo();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUserCommand = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLines((prev) => [...prev, { type: 'input', content: trimmed }]);
    setHistory((prev) => [...prev.slice(-50), trimmed]);
    setHistoryIndex(-1);
    setUserInput('');

    const cmd = trimmed.toLowerCase();
    if (cmd === 'clear') {
      setLines([]);
      setShowPrompt(true);
      return;
    }

    if (commands[cmd]) {
      await typeCommand(cmd);
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'output', content: `Command not found: ${trimmed}` },
        { type: 'output', content: "Type 'help' for available commands" },
      ]);
    }
    setShowPrompt(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserCommand(userInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setUserInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setUserInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setUserInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  const handleClickCommand = (cmd: string) => {
    if (!isTyping && !showPrompt) return;
    handleUserCommand(cmd);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-tertiary border border-default rounded-t-xl flex items-center gap-2 px-3 py-2.5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-warning" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-success" aria-hidden="true" />
        </div>
        <span className="text-sm text-tertiary font-mono flex-1 text-center">portfolio@dixit:~$</span>
        <div className="flex gap-1">
          <button className="p-1 rounded text-tertiary hover:text-primary hover:bg-secondary transition-colors" aria-label="Minimize">
            <Minimize className="h-4 w-4" />
          </button>
          <button className="p-1 rounded text-tertiary hover:text-primary hover:bg-secondary transition-colors" aria-label="Maximize">
            <Maximize className="h-4 w-4" />
          </button>
          <button className="p-1 rounded text-tertiary hover:text-error hover:bg-error/10 transition-colors" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="bg-primary border-x border-default border-b rounded-b-xl font-mono text-sm overflow-y-auto max-h-[400px] p-4"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        tabIndex={0}
      >
        <AnimatePresence mode="popLayout">
          {lines.map((line, index) => (
            <motion.div
              key={`${index}-${line.content}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'whitespace-pre-wrap break-words',
                line.type === 'input' ? 'text-accent' : 'text-secondary'
              )}
            >
              {line.type === 'input' && (
                <span className="flex items-center gap-2">
                  <span className="text-tertiary">portfolio@dixit:~$</span>
                  <span>{line.content}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-accent"
                  >
                    █
                  </motion.span>
                </span>
              )}
              {line.type === 'output' && (
                <span>{line.content}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {showPrompt && !isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-tertiary">portfolio@dixit:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-primary font-mono text-sm caret-accent"
              placeholder={isTyping ? 'Running command...' : 'Type a command (whoami, skills, projects, contact, help)'}
              disabled={isTyping}
              autoFocus
              aria-label="Terminal command input"
            />
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-accent"
            >
              █
            </motion.span>
          </motion.div>
        )}
      </div>

      {!showPrompt && (
        <div className="bg-tertiary border border-default border-t-0 rounded-b-xl px-3 py-2 text-xs text-tertiary flex items-center justify-between">
          <span>Auto-running demo... Click to interact</span>
          <Terminal className="h-4 w-4" aria-hidden="true" />
        </div>
      )}

      {showPrompt && (
        <div className="bg-tertiary border border-default border-t-0 rounded-b-xl px-3 py-2 text-xs text-tertiary flex flex-wrap gap-2 items-center">
          <span>Try:</span>
          {['whoami', 'experience', 'skills', 'projects', 'contact', 'help', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleClickCommand(cmd)}
              disabled={isTyping}
              className={cn(
                'px-2 py-1 rounded text-xs font-mono border transition-colors',
                'hover:bg-accent/10 hover:border-accent hover:text-accent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isTyping ? 'opacity-50' : ''
              )}
              aria-label={`Run ${cmd} command`}
            >
              {cmd}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}