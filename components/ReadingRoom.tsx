
import React, { useState } from 'react';
import { DrawnCard, Orientation, QuestionContext } from '../types';
import { generateContextualInsight } from '../utils/logic';
import { getMeaningByOrientation, generateMarkdownReport } from '../utils/interpretation';
import Synthesis from './Synthesis';
import CardFace from './CardFace';

interface ReadingRoomProps {
  question: string;
  questionContext: QuestionContext | null;
  drawnCards: DrawnCard[];
  spreadName: string;
  onReset: () => void;
  onReshuffle: () => void;
}

const ReadingRoom: React.FC<ReadingRoomProps> = ({ 
  question, 
  questionContext,
  drawnCards, 
  spreadName, 
  onReset, 
  onReshuffle 
}) => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyMarkdown = async () => {
    const md = generateMarkdownReport(question, questionContext, drawnCards, spreadName);
    try {
      await navigator.clipboard.writeText(md);
      showToast("📜 档案已存档至剪贴板");
    } catch (err) {
      alert("复制失败。");
    }
  };

  return (
    <div className="space-y-32 animate-in fade-in duration-1000 pb-32">
      {toast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[var(--brass)] text-[var(--bg)] px-12 py-4 shadow-2xl text-[var(--caption)] font-bold uppercase tracking-[0.3em] border border-white/30 rounded-sm">
          {toast}
        </div>
      )}

      {/* 顶部状态条 */}
      <div className="flex justify-between items-center border-b border-[var(--line)] pb-10">
        <button onClick={onReset} className="text-[var(--caption)] font-bold text-[var(--faint)] hover:text-[var(--ink)] uppercase tracking-[0.5em] transition-colors">
          ← Return / 归档
        </button>
        <div className="text-center">
          <span className="text-[var(--h3)] font-cinzel text-[var(--brass)] tracking-[0.8em] uppercase font-bold">{spreadName}</span>
        </div>
        <button onClick={handleCopyMarkdown} className="text-[var(--caption)] font-bold text-[var(--verdigris)] hover:opacity-70 uppercase tracking-[0.4em] transition-opacity">
          Extract / 提取
        </button>
      </div>

      {/* 问题区域 */}
      {question && (
        <div className="text-center py-12">
          <p className="text-[36px] md:text-[52px] serif italic text-[var(--ink)] leading-tight tracking-tight opacity-95 max-w-5xl mx-auto">
            “{question}”
          </p>
        </div>
      )}

      {/* 牌组解析列表 */}
      <div className="space-y-48 max-w-5xl mx-auto">
        {drawnCards.map((card, index) => {
          const meaning = getMeaningByOrientation(card);
          const contextInsight = questionContext ? generateContextualInsight(card, questionContext) : null;
          const isRev = card.orientation === Orientation.Reversed;
          
          // 关键词折叠逻辑：最多显示3个
          const displayKeywords = meaning.keywords.slice(0, 3);
          const hiddenCount = meaning.keywords.length - 3;

          return (
            <div key={`${card.id}-${index}`} className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
              {/* 左侧：牌面展现 */}
              <div className="md:col-span-5 flex flex-col items-center gap-10">
                <div className="w-full max-w-[280px] aspect-[300/520] border border-[var(--line-strong)] shadow-[0_20px_60px_rgba(0,0,0,0.7)] group transform transition-transform duration-700 hover:scale-[1.03]">
                  <CardFace card={card} orientation={card.orientation} />
                </div>
                <div className="text-center">
                   <div className="text-[var(--caption)] text-[var(--faint)] font-bold tracking-[0.6em] uppercase mb-3 opacity-60">
                     Phase {index + 1}
                   </div>
                   <div className="text-[var(--h2)] font-serif font-bold text-[var(--brass)] tracking-widest">{card.positionName}</div>
                </div>
              </div>

              {/* 右侧：深度阅读 */}
              <div className="md:col-span-7 space-y-10">
                <div className="flex items-center gap-6 border-b border-[var(--line)] pb-6">
                  <h3 className="text-[var(--h2)] font-serif font-bold text-[var(--ink)]">{card.name}</h3>
                  <span className={`px-5 py-1.5 text-[13px] font-bold uppercase tracking-[0.2em] border ${isRev ? 'bg-red-900/10 text-red-400 border-red-900/30' : 'bg-[var(--verdigris)]/5 text-[var(--verdigris)] border-[var(--verdigris)]/20'}`}>
                    {card.orientation}
                  </span>
                </div>

                {/* 针对性行动句 - 重点呈现 */}
                <div className="academic-card !bg-[var(--bg-2)] !border-l-[6px] !border-l-[var(--brass)] shadow-inner">
                   <p className="text-[var(--insight)] text-[var(--ink)] font-bold leading-relaxed serif italic opacity-95">
                     {contextInsight || meaning.meaning}
                   </p>
                </div>

                {/* 关键词 Chips - 放大版 */}
                <div className="flex flex-wrap gap-4">
                  {displayKeywords.map(kw => (
                    <span key={kw} className="keyword-chip">
                      {kw}
                    </span>
                  ))}
                  {hiddenCount > 0 && (
                    <span className="keyword-chip border-dashed opacity-40">
                      +{hiddenCount} More
                    </span>
                  )}
                </div>

                {/* 归档释义 - 默认收纳 */}
                <details className="group academic-card !p-0 overflow-hidden border-none shadow-none bg-transparent">
                  <summary className="p-6 text-[var(--caption)] text-[var(--faint)] font-bold uppercase tracking-[0.5em] hover:text-[var(--muted)] transition-colors flex justify-between bg-[var(--surface)] border border-[var(--line)] cursor-pointer">
                    <span>Card Archive / 基础释义</span>
                    <span className="group-open:rotate-180 transition-transform duration-300">↓</span>
                  </summary>
                  <div className="p-10 text-[var(--body)] text-[var(--muted)] leading-relaxed bg-[var(--surface-2)] border-x border-b border-[var(--line)]">
                    <p className="mb-8">{meaning.meaning}</p>
                    <div className="p-6 bg-[var(--bg)]/50 border border-[var(--line)] italic serif text-[var(--faint)] leading-loose">
                      研习建议：{meaning.advice}
                    </div>
                  </div>
                </details>
              </div>
            </div>
          );
        })}
      </div>

      {/* 综合研习报告 */}
      <div className="pt-32">
        <div className="divider-alchemy mb-20">
          <span className="alchemy-sigil text-[var(--caption)] tracking-[1em] font-bold">SYNTHESIS REPORT</span>
        </div>
        <Synthesis cards={drawnCards} questionContext={questionContext} />
      </div>

      {/* 底部导航 */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-16 py-24 border-t border-[var(--line)] mt-32">
        <button onClick={onReshuffle} className="text-[var(--caption)] font-bold uppercase tracking-[0.6em] text-[var(--muted)] hover:text-[var(--brass)] transition-colors">
          Reshuffle / 重构意念
        </button>
        <button onClick={onReset} className="text-[var(--caption)] font-bold uppercase tracking-[0.6em] text-[var(--brass)] border-b-2 border-[var(--brass)] pb-3 hover:opacity-60 transition-all">
          New Inquiry / 再次提问
        </button>
      </div>
    </div>
  );
};

export default ReadingRoom;
