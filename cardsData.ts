
import { TarotCard, Suit } from './types';

// 大阿卡纳数据定义
const MAJOR_INFO: Record<number, { name: string; ename: string; upright: any; reversed: any }> = {
  0: {
    name: '愚者', ename: 'The Fool',
    upright: { meaning: '新的开始，天真，冒险，信任宇宙。', keywords: ['自由', '自发', '无限可能'], advice: '勇往直前，即便前路未知。' },
    reversed: { meaning: '鲁莽，疏忽，犹豫，缺乏目标。', keywords: ['混乱', '愚蠢', '错失时机'], advice: '在行动前停下来思考，不要盲目冒险。' }
  },
  1: {
    name: '魔术师', ename: 'The Magician',
    upright: { meaning: '显化，资源丰富，力量，激发潜能。', keywords: ['创造力', '自信', '意志力'], advice: '利用你拥有的所有工具来实现目标。' },
    reversed: { meaning: '操纵，计划不周，未开发的才能。', keywords: ['欺骗', '能力不足', '错失机会'], advice: '检查你的动机，确保基础扎实后再行动。' }
  },
  2: {
    name: '女祭司', ename: 'The High Priestess',
    upright: { meaning: '直觉，潜意识，神秘，神圣知识。', keywords: ['智慧', '沉静', '内在觉知'], advice: '倾听你的直觉，在寂静中寻找答案。' },
    reversed: { meaning: '被压抑的直觉，隐藏的动机，肤浅。', keywords: ['混乱', '秘密', '无视直觉'], advice: '停止向外寻求，回归内在的真实。' }
  },
  3: {
    name: '女皇', ename: 'The Empress',
    upright: { meaning: '丰饶，自然，母性，创造美的能力。', keywords: ['繁荣', '养育', '感官享受'], advice: '关爱自己和周围的人，让创意自然流淌。' },
    reversed: { meaning: '创意受阻，过度依赖，贫乏。', keywords: ['压抑', '焦虑', '缺乏生命力'], advice: '找回与大自然的连接，重新平衡你的付出。' }
  },
  4: {
    name: '皇帝', ename: 'The Emperor',
    upright: { meaning: '权威，结构，保护，坚实的逻辑。', keywords: ['秩序', '控制', '领导力'], advice: '建立规则，用理性指导行动。' },
    reversed: { meaning: '暴政，缺乏纪律，僵化，软弱。', keywords: ['滥权', '混乱', '独断专行'], advice: '审视你的管理方式，是否过于严苛或缺乏条理。' }
  },
  5: {
    name: '教皇', ename: 'The Hierophant',
    upright: { meaning: '传统，信仰，体制，精神导师。', keywords: ['仪式', '教育', '符合社会规范'], advice: '遵循已有的智慧路径或寻求专家建议。' },
    reversed: { meaning: '叛逆，挑战现状，个人信仰。', keywords: ['教条', '束缚', '打破常规'], advice: '听从内心的法则，而非盲目遵循外界期待。' }
  },
  6: {
    name: '恋人', ename: 'The Lovers',
    upright: { meaning: '爱，和谐，关系，核心价值的选择。', keywords: ['结合', '对齐', '关键抉择'], advice: '基于爱和一致的价值观做出决定。' },
    reversed: { meaning: '失衡，不和谐，逃避责任。', keywords: ['冲突', '不匹配', '错误选择'], advice: '重新审视你的亲密关系和选择背后的动机。' }
  },
  7: {
    name: '战车', ename: 'The Chariot',
    upright: { meaning: '胜利，意志力，自律，克服障碍。', keywords: ['成功', '方向感', '掌控力'], advice: '保持专注，用意志驾驭冲突的力量。' },
    reversed: { meaning: '失控，方向不明，侵略性。', keywords: ['失败', '冲动', '受阻'], advice: '停下来调整方向，不要强行推进。' }
  },
  8: {
    name: '力量', ename: 'Strength',
    upright: { meaning: '勇气，耐力，温柔的力量，自控。', keywords: ['耐性', '同情心', '软实力'], advice: '用爱和耐心去驯服内在的野兽。' },
    reversed: { meaning: '自卑，缺乏勇气，暴躁。', keywords: ['恐惧', '软弱', '失去平衡'], advice: '相信你内在的韧性，不要被焦虑击倒。' }
  },
  9: {
    name: '隐士', ename: 'The Hermit',
    upright: { meaning: '内省，孤独，寻求真相，精神引领。', keywords: ['沉思', '内省', '指引'], advice: '暂时退出社交，在独处中寻找智慧。' },
    reversed: { meaning: '孤立，偏执，过度的孤独。', keywords: ['封闭', '社交恐惧', '错过机会'], advice: '是时候重新与外界建立有意义的连接了。' }
  },
  10: {
    name: '命运之轮', ename: 'Wheel of Fortune',
    upright: { meaning: '改变，机遇，命运，周期。', keywords: ['好运', '转折点', '无可避免'], advice: '顺应变化，理解生命中的起伏。' },
    reversed: { meaning: '厄运，抗拒改变，停滞。', keywords: ['波折', '失去掌控', '重复错误'], advice: '接受不可控因素，反思周期中的教训。' }
  },
  11: {
    name: '正义', ename: 'Justice',
    upright: { meaning: '公平，真理，因果，法律。', keywords: ['诚实', '责任', '平衡'], advice: '保持客观，你的决定应基于事实。' },
    reversed: { meaning: '不公，缺乏问责，偏见。', keywords: ['逃避责任', '不平衡', '判决不当'], advice: '审视你是否有意忽略了某些真相。' }
  },
  12: {
    name: '倒吊人', ename: 'The Hanged Man',
    upright: { meaning: '牺牲，换位思考，停滞，放手。', keywords: ['觉悟', '新视角', '等待'], advice: '放下对结果的控制，换个角度看问题。' },
    reversed: { meaning: '无谓的牺牲，逃避，停滞不前。', keywords: ['拖延', '固执', '迷失'], advice: '停止无效的等待，寻找突破口。' }
  },
  13: {
    name: '死神', ename: 'Death',
    upright: { meaning: '结束，转型，清除陈旧，新生。', keywords: ['转变', '放手', '不可抗拒'], advice: '接受终结，为新的可能腾出空间。' },
    reversed: { meaning: '抗拒改变，拖延，无法放手。', keywords: ['恐惧', '停滞', '执着旧事物'], advice: '拒绝改变只会带来更多痛苦，顺应自然规律。' }
  },
  14: {
    name: '节制', ename: 'Temperance',
    upright: { meaning: '平衡，中庸，调和，耐心。', keywords: ['融合', '治愈', '目的性'], advice: '保持适度，寻找两种极端之间的平衡。' },
    reversed: { meaning: '失衡，极端，缺乏耐心。', keywords: ['过度', '冲突', '混乱'], advice: '重新调整你的节奏，避免走极端。' }
  },
  15: {
    name: '恶魔', ename: 'The Devil',
    upright: { meaning: '束缚，成瘾，物质主义，阴影面。', keywords: ['诱惑', '执念', '虚假束缚'], advice: '意识到让你受困的枷锁是你亲手戴上的。' },
    reversed: { meaning: '解脱，觉醒，重新获得控制。', keywords: ['放手', '意识到真相', '断舍离'], advice: '打破恶习，勇敢面对真实的自我。' }
  },
  16: {
    name: '高塔', ename: 'The Tower',
    upright: { meaning: '剧变，灾难，揭示真相，崩塌。', keywords: ['突发改变', '觉醒', '混乱'], advice: '基础不牢的结构必然崩毁，拥抱震荡。' },
    reversed: { meaning: '推迟改变，避免灾难，恐惧转型。', keywords: ['侥幸', '压抑', '慢性痛苦'], advice: '不要躲避必要的变革，越晚面对痛苦越深。' }
  },
  17: {
    name: '星星', ename: 'The Star',
    upright: { meaning: '希望，信心，灵感，宁静。', keywords: ['疗愈', '指引', '乐观'], advice: '保持信心，宇宙的恩典正在降临。' },
    reversed: { meaning: '失望，缺乏信心，灰心。', keywords: ['悲观', '错失希望', '迷失'], advice: '即使在黑暗中也要相信光亮，修复你的信念。' }
  },
  18: {
    name: '月亮', ename: 'The Moon',
    upright: { meaning: '幻象，恐惧，焦虑，直觉。', keywords: ['潜意识', '不安', '未知'], advice: '穿过迷雾，不要被眼前的幻象迷惑。' },
    reversed: { meaning: '真相大白，克服焦虑，混乱结束。', keywords: ['洞察', '清晰', '走出恐惧'], advice: '随着阴影消退，看清事情的真相。' }
  },
  19: {
    name: '太阳', ename: 'The Sun',
    upright: { meaning: '快乐，成功，活力，清晰。', keywords: ['热情', '生命力', '自信'], advice: '尽情闪耀，感受当下的喜悦与光明。' },
    reversed: { meaning: '暂时的阴郁，缺乏活力，过于自信。', keywords: ['虚荣', '延迟的成功', '疲惫'], advice: '即使阳光被遮挡，它依然在那，保持乐观。' }
  },
  20: {
    name: '审判', ename: 'Judgement',
    upright: { meaning: '召唤，重生，评价，决断。', keywords: ['觉醒', '宽恕', '因果报应'], advice: '响应内心的召唤，进行最后的了结。' },
    reversed: { meaning: '自我怀疑，逃避召唤，优柔寡断。', keywords: ['自责', '错过时机', '犹豫'], advice: '不要因为过去的错误而止步不前，做出选择。' }
  },
  21: {
    name: '世界', ename: 'The World',
    upright: { meaning: '完成，圆满，成功，旅行。', keywords: ['达成', '统合', '归属感'], advice: '庆祝你的成就，感受生命的完整。' },
    reversed: { meaning: '停滞，不完整，缺憾，拖延。', keywords: ['延迟', '缺乏封闭', '原地踏步'], advice: '检查遗漏的细节，完成未尽的事宜。' }
  }
};

