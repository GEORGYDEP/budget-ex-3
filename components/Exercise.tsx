import React, { useState, useEffect } from 'react';
import { REVENUE_DATA, EXPENSE_DATA } from '../constants';
import ComparisonRow from './ComparisonRow';
import { ArrowRight, Calculator } from 'lucide-react';

interface ExerciseProps {
  onComplete: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({ onComplete }) => {
  // Store validation state of each row
  const [validations, setValidations] = useState<Record<string, boolean>>({});

  // Flatten items to know total count
  const allRevenueIds = REVENUE_DATA.items.map(i => i.id);
  const allExpenseIds = EXPENSE_DATA.items.map(i => i.id);
  const totalItems = allRevenueIds.length + allExpenseIds.length;

  const handleValidation = (id: string, isValid: boolean) => {
    setValidations(prev => ({ ...prev, [id]: isValid }));
  };

  const validCount = Object.values(validations).filter(Boolean).length;
  const isComplete = validCount === totalItems;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Calculator className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-lg">Consigne</h3>
            <p className="text-blue-800">
              Calculez la différence pour chaque ligne du budget.
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
              <li>Pour les <strong>Revenus</strong> : Réel - Prévisionnel</li>
              <li>Pour les <strong>Dépenses</strong> : Prévisionnel - Réel (Positif = Économie, Négatif = Dépassement)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Revenues Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-wide">REVENUS</h2>
          <span className="text-emerald-100 text-sm">Novembre</span>
        </div>
        <div className="grid grid-cols-12 gap-2 p-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-5 pl-2">Type</div>
          <div className="col-span-2 text-right">Prévisionnel</div>
          <div className="col-span-2 text-right">Réel</div>
          <div className="col-span-3 text-right pr-12">Différence</div>
        </div>
        <div>
          {REVENUE_DATA.items.map(item => (
            <ComparisonRow 
              key={item.id} 
              item={item} 
              type="revenue" 
              onValidationChange={handleValidation} 
            />
          ))}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-rose-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-wide">DÉPENSES</h2>
          <span className="text-rose-100 text-sm">Novembre</span>
        </div>
        <div className="grid grid-cols-12 gap-2 p-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-5 pl-2">Type</div>
          <div className="col-span-2 text-right">Prévisionnel</div>
          <div className="col-span-2 text-right">Réel</div>
          <div className="col-span-3 text-right pr-12">Différence</div>
        </div>
        <div>
          {EXPENSE_DATA.items.map(item => (
            <ComparisonRow 
              key={item.id} 
              item={item} 
              type="expense" 
              onValidationChange={handleValidation} 
            />
          ))}
        </div>
      </div>

      {/* Footer / Validation */}
      <div className="sticky bottom-6 flex justify-center z-10">
        <div className={`
          flex items-center gap-4 px-6 py-3 rounded-full shadow-2xl transition-all duration-300
          ${isComplete ? 'bg-green-600 text-white scale-110' : 'bg-white text-gray-500 border border-gray-200'}
        `}>
          <div className="flex flex-col items-center">
             <span className="text-xs uppercase font-bold tracking-wider opacity-80">Progression</span>
             <span className="font-mono font-bold text-lg">{validCount} / {totalItems}</span>
          </div>
          
          <button
            onClick={onComplete}
            disabled={!isComplete}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all
              ${isComplete 
                ? 'bg-white text-green-700 hover:bg-green-50 shadow-md cursor-pointer' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
            `}
          >
            Passer au Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
