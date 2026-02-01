
export enum Suit {
  Major = 'Major',
  Wands = 'Wands',
  Cups = 'Cups',
  Swords = 'Swords',
  Pentacles = 'Pentacles'
}

export interface CardMeaning {
  meaning: string;
  keywords: string[];
  advice: string;
}

export interface TarotCard {
  id: number;
  name: string;
  ename: string;
  suit: Suit;
  rank: number;
  type: 'Major' | 'Minor';
  image: string;
  upright: CardMeaning;
  reversed: CardMeaning;
}

export enum Orientation {
  Upright = '正位',
  Reversed = '逆位'
}

export interface DrawnCard extends TarotCard {
  orientation: Orientation;
  positionName: string;
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  count: number;
  positions: string[];
}

export interface ValidationResult {
  isValid: boolean;
  level: 'NONE' | 'WARN' | 'FATAL';
  message: string;
}

export type Topic = 'LOVE' | 'CAREER' | 'MONEY' | 'STUDY' | 'SELF' | 'HEALTH' | 'DECISION' | 'GENERAL';
export type Intent = 'ADVICE' | 'OUTCOME' | 'COMPARISON' | 'UNDERSTAND';
export type Timeframe = 'PAST' | 'PRESENT' | 'FUTURE' | 'UNKNOWN';

export interface QuestionContext {
  topic: Topic;
  intent: Intent;
  timeframe: Timeframe;
  topicLabel: string;
}

export enum PositionRole {
  PAST = 'PAST', PRESENT = 'PRESENT', FUTURE = 'FUTURE',
  OBSTACLE = 'OBSTACLE', RESOURCE = 'RESOURCE', ACTION = 'ACTION',
  OUTCOME = 'OUTCOME', CHOICE_A = 'CHOICE_A', CHOICE_B = 'CHOICE_B',
  YOU = 'YOU', OTHER = 'OTHER', RELATIONSHIP = 'RELATIONSHIP',
  HIDDEN = 'HIDDEN', WARNING = 'WARNING', ADVICE = 'ADVICE',
  UNKNOWN = 'UNKNOWN'
}
