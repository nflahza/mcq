"use client";

import React from "react";

interface QuizOption {
  answerText: string;
  isCorrect: boolean;
}

interface OptionProps {
  option: QuizOption;
  handleAnswerOptionClick: (isCorrect: boolean) => void;
}

const Option: React.FC<OptionProps> = ({ option, handleAnswerOptionClick }) => {
  return (
    <button
      className="font-qs w-full py-3 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300"
      onClick={() => handleAnswerOptionClick(option.isCorrect)}
    >
      {option.answerText}
    </button>
  );
};

export default Option;
