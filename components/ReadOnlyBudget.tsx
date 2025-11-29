import React from 'react';
import { REVENUE_DATA, EXPENSE_DATA } from '../constants';
import { BudgetCategory } from '../types';
import { ArrowRight, AlertTriangle, Info } from 'lucide-react';

interface ReadOnlyBudgetProps {
  mode: 'forecast' | 'real';
  onNext: () => void;
}

const ReadOnlyBudget: React.FC<ReadOnlyBudgetProps> = ({ mode, onNext }) => {
  const isForecast = mode === 'forecast';
  const title = isForecast ? "1. Le Budget Prévisionnel" : "2. Le Budget Réel (Novembre)";

  const renderTable = (data: BudgetCategory) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className={`px-4 py-3 flex justify-between items-center ${data.color === 'green' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
        <h3 className="font-bold text-white uppercase tracking-wider text-sm">{data.title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Montant {isForecast ? 'Prévu' : 'Réel'}</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => {
              // Only show items that have non-zero values for the current mode, unless it's a fixed line item that became 0
              // The logic below ensures we see the relevant lines. 
              const value = isForecast ? item.forecast : item.real;
              // Optional: You could filter out lines that are 0 in forecast if you wanted, but seeing 0 can be instructive.
              // For simplicity and matching the PDF, we show all rows.
              
              return (
                <tr key={item.id} className={`border-b border-slate-100 ${item.isTotal ? 'bg-slate-50 font-bold border-t-2 border-slate-200' : 'hover:bg-slate-50'}`}>
                  <td className="px-4 py-2 text-slate-700">{item.label}</td>
                  <td className="px-4 py-2 text-right font-medium text-slate-900">
                    {value.toLocaleString('fr-BE', { minimumFractionDigits: 2 })} €
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 shrink-0">
            {isForecast ? <Info className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6 text-orange-600" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
            {isForecast ? (
              <div className="space-y-2 text-slate-600">
                <p>
                  Voici le budget prévisionnel de Monsieur et Madame Durieu pour le mois de novembre.
                </p>
                <p className="font-medium bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <span className="font-bold text-indigo-700">Définition :</span> C'est un tableau qui reprend l'ensemble des <strong>PRÉVISIONS</strong> des dépenses et des recettes sur une période déterminée. Il permet de planifier à l'avance comment l'argent sera utilisé.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-slate-600">
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-orange-800">
                  <p className="font-bold mb-1">⚠️ L'Imprévu :</p>
                  <p>
                    Le 03/11, Madame Durieu est victime d'un accident et se casse la jambe.
                    Cet événement a bouleversé la situation financière de la famille.
                  </p>
                </div>
                <p>
                  Voici ce qui s'est <strong>réellement</strong> passé à la fin du mois. Certains montants ont changé par rapport aux prévisions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {renderTable(REVENUE_DATA)}
        {renderTable(EXPENSE_DATA)}
      </div>

      <div className="flex justify-center pt-6">
        <button 
          onClick={onNext}
          className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-3"
        >
          {isForecast ? "Voir ce qui s'est passé ensuite" : "Comparer les deux budgets"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReadOnlyBudget;
