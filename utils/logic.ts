
import { Topic, Intent, QuestionContext, PositionRole, DrawnCard, Orientation } from '../types';

const TOPIC_DICT: Record<Exclude<Topic, 'GENERAL'>, string[]> = {
  LOVE: ['爱', '情', '恋', '婚', '前任', '分手', '复合', '另一半', '暗恋', '桃花', '对象'],
  CAREER: ['工作', '事业', '升职', '加薪', '老板', '同事', '跳槽', '面试', '项目', '入职', '公司'],
  MONEY: ['财', '钱', '投资', '债', '收入', '买房', '开销', '赚钱', '理财'],
  STUDY: ['学', '考', '课', '成绩', '毕业', '留学', '面试', '申请', '研'],
  DECISION: ['选', '做', '决定', '方案', '纠结', '二选一', '是否', '该不该', '打算'],
  SELF: ['我', '状态', '压力', '心情', '成长', '提升', '迷茫', '性格'],
  HEALTH: ['身体', '健康', '病', '精神', '睡眠', '恢复', '体质']
};

const POSITION_DICT: Record<string, PositionRole> = {
  '过去': PositionRole.PAST, '先前': PositionRole.PAST, '前因': PositionRole.PAST,
  '现在': PositionRole.PRESENT, '现状': PositionRole.PRESENT, '当面': PositionRole.PRESENT, '目前': PositionRole.PRESENT,
  '未来': PositionRole.FUTURE, '结果': PositionRole.OUTCOME, '发展': PositionRole.FUTURE, '最终': PositionRole.OUTCOME,
  '阻碍': PositionRole.OBSTACLE, '挑战': PositionRole.OBSTACLE, '困难': PositionRole.OBSTACLE, '逆风': PositionRole.OBSTACLE,
  '资源': PositionRole.RESOURCE, '优势': PositionRole.RESOURCE, '助力': PositionRole.RESOURCE, '基础': PositionRole.RESOURCE,
  '建议': PositionRole.ADVICE, '启示': PositionRole.ADVICE, '行动': PositionRole.ACTION, '做法': PositionRole.ACTION,
  '选项A': PositionRole.CHOICE_A, '方案A': PositionRole.CHOICE_A,
  '选项B': PositionRole.CHOICE_B, '方案B': PositionRole.CHOICE_B,
  '你': PositionRole.YOU, '本人': PositionRole.YOU,
  '对方': PositionRole.OTHER, '他': PositionRole.OTHER, '她': PositionRole.OTHER,
  '关系': PositionRole.RELATIONSHIP, '互动': PositionRole.RELATIONSHIP,
  '潜意识': PositionRole.HIDDEN, '隐藏': PositionRole.HIDDEN, '未知': PositionRole.HIDDEN,
  '警示': PositionRole.WARNING, '注意': PositionRole.WARNING, '避坑': PositionRole.WARNING
};

const TOPIC_LABELS: Record<Topic, string> = {
  LOVE: '情感关系', CAREER: '事业发展', MONEY: '财务状况', STUDY: '学业考试',
  SELF: '个人状态', HEALTH: '身心健康', DECISION: '选择决策', GENERAL: '综合指引'
};

export const analyzeQuestion = (q: string): QuestionContext => {
  let detectedTopic: Topic = 'GENERAL';
  for (const [topic, keywords] of Object.entries(TOPIC_DICT)) {
    if (keywords.some(k => q.includes(k))) {
      detectedTopic = topic as Topic;
      break;
    }
  }

  let intent: Intent = 'UNDERSTAND';
  if (q.includes('选') || q.includes('哪个')) intent = 'COMPARISON';
  else if (q.includes('怎么') || q.includes('如何') || q.includes('建议')) intent = 'ADVICE';
  else if (q.includes('结果') || q.includes('会吗') || q.includes('将来')) intent = 'OUTCOME';

  return { 
    topic: detectedTopic, 
    intent, 
    timeframe: 'UNKNOWN', 
    topicLabel: TOPIC_LABELS[detectedTopic] 
  };
};

export const inferPositionRole = (name: string): PositionRole => {
  for (const [key, role] of Object.entries(POSITION_DICT)) {
    if (name.includes(key)) return role;
  }
  return PositionRole.UNKNOWN;
};