// 小阿卡纳语义生成器
const SUIT_DATA = {
  [Suit.Wands]: { theme: '行动、意志、创造力', element: '火', color: 'text-orange-500' },
  [Suit.Cups]: { theme: '情感、关系、直觉', element: '水', color: 'text-blue-500' },
  [Suit.Swords]: { theme: '思想、沟通、冲突', element: '风', color: 'text-cyan-500' },
  [Suit.Pentacles]: { theme: '物质、金钱、安全感', element: '土', color: 'text-green-500' }
};

const RANK_DATA: Record<number, { title: string; uprightAttr: string; reversedAttr: string }> = {
  1: { title: '一 (Ace)', uprightAttr: '纯粹的起始与潜能', reversedAttr: '能量受阻或推迟的开始' },
  2: { title: '二', uprightAttr: '平衡、决策与合作', reversedAttr: '失衡、冲突或犹豫不决' },
  3: { title: '三', uprightAttr: '成长、表达与初步成果', reversedAttr: '缺乏合作、计划受挫' },
  4: { title: '四', uprightAttr: '稳定、结构与反思', reversedAttr: '停滞、打破束缚或不安全感' },
  5: { title: '五', uprightAttr: '挑战、冲突与损失', reversedAttr: '走出困境、和解或长期混乱' },
  6: { title: '六', uprightAttr: '和谐、调整与支持', reversedAttr: '自私、过去的阴影或失衡' },
  7: { title: '七', uprightAttr: '反思、评估与竞争', reversedAttr: '犹豫、缺乏准备或被击败' },
  8: { title: '八', uprightAttr: '行动、转变与专注', reversedAttr: '限制、忙碌而无果或恐惧' },
  9: { title: '九', uprightAttr: '积累、实现与独处', reversedAttr: '焦虑、过度劳累或未达预期' },
  10: { title: '十', uprightAttr: '满盈、成就与终结', reversedAttr: '重担、关系的破裂或重新开始' },
  11: { title: '侍从 (Page)', uprightAttr: '信使、新信息与好奇心', reversedAttr: '消息延误、不成熟或八卦' },
  12: { title: '骑士 (Knight)', uprightAttr: '行动、推进与追求', reversedAttr: '鲁莽、停滞或方向错误' },
  13: { title: '王后 (Queen)', uprightAttr: '掌控、成熟与内在力量', reversedAttr: '情绪化、操纵或缺乏安全感' },
  14: { title: '国王 (King)', uprightAttr: '权威、决策与外部掌控', reversedAttr: '滥权、冷酷或缺乏决断' }
};

