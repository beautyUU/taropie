
import React from 'react';
import { TarotCard, Orientation, Suit } from '../types';
import { SUIT_GLYPHS, MAJOR_SYMBOLS, COURT_SYMBOLS, getMinorLayout } from '../utils/svgPaths';

interface CardFaceProps {
  card: TarotCard;
  orientation?: Orientation;
}

const CardFace: React.FC<CardFaceProps> = ({ card, orientation = Orientation.Upright }) => {
  const isReversed = orientation === Orientation.Reversed;
  const isMajor = card.suit === Suit.Major;

  // 炭黑烛光配色
  const inkColor = "#F5EAD3";      // 亮米色
  const brassColor = "#D3AE5B";    // 亮黄铜
  const faintLine = "rgba(245, 234, 211, 0.1)";

  const mainStroke = {
    fill: "none",
    stroke: inkColor,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  const accentStroke = {
    ...mainStroke,
    stroke: brassColor,
    strokeWidth: 2.0
  };

  const decoStroke = {
    fill: "none",
    stroke: faintLine,
    strokeWidth: 1,
  };

  return (
    <svg viewBox="0 0 300 520" className="w-full h-full bg-[#101214] rounded-sm transition-colors duration-500">
      {/* 极简边框 */}
      <rect x="10" y="10" width="280" height="500" {...decoStroke} />
      
      {/* 标题与编号 */}
      <g transform="translate(150, 42)">
        <text textAnchor="middle" className="font-serif text-[15px] font-bold tracking-widest" fill={inkColor}>{card.name}</text>
        <text textAnchor="middle" y="22" className="font-cinzel text-[8px] tracking-[0.4em] uppercase opacity-30" fill={inkColor}>
          {card.type === 'Major' ? `Sigil No. ${card.rank}` : `Phase ${card.rank} of ${card.suit}`}
        </text>
      </g>

      {/* 核心符号 - 高对比度呈现 */}
      <g transform="translate(0, 15)">
        {isMajor ? (
          <path d={MAJOR_SYMBOLS[card.rank]} {...accentStroke} />
        ) : (
          <g>
            {/* 宫廷牌背景徽记 */}
            {card.rank > 10 && <path d={COURT_SYMBOLS[card.rank]} {...mainStroke} opacity={0.2} />}
            {/* 阵列布局 */}
            {getMinorLayout(card.rank).map(([x, y], i) => (
              <path key={i} d={SUIT_GLYPHS[card.suit]} {...mainStroke} transform={`translate(${x-150}, ${y-260}) scale(0.85)`} />
            ))}
          </g>
        )}
      </g>

      {/* 蜡封印章 - 强调正逆位状态 */}
      <g transform="translate(150, 470)">
        <circle cx="0" cy="0" r="14" fill="transparent" stroke={isReversed ? inkColor : brassColor} strokeWidth="1" strokeDasharray={isReversed ? "3 1" : "none"} opacity={0.6} />
        <g transform={isReversed ? "rotate(180)" : ""}>
          <path d="M-5 -5 L5 5 M-5 5 L5 -5" stroke={isReversed ? inkColor : brassColor} strokeWidth="1.5" />
          {isReversed && (
            <path d="M-15 0 L15 0" stroke={inkColor} strokeWidth="0.5" opacity="0.4" strokeDasharray="1 2" />
          )}
        </g>
      </g>

      {/* 细微渐变质感 */}
      <defs>
        <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(245,234,211,0.02)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="300" height="520" fill="url(#paperGrad)" pointerEvents="none" />
    </svg>
  );
};

export default CardFace;
