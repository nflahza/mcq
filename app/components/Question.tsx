"use client";

import React from "react";
import OptionComponent from "./Option";

interface QuizOption {
  answerText: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
}

interface QuestionProps {
  question: QuizQuestion;
  handleAnswerOptionClick: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  handleAnswerOptionClick,
}) => {
  return (
    <div>
      <div className="font-qs text-xl font-semibold mb-6 text-white">
        {question.questionText}
      </div>
      <div className="font-qs flex flex-col space-y-4">
        {question.options.map((option, index) => (
          <OptionComponent
            key={index}
            option={option}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
