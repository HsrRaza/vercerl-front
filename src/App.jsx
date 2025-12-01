import { useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // clearing previous results
      setAiResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setAiResult(null);

    try {
      const res = await axios.post("https://vercerl-backend.vercel.app/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAiResult(res.data); // EVERYTHING received here
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">ATS Resume Analyzer</h1>

      <label className="px-6 py-3 bg-black text-white rounded-lg cursor-pointer">
        Upload Resume (PDF)
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>

      {loading && (
        <p className="mt-4 text-lg font-semibold">Processing resume…</p>
      )}

      {aiResult && (
        <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ATS Report</h2>

            <div className="mt-4">

            <p className="font-semibold">
             {aiResult.aiResponse?.intro}
            </p >
          </div>





          <p className="font-bold text-2xl mt-4">
           ATS Score: {aiResult.aiResponse?.atsScore}/100
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Strengths</h3>
            <ul className="list-disc ml-5">
              {aiResult.aiResponse?.strengths?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Missing Keywords</h3>
            <ul className="list-disc ml-5">
              {aiResult.aiResponse?.missingKeywords?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Issues</h3>
            <ul className="list-disc ml-5">
              {aiResult.aiResponse?.issues?.map((i2, i) => (
                <li key={i}>{i2}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Recommendations</h3>
            <ul className="list-disc ml-5">
              {aiResult.aiResponse?.recommendations?.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 font-bold">
            ATS Pass:{" "}
            <span
              className={
                aiResult.aiResponse?.passes ? "text-green-600" : "text-red-600"
              }
            >
              {aiResult.aiResponse?.passes ? "YES" : "NO"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
