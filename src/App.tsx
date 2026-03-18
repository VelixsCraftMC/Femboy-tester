import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, User, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    points: {
      femboy: number;
      normal: number;
      abnormal: number;
    };
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Bagaimana perasaanmu tentang rok mini?",
    options: [
      { label: "Suka sekali!", points: { femboy: 10, normal: 0, abnormal: 0 } },
      { label: "Biasa saja.", points: { femboy: 0, normal: 10, abnormal: 0 } },
      { label: "Aneh...", points: { femboy: 0, normal: 0, abnormal: 10 } },
    ],
  },
  {
    id: 2,
    text: "Apa minuman favoritmu saat santai?",
    options: [
      { label: "Monster Energy", points: { femboy: 10, normal: 0, abnormal: 0 } },
      { label: "Air Putih", points: { femboy: 0, normal: 10, abnormal: 0 } },
      { label: "Minyak Tanah", points: { femboy: 0, normal: 0, abnormal: 10 } },
    ],
  },
  {
    id: 3,
    text: "Gaya rambut apa yang menurutmu paling keren?",
    options: [
      { label: "Panjang & Berwarna", points: { femboy: 10, normal: 0, abnormal: 0 } },
      { label: "Pendek Rapi", points: { femboy: 0, normal: 10, abnormal: 0 } },
      { label: "Botak Licin", points: { femboy: 0, normal: 0, abnormal: 10 } },
    ],
  },
  {
    id: 4,
    text: "Bagaimana caramu duduk di depan komputer?",
    options: [
      { label: "Menyilangkan kaki", points: { femboy: 10, normal: 0, abnormal: 0 } },
      { label: "Tegak lurus", points: { femboy: 0, normal: 10, abnormal: 0 } },
      { label: "Jongkok di kursi", points: { femboy: 0, normal: 0, abnormal: 10 } },
    ],
  },
  {
    id: 5,
    text: "Apa hobimu di waktu luang?",
    options: [
      { label: "Cosplay / Gaming", points: { femboy: 10, normal: 0, abnormal: 0 } },
      { label: "Olahraga / Gym", points: { femboy: 0, normal: 10, abnormal: 0 } },
      { label: "Bicara dengan tembok", points: { femboy: 0, normal: 0, abnormal: 10 } },
    ],
  },
];

export default function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ femboy: 0, normal: 0, abnormal: 0 });

  const handleAnswer = (points: { femboy: number; normal: number; abnormal: number }) => {
    setScores(prev => ({
      // Prank logic: Add a massive hidden bonus to femboy score on every answer
      femboy: prev.femboy + points.femboy + 100, 
      normal: prev.normal + points.normal,
      abnormal: prev.abnormal + points.abnormal,
    }));

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const resetQuiz = () => {
    setStep('start');
    setCurrentQuestion(0);
    setScores({ femboy: 0, normal: 0, abnormal: 0 });
  };

  const totalPoints = scores.femboy + scores.normal + scores.abnormal;
  const getPercentage = (val: number) => (totalPoints === 0 ? 0 : Math.round((val / totalPoints) * 100));

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] font-sans selection:bg-[#00FF00] selection:text-black">
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-6">
        
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="w-12 h-12 text-[#FF6321]" />
                </div>
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2 bg-[#00FF00] border border-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                >
                  New Test
                </motion.div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic">
                  Femboy<br/>Tester
                </h1>
                <p className="text-sm font-medium opacity-60 max-w-[280px]">
                  Cari tahu seberapa femboy, normal, atau abnormal dirimu dengan survey singkat ini.
                </p>
              </div>

              <button
                onClick={() => setStep('quiz')}
                className="group relative w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(0,255,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Mulai Test
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col pt-12"
            >
              <div className="flex justify-between items-end mb-12">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Question</span>
                  <div className="text-4xl font-black italic">0{currentQuestion + 1}</div>
                </div>
                <div className="text-right">
                  <div className="h-1 w-32 bg-black/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#00FF00]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold leading-tight mb-12 min-h-[100px]">
                {QUESTIONS[currentQuestion].text}
              </h2>

              <div className="space-y-4">
                {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.points)}
                    className="w-full p-6 text-left border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00FF00] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-between group"
                  >
                    <span className="font-bold text-lg">{opt.label}</span>
                    <span className="text-xs font-black opacity-20 group-hover:opacity-100 italic">0{idx + 1}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col pt-12 space-y-12"
            >
              <div className="text-center space-y-2">
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">Hasil Test</h2>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">Berdasarkan jawabanmu</p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-[10px] font-black text-[#FF6321] uppercase tracking-[0.3em] animate-pulse"
                >
                  ⚠️ Warning: Femboy Energy Detected ⚠️
                </motion.p>
              </div>

              <div className="space-y-8">
                {/* Femboy Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF6321]" />
                      <span className="font-black uppercase tracking-widest text-sm italic">Femboy</span>
                    </div>
                    <span className="font-mono font-bold text-2xl">{getPercentage(scores.femboy)}%</span>
                  </div>
                  <div className="h-8 border-2 border-black bg-white overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${getPercentage(scores.femboy)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-[#FF6321]"
                    />
                  </div>
                </div>

                {/* Normal Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="font-black uppercase tracking-widest text-sm italic">Normal</span>
                    </div>
                    <span className="font-mono font-bold text-2xl">{getPercentage(scores.normal)}%</span>
                  </div>
                  <div className="h-8 border-2 border-black bg-white overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${getPercentage(scores.normal)}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>

                {/* Abnormal Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#00FF00]" />
                      <span className="font-black uppercase tracking-widest text-sm italic">Abnormal</span>
                    </div>
                    <span className="font-mono font-bold text-2xl">{getPercentage(scores.abnormal)}%</span>
                  </div>
                  <div className="h-8 border-2 border-black bg-white overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${getPercentage(scores.abnormal)}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      className="h-full bg-[#00FF00]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={resetQuiz}
                  className="w-full py-4 border-2 border-black bg-white font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Ulangi Test
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-auto pt-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-20">
            Femboy Tester v1.0 • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
