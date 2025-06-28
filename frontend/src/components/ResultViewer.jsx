import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResultViewer() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/analyze/${id}`)
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load result.");
        setLoading(false);
      });
  }, [id]);

  function handleDownloadTranscript() {
    const blob = new Blob([JSON.stringify(result.transcript, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDownloadFile(filePath, fileName) {
    const link = document.createElement("a");
    link.href = `http://localhost:8080/${filePath}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading)
    return (
      <div className="flex justify-center mt-20 text-lg text-gray-600">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center mt-20 text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          🎯 Analysis Result
        </h1>

        {/* 🔽 DOWNLOAD BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={handleDownloadTranscript}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            📄 Download Transcript (.json)
          </button>
          <button
            onClick={() =>
              handleDownloadFile(result.screenshotPath, `screenshot-${id}.png`)
            }
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
          >
            📸 Download Screenshot (.png)
          </button>
          <button
            onClick={() =>
              handleDownloadFile(`uploads/${id}.wav`, `audio-${id}.wav`)
            }
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
          >
            🔊 Download Audio (.wav)
          </button>
        </div>

        {/* 🔽 Screenshot Preview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Screenshot</h2>
          <img
            src={`http://localhost:8080/${result.screenshotPath}`}
            alt="Screenshot"
            className="w-full rounded-lg shadow-md border"
          />
        </div>

        {/* 🔽 Transcript Display */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Transcript with AI Detection
          </h2>
          <ul className="space-y-4">
            {result.transcript.map((line, index) => (
              <li
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-purple-600">
                    🗣 {line.speaker}
                  </span>
                  <span className="text-xs text-gray-500">
                    {line.start?.toFixed(1)}s - {line.end?.toFixed(1)}s
                  </span>
                </div>
                <p className="text-gray-800">{line.text}</p>
                <div className="mt-2 text-xs text-gray-600">
                  AI Probability:{" "}
                  <span className="font-semibold text-blue-600">
                    {line.ai_probability}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                    style={{
                      width: `${parseFloat(line.ai_probability) * 100}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
