// /app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const QuizApp: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  const categories = [
    "cognitive",
    "quantitative",
    "literature_a",
    "literature_b",
  ];

  useEffect(() => {
    if (category) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(`/categories/${category}.json`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch questions for category: ${category}`
            );
          }
          const data: Question[] = await response.json();
          setQuestions(data);
          setSelectedOptions(new Array(data.length).fill(null));
          setResults(new Array(data.length).fill(false));
        } catch (error) {
          console.error(error);
          // Redirect to error page or handle error state
        }
      };
      fetchQuestions();
    }
  }, [category]);

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

  const handleBackToMainPage = () => {
    setCategory(null);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setScore(0);
    setResults([]);
    setSelectedOptions([]);
  };

  if (!category) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div>Loading...</div>;
  }

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
        <button
          onClick={handleBackToMainPage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Main Page
        </button>
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

export default QuizApp;