// 语境洞察模板库
const INSIGHT_TEMPLATES: Partial<Record<Topic, Partial<Record<PositionRole, string>>>> = {
  LOVE: {
    [PositionRole.PRESENT]: "在当前的感情互动中，[CARD]暗示了[MEANING]。这反映出双方目前可能正处于[KEYWORDS]的状态。",
    [PositionRole.OBSTACLE]: "你们之间的主要阻碍源于[MEANING]，这种[KEYWORDS]的情绪或环境正在消耗关系的活力。",
    [PositionRole.FUTURE]: "关于未来的走向，[CARD]预示着一段[KEYWORDS]的时期，建议你们[ADVICE]。",
    [PositionRole.OTHER]: "对方目前的态度倾向于[KEYWORDS]，[MEANING]表明其内心正在经历某种权衡。",
  },
  CAREER: {
    [PositionRole.RESOURCE]: "你的职场优势在于[KEYWORDS]，[CARD]鼓励你利用这种能量去达成[MEANING]。",
    [PositionRole.WARNING]: "注意，[CARD]的出现提醒你在工作中存在[MEANING]的隐患，务必[ADVICE]。",
    [PositionRole.ACTION]: "现在的最佳行动方案是[ADVICE]，这将帮助你更好地掌控[KEYWORDS]的局面。",
  },
  DECISION: {
    [PositionRole.CHOICE_A]: "选择方案A（[CARD]）意味着追求[KEYWORDS]，这可能带来[MEANING]的结果。",
    [PositionRole.CHOICE_B]: "选择方案B（[CARD]）则更倾向于[KEYWORDS]，其核心体验将围绕[MEANING]展开。",
  }
};

const GENERAL_TEMPLATES: Record<PositionRole, string> = {
  [PositionRole.PAST]: "回顾过去，[CARD]的影响奠定了目前[KEYWORDS]的基础，[MEANING]是这一阶段的关键点。",
  [PositionRole.PRESENT]: "当下，[POS]位置出现的[CARD]提示你正处于[MEANING]的阶段，核心是[KEYWORDS]。",
  [PositionRole.FUTURE]: "展望未来，[CARD]预示着[MEANING]的趋势，建议你在此期间[ADVICE]。",
  [PositionRole.OBSTACLE]: "当前面临的挑战是[MEANING]，你需要克服[KEYWORDS]带来的负面影响。",
  [PositionRole.RESOURCE]: "你拥有的潜在助力是[CARD]，这意味着[MEANING]，请善加利用。",
  [PositionRole.ACTION]: "建议的行动路径：[ADVICE]。[CARD]的力量将支持你在[KEYWORDS]方面取得进展。",
  [PositionRole.OUTCOME]: "最终的可能结果是[MEANING]。[KEYWORDS]将成为这段旅程的总结。",
  [PositionRole.ADVICE]: "灵性层面的建议：[ADVICE]。[CARD]提醒你关注[KEYWORDS]的重要性。",
  [PositionRole.UNKNOWN]: "在[POS]这个位置，[CARD]带来的核心信息是[MEANING]。",
  // 补全其他通用角色
  [PositionRole.YOU]: "你自身的状态呈现出[MEANING]，[KEYWORDS]是你目前的真实写照。",
  [PositionRole.OTHER]: "外界或他人的能量呈现为[CARD]，对你而言这意味着[MEANING]。",
  [PositionRole.RELATIONSHIP]: "双方的连接点在于[KEYWORDS]，[CARD]揭示了[MEANING]的互动模式。",
  [PositionRole.HIDDEN]: "你可能忽略了[MEANING]这一因素，[KEYWORDS]正在潜意识中发生作用。",
  [PositionRole.WARNING]: "警示：[CARD]提醒你防范[KEYWORDS]，建议你即刻[ADVICE]。",
  [PositionRole.CHOICE_A]: "该路径可能涉及[MEANING]，重点在于[KEYWORDS]。",
  [PositionRole.CHOICE_B]: "该路径可能涉及[MEANING]，重点在于[KEYWORDS]。",
};

export const generateContextualInsight = (card: DrawnCard, ctx: QuestionContext): string => {
  const role = inferPositionRole(card.positionName);
  const meaningObj = card.orientation === Orientation.Upright ? card.upright : card.reversed;
  
  let template = (INSIGHT_TEMPLATES[ctx.topic]?.[role]) || 
                 (GENERAL_TEMPLATES[role]) || 
                 (GENERAL_TEMPLATES[PositionRole.UNKNOWN]);

  return template
    .replace('[POS]', card.positionName)
    .replace('[CARD]', `${card.name}`)
    .replace('[MEANING]', meaningObj.meaning)
    .replace('[KEYWORDS]', meaningObj.keywords.join('、'))
    .replace('[ADVICE]', meaningObj.advice);
};
