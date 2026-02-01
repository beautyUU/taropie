
import { DrawnCard, QuestionContext, Orientation, CardMeaning, PositionRole, Suit } from '../types';
import { TOPIC_ACTION_PHRASES } from '../constants';
import { inferPositionRole } from './positionRole';
import { generateContextualInsight } from './logic';

export const getMeaningByOrientation = (card: DrawnCard): CardMeaning => {
  return card.orientation === Orientation.Upright ? card.upright : card.reversed;
};

export const buildActionSentence = (card: DrawnCard, ctx: QuestionContext): string => {
  const phrasePair = TOPIC_ACTION_PHRASES[ctx.topic];
  const actionPhrase = card.orientation === Orientation.Upright ? phrasePair.base : phrasePair.cautious;
  return `这张牌提醒你在【${card.positionName}】上更适合${actionPhrase}。`;
};

export const pickEvidenceCards = (drawn: DrawnCard[], ctx: QuestionContext, stepIndex: 1 | 2 | 3): DrawnCard[] => {
  const roleGroups = {
    1: [PositionRole.PAST, PositionRole.YOU, PositionRole.RESOURCE, PositionRole.HIDDEN],
    2: [PositionRole.PRESENT, PositionRole.OBSTACLE, PositionRole.OTHER, PositionRole.RELATIONSHIP],
    3: [PositionRole.FUTURE, PositionRole.OUTCOME, PositionRole.ACTION, PositionRole.ADVICE, PositionRole.WARNING]
  };
  const targetRoles = roleGroups[stepIndex];
  const candidates = drawn.filter(c => targetRoles.includes(inferPositionRole(c.positionName)));
  if (candidates.length === 0) return [drawn[stepIndex - 1] || drawn[0]];
  return candidates.slice(0, 2);
};

export const formatEvidenceLine = (cards: DrawnCard[]): string => {
  const parts = cards.map(c => {
    const meaning = getMeaningByOrientation(c);
    const kws = meaning.keywords.slice(0, 2).join('/');
    return `${c.positionName}·${c.name}(${kws})`;
  });
  return `依据：${parts.join('；')}`;
};

// --- 新增：提取 Synthesis 计算逻辑 ---
export const calculateSynthesisData = (cards: DrawnCard[], ctx: QuestionContext | null) => {
  const total = cards.length;
  const majorCount = cards.filter(c => c.suit === Suit.Major).length;
  const reversedCount = cards.filter(c => c.orientation === Orientation.Reversed).length;
  const suits = cards.reduce((acc, c) => {
    acc[c.suit] = (acc[c.suit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let theme = "平衡与多元的发展";
  let risk = "缺乏专注力或目标模糊";
  let baseAdvice: string[] = ["保持观察", "分清优先级", "稳扎稳打"];

  const isHeavy = reversedCount > total / 2;

  if (majorCount > total / 2) {
    theme = "重大的生命转折与宿命";
    risk = "过度在乎外界变化，感到无力掌控";
    baseAdvice = ["顺应宇宙的流向", "关注大方向而非细节", "反思长期目标"];
  } else if (isHeavy) {
    theme = "内在的阴影与阻塞";
    risk = "情绪内耗，难以表达真实自我";
    baseAdvice = ["向内寻求答案", "进行自我清理", "释放过去的执着"];
  } else {
    const maxSuit = Object.entries(suits).sort((a, b) => b[1] - a[1])[0];
    const suitThemeMap: any = {
      [Suit.Wands]: { t: "行动、激情与扩张", r: "三分钟热度", a: ["制定清晰计划", "保持持久耐心", "保护能量"] },
      [Suit.Cups]: { t: "情感、直觉与关系", r: "情绪化决策", a: ["倾听内心感受", "建立健康边界", "多些同情心"] },
      [Suit.Swords]: { t: "思想、冲突与决策", r: "言语伤人", a: ["保持逻辑客观", "果断做出裁决", "停止精神内耗"] },
      [Suit.Pentacles]: { t: "物质、稳健与成果", r: "过度保守", a: ["关注实际效益", "维护健康生活", "做好理财"] }
    };
    if (suitThemeMap[maxSuit[0]]) {
      theme = suitThemeMap[maxSuit[0]].t;
      risk = suitThemeMap[maxSuit[0]].r;
      baseAdvice = suitThemeMap[maxSuit[0]].a;
    }
  }

  if (ctx?.topic === 'LOVE') {
    baseAdvice = isHeavy ? ["停止猜忌", "给自己留出独立空间", "不要急于做出承诺"] : ["勇敢表达心意", "建立共同目标", "享受当下的甜蜜"];
  } else if (ctx?.topic === 'CAREER') {
    baseAdvice = isHeavy ? ["检查工作细节", "避免职场口舌", "暂缓跳槽计划"] : ["主动寻求晋升机会", "扩大职场社交", "提升专业技能"];
  }

  const adviceWithEvidence = baseAdvice.map((text, i) => {
    const stepIdx = (i + 1) as 1 | 2 | 3;
    const evidenceCards = ctx ? pickEvidenceCards(cards, ctx, stepIdx) : [];
    return { text, evidence: formatEvidenceLine(evidenceCards) };
  });

  return { theme, risk, adviceWithEvidence, stats: { majorCount, reversedCount, suits } };
};

// --- 新增：Markdown 生成逻辑 ---
export const generateMarkdownReport = (
  question: string,
  ctx: QuestionContext | null,
  drawnCards: DrawnCard[],
  spreadName: string
): string => {
  const now = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  const synthesis = calculateSynthesisData(drawnCards, ctx);

  let md = `# 塔罗占卜结果报告\n\n`;
  md += `- **时间**: ${now}\n`;
  md += `- **问题**: ${question || '（未填写）'}\n`;
  md += `- **牌阵**: ${spreadName} (${drawnCards.length}张)\n`;
  md += `- **主题**: ${ctx?.topicLabel || '综合指引'}\n\n`;

  md += `## 1. 抽牌详情\n\n`;
  drawnCards.forEach(card => {
    const meaning = getMeaningByOrientation(card);
    const contextInsight = ctx ? generateContextualInsight(card, ctx) : '';
    const actionSentence = ctx ? buildActionSentence(card, ctx) : '';

    md += `### 【${card.positionName}】· ${card.name} (${card.orientation})\n`;
    md += `- **关键词**: ${meaning.keywords.slice(0, 2).join(' / ')}\n`;
    md += `- **核心含义**: ${meaning.meaning}\n`;
    if (contextInsight) md += `- **深度解析**: ${contextInsight}\n`;
    if (actionSentence) md += `- **针对性行动**: ${actionSentence}\n`;
    md += `\n`;
  });

  md += `## 2. 深度合读 (Synthesis)\n\n`;
  md += `- **能量主题**: ${synthesis.theme}\n`;
  md += `- **核心风险**: ${synthesis.risk}\n\n`;
  
  md += `### 综合行动建议\n`;
  synthesis.adviceWithEvidence.forEach((item, i) => {
    md += `${i + 1}. **${item.text}**\n`;
    md += `   > ${item.evidence}\n`;
  });

  md += `\n---\n*由 Tarot Insight 离线版生成*`;
  return md;
};
