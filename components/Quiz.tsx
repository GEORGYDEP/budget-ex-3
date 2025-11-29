import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === QUIZ_QUESTIONS.length - 1;

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="w-6 h-6" />
          Quiz Final
        </h2>
        <span className="text-sm font-medium bg-indigo-500 px-3 py-1 rounded-full">
          Question {currentQuestionIdx + 1} / {QUIZ_QUESTIONS.length}
        </span>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => {
            let itemClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
            
            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                itemClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedOption) {
                itemClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                itemClass += "border-gray-100 text-gray-400 opacity-50";
              }
            } else {
              itemClass += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={itemClass}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 animate-fade-in-up">
            <div className={`p-4 rounded-lg mb-6 ${selectedOption === currentQ.correctIndex ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-900'}`}>
              <p className="font-semibold mb-1">
                {selectedOption === currentQ.correctIndex ? "Excellent !" : "Pas tout à fait..."}
              </p>
              <p className="text-sm opacity-90">{currentQ.explanation}</p>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform transform active:scale-95"
            >
              {isLastQuestion ? "Terminer l'exercice" : "Question Suivante"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
