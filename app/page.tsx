// /app/page.tsx
"use client";
import { useRouter } from "next/navigation";

const MainPage: React.FC = () => {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/quiz/${category}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Select a Quiz Category</h1>
      <button
        onClick={() => handleCategorySelect("cognitive")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cognitive
      </button>
      <button
        onClick={() => handleCategorySelect("literature_a")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Literature A
      </button>
      <button
        onClick={() => handleCategorySelect("literature_b")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Literature B
      </button>
      <button
        onClick={() => handleCategorySelect("quantitative")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Quantitative
      </button>
    </div>
  );
};

export default MainPage;
