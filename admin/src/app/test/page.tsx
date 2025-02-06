'use client'
import React, { useState } from 'react';
import { Leaf, Send, ArrowRight, ArrowLeft, PenLine } from 'lucide-react';


// Type pour les questions
type Question = {
  text: string;
  choices: string[];
};
const Page: React.FC = () => {
   // Questions avec choix prédéfinis
   const questions: Question[] = [
    {
      text: "Quels langages utilisez-vous le plus en développement full-stack ?",
      choices: ["JavaScript/TypeScript", "Python", "Java", "PHP", "Ruby", "Autres"]
    },
    {
      text: "Quel framework front-end préférez-vous ?",
      choices: ["React.js", "Vue.js", "Angular", "Svelte", "Autre"]
    },
    {
      text: "Quel framework back-end utilisez-vous principalement ?",
      choices: ["Node.js (Express/NestJS)", "Django", "Spring Boot", "Laravel", "Ruby on Rails", "Autre"]
    },
    {
      text: "Quelle base de données maîtrisez-vous le mieux ?",
      choices: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQLite", "Autre"]
    },
    {
      text: "Quelle est votre approche préférée pour la gestion de l'état en front-end ?",
      choices: ["Redux", "Recoil", "Zustand", "Context API", "Autre"]
    },
    {
      text: "Avez-vous déjà mis en place une API REST ou GraphQL ?",
      choices: ["Oui, REST API", "Oui, GraphQL", "Oui, les deux", "Non"]
    },
    {
      text: "Quel est votre niveau en DevOps et CI/CD ?",
      choices: ["Débutant", "Intermédiaire", "Avancé", "Expert"]
    },
    {
      text: "Quels outils utilisez-vous pour le versioning de code ?",
      choices: ["Git/GitHub", "Git/GitLab", "Git/Bitbucket", "SVN", "Autre"]
    },
    {
      text: "Comment gérez-vous l'authentification et l'autorisation dans vos projets ?",
      choices: ["JWT", "OAuth", "Session/Cookies", "Auth0", "Autre"]
    },
    {
      text: "Quelle méthodologie de développement suivez-vous ?",
      choices: ["Agile (Scrum/Kanban)", "Waterfall", "Lean", "Autre"]
    }
  ];

  const [answers, setAnswers] = useState<string[]>(new Array(8).fill(''));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCustomInput, setShowCustomInput] = useState<boolean[]>(new Array(8).fill(false));

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const toggleCustomInput = () => {
    const newShowCustomInput = [...showCustomInput];
    newShowCustomInput[currentQuestion] = !newShowCustomInput[currentQuestion];
    setShowCustomInput(newShowCustomInput);
    if (!newShowCustomInput[currentQuestion]) {
      handleAnswerChange(''); // Reset answer when switching back to choices
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted answers:', answers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < 7) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / 8) * 100;

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 p-6">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="w-8 h-8 text-yellow-500" />
        <span className="text-2xl font-bold text-gray-800">3FPT</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-green-500 rounded-full relative transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute -right-2 -top-1 w-4 h-4 bg-green-500 rounded-full shadow-md"></div>
        </div>
      </div>

      {/* Progress Text */}
      <div className="text-center mb-12 flex flex-col">
      <p className="text-gray-600">
          Quiz : Dévelloppeur Fullstack
        </p>
        <p className="text-gray-600">
          Question {currentQuestion + 1} sur 8
        </p>
      </div>

      {/* Current Question */}
      <div className="max-w-xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-8">
          <label className="block text-gray-700 font-medium mb-6">
            <span className="inline-block bg-green-500 text-white w-8 h-8 rounded-full text-lg text-center mr-3 leading-8">
              {currentQuestion + 1}
            </span>
            {questions[currentQuestion].text}
          </label>

          {/* Choices */}
          {!showCustomInput[currentQuestion] ? (
            <div className="space-y-3">
              {questions[currentQuestion].choices.map((choice, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    answers[currentQuestion] === choice
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={choice}
                    checked={answers[currentQuestion] === choice}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-gray-700">{choice}</span>
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={answers[currentQuestion]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
              placeholder="Votre réponse personnalisée..."
              autoFocus
            />
          )}

          {/* Toggle Custom Input Button */}
          <button
            type="button"
            onClick={toggleCustomInput}
            className="mt-4 flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <PenLine className="w-4 h-4" />
            <span>
              {showCustomInput[currentQuestion] 
                ? "Revenir aux choix prédéfinis" 
                : "Ajouter une réponse personnalisée"}
            </span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Précédent</span>
          </button>

          {currentQuestion === 7 ? (
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <span>Terminer</span>
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <span>Suivant</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}


export default Page;