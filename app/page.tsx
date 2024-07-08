// /app/page.tsx
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-4">
        <Link href="/cognitive">
          <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cognitive
          </div>
        </Link>
        <Link href="/quantitative">
          <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Quantitative
          </div>
        </Link>
        <Link href="/literature_a">
          <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Literature 🇮🇩
          </div>
        </Link>
        <Link href="/literature_b">
          <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Literature 🇺🇸
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