export const CARDS_DATABASE: TarotCard[] = [];

// 1. 生成大阿卡纳
for (let id = 0; id <= 21; id++) {
    const info = MAJOR_INFO[id];
    CARDS_DATABASE.push({
        id, 
        name: info.name, 
        ename: info.ename, 
        type: 'Major', 
        suit: Suit.Major, 
        rank: id,
        image: `https://picsum.photos/seed/t${id}/300/500`,
        upright: info.upright,
        reversed: info.reversed
    });
}

// 2. 生成小阿卡纳
const minorSuits = [
    { suit: Suit.Wands, startId: 22 },
    { suit: Suit.Cups, startId: 36 },
    { suit: Suit.Swords, startId: 50 },
    { suit: Suit.Pentacles, startId: 64 }
];

minorSuits.forEach(({ suit, startId }) => {
    for (let r = 1; r <= 14; r++) {
        const id = startId + r - 1;
        const rankInfo = RANK_DATA[r];
        const suitInfo = SUIT_DATA[suit];
        
        const cardName = `${suit}${rankInfo.title.includes('(') ? rankInfo.title.split(' ')[0] : rankInfo.title}`;

        CARDS_DATABASE.push({
            id,
            name: cardName,
            ename: `${suit} ${r}`,
            type: 'Minor',
            suit: suit,
            rank: r,
            image: `https://picsum.photos/seed/t${id}/300/500`,
            upright: {
                meaning: `在${suitInfo.theme}方面表现出${rankInfo.uprightAttr}。这是一个积极的信号，鼓励你利用${suitInfo.element}元素的能量。`,
                keywords: [suit, rankInfo.title, '积极'],
                advice: `专注于${suitInfo.theme}，用坚实的基础去推动它。`
            },
            reversed: {
                meaning: `在${suitInfo.theme}方面遭遇了${rankInfo.reversedAttr}。你可能感到能量被消耗或方向出现了偏差。`,
                keywords: [suit, '阻碍', '反思'],
                advice: `审视你在${suitInfo.theme}中的执念，学会放手或调整策略。`
            }
        });
    }
});

CARDS_DATABASE.sort((a, b) => a.id - b.id);
