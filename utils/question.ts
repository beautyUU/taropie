
import { Topic, Intent, QuestionContext } from '../types';
import { TOPIC_KEYWORDS } from '../constants';

export const analyzeQuestion = (raw: string): QuestionContext => {
  let detectedTopic: Topic = 'GENERAL';
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some(k => raw.includes(k))) {
      detectedTopic = topic as Topic;
      break;
    }
  }

  let intent: Intent = 'UNDERSTAND';
  if (raw.includes('怎么') || raw.includes('如何') || raw.includes('建议')) intent = 'ADVICE';
  else if (raw.includes('结果') || raw.includes('会吗')) intent = 'OUTCOME';

  const labels: Record<Topic, string> = {
    LOVE: '情感关系', CAREER: '事业发展', MONEY: '财务状况', STUDY: '学业考试',
    SELF: '个人状态', HEALTH: '身心健康', DECISION: '选择决策', GENERAL: '综合指引'
  };

  return {
    topic: detectedTopic,
    intent,
    timeframe: 'UNKNOWN',
    topicLabel: labels[detectedTopic]
  };
};
