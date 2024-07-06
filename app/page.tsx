"use client";

import React from "react";
import Quiz from "./components/Quiz";

const questions = [
  {
    questionText: "What is the capital of France?",
    options: [
      { answerText: "Berlin", isCorrect: false },
      { answerText: "Madrid", isCorrect: false },
      { answerText: "Paris", isCorrect: true },
      { answerText: "Lisbon", isCorrect: false },
    ],
  },
  {
    questionText: "Who is the CEO of Tesla?",
    options: [
      { answerText: "Jeff Bezos", isCorrect: false },
      { answerText: "Elon Musk", isCorrect: true },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  // Add more questions as needed
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <h1 className="font-qs text-4xl font-bold text-white mb-8">Quiz App</h1>
      <Quiz questions={questions} />
    </div>
  );
};

export default Home;
