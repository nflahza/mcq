"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import questionsData from "../../questions.json";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

type QuestionsData = {
  [key: string]: Question[];
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const { category } = useParams();

  const questionsDataTyped = questionsData as QuestionsData;
  const questions = questionsDataTyped[category as string] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = localStorage.getItem(
        `quizCurrentQuestionIndex-${category}`
      );
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    }
  );
  const [selectedOptions, setSelectedOptions] = useState<number[]>(() => {
    const savedOptions = localStorage.getItem(
      `quizSelectedOptions-${category}`
    );
    return savedOptions
      ? JSON.parse(savedOptions)
      : new Array(questions.length).fill(null);
  });
  const [isFinished, setIsFinished] = useState<boolean>(() => {
    const savedIsFinished = localStorage.getItem(`quizIsFinished-${category}`);
    return savedIsFinished ? JSON.parse(savedIsFinished) : false;
  });
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem(`quizScore-${category}`);
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [results, setResults] = useState<boolean[]>(() => {
    const savedResults = localStorage.getItem(`quizResults-${category}`);
    return savedResults
      ? JSON.parse(savedResults)
      : new Array(questions.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem(
      `quizSelectedOptions-${category}`,
      JSON.stringify(selectedOptions)
    );
  }, [selectedOptions, category]);

  useEffect(() => {
    localStorage.setItem(
      `quizCurrentQuestionIndex-${category}`,
      currentQuestionIndex.toString()
    );
  }, [currentQuestionIndex, category]);

  useEffect(() => {
    localStorage.setItem(
      `quizIsFinished-${category}`,
      JSON.stringify(isFinished)
    );
    if (isFinished) {
      localStorage.setItem(`quizScore-${category}`, score.toString());
      localStorage.setItem(`quizResults-${category}`, JSON.stringify(results));
    }
  }, [isFinished, score, results, category]);

  const handleOptionClick = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = index;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setIsFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const calculateScore = () => {
    let correctCount = 0;
    const newResults = selectedOptions.map((selectedOption, index) => {
      const isCorrect = selectedOption === questions[index].answer;
      if (isCorrect) correctCount++;
      return isCorrect;
    });
    setResults(newResults);
    setScore(correctCount);
  };

  const handleFinishQuiz = () => {
    calculateScore();
    setIsFinished(true);
  };

  const handleBackToMainMenu = () => {
    router.push("/"); // Change to '/' or '/app' depending on your application structure
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions(new Array(questions.length).fill(null));
    setIsFinished(false);
    setScore(0);
    setResults(new Array(questions.length).fill(false));
    localStorage.removeItem(`quizSelectedOptions-${category}`);
    localStorage.removeItem(`quizCurrentQuestionIndex-${category}`);
    localStorage.removeItem(`quizIsFinished-${category}`);
    localStorage.removeItem(`quizScore-${category}`);
    localStorage.removeItem(`quizResults-${category}`);
  };

  if (isFinished) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold">Quiz Finished!</h2>
        <p className="mt-4">
          Your score: {score} / {questions.length}
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Results:</h3>
          {results.map((result, index) => (
            <p
              key={index}
              className={`mt-2 ${result ? "text-green-500" : "text-red-500"}`}
            >
              Question {index + 1}: {result ? "Correct" : "Incorrect"}
            </p>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handleBackToMainMenu}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Main Menu
          </button>
          <button
            onClick={handleRestartQuiz}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {questions[currentQuestionIndex].question}
      </h2>

      {/* Question Selector */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionChange(index)}
            className={`px-4 py-2 text-center border rounded 
                        ${
                          index === currentQuestionIndex
                            ? "bg-blue-500 text-white"
                            : selectedOptions[index] !== null
                            ? "bg-gray-500 text-white"
                            : "bg-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
                        }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`block w-full p-2 border rounded 
                        ${
                          selectedOptions[currentQuestionIndex] === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
                        }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 space-x-4">
        <button
          onClick={handlePreviousQuestion}
          className={`px-4 py-2 bg-green-500 text-white rounded ${
            currentQuestionIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600"
          }`}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleFinishQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
