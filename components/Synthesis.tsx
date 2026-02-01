
import React, { useMemo } from 'react';
import { DrawnCard, QuestionContext } from '../types';
import { calculateSynthesisData } from '../utils/interpretation';

interface SynthesisProps {
  cards: DrawnCard[];
  questionContext: QuestionContext | null;
}

const Synthesis: React.FC<SynthesisProps> = ({ cards, questionContext }) => {
  const analysis = useMemo(() => {
    return calculateSynthesisData(cards, questionContext);
  }, [cards, questionContext]);

  return (
    <div className="academic-card max-w-5xl mx-auto !p-16 md:!p-20 space-y-20 bg-[var(--surface-2)]">
      {/* 头部摘要 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-5">
            <span className="text-[var(--caption)] text-[var(--muted)] font-bold uppercase tracking-[0.6em] block opacity-50">Prime Energy / 核心主旨</span>
            <p className="text-[36px] md:text-[44px] font-bold text-[var(--brass)] serif leading-tight tracking-tight">{analysis.theme}</p>
          </div>
          <div className="space-y-5">
            <span className="text-[var(--caption)] text-[var(--muted)] font-bold uppercase tracking-[0.6em] block opacity-50">Hidden Risks / 潜在风险</span>
            <p className="text-[var(--body)] text-[var(--ink-dim)] serif italic opacity-85 leading-relaxed">{analysis.risk}</p>
          </div>
        </div>

        {/* 数据矩阵 */}
        <div className="bg-[var(--bg)] p-12 border border-[var(--line)] space-y-10 shadow-inner rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <span className="text-4xl font-serif">Ω</span>
          </div>
          <span className="text-[var(--caption)] text-[var(--faint)] font-bold uppercase tracking-[0.5em] block opacity-60">Matrix Distribution</span>
          <div className="space-y-10">
             <div className="space-y-4">
               <div className="flex justify-between text-[14px] uppercase tracking-[0.4em] font-bold">
                 <span className="text-[var(--muted)]">Major Arcana</span>
                 <span className="text-[var(--brass)]">{analysis.stats.majorCount} / {cards.length}</span>
               </div>
               <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                 <div className="h-full bg-[var(--brass)] shadow-[0_0_8px_var(--brass)]" style={{ width: `${(analysis.stats.majorCount/cards.length)*100}%` }}></div>
               </div>
             </div>
             <div className="space-y-4">
               <div className="flex justify-between text-[14px] uppercase tracking-[0.4em] font-bold">
                 <span className="text-[var(--muted)]">Reversed Forces</span>
                 <span className="text-[var(--verdigris)]">{analysis.stats.reversedCount} / {cards.length}</span>
               </div>
               <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                 <div className="h-full bg-[var(--verdigris)] shadow-[0_0_8px_var(--verdigris)]" style={{ width: `${(analysis.stats.reversedCount/cards.length)*100}%` }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* 行动路线图 */}
      <div className="space-y-16 pt-16">
        <div className="divider-alchemy !margin-0">
           <span className="alchemy-sigil text-[var(--caption)] tracking-[0.6em] font-bold text-[var(--brass)] uppercase">Action Protocols / 行动准则</span>
        </div>
        <div className="grid grid-cols-1 gap-16">
          {analysis.adviceWithEvidence.map((item, i) => (
            <div key={i} className="flex gap-12 items-start group">
              <div className="text-[var(--h2)] text-[var(--brass)] font-bold font-mono leading-none border-b-3 border-[var(--brass)] pb-1 transition-all group-hover:px-2">0{i+1}</div>
              <div className="space-y-5">
                <p className="text-[var(--insight)] font-bold text-[var(--ink)] leading-snug uppercase tracking-wide group-hover:text-[var(--brass)] transition-colors duration-300">
                  {item.text}
                </p>
                <p className="text-[var(--caption)] text-[var(--faint)] serif italic leading-relaxed opacity-65 border-l border-[var(--line-strong)] pl-6">
                  {item.evidence.replace('依据：', '解构依据：')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Synthesis;
