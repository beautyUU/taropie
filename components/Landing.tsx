
import React, { useState } from 'react';
import { Spread, ValidationResult } from '../types';

interface LandingProps {
  spreads: Spread[];
  onStart: (question: string, spreadId: string, useReversed: boolean) => void;
  validation: ValidationResult;
}

const Landing: React.FC<LandingProps> = ({ spreads, onStart, validation }) => {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState(spreads[0].id);
  const [useReversed, setUseReversed] = useState(true);

  const isFatal = validation.level === 'FATAL';

  return (
    <div className="space-y-24 max-w-4xl mx-auto animate-in fade-in duration-1000">
      {/* 输入意念 */}
      <div className="space-y-8">
        <label className="text-[var(--brass)] font-bold tracking-[0.4em] uppercase text-[var(--caption)] block text-center opacity-80">
          Inquiry Intent / 问卜意念
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isFatal}
          placeholder="在此刻下你的意念，探索未知的机遇..."
          className="w-full bg-[var(--bg-2)] border border-[var(--line)] p-10 md:p-12 text-[var(--ink)] text-center focus:outline-none focus:border-[var(--brass)] transition-all h-56 md:h-64 resize-none text-[26px] md:text-[32px] serif italic placeholder:opacity-5 leading-relaxed rounded-sm shadow-2xl"
        />
      </div>

      {/* 选择路径 */}
      <div className="space-y-10">
        <div className="divider-alchemy">
          <span className="alchemy-sigil text-[var(--caption)] tracking-[0.8em] font-bold">DECRYPTION PATH</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spreads.map((spread) => (
            <button
              key={spread.id}
              disabled={isFatal}
              onClick={() => setSelectedSpread(spread.id)}
              className={`academic-card p-8 text-left transition-all flex justify-between items-center group overflow-hidden ${
                selectedSpread === spread.id
                  ? 'border-[var(--brass)] bg-[var(--surface-3)]'
                  : 'bg-[var(--surface)] hover:border-[var(--line-strong)]'
              }`}
            >
              <div>
                <div className={`font-bold text-[var(--h3)] tracking-wide mb-2 ${selectedSpread === spread.id ? 'text-[var(--brass)]' : 'text-[var(--ink)]'}`}>
                  {spread.name}
                </div>
                <div className="text-[var(--caption)] text-[var(--faint)] serif italic opacity-70">
                  {spread.description}
                </div>
              </div>
              <span className="text-[var(--caption)] text-[var(--faint)] font-mono opacity-30">{spread.count}C</span>
              {selectedSpread === spread.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brass)] shadow-[0_0_15px_var(--brass)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 行动 */}
      <div className="flex flex-col items-center gap-12 pt-10">
        <div className="flex items-center gap-6 group cursor-pointer select-none" onClick={() => !isFatal && setUseReversed(!useReversed)}>
          <div className={`w-7 h-7 border flex items-center justify-center transition-all duration-300 ${useReversed ? 'border-[var(--brass)] bg-[var(--brass-soft)]' : 'border-[var(--line)]'}`}>
            {useReversed && <div className="w-2.5 h-2.5 bg-[var(--brass)] shadow-[0_0_8px_var(--brass)]"></div>}
          </div>
          <label className="text-[var(--muted)] text-[var(--caption)] font-bold uppercase tracking-[0.5em] cursor-pointer group-hover:text-[var(--ink)] transition-colors">
            Entropy / 启用逆位变量
          </label>
        </div>

        <button
          onClick={() => onStart(question, selectedSpread, useReversed)}
          disabled={isFatal}
          className="btn-primary w-full max-w-md text-xl"
        >
          {isFatal ? '终端锁定中' : '开始研习报告'}
        </button>
      </div>
    </div>
  );
};

export default Landing;
