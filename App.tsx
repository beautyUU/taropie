
import React, { useState, useEffect, useCallback } from 'react';
import { Spread, DrawnCard, Orientation, TarotCard, ValidationResult, QuestionContext } from './types';
import { SPREADS, EXPECTED_CARD_COUNT } from './constants';
import { CARDS_DATABASE } from './cardsData';
import { analyzeQuestion } from './utils/logic';
import Landing from './components/Landing';
import ReadingRoom from './components/ReadingRoom';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'landing' | 'reading'>('landing');
  const [question, setQuestion] = useState('');
  const [questionContext, setQuestionContext] = useState<QuestionContext | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<Spread>(SPREADS[0]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [useReversed, setUseReversed] = useState(true);
  
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: false,
    level: 'NONE',
    message: '正在接入研习终端...'
  });

  useEffect(() => {
    const validate = () => {
      if (CARDS_DATABASE.length !== EXPECTED_CARD_COUNT) {
        setValidation({ isValid: false, level: 'FATAL', message: `记录缺失: 期待 78 卷，实存 ${CARDS_DATABASE.length} 卷。` });
      } else {
        setValidation({ isValid: true, level: 'NONE', message: `终端已就绪。` });
      }
    };
    validate();
  }, []);

  const shuffleAndDraw = useCallback((spread: Spread, reverse: boolean, q: string) => {
    if (!validation.isValid) return;

    const ctx = analyzeQuestion(q);
    setQuestionContext(ctx);

    const pool = [...CARDS_DATABASE];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const drawn: DrawnCard[] = pool.slice(0, spread.count).map((card, i) => {
      const isReversed = reverse && Math.random() > 0.5;
      return {
        ...card,
        orientation: isReversed ? Orientation.Reversed : Orientation.Upright,
        positionName: spread.positions[i]
      };
    });

    setDrawnCards(drawn);
    setScreen('reading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [validation.isValid]);

  const handleStartReading = (q: string, spreadId: string, reverse: boolean) => {
    const spread = SPREADS.find(s => s.id === spreadId) || SPREADS[0];
    setQuestion(q);
    setSelectedSpread(spread);
    setUseReversed(reverse);
    shuffleAndDraw(spread, reverse, q);
  };

  return (
    <div className="app-container py-20 md:py-32">
      <header className="text-center mb-24 md:mb-40">
        <h1 className="text-[var(--h1)] font-cinzel font-bold text-[var(--ink)] tracking-[0.5em] uppercase mb-8 leading-[1.1]">
          The Unseen Archive
        </h1>
        <div className="divider-alchemy max-w-sm mx-auto">
          <span className="alchemy-sigil">✧ ☿ ✧</span>
        </div>
        <p className="text-[var(--muted)] text-xl md:text-2xl serif italic tracking-[0.25em] opacity-90">
          深切洞察生命潜能的金色手稿
        </p>
      </header>

      <main>
        {screen === 'landing' ? (
          <Landing 
            spreads={SPREADS} 
            onStart={handleStartReading} 
            validation={validation}
          />
        ) : (
          <ReadingRoom 
            question={question}
            questionContext={questionContext}
            drawnCards={drawnCards}
            spreadName={selectedSpread.name}
            onReset={() => setScreen('landing')}
            onReshuffle={() => shuffleAndDraw(selectedSpread, useReversed, question)}
          />
        )}
      </main>

      <footer className="mt-48 text-center opacity-40 hover:opacity-80 transition-opacity">
        <p className="text-[var(--caption)] uppercase tracking-[0.6em] font-cinzel text-[var(--ink)]">
          Tarot Insight • Offline Manuscript • V 3.0
        </p>
      </footer>
    </div>
  );
};

export default App;
