"use client";

import React, { useState } from "react";
import QuestionComponent from "./Question";

interface QuizOption {
  answerText: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
}

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="font-qs w-full max-w-xl p-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
      {showScore ? (
        <div className="font-qs text-2xl font-bold text-center text-white">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <QuestionComponent
          question={questions[currentQuestionIndex]}
          handleAnswerOptionClick={handleAnswerOptionClick}
        />
      )}
    </div>
  );
};

export default Quiz;
