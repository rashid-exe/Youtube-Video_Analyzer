import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function AnalyzeForm() {
  const [url, setUrl] = useState("");
  const [resultId, setResultId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultId(null);
    try {
     const res = await axios.post(
  "https://youtube-videoanalyzer-production.up.railway.app/analyze",
  { url }
);

      setResultId(res.data.id);
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🎥 YouTube Video Analyzer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Paste a YouTube video URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-full py-2 px-4 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Analyze Video"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-center font-semibold">
            ⚠️ {error}
          </div>
        )}

        {resultId && (
  <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
    ✅ Analysis complete!
    <br />
    <a
      href={`/result/${resultId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
    >
      🔍 Check Result
    </a>
  </div>
)}

      </div>
    </div>
  );
}
