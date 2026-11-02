/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Layers,
  CheckCircle2,
  Volume2,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  RotateCcw,
  Check,
  X,
  Bookmark,
  Shuffle,
  BookMarked,
  GraduationCap,
  Type
} from 'lucide-react';

import {
  SECTIONS_DATA,
  CONFUSED_CONNECTORS,
  DISCURSO_PARAGRAPHS,
  LEVEL_RECOMMENDATIONS,
  PARTE_2_ADDITIONAL_CONNECTORS,
  EXERCISE_1_QUESTIONS,
  EXERCISE_2_ITEMS,
  EXERCISE_2_WORD_BANK,
  EXERCISE_3_ITEMS,
  EXERCISE_4_ITEMS,
  EXERCISE_5_ITEMS,
  EXERCISE_6_ITEMS,
  EXERCISE_7_STORY,
  EXERCISE_8_ITEMS,
  EXERCISE_9_ITEMS,
  EXERCISE_10_ITEMS,
  ConnectorItem
} from './contentData';

// Helper for speech synthesis
function speakSpanish(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'handbook' | 'flashcards' | 'exercises' | 'dictionary'>('handbook');
  const [selfTestMode, setSelfTestMode] = useState<boolean>(true); // default: click to reveal Armenian
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'xlarge'>('large'); // default larger for better readability
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Exercise 1 state (Multiple Choice)
  const [ex1Answers, setEx1Answers] = useState<Record<number, string>>({});
  const [ex1Submitted, setEx1Submitted] = useState(false);

  // Exercise 2 state (Fill in blanks)
  const [ex2Answers, setEx2Answers] = useState<Record<number, string>>({});
  const [ex2Submitted, setEx2Submitted] = useState(false);

  // Exercise 3 state (Translations)
  const [ex3Revealed, setEx3Revealed] = useState<Record<number, boolean>>({});

  // Exercise 4 state (Sentence joining)
  const [ex4Revealed, setEx4Revealed] = useState<Record<number, boolean>>({});

  // Exercise 5 state (Subjunctive/Indicative)
  const [ex5Revealed, setEx5Revealed] = useState<Record<number, boolean>>({});

  // Exercise 6 state (Errors)
  const [ex6Revealed, setEx6Revealed] = useState<Record<number, boolean>>({});

  // Exercise 7 state (Story cloze)
  const [ex7Revealed, setEx7Revealed] = useState(false);

  // Exercise 8 state (Speaking)
  const [ex8Revealed, setEx8Revealed] = useState<Record<number, boolean>>({});

  // Exercise 9 state (Classification)
  const [ex9Answers, setEx9Answers] = useState<Record<number, string>>({});
  const [ex9Submitted, setEx9Submitted] = useState(false);

  // Exercise 10 state (Paraphrasing)
  const [ex10Revealed, setEx10Revealed] = useState<Record<number, boolean>>({});

  // Toggle reveal for any item
  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isRevealed = (id: string) => {
    if (!selfTestMode) return true; // full view mode shows all
    return !!revealedIds[id];
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Flatten all connectors from sections + part 2 for flashcards & dictionary
  const allConnectorsList = useMemo(() => {
    const list: ConnectorItem[] = [];
    SECTIONS_DATA.forEach(sec => {
      sec.connectors.forEach(c => list.push(c));
    });
    PARTE_2_ADDITIONAL_CONNECTORS.forEach(p => {
      list.push({
        id: p.id,
        es: p.es,
        hy: p.hy,
        level: 'B2',
        category: 'Adicionales',
        exampleEs: p.exampleEs,
        exampleHy: p.exampleHy
      });
    });
    return list;
  }, []);

  // Filtered connectors for dictionary
  const filteredConnectors = useMemo(() => {
    return allConnectorsList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.es.toLowerCase().includes(q) ||
        item.hy.toLowerCase().includes(q) ||
        (item.exampleEs && item.exampleEs.toLowerCase().includes(q)) ||
        (item.exampleHy && item.exampleHy.toLowerCase().includes(q));

      const matchesLevel =
        selectedLevel === 'ALL' || item.level === selectedLevel;

      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [allConnectorsList, searchQuery, selectedLevel, selectedCategory]);

  const flashcardItem = allConnectorsList[flashcardIndex] || allConnectorsList[0];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
  };

  const fontScaleClass =
    fontSizeScale === 'xlarge'
      ? 'text-scale-xlarge'
      : fontSizeScale === 'large'
      ? 'text-scale-large'
      : 'text-scale-normal';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${fontScaleClass}`}>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-600/25 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-black text-slate-950 text-xl sm:text-2xl tracking-tight">
                  LOS CONECTORES EN ESPAÑOL
                </h1>
                <span className="px-2.5 py-0.5 text-xs sm:text-sm font-extrabold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Nivel A2–C1
                </span>
              </div>
              <p className="text-sm sm:text-base text-amber-950 font-bold hy-text">
                Իսպաներենի կապակցող բառերը • Սեղմիր իսպաներենի վրա թարգմանությունը բացելու համար
              </p>
            </div>
          </div>

          {/* Quick controls: Font Size & Self-test mode */}
          <div className="flex items-center gap-2.5">
            {/* Font Size Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold">
              <span className="px-2 text-slate-500 flex items-center gap-1">
                <Type className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline">Տառաչափ՝</span>
              </span>
              <button
                onClick={() => setFontSizeScale('normal')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  fontSizeScale === 'normal'
                    ? 'bg-white text-slate-950 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Սովորական տառաչափ"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeScale('large')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  fontSizeScale === 'large'
                    ? 'bg-amber-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Մեծ տառաչափ (խորհուրդ տրվող)"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeScale('xlarge')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  fontSizeScale === 'xlarge'
                    ? 'bg-amber-700 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Շատ մեծ տառաչափ"
              >
                A++
              </button>
            </div>

            {/* Translation Visibility Mode Toggle */}
            <button
              onClick={() => {
                setSelfTestMode(!selfTestMode);
                setRevealedIds({});
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-xs ${
                selfTestMode
                  ? 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
                  : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700'
              }`}
              title="Փոխել թարգմանությունների ցուցադրման ռեժիմը"
            >
              {selfTestMode ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span className="hy-text font-bold">Ինքնաստուգում (սեղմիր բացելու)</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="hy-text font-bold">Բոլորը բաց են</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto space-x-2 pb-2.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('handbook')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
              activeTab === 'handbook'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="hy-text">1. Ուսումնական ուղեցույց (19 Բաժին)</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
              activeTab === 'exercises'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="hy-text">2. 10 Ինտերակտիվ վարժություններ</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-900 font-black">
              10
            </span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="hy-text">3. Ֆլեշ-քարտեր (Արտասանությամբ)</span>
          </button>

          <button
            onClick={() => setActiveTab('dictionary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all whitespace-nowrap ${
              activeTab === 'dictionary'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="hy-text">4. Որոնում և բառարան ({allConnectorsList.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ========================================================= */}
        {/* TAB 1: HANDBOOK */}
        {/* ========================================================= */}
        {activeTab === 'handbook' && (
          <div className="space-y-10">
            {/* Friendly guidance banner */}
            <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-600 text-white shadow-md shrink-0 mt-0.5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-black text-slate-950 text-lg sm:text-xl">
                    Ինտերակտիվ ուսումնական ռեժիմ (Կտտացրու թարգմանությունը բացելու համար)
                  </h2>
                  <p className="text-base sm:text-lg text-slate-800 hy-text mt-1 font-medium leading-relaxed">
                    Սեղմեք ցանկացած իսպաներեն բառի, օրինակի կամ քարտի վրա՝ հայերեն թարգմանությունն ու բացատրությունը բացելու համար։ Սեղմեք <span className="font-bold text-amber-900 inline-flex items-center gap-0.5"><Volume2 className="w-4 h-4 inline" /> բարձրախոսը</span>՝ ճիշտ իսպաներեն արտասանությունը լսելու համար։
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    const all: Record<string, boolean> = {};
                    allConnectorsList.forEach(c => (all[c.id] = true));
                    SECTIONS_DATA.forEach(s => (all[s.id] = true));
                    setRevealedIds(all);
                    setSelfTestMode(false);
                  }}
                  className="px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 transition shadow-2xs"
                >
                  Բացել բոլորը
                </button>
                <button
                  onClick={() => {
                    setRevealedIds({});
                    setSelfTestMode(true);
                  }}
                  className="px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition shadow-2xs"
                >
                  Թաքցնել (Ստուգիր քեզ)
                </button>
              </div>
            </div>

            {/* Quick Section Jump Bar */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3.5 text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider">
                <BookMarked className="w-5 h-5 text-amber-600" />
                <span>Արագ անցում բաժիններին (1–19 և Լրացուցիչ մաս 2)</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                {SECTIONS_DATA.map(sec => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-950 font-bold transition border border-slate-200/80"
                  >
                    <span className="text-amber-700 mr-1 font-black">{sec.number}.</span>
                    {sec.titleEs}
                  </a>
                ))}
                <a
                  href="#sec-part2"
                  className="px-3 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 font-black transition border border-orange-300"
                >
                  ★ Parte 2: Conectores adicionales
                </a>
                <a
                  href="#sec-17"
                  className="px-3 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-950 font-black transition border border-rose-300"
                >
                  17. Confundidos (Շփոթվող)
                </a>
                <a
                  href="#sec-18"
                  className="px-3 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-black transition border border-indigo-300"
                >
                  18. Discurso (Ամբողջական խոսք)
                </a>
                <a
                  href="#sec-19"
                  className="px-3 py-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-950 font-black transition border border-teal-300"
                >
                  19. Según el nivel (A1–C1)
                </a>
              </div>
            </div>

            {/* Sections 1 to 16 */}
            <div className="space-y-12">
              {SECTIONS_DATA.map(section => (
                <section
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden transition-all hover:border-amber-300"
                >
                  {/* Section Header */}
                  <div className="bg-gradient-to-r from-amber-500/10 via-amber-50/60 to-transparent p-6 sm:p-7 border-b border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <span className="w-11 h-11 rounded-2xl bg-amber-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                          {section.number}
                        </span>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                            {section.titleEs}
                          </h3>
                          <p className="text-base sm:text-lg font-bold text-amber-900 hy-text mt-0.5">
                            {section.titleHy}
                          </p>
                        </div>
                      </div>
                      {section.levelBadge && (
                        <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-amber-100 text-amber-950 border border-amber-300">
                          {section.levelBadge}
                        </span>
                      )}
                    </div>

                    {/* Section description */}
                    {section.descriptionEs && (
                      <p className="mt-4 text-base sm:text-lg text-slate-800 italic border-l-4 border-amber-500 pl-4 py-1 leading-relaxed">
                        «{section.descriptionEs}»
                      </p>
                    )}
                    {section.descriptionHy && (
                      <p className="mt-2 text-base sm:text-lg text-slate-800 hy-text pl-4 font-medium leading-relaxed">
                        {section.descriptionHy}
                      </p>
                    )}

                    {/* Intro points if any (e.g. section 1 comparison) */}
                    {section.introPoints && (
                      <div className="mt-5 grid sm:grid-cols-2 gap-4">
                        {section.introPoints.map((pt, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleReveal(`${section.id}-intro-${idx}`)}
                            className="cursor-pointer bg-white hover:bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 transition-all shadow-xs"
                          >
                            {pt.es && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-extrabold text-slate-950 text-base sm:text-lg">
                                  {pt.es}
                                </span>
                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    speakSpanish(pt.es || '');
                                  }}
                                  className="text-slate-400 hover:text-amber-700 p-1.5 rounded-lg"
                                  title="Լսել արտասանությունը"
                                >
                                  <Volume2 className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                            <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                              {isRevealed(`${section.id}-intro-${idx}`) ? (
                                <p className="text-sm sm:text-base text-emerald-950 font-bold hy-text leading-relaxed">
                                  {pt.hy}
                                </p>
                              ) : (
                                <span className="text-xs sm:text-sm text-amber-900 font-bold hy-text flex items-center gap-1.5">
                                  👆 Սեղմիր հայերեն թարգմանությունը տեսնելու համար
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Connectors Grid / Cards */}
                  {section.connectors.length > 0 && (
                    <div className="p-6 sm:p-7">
                      <div className="grid md:grid-cols-2 gap-5">
                        {section.connectors.map(c => {
                          const revealed = isRevealed(c.id);
                          const isBookmarked = !!bookmarkedIds[c.id];

                          return (
                            <div
                              key={c.id}
                              onClick={() => toggleReveal(c.id)}
                              className={`group cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 relative ${
                                revealed
                                  ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20'
                                  : 'bg-slate-50/90 border-slate-200 hover:bg-amber-50/40 hover:border-amber-400'
                              }`}
                            >
                              {/* Card Header: Spanish term, audio, bookmark, level badge */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                  <h4 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-amber-700 transition tracking-tight">
                                    {c.es}
                                  </h4>
                                  <button
                                    onClick={e => {
                                      e.stopPropagation();
                                      speakSpanish(c.es);
                                    }}
                                    className="p-1.5 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-amber-100 transition"
                                    title="Լսել իսպաներեն արտասանությունը"
                                  >
                                    <Volume2 className="w-5 h-5" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-2">
                                  {c.level && (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-200 text-slate-800">
                                      {c.level}
                                    </span>
                                  )}
                                  <button
                                    onClick={e => toggleBookmark(c.id, e)}
                                    className={`p-1.5 rounded-xl transition ${
                                      isBookmarked
                                        ? 'text-amber-600 bg-amber-50'
                                        : 'text-slate-300 hover:text-amber-600'
                                    }`}
                                    title="Ավելացնել նշվածների մեջ"
                                  >
                                    <Bookmark className="w-4 h-4 fill-current" />
                                  </button>
                                </div>
                              </div>

                              {/* Armenian Translation Block (revealed on click or always if test mode off) */}
                              <div className="mt-3.5">
                                {revealed ? (
                                  <div className="space-y-1.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                                        Հայերեն՝
                                      </span>
                                      <span className="text-base sm:text-lg font-black text-emerald-950 hy-text">
                                        {c.hy}
                                      </span>
                                    </div>
                                    {c.note && (
                                      <p className="text-xs sm:text-sm text-amber-950 bg-amber-100/70 p-2.5 rounded-xl border border-amber-300 hy-text mt-1 font-semibold leading-relaxed">
                                        💡 {c.note}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <div className="py-2 px-3.5 rounded-xl bg-amber-100 text-amber-950 text-xs sm:text-sm font-extrabold hy-text inline-flex items-center gap-2 border border-amber-300 shadow-2xs">
                                    <span>👆 Սեղմիր թարգմանությունը տեսնելու համար</span>
                                  </div>
                                )}
                              </div>

                              {/* Example sentences */}
                              {c.exampleEs && (
                                <div className="mt-4 pt-3.5 border-t border-slate-200 space-y-1.5">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                                      {c.exampleEs}
                                    </p>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        speakSpanish(c.exampleEs || '');
                                      }}
                                      className="text-slate-400 hover:text-amber-700 p-1 shrink-0"
                                      title="Լսել օրինակը"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                  </div>

                                  {revealed ? (
                                    <p className="text-sm sm:text-base text-slate-700 hy-text font-medium leading-relaxed">
                                      {c.exampleHy}
                                    </p>
                                  ) : (
                                    <p className="text-xs text-slate-400 italic hy-text">
                                      (սեղմիր քարտի վրա թարգմանության համար)
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Differences / Comparison boxes */}
                  {section.differences && (
                    <div className="bg-amber-50/70 p-6 sm:p-7 border-t-2 border-amber-200">
                      <h4 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <span>{section.differences.title}</span>
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {section.differences.items.map((diff, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleReveal(`${section.id}-diff-${idx}`)}
                            className="cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-xs hover:border-amber-400 transition"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-black text-amber-950 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                                {diff.term}
                              </span>
                              {diff.exampleEs && (
                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    speakSpanish(diff.exampleEs || '');
                                  }}
                                  className="text-slate-400 hover:text-amber-700 p-1"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-slate-800 hy-text mt-3 font-semibold leading-relaxed">
                              {diff.hy}
                            </p>
                            {diff.exampleEs && (
                              <div className="mt-3 pt-3 border-t border-slate-100">
                                <p className="text-sm sm:text-base font-extrabold text-slate-900">
                                  {diff.exampleEs}
                                </p>
                                {isRevealed(`${section.id}-diff-${idx}`) ? (
                                  <p className="text-sm sm:text-base text-emerald-900 hy-text mt-1 font-semibold leading-relaxed">
                                    {diff.exampleHy}
                                  </p>
                                ) : (
                                  <span className="text-xs text-amber-900 hy-text font-bold mt-1 inline-block">
                                    👆 Սեղմիր թարգմանության համար
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extra Grammar Rules */}
                  {section.extraGrammar && (
                    <div className="bg-indigo-50/70 p-6 sm:p-7 border-t-2 border-indigo-200">
                      <h4 className="text-base sm:text-lg font-black text-indigo-950 flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span>{section.extraGrammar.title}</span>
                      </h4>
                      <p className="text-sm sm:text-base text-indigo-950 hy-text mb-4 font-semibold leading-relaxed">
                        {section.extraGrammar.explanationHy}
                      </p>
                      <div className="space-y-3">
                        {section.extraGrammar.patterns.map((pat, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleReveal(`${section.id}-pat-${idx}`)}
                            className="cursor-pointer bg-white p-4 rounded-2xl border-2 border-indigo-200 shadow-2xs hover:border-indigo-400 transition"
                          >
                            <span className="text-xs sm:text-sm font-black text-indigo-900 block mb-1.5 uppercase">
                              {pat.rule}
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm sm:text-base font-extrabold text-slate-950">
                                {pat.exampleEs}
                              </span>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  speakSpanish(pat.exampleEs);
                                }}
                                className="text-slate-400 hover:text-indigo-600 p-1"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-100">
                              {isRevealed(`${section.id}-pat-${idx}`) ? (
                                <p className="text-sm sm:text-base text-emerald-950 hy-text font-bold leading-relaxed">
                                  {pat.exampleHy}
                                </p>
                              ) : (
                                <span className="text-xs text-indigo-700 hy-text font-bold">
                                  👆 Սեղմիր թարգմանության համար
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* SECTION 17: Los conectores que más se confunden */}
              <section
                id="sec-17"
                className="bg-white rounded-3xl border-2 border-rose-300 shadow-xs overflow-hidden"
              >
                <div className="bg-gradient-to-r from-rose-500/15 via-amber-500/10 to-transparent p-6 sm:p-7 border-b border-rose-200">
                  <div className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl bg-rose-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                      17
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                        Los conectores que más se confunden
                      </h3>
                      <p className="text-base sm:text-lg font-bold text-rose-950 hy-text">
                        Ամենից հաճախ շփոթվող կապակցող բառերը
                      </p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-2 font-medium leading-relaxed">
                    Համեմատենք նույն իրավիճակով և հասկանանք տարբերությունները։ Սեղմեք քարտերի վրա թարգմանությունը տեսնելու համար։
                  </p>
                </div>

                <div className="p-6 sm:p-7 grid md:grid-cols-2 gap-5">
                  {CONFUSED_CONNECTORS.map(conf => {
                    const revealed = isRevealed(conf.id);
                    return (
                      <div
                        key={conf.id}
                        onClick={() => toggleReveal(conf.id)}
                        className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                          revealed
                            ? 'bg-rose-50/50 border-rose-400 ring-2 ring-rose-400/20'
                            : 'bg-white border-slate-200 hover:border-rose-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg sm:text-xl font-black text-rose-950">
                            {conf.pairEs}
                          </h4>
                          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 border border-rose-300">
                            Տարբերություն
                          </span>
                        </div>

                        {revealed ? (
                          <div className="mt-3 space-y-3">
                            <p className="text-sm sm:text-base font-black text-rose-950 hy-text">
                              Հայերեն՝ {conf.pairHy}
                            </p>
                            <p className="text-sm sm:text-base text-slate-800 hy-text bg-white p-3.5 rounded-xl border border-rose-200 font-semibold leading-relaxed">
                              💡 {conf.diff}
                            </p>
                            <div className="space-y-2 text-sm sm:text-base">
                              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                                <p className="font-black text-slate-950">
                                  {conf.example1Es}
                                </p>
                                <p className="text-slate-700 hy-text font-medium mt-0.5">
                                  {conf.example1Hy}
                                </p>
                              </div>
                              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                                <p className="font-black text-slate-950">
                                  {conf.example2Es}
                                </p>
                                <p className="text-slate-700 hy-text font-medium mt-0.5">
                                  {conf.example2Hy}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3">
                            <span className="text-xs sm:text-sm text-rose-950 bg-rose-100 px-3 py-1.5 rounded-xl font-bold hy-text inline-block border border-rose-300">
                              👆 Սեղմիր տարբերությունն ու օրինակները տեսնելու համար
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION 18: Discurso completo */}
              <section
                id="sec-18"
                className="bg-white rounded-3xl border-2 border-indigo-300 shadow-xs overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-500/15 via-amber-500/10 to-transparent p-6 sm:p-7 border-b border-indigo-200">
                  <div className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                      18
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                        Ejemplo de un discurso completo
                      </h3>
                      <p className="text-base sm:text-lg font-bold text-indigo-950 hy-text">
                        Ամբողջական խոսք կապակցող բառերով
                      </p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-2 font-medium leading-relaxed">
                    Տեքստը ցույց է տալիս, թե ինչպես են կապակցող բառերը միավորում մտքերը մեկ ներդաշնակ պատմության մեջ։
                  </p>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  {DISCURSO_PARAGRAPHS.map((para, idx) => (
                    <div
                      key={para.id}
                      onClick={() => toggleReveal(para.id)}
                      className="cursor-pointer p-5 rounded-2xl bg-indigo-50/40 hover:bg-indigo-50/80 border-2 border-indigo-200 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className="text-xs sm:text-sm font-black text-indigo-800 uppercase tracking-wide">
                              Պարբերություն {idx + 1}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {para.highlightedConnectors.map(con => (
                                <span
                                  key={con}
                                  className="px-2.5 py-0.5 rounded-lg bg-amber-200 text-amber-950 text-xs sm:text-sm font-black"
                                >
                                  {con}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-slate-950 leading-relaxed">
                            {para.es}
                          </p>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            speakSpanish(para.es);
                          }}
                          className="text-slate-500 hover:text-indigo-700 p-2 rounded-xl shrink-0"
                          title="Լսել իսպաներեն"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-3.5 pt-3 border-t border-indigo-200/80">
                        {isRevealed(para.id) ? (
                          <p className="text-sm sm:text-base text-slate-800 hy-text leading-relaxed font-semibold">
                            {para.hy}
                          </p>
                        ) : (
                          <span className="text-xs sm:text-sm text-indigo-800 hy-text font-bold">
                            👆 Սեղմիր հայերեն թարգմանության համար
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 19: Recomendaciones de nivel */}
              <section
                id="sec-19"
                className="bg-white rounded-3xl border-2 border-teal-300 shadow-xs overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal-500/15 via-amber-500/10 to-transparent p-6 sm:p-7 border-b border-teal-200">
                  <div className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl bg-teal-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                      19
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                        ¿Qué conectores usar según el nivel?
                      </h3>
                      <p className="text-base sm:text-lg font-bold text-teal-950 hy-text">
                        Ո՞ր մակարդակում որ կապակցող բառերն օգտագործել
                      </p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-2 font-medium leading-relaxed">
                    Գլխավոր գաղափարը՝ իսպաներենում կապակցող բառերը պետք է ընտրել ըստ մտքերի միջև եղած իմաստային կապի։
                  </p>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  {LEVEL_RECOMMENDATIONS.map(rec => (
                    <div
                      key={rec.level}
                      className="p-5 rounded-2xl border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-teal-400 transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`px-4 py-2 rounded-xl font-black text-base border-2 ${rec.badgeClass}`}
                        >
                          {rec.level}
                        </span>
                        <div>
                          <p className="font-black text-slate-950 text-base sm:text-lg">
                            {rec.connectors}
                          </p>
                          <p className="text-sm sm:text-base text-slate-700 hy-text mt-0.5 font-medium leading-relaxed">
                            {rec.descriptionHy}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedLevel(rec.level);
                          setActiveTab('dictionary');
                        }}
                        className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-teal-50 text-teal-950 hover:bg-teal-100 border border-teal-300 transition whitespace-nowrap"
                      >
                        Դիտել բառարանում →
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* PARTE 2: Conectores adicionales */}
              <section
                id="sec-part2"
                className="bg-white rounded-3xl border-2 border-orange-300 shadow-xs overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-transparent p-6 sm:p-7 border-b border-orange-200">
                  <div className="flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl bg-orange-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                      ★
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                        LOS CONECTORES EN ESPAÑOL — PARTE 2
                      </h3>
                      <p className="text-base sm:text-lg font-bold text-orange-950 hy-text">
                        Լրացուցիչ կապակցող բառեր (B1–C1)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-2 font-medium leading-relaxed">
                    Այս բաժնում ներկայացված են նոր և հաճախ հանդիպող արտահայտություններ։ Սեղմեք քարտի վրա թարգմանությունը բացելու համար։
                  </p>
                </div>

                <div className="p-6 sm:p-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PARTE_2_ADDITIONAL_CONNECTORS.map(item => {
                    const revealed = isRevealed(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleReveal(item.id)}
                        className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                          revealed
                            ? 'bg-orange-50/50 border-orange-400 ring-2 ring-orange-400/20'
                            : 'bg-white border-slate-200 hover:border-orange-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-black text-slate-950 text-lg sm:text-xl">
                            {item.es}
                          </h4>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              speakSpanish(item.es);
                            }}
                            className="text-slate-400 hover:text-orange-700 p-1"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mt-3">
                          {revealed ? (
                            <p className="text-sm sm:text-base font-black text-emerald-950 hy-text">
                              Հայերեն՝ {item.hy}
                            </p>
                          ) : (
                            <span className="text-xs sm:text-sm text-orange-900 font-bold hy-text">
                              👆 Սեղմիր թարգմանության համար
                            </span>
                          )}
                        </div>

                        <div className="mt-3.5 pt-3 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <p className="text-sm sm:text-base font-extrabold text-slate-900">
                              {item.exampleEs}
                            </p>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                speakSpanish(item.exampleEs);
                              }}
                              className="text-slate-400 hover:text-orange-700 p-1"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          {revealed && (
                            <p className="text-sm text-slate-700 hy-text mt-1 font-medium">
                              {item.exampleHy}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: 10 INTERACTIVE EXERCISES SUITE */}
        {/* ========================================================= */}
        {activeTab === 'exercises' && (
          <div className="space-y-12">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-7 text-white shadow-lg shadow-orange-600/25">
              <div className="flex items-center gap-3.5 mb-2">
                <span className="p-3 rounded-2xl bg-white/20">
                  <CheckCircle2 className="w-7 h-7" />
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  EJERCICIOS — 10 ՎԱՐԺՈՒԹՅՈՒՆՆԵՐ
                </h2>
              </div>
              <p className="text-orange-100 text-base sm:text-lg hy-text max-w-3xl font-medium leading-relaxed">
                Կատարեք առաջադրանքները, ստուգեք ձեր իմացությունը և անմիջապես տեսեք ճիշտ պատասխաններն ու բացատրությունները։
              </p>
            </div>

            {/* Exercise 1: Multiple Choice */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 mb-6">
                <div>
                  <span className="text-xs sm:text-sm font-black text-amber-700 uppercase tracking-wider">
                    Վարժություն 1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    Ejercicio 1. Elige el conector correcto — Ընտրիր ճիշտ կապակցող բառը
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                    Ընտրիր այն տարբերակը, որը իմաստով ճիշտ է լրացնում նախադասությունը։
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setEx1Submitted(true);
                      triggerConfetti();
                    }}
                    className="px-5 py-2.5 rounded-xl text-sm font-black bg-amber-600 text-white hover:bg-amber-700 transition shadow-sm"
                  >
                    Ստուգել պատասխանները
                  </button>
                  <button
                    onClick={() => {
                      setEx1Answers({});
                      setEx1Submitted(false);
                    }}
                    className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                    title="Մաքրել"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {EXERCISE_1_QUESTIONS.map(q => {
                  const selected = ex1Answers[q.id];
                  const isCorrect = selected === q.correct;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-slate-950 text-base sm:text-lg">
                            <span className="text-amber-700 mr-2">{q.id}.</span>
                            {q.sentenceEs}
                          </p>
                          <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                            {q.sentenceHy}
                          </p>
                        </div>
                        <button
                          onClick={() => speakSpanish(q.sentenceEs.replace('___', ''))}
                          className="text-slate-400 hover:text-amber-600 p-1.5"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {q.options.map(opt => {
                          const isOptSelected = selected === opt.label;
                          let btnStyle =
                            'bg-white border-slate-300 text-slate-800 hover:bg-amber-50 hover:border-amber-400';

                          if (ex1Submitted) {
                            if (opt.label === q.correct) {
                              btnStyle =
                                'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-500';
                            } else if (isOptSelected && !isCorrect) {
                              btnStyle =
                                'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                            }
                          } else if (isOptSelected) {
                            btnStyle =
                              'bg-amber-600 text-white border-amber-700 font-black shadow-xs';
                          }

                          return (
                            <button
                              key={opt.label}
                              disabled={ex1Submitted}
                              onClick={() =>
                                setEx1Answers(prev => ({
                                  ...prev,
                                  [q.id]: opt.label
                                }))
                              }
                              className={`p-3 rounded-xl text-sm sm:text-base border-2 text-left flex items-center justify-between transition-all ${btnStyle}`}
                            >
                              <span>
                                <strong className="mr-1.5">{opt.label}.</strong> {opt.text}
                              </span>
                              {ex1Submitted && opt.label === q.correct && (
                                <Check className="w-4 h-4 text-emerald-800" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {ex1Submitted && (
                        <div
                          className={`mt-4 p-4 rounded-xl text-sm sm:text-base hy-text font-bold ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 border-2 border-emerald-300'
                              : 'bg-rose-50 text-rose-950 border-2 border-rose-300'
                          }`}
                        >
                          <strong>{isCorrect ? '✓ Ճիշտ է։ ' : '✗ Սխալ է։ '}</strong>
                          {q.explanation} (Ճիշտ պատասխան՝ {q.correct})
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 2: Fill in blanks with word bank */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 mb-6">
                <div>
                  <span className="text-xs sm:text-sm font-black text-teal-700 uppercase tracking-wider">
                    Վարժություն 2
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    Ejercicio 2. Completa los espacios — Լրացրու բաց թողնված բառերը
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                    Օգտագործիր բառերի բանկից համապատասխան կապակցող բառը։
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setEx2Submitted(true);
                      triggerConfetti();
                    }}
                    className="px-5 py-2.5 rounded-xl text-sm font-black bg-teal-600 text-white hover:bg-teal-700 transition shadow-sm"
                  >
                    Ստուգել
                  </button>
                  <button
                    onClick={() => {
                      setEx2Answers({});
                      setEx2Submitted(false);
                    }}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                  >
                    Կրկնել
                  </button>
                </div>
              </div>

              {/* Word Bank */}
              <div className="p-4 bg-teal-50 rounded-2xl border-2 border-teal-200 mb-6">
                <span className="text-xs sm:text-sm font-black text-teal-950 block mb-2 uppercase">
                  Բառերի բանկ (կարող եք ընտրել կամ գրել)՝
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {EXERCISE_2_WORD_BANK.map(w => (
                    <span
                      key={w}
                      className="px-3 py-1.5 rounded-xl bg-white border-2 border-teal-300 text-teal-950 font-black text-sm sm:text-base shadow-2xs"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {EXERCISE_2_ITEMS.map(item => {
                  const userVal = ex2Answers[item.id] || '';
                  const isCorrect =
                    userVal.trim().toLowerCase() === item.correct.toLowerCase();

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-bold text-slate-950">
                          <span className="text-teal-700 font-black mr-1">
                            {item.id}.
                          </span>
                          {item.before && <span>{item.before}</span>}
                          <input
                            type="text"
                            placeholder="բառը..."
                            value={userVal}
                            disabled={ex2Submitted}
                            onChange={e =>
                              setEx2Answers(prev => ({
                                ...prev,
                                [item.id]: e.target.value
                              }))
                            }
                            className={`w-40 sm:w-48 px-3 py-1.5 text-sm sm:text-base font-black rounded-xl border-2 outline-none transition ${
                              ex2Submitted
                                ? isCorrect
                                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                                  : 'bg-rose-100 border-rose-400 text-rose-950'
                                : 'bg-white border-slate-300 focus:border-teal-500'
                            }`}
                          />
                          {item.after && <span>{item.after}</span>}
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 hy-text mt-1.5 font-medium">
                          {item.hy}
                        </p>
                      </div>

                      {ex2Submitted && (
                        <div className="text-sm sm:text-base shrink-0 font-black">
                          {isCorrect ? (
                            <span className="text-emerald-800 flex items-center gap-1.5">
                              <Check className="w-5 h-5" /> Ճիշտ է
                            </span>
                          ) : (
                            <span className="text-rose-800 flex items-center gap-1.5">
                              <X className="w-5 h-5" /> Պատասխան՝ {item.correct}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 3: Translate to Spanish */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-indigo-700 uppercase tracking-wider">
                  Վարժություն 3
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 3. Traduce al español — Թարգմանիր իսպաներեն
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Ստորև տրված են իրավիճակներ։ Փորձիր ինքնուրույն թարգմանել, ապա սեղմիր «Ցույց տալ պատասխանը»։
                </p>
              </div>

              <div className="space-y-4">
                {EXERCISE_3_ITEMS.map(item => {
                  const revealed = !!ex3Revealed[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-base sm:text-lg font-black text-slate-950 hy-text leading-relaxed">
                          <span className="text-indigo-700 mr-2.5 font-black">{item.id}.</span>
                          {item.hy}
                        </p>
                        <button
                          onClick={() =>
                            setEx3Revealed(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id]
                            }))
                          }
                          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-indigo-100 text-indigo-950 hover:bg-indigo-200 border border-indigo-300 transition shrink-0"
                        >
                          {revealed ? 'Թաքցնել' : 'Ցույց տալ պատասխանը'}
                        </button>
                      </div>

                      {revealed && (
                        <div className="mt-3.5 p-4 rounded-xl bg-indigo-50 border-2 border-indigo-300 flex items-center justify-between gap-3">
                          <p className="font-black text-indigo-950 text-base sm:text-lg">
                            {item.answerEs}
                          </p>
                          <button
                            onClick={() => speakSpanish(item.answerEs)}
                            className="p-1.5 text-indigo-700 hover:bg-indigo-200 rounded-lg shrink-0"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 4: Une las oraciones */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-purple-700 uppercase tracking-wider">
                  Վարժություն 4
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 4. Une las oraciones — Միացրու նախադասությունները
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Միացրու երկու նախադասություն՝ օգտագործելով փակագծում տրված կապակցող բառը։
                </p>
              </div>

              <div className="space-y-4">
                {EXERCISE_4_ITEMS.map(item => {
                  const revealed = !!ex4Revealed[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-purple-50/40 border-2 border-purple-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-base sm:text-lg font-black text-slate-950">
                            <span className="text-purple-700 mr-2.5">{item.id}.</span>
                            {item.sentences}
                          </p>
                          <span className="inline-block mt-1.5 px-3 py-1 rounded-lg bg-purple-100 text-purple-950 font-black text-xs sm:text-sm border border-purple-300">
                            կապակցող բառ՝ ({item.connector})
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setEx4Revealed(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id]
                            }))
                          }
                          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                          {revealed ? 'Թաքցնել' : 'Ver respuesta'}
                        </button>
                      </div>

                      {revealed && (
                        <div className="mt-4 p-4 bg-white rounded-xl border-2 border-purple-300 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <p className="font-black text-purple-950 text-base sm:text-lg">
                              {item.solution}
                            </p>
                            <button
                              onClick={() => speakSpanish(item.solution)}
                              className="text-purple-700 hover:text-purple-900 p-1"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-sm sm:text-base text-slate-700 hy-text font-semibold">
                            {item.hy}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 5: Indicativo o Subjuntivo */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-blue-700 uppercase tracking-wider">
                  Վարժություն 5
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 5. Indicativo o Subjuntivo — Ընտրիր ճիշտ եղանակը
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Խոսքը իրական փաստի՞ մասին է, թե՞ դեռ չկատարված կամ ենթադրական իրավիճակի։
                </p>
              </div>

              <div className="space-y-4">
                {EXERCISE_5_ITEMS.map(item => {
                  const revealed = !!ex5Revealed[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-blue-50/50 border-2 border-blue-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-base sm:text-lg font-black text-slate-950">
                          <span className="text-blue-700 mr-2.5">{item.id}.</span>
                          {item.prompt}
                        </p>
                        <button
                          onClick={() =>
                            setEx5Revealed(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id]
                            }))
                          }
                          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                          {revealed ? 'Թաքցնել' : 'Ver respuesta'}
                        </button>
                      </div>

                      {revealed && (
                        <div className="mt-4 p-4 bg-white rounded-xl border-2 border-blue-300 space-y-1.5">
                          <p className="font-black text-blue-950 text-base sm:text-lg">
                            Ճիշտ ձև՝ <span className="underline decoration-blue-600 decoration-2">{item.correctAnswer}</span> ({item.mood})
                          </p>
                          <p className="text-sm sm:text-base text-slate-800 hy-text font-medium leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 6: Corrige los errores */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-red-700 uppercase tracking-wider">
                  Վարժություն 6
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 6. Corrige los errores — Գտիր և ուղղիր սխալները
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Յուրաքանչյուր նախադասության մեջ կա քերականական կամ կապակցող բառի կիրառման սխալ։
                </p>
              </div>

              <div className="space-y-4">
                {EXERCISE_6_ITEMS.map(item => {
                  const revealed = !!ex6Revealed[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-red-50/40 border-2 border-red-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-base sm:text-lg font-black text-slate-950">
                          <span className="text-red-700 mr-2.5">{item.id}.</span>
                          <span className="line-through decoration-red-600 decoration-3 text-red-950">
                            {item.sentence}
                          </span>
                        </p>
                        <button
                          onClick={() =>
                            setEx6Revealed(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id]
                            }))
                          }
                          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-red-600 text-white hover:bg-red-700 transition"
                        >
                          {revealed ? 'Թաքցնել' : 'Ցույց տալ ուղղումը'}
                        </button>
                      </div>

                      {revealed && (
                        <div className="mt-4 p-4 bg-white rounded-xl border-2 border-red-300 space-y-1.5">
                          <p className="font-black text-emerald-900 text-base sm:text-lg">
                            ✓ Ուղղված՝ {item.correction}
                          </p>
                          <p className="text-sm sm:text-base text-slate-800 hy-text font-medium leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 7: Story Cloze */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-amber-700 uppercase tracking-wider">
                  Վարժություն 7
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 7. Completa un texto — Լրացրու ամբողջական պատմությունը
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Tema: {EXERCISE_7_STORY.titleEs} — {EXERCISE_7_STORY.titleHy}
                </p>
              </div>

              {/* Word Bank */}
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 mb-5">
                <span className="text-xs sm:text-sm font-black text-amber-950 block mb-2 uppercase">
                  Օգտագործիր հետևյալ կապակցող բառերը՝
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {EXERCISE_7_STORY.bank.map(w => (
                    <span
                      key={w}
                      className="px-3 py-1.5 rounded-xl bg-white border-2 border-amber-300 font-black text-sm sm:text-base text-amber-950"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setEx7Revealed(!ex7Revealed)}
                className="mb-6 px-5 py-2.5 rounded-xl text-sm font-black bg-amber-600 text-white hover:bg-amber-700 transition"
              >
                {ex7Revealed
                  ? 'Թաքցնել լուծումը'
                  : 'Ցույց տալ լրացված տեքստը և թարգմանությունը'}
              </button>

              {ex7Revealed ? (
                <div className="space-y-5">
                  <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-300">
                    <span className="text-xs sm:text-sm font-black text-emerald-950 uppercase block mb-2">
                      Texto completo en español՝
                    </span>
                    <p className="text-base sm:text-lg font-bold text-slate-950 leading-relaxed">
                      {EXERCISE_7_STORY.completedEs}
                    </p>
                    <button
                      onClick={() => speakSpanish(EXERCISE_7_STORY.completedEs)}
                      className="mt-3 text-sm font-black text-emerald-900 flex items-center gap-1.5 hover:underline"
                    >
                      <Volume2 className="w-5 h-5" /> Լսել ամբողջ պատմությունը
                    </button>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
                    <span className="text-xs sm:text-sm font-black text-slate-800 uppercase block mb-2 hy-text">
                      Հայերեն թարգմանություն՝
                    </span>
                    <p className="text-sm sm:text-base text-slate-800 hy-text leading-relaxed font-semibold">
                      {EXERCISE_7_STORY.translationHy}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 text-base sm:text-lg font-bold leading-loose text-slate-900">
                  Ayer tuve un día bastante complicado. (1) _______, me desperté tarde
                  (2) _______ mi despertador no sonó. (3) _______, salí de casa rápidamente.
                  (4) _______, cuando llegué a la estación, el tren ya se había marchado.
                  Estaba muy preocupado. (5) _______, decidí buscar otro transporte.
                  (6) _______ era caro, tomé un taxi. El conductor fue muy amable y,
                  (7) _______, me ayudó con las maletas. (8) _______, llegué a tiempo a mi reunión.
                </div>
              )}
            </div>

            {/* Exercise 8: Speaking Prompts */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-teal-700 uppercase tracking-wider">
                  Վարժություն 8
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 8. Preguntas para hablar — Խոսակցական հարցեր
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Պատասխանիր իսպաներեն՝ օգտագործելով նշված կապակցող բառերը։
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {EXERCISE_8_ITEMS.map(item => {
                  const revealed = !!ex8Revealed[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-teal-50/50 border-2 border-teal-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs sm:text-sm font-black text-teal-950">
                            Հարց {item.id}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.requiredConnectors.map(c => (
                              <span
                                key={c}
                                className="px-2.5 py-0.5 rounded-lg bg-teal-200 text-teal-950 font-black text-xs"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-base sm:text-lg font-black text-slate-950">
                          {item.questionEs}
                        </p>
                        <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-semibold">
                          {item.questionHy}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-teal-200">
                        <button
                          onClick={() =>
                            setEx8Revealed(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id]
                            }))
                          }
                          className="w-full py-2 rounded-xl text-xs sm:text-sm font-black bg-white border-2 border-teal-300 text-teal-950 hover:bg-teal-100 transition shadow-2xs"
                        >
                          {revealed ? 'Թաքցնել' : 'Respuesta de ejemplo (Օրինակելի պատասխան)'}
                        </button>

                        {revealed && (
                          <div className="mt-3 p-4 rounded-xl bg-white border-2 border-teal-300 text-sm sm:text-base space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-black text-slate-950 leading-snug">
                                {item.sampleResponseEs}
                              </p>
                              <button
                                onClick={() => speakSpanish(item.sampleResponseEs)}
                                className="text-teal-700 hover:text-teal-900 p-1 shrink-0"
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-slate-700 hy-text font-medium leading-relaxed">
                              {item.sampleResponseHy}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 9: Clasifica los conectores */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 mb-6">
                <div>
                  <span className="text-xs sm:text-sm font-black text-emerald-700 uppercase tracking-wider">
                    Վարժություն 9
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    Ejercicio 9. Clasifica los conectores — Որոշիր կապակցող բառի տեսակը
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                    Ընտրիր յուրաքանչյուր կապակցող բառի քերականական տեսակը։
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEx9Submitted(true);
                    triggerConfetti();
                  }}
                  className="px-5 py-2.5 rounded-xl text-sm font-black bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Ստուգել դասակարգումը
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {EXERCISE_9_ITEMS.map(item => {
                  const selected = ex9Answers[item.id] || '';
                  const isCorrect = selected === item.correctCategory;

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200"
                    >
                      <p className="font-black text-slate-950 text-base sm:text-lg mb-2.5">
                        <span className="text-emerald-700 mr-2">{item.id}.</span>
                        {item.term}
                      </p>

                      <select
                        value={selected}
                        disabled={ex9Submitted}
                        onChange={e =>
                          setEx9Answers(prev => ({
                            ...prev,
                            [item.id]: e.target.value
                          }))
                        }
                        className={`w-full p-2.5 text-sm sm:text-base font-extrabold rounded-xl border-2 outline-none ${
                          ex9Submitted
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                              : 'bg-rose-100 border-rose-400 text-rose-950'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        <option value="">Ընտրիր տեսակը...</option>
                        {item.options.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {ex9Submitted && (
                        <p
                          className={`text-xs sm:text-sm font-black mt-2 ${
                            isCorrect ? 'text-emerald-800' : 'text-rose-800'
                          }`}
                        >
                          {isCorrect ? '✓ Ճիշտ է' : `✗ Ճիշտը՝ ${item.correctCategory}`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exercise 10: Paraphrasing */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <span className="text-xs sm:text-sm font-black text-amber-700 uppercase tracking-wider">
                  Վարժություն 10
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Ejercicio 10. Expresa la misma idea de diferentes maneras — Նույն միտքն արտահայտիր տարբեր կապակցող բառերով
                </h3>
                <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-medium">
                  Այս վարժության նպատակը parafrasear — նույն միտքը տարբեր ձևերով արտահայտելն է (B2–C1 մակարդակ)։
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {EXERCISE_10_ITEMS.map(item => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-amber-50/50 border-2 border-amber-200 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-sm font-black text-amber-950 block mb-1.5 uppercase">
                        {item.titleEs}
                      </span>
                      <p className="text-sm sm:text-base text-slate-900 hy-text font-bold mb-4">
                        {item.hy}
                      </p>

                      <div className="space-y-3">
                        {item.variants.map((v, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-white border-2 border-amber-200 text-sm sm:text-base"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-black text-slate-950">
                                {v.es}
                              </span>
                              <button
                                onClick={() => speakSpanish(v.es)}
                                className="text-slate-400 hover:text-amber-700 p-1"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-xs sm:text-sm text-amber-900 font-bold hy-text block mt-1.5">
                              📌 {v.note}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: FLASHCARDS TRAINER */}
        {/* ========================================================= */}
        {activeTab === 'flashcards' && (
          <div className="max-w-3xl mx-auto py-6 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                Ինտերակտիվ ֆլեշ-քարտեր
              </h2>
              <p className="text-sm sm:text-base text-slate-700 hy-text font-medium">
                Սեղմիր քարտի վրա՝ այն շրջելու և հայերեն թարգմանությունն ու օրինակը տեսնելու համար։
              </p>
            </div>

            {/* Flashcard container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer min-h-[340px] sm:min-h-[380px] bg-white rounded-3xl border-3 border-amber-300 p-8 sm:p-10 shadow-lg shadow-amber-500/10 flex flex-col justify-between items-center text-center transition-all transform hover:-translate-y-1 relative"
            >
              {/* Top card bar */}
              <div className="w-full flex items-center justify-between text-xs sm:text-sm text-slate-600 font-extrabold">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                  {flashcardItem.category}
                </span>
                <span className="text-slate-500 font-black">
                  {flashcardIndex + 1} / {allConnectorsList.length}
                </span>
                {flashcardItem.level && (
                  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800">
                    {flashcardItem.level}
                  </span>
                )}
              </div>

              {/* Main Content */}
              {!isFlipped ? (
                <div className="my-auto space-y-5">
                  <span className="text-xs sm:text-sm uppercase font-black text-amber-600 tracking-wider">
                    Español (Իսպաներեն)
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                    {flashcardItem.es}
                  </h3>
                  <div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakSpanish(flashcardItem.es);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 text-amber-950 text-sm sm:text-base font-black hover:bg-amber-200 transition border border-amber-300"
                    >
                      <Volume2 className="w-5 h-5" /> Լսել արտասանությունը
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 italic hy-text font-medium">
                    👆 Սեղմիր քարտի վրա հայերեն թարգմանությունը բացելու համար
                  </p>
                </div>
              ) : (
                <div className="my-auto space-y-4">
                  <span className="text-xs sm:text-sm uppercase font-black text-emerald-700 tracking-wider hy-text">
                    Հայերեն թարգմանություն
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-emerald-950 hy-text">
                    {flashcardItem.hy}
                  </h3>
                  {flashcardItem.exampleEs && (
                    <div className="mt-5 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 text-left max-w-lg mx-auto">
                      <p className="text-sm sm:text-base font-black text-slate-950">
                        {flashcardItem.exampleEs}
                      </p>
                      <p className="text-sm sm:text-base text-slate-700 hy-text mt-1 font-semibold">
                        {flashcardItem.exampleHy}
                      </p>
                    </div>
                  )}
                  {flashcardItem.note && (
                    <p className="text-xs sm:text-sm text-amber-950 bg-amber-100/70 p-2.5 rounded-xl hy-text font-bold">
                      💡 {flashcardItem.note}
                    </p>
                  )}
                </div>
              )}

              {/* Bottom Card Footer */}
              <div className="w-full text-center text-xs sm:text-sm text-slate-500 font-bold hy-text">
                Շրջելու համար սեղմիր քարտի վրա
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setFlashcardIndex(prev =>
                    prev > 0 ? prev - 1 : allConnectorsList.length - 1
                  );
                }}
                className="px-5 py-3 rounded-2xl bg-white border-2 border-slate-300 font-black text-sm sm:text-base text-slate-800 hover:bg-slate-50 transition shadow-2xs"
              >
                ← Նախորդը
              </button>

              <button
                onClick={() => {
                  setIsFlipped(false);
                  const rand = Math.floor(Math.random() * allConnectorsList.length);
                  setFlashcardIndex(rand);
                }}
                className="px-5 py-3 rounded-2xl bg-amber-100 text-amber-950 border-2 border-amber-300 font-black text-sm sm:text-base hover:bg-amber-200 transition flex items-center gap-2 shadow-2xs"
              >
                <Shuffle className="w-4 h-4" /> Պատահական
              </button>

              <button
                onClick={() => {
                  setIsFlipped(false);
                  setFlashcardIndex(prev =>
                    prev < allConnectorsList.length - 1 ? prev + 1 : 0
                  );
                }}
                className="px-5 py-3 rounded-2xl bg-amber-600 text-white font-black text-sm sm:text-base hover:bg-amber-700 transition shadow-sm"
              >
                Հաջորդը →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SEARCH & DICTIONARY */}
        {/* ========================================================= */}
        {activeTab === 'dictionary' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Որոնել կապակցող բառ (օր.՝ pero, porque, չնայած, սակայն...)..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base font-bold"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-700 font-black"
                    >
                      Մաքրել
                    </button>
                  )}
                </div>

                {/* Level filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
                        selectedLevel === lvl
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {lvl === 'ALL' ? 'Բոլոր մակարդակները' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200">
                <span className="text-xs sm:text-sm text-slate-500 font-black mr-1 self-center">
                  Կատեգորիաներ՝
                </span>
                {[
                  'ALL',
                  'Adición',
                  'Contraste',
                  'Causa',
                  'Consecuencia',
                  'Finalidad',
                  'Condición',
                  'Concesivo',
                  'Temporal',
                  'Secuencia',
                  'Ejemplificación',
                  'Explicativo',
                  'Comparación',
                  'Opinión',
                  'Conclusión',
                  'Avanzado',
                  'Adicionales'
                ].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                      selectedCategory === cat
                        ? 'bg-amber-800 text-white font-black'
                        : 'bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-950 border border-slate-300'
                    }`}
                  >
                    {cat === 'ALL' ? 'Բոլորը' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="text-sm sm:text-base text-slate-700 font-extrabold px-1">
              Գտնվել է {filteredConnectors.length} կապակցող բառ
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredConnectors.map(c => {
                const revealed = isRevealed(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleReveal(c.id)}
                    className="cursor-pointer bg-white rounded-2xl border-2 border-slate-200 p-5 hover:border-amber-400 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg sm:text-xl font-black text-slate-950">
                            {c.es}
                          </h4>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              speakSpanish(c.es);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-amber-700 hover:bg-amber-50"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {c.level && (
                            <span className="px-2 py-0.5 rounded text-xs font-black bg-slate-100 text-slate-700">
                              {c.level}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-xs font-black bg-amber-100 text-amber-950">
                            {c.category}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        {revealed ? (
                          <p className="text-sm sm:text-base font-black text-emerald-950 hy-text">
                            Հայերեն՝ {c.hy}
                          </p>
                        ) : (
                          <span className="text-xs sm:text-sm text-amber-900 hy-text font-bold">
                            👆 Սեղմիր թարգմանության համար
                          </span>
                        )}
                      </div>
                    </div>

                    {c.exampleEs && (
                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <p className="text-sm sm:text-base font-extrabold text-slate-900">
                          {c.exampleEs}
                        </p>
                        {revealed && (
                          <p className="text-sm text-slate-600 hy-text mt-1 font-medium">
                            {c.exampleHy}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-amber-200 bg-white py-10 text-center text-sm text-slate-600 space-y-2">
        <p className="font-black text-slate-900 text-base">
          LOS CONECTORES EN ESPAÑOL • Իսպաներենի կապակցող բառեր (A2–C1)
        </p>
        <p className="hy-text max-w-lg mx-auto text-slate-600 font-medium">
          Ինտերակտիվ ուսումնական հարթակ՝ մեծ ու պարզ տառատեսակներով, թարգմանություններով, օրինակներով, արտասանությամբ և 10 գործնական վարժություններով։
        </p>
      </footer>
    </div>
  );
}
