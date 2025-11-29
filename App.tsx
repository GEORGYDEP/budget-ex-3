import React, { useState } from 'react';
import { ExerciseState } from './types';
import Exercise from './components/Exercise';
import Quiz from './components/Quiz';
import ReadOnlyBudget from './components/ReadOnlyBudget';
import { BookOpen, PartyPopper, RotateCcw } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<ExerciseState>('view_forecast');

  const goToReal = () => setStep('view_real');
  const startExercise = () => setStep('exercise');
  const startQuiz = () => setStep('quiz');
  const finishApp = () => setStep('completed');
  const restart = () => setStep('view_forecast');

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg shadow-indigo-500/20 shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Budget du Ménage</h1>
              <p className="text-slate-400 text-xs md:text-sm">
                Réalisé pour les élèves de l'Institut Saint-Luc de Mons par Mr Depret
              </p>
            </div>
          </div>
          <div className="hidden lg:flex gap-2">
            <StepIndicator current={step} step="view_forecast" label="1. Prévisionnel" />
            <div className="w-4 h-px bg-slate-700 self-center"></div>
            <StepIndicator current={step} step="view_real" label="2. Réel" />
            <div className="w-4 h-px bg-slate-700 self-center"></div>
            <StepIndicator current={step} step="exercise" label="3. Analyse" />
            <div className="w-4 h-px bg-slate-700 self-center"></div>
            <StepIndicator current={step} step="quiz" label="4. Quiz" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {step === 'view_forecast' && (
          <ReadOnlyBudget mode="forecast" onNext={goToReal} />
        )}

        {step === 'view_real' && (
          <ReadOnlyBudget mode="real" onNext={startExercise} />
        )}

        {step === 'exercise' && (
          <Exercise onComplete={startQuiz} />
        )}

        {step === 'quiz' && (
          <Quiz onComplete={finishApp} />
        )}

        {step === 'completed' && (
          <div className="text-center space-y-8 animate-fade-in pt-12">
            <div className="inline-flex items-center justify-center p-8 bg-green-100 rounded-full mb-4 ring-8 ring-green-50 shadow-xl">
              <PartyPopper className="w-24 h-24 text-green-600" />
            </div>
            
            <h2 className="text-4xl font-extrabold text-slate-900">Exercice Terminé !</h2>
            <p className="text-xl text-slate-600 max-w-lg mx-auto">
              Bravo, vous avez analysé avec succès l'impact d'un imprévu sur un budget familial et compris l'importance de l'épargne de précaution.
            </p>

            <button 
              onClick={restart}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              <RotateCcw className="w-5 h-5" />
              Recommencer l'exercice
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

const StepIndicator = ({ current, step, label }: { current: string, step: string, label: string }) => {
  const steps: string[] = ['view_forecast', 'view_real', 'exercise', 'quiz', 'completed'];
  const currentIndex = steps.indexOf(current);
  const stepIndex = steps.indexOf(step);
  
  const isActive = current === step;
  const isPast = currentIndex > stepIndex;
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors
      ${isActive ? 'bg-indigo-600 text-white shadow-md' : isPast ? 'text-indigo-400' : 'text-slate-600 opacity-50'}
    `}>
      {label}
    </div>
  );
};
