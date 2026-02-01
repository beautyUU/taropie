
import { Topic, PositionRole } from './types';

export const EXPECTED_CARD_COUNT = 78;

export const TOPIC_KEYWORDS: Record<Exclude<Topic, 'GENERAL'>, string[]> = {
  LOVE: ['爱', '情', '恋', '婚', '前任', '分手', '复合', '另一半', '暗恋', '桃花', '对象'],
  CAREER: ['工作', '事业', '升职', '加薪', '老板', '同事', '跳槽', '面试', '项目', '入职', '公司'],
  MONEY: ['财', '钱', '投资', '债', '收入', '买房', '开销', '赚钱', '理财'],
  STUDY: ['学', '考', '课', '成绩', '毕业', '留学', '面试', '申请', '研'],
  DECISION: ['选', '做', '决定', '方案', '纠结', '二选一', '是否', '该不该', '打算'],
  SELF: ['我', '状态', '压力', '心情', '成长', '提升', '迷茫', '性格'],
  HEALTH: ['身体', '健康', '病', '精神', '睡眠', '恢复', '体质']
};

export const ROLE_KEYWORDS_MAP: Record<string, PositionRole> = {
  '过去': PositionRole.PAST, '先前': PositionRole.PAST, '前因': PositionRole.PAST,
  '现状': PositionRole.PRESENT, '目前': PositionRole.PRESENT, '表面': PositionRole.PRESENT,
  '未来': PositionRole.FUTURE, '结果': PositionRole.OUTCOME, '走向': PositionRole.FUTURE,
  '阻碍': PositionRole.OBSTACLE, '挑战': PositionRole.OBSTACLE, '风险': PositionRole.OBSTACLE, '担忧': PositionRole.OBSTACLE,
  '资源': PositionRole.RESOURCE, '优势': PositionRole.RESOURCE, '助力': PositionRole.RESOURCE,
  '建议': PositionRole.ADVICE, '启示': PositionRole.ADVICE, '照顾': PositionRole.ADVICE,
  '行动': PositionRole.ACTION, '做法': PositionRole.ACTION, '下一步': PositionRole.ACTION,
  '选项A': PositionRole.CHOICE_A, '方案A': PositionRole.CHOICE_A,
  '选项B': PositionRole.CHOICE_B, '方案B': PositionRole.CHOICE_B,
  '我': PositionRole.YOU, '本人': PositionRole.YOU, '需求': PositionRole.YOU, '感受': PositionRole.YOU,
  '对方': PositionRole.OTHER, '他': PositionRole.OTHER, '她': PositionRole.OTHER,
  '关系': PositionRole.RELATIONSHIP, '互动': PositionRole.RELATIONSHIP,
  '潜意识': PositionRole.HIDDEN, '隐藏': PositionRole.HIDDEN, '忽略': PositionRole.HIDDEN,
  '警示': PositionRole.WARNING, '注意': PositionRole.WARNING, '目标': PositionRole.OUTCOME
};

export const TOPIC_ACTION_PHRASES: Record<Topic, { base: string; cautious: string }> = {
  LOVE: { base: '真诚地表达内心感受', cautious: '审视双方的边界感' },
  CAREER: { base: '积极主动争取资源', cautious: '保持低调并打磨专业细节' },
  MONEY: { base: '把握眼前的增值机会', cautious: '严格把控不必要的开支' },
  STUDY: { base: '投入更多精力深度钻研', cautious: '查漏补缺并稳固基础知识' },
  DECISION: { base: '跟随直觉果断执行', cautious: '多方权衡风险后再行动' },
  SELF: { base: '勇敢接纳新的自我', cautious: '给自己留出独处修复的空间' },
  HEALTH: { base: '建立规律的生活习惯', cautious: '注意休息并避免过度消耗' },
  GENERAL: { base: '顺应时势向前推进', cautious: '放慢脚步多观察周遭变化' }
};

export const SPREADS = [
  {
    id: 'single',
    name: '单张占卜',
    description: '快速获得指引或回答简单的问题',
    count: 1,
    positions: ['启示/建议']
  },
  {
    id: 'block_advice',
    name: '阻碍与建议',
    description: '深入分析当前的困难及突破路径',
    count: 2,
    positions: ['阻碍', '建议']
  },
  {
    id: 'three_cards',
    name: '三张牌阵 (过去/现在/未来)',
    description: '了解事情的来龙去脉与未来趋势',
    count: 3,
    positions: ['过去', '现在', '未来']
  },
  {
    id: 'situation_action_outcome',
    name: '现状-行动-结果',
    description: '明确当下的处境以及如何行动以达成结果',
    count: 3,
    positions: ['现状', '行动', '结果']
  },
  {
    id: 'choice',
    name: '二选一牌阵',
    description: '对比两个选项的潜在结果',
    count: 3,
    positions: ['现状', '选项A', '选项B']
  },
  {
    id: 'emotion_clarity',
    name: '情绪梳理',
    description: '深度探索内在情感、隐忧与自我关怀',
    count: 4,
    positions: ['表层感受', '深层需求', '真正担忧', '自我照顾建议']
  },
  {
    id: 'relationship_mirror',
    name: '关系镜像',
    description: '透视双方状态，诊断当前关系并获得指引',
    count: 4,
    positions: ['我方状态', '对方状态', '关系现状', '关系建议']
  },
  {
    id: 'career_progress',
    name: '事业推进',
    description: '全方位分析职场现状、资源与晋升障碍',
    count: 5,
    positions: ['现状', '阻碍', '资源', '行动', '结果']
  },
  {
    id: 'decision_balance',
    name: '决策平衡',
    description: '深度权衡两个方案的优劣风险及最佳行动',
    count: 5,
    positions: ['选项A优势', '选项A风险', '选项B优势', '选项B风险', '最佳行动建议']
  },
  {
    id: 'hidden_factors',
    name: '隐藏因素',
    description: '挖掘那些你未曾察觉但正产生重大影响的因素',
    count: 5,
    positions: ['表面现状', '隐藏影响', '我忽略的', '我可以做的', '可能走向']
  },
  {
    id: 'goal_achievement',
    name: '目标达成',
    description: '从目标确立到阶段性成果的完整执行路径图',
    count: 6,
    positions: ['目标', '现状', '关键阻碍', '可用资源', '下一步行动', '阶段性结果']
  }
];
