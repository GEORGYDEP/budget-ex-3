import React, { useState, useEffect } from 'react';
import { BudgetLineItem } from '../types';
import { Check, X, HelpCircle, AlertCircle } from 'lucide-react';

interface ComparisonRowProps {
  item: BudgetLineItem;
  onValidationChange: (id: string, isValid: boolean) => void;
  type: 'revenue' | 'expense';
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ item, onValidationChange, type }) => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Based on PDF logic:
  // For Revenue: Real - Forecast (Positive is good) ?? 
  // Let's look at PDF page 4. 
  // Revenue: 1940 (Real) - 1810 (Forecast) = +130.
  // Expenses: 275 (Forecast) - 275 (Real) = 0.
  // Expenses: 800 (Forecast) - 740 (Real) = +60 (Under budget).
  // Expenses: 0 (Forecast) - 356 (Real) = -356 (Over budget).
  // Formula seems to be: Forecast - Real for expenses? 
  // But Revenue is Real - Forecast?
  // Let's stick to standard variance:
  // Revenue Variance = Real - Forecast
  // Expense Variance = Forecast - Real (Positive means under budget, Negative means over budget)
  
  // Checking PDF Page 4:
  // Revenue Total: 1810 (Prev) | 1940 (Reel) | Diff: +130. (1940-1810 = 130).
  // Expense Total: 1810 (Prev) | 2151 (Reel) | Diff: -341. (1810-2151 = -341).
  // Expense Food: 800 (Prev) | 740 (Reel) | Diff: +60. (800-740 = 60).
  
  // Logic Confirmed:
  // Revenue: Real - Forecast
  // Expense: Forecast - Real
  
  const correctDiff = type === 'revenue' 
    ? item.real - item.forecast 
    : item.forecast - item.real;

  // Format validation: accept string with comma or dot
  const normalizeInput = (val: string) => parseFloat(val.replace(',', '.'));

  const checkValue = (val: string) => {
    if (!val) {
      setStatus('idle');
      onValidationChange(item.id, false);
      return;
    }

    const numVal = normalizeInput(val);
    
    // Allow small floating point margin of error (0.01)
    if (Math.abs(numVal - correctDiff) < 0.1) {
      setStatus('correct');
      onValidationChange(item.id, true);
    } else {
      setStatus('incorrect');
      setAttempts(prev => prev + 1);
      onValidationChange(item.id, false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    checkValue(e.target.value);
  };

  const handleShowAnswer = () => {
    setValue(correctDiff.toFixed(2).replace('.', ',').replace(',00', ''));
    setStatus('correct');
    onValidationChange(item.id, true);
    setShowHint(false);
  };

  useEffect(() => {
    if (attempts >= 3 && status !== 'correct') {
      setShowHint(true);
    }
  }, [attempts, status]);

  const rowBaseClass = item.isTotal 
    ? "bg-slate-100 font-bold border-t-2 border-slate-300" 
    : "border-b border-slate-100 hover:bg-slate-50";

  return (
    <div className={`grid grid-cols-12 gap-2 p-3 items-center ${rowBaseClass} transition-colors duration-200`}>
      <div className="col-span-5 text-sm text-slate-700">
        {item.label}
      </div>
      <div className="col-span-2 text-right text-sm text-slate-500 font-medium">
        {item.forecast.toLocaleString('fr-BE', { minimumFractionDigits: 2 })} €
      </div>
      <div className="col-span-2 text-right text-sm text-slate-800 font-medium">
        {item.real.toLocaleString('fr-BE', { minimumFractionDigits: 2 })} €
      </div>
      <div className="col-span-3 flex items-center justify-end space-x-2 relative">
        <div className="relative w-full">
           <input
            type="number"
            step="0.01"
            className={`w-full text-right p-1.5 text-sm border rounded outline-none transition-all
              ${status === 'correct' ? 'bg-green-50 border-green-400 text-green-700' : ''}
              ${status === 'incorrect' ? 'bg-red-50 border-red-400 text-red-700' : ''}
              ${status === 'idle' ? 'bg-white border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100' : ''}
            `}
            placeholder="?"
            value={value}
            onChange={handleChange}
            disabled={status === 'correct'}
          />
          {status === 'correct' && (
            <Check className="w-4 h-4 text-green-500 absolute right-8 top-1/2 -translate-y-1/2 opacity-50" />
          )}
        </div>

        {/* Action Button Area */}
        <div className="w-6 flex-shrink-0 flex justify-center">
            {showHint && status !== 'correct' && (
              <button 
                onClick={handleShowAnswer}
                className="text-orange-500 hover:text-orange-600 transition-colors tooltip-trigger"
                title="Afficher la réponse"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            )}
            {status === 'incorrect' && attempts < 3 && (
              <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
            )}
             {status === 'correct' && (
              <Check className="w-5 h-5 text-green-500" />
            )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonRow;
