import { BudgetCategory, QuizQuestion } from './types';

export const REVENUE_DATA: BudgetCategory = {
  title: "REVENUS",
  color: "green",
  items: [
    { id: "rev_salaire", label: "Revenus du travail (Salaire)", forecast: 1258, real: 1258 },
    { id: "rev_famille", label: "Allocations familiales", forecast: 224, real: 224 },
    { id: "rev_chomage", label: "Allocations chômage", forecast: 328, real: 228 },
    { id: "rev_maladie", label: "Indemnité de maladie", forecast: 0, real: 80 },
    { id: "rev_mutuelle", label: "Remboursement de mutuelle", forecast: 0, real: 150 },
    { id: "rev_total", label: "TOTAL REVENUS", forecast: 1810, real: 1940, isTotal: true },
  ]
};

export const EXPENSE_DATA: BudgetCategory = {
  title: "DÉPENSES",
  color: "red",
  items: [
    { id: "exp_loyer", label: "Fixes — Loyer", forecast: 275, real: 275 },
    { id: "exp_energie", label: "Énergie domestique", forecast: 80, real: 78 },
    { id: "exp_comms", label: "Communications", forecast: 30, real: 49 },
    { id: "exp_assurance", label: "Assurances", forecast: 80, real: 89 },
    { id: "exp_impots", label: "Impôts", forecast: 55, real: 55 },
    { id: "exp_alim", label: "Denrées alimentaires", forecast: 800, real: 740 },
    { id: "exp_loisirs", label: "Loisirs", forecast: 50, real: 30 },
    { id: "exp_vetements", label: "Vêtements", forecast: 100, real: 127 },
    { id: "exp_sante", label: "Soins de santé", forecast: 0, real: 356 },
    { id: "exp_menage", label: "Articles ménagers durables", forecast: 100, real: 58 },
    { id: "exp_voiture", label: "Frais voiture", forecast: 140, real: 184 },
    { id: "exp_epargne", label: "Imprévus ou épargne", forecast: 100, real: 0 },
    { id: "exp_enfants", label: "Frais d'encadrement des enfants", forecast: 0, real: 110 },
    { id: "exp_total", label: "TOTAL DÉPENSES", forecast: 1810, real: 2151, isTotal: true },
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "D'où proviennent principalement les différences au niveau des REVENUS ?",
    options: [
      "Monsieur a eu une augmentation de salaire.",
      "Il y a moins de chômage, compensé par des indemnités maladie et un remboursement mutuelle.",
      "Les allocations familiales ont augmenté.",
      "Ils ont gagné au loto."
    ],
    correctIndex: 1,
    explanation: "Suite à l'accident, le chômage a baissé, mais les indemnités de maladie et le remboursement de la mutuelle ont compensé."
  },
  {
    id: 2,
    question: "D'où proviennent les augmentations imprévues des DÉPENSES ?",
    options: [
      "Ils ont acheté une nouvelle voiture.",
      "Le loyer a augmenté.",
      "Principalement des soins de santé et des frais de garde d'enfants non prévus.",
      "Ils sont partis en vacances aux Bahamas."
    ],
    correctIndex: 2,
    explanation: "L'accident (jambe cassée) a engendré des frais médicaux importants (356€) et des frais de garde (110€)."
  },
  {
    id: 3,
    question: "Quelle conclusion principale peut-on tirer pour le mois de novembre ?",
    options: [
      "Le budget a été parfaitement respecté.",
      "Ils ont réussi à épargner beaucoup d'argent.",
      "L'accident a modifié la nature des revenus et explosé les dépenses, créant un déficit.",
      "L'énergie a coûté beaucoup plus cher que prévu."
    ],
    correctIndex: 2,
    explanation: "Le budget réel montre un déficit (dépenses > revenus) à cause de l'accident, malgré les remboursements."
  },
  {
    id: 4,
    question: "Qu'est-ce qu'un budget prévisionnel ?",
    options: [
      "Un tableau qui reprend l'ensemble des prévisions des dépenses et recettes sur une période.",
      "Une liste de courses pour le supermarché.",
      "Le montant qu'il reste sur le compte bancaire à la fin du mois.",
      "Un document envoyé par les impôts."
    ],
    correctIndex: 0,
    explanation: "C'est un outil de planification (TABLEAU) qui estime les rentrées et sorties d'argent futures."
  }
];
