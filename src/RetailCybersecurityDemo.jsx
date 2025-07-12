import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function RetailCybersecurityDemo() {
  const [loginStatus, setLoginStatus] = React.useState(null);
  const [suspiciousActivity, setSuspiciousActivity] = React.useState(false);

  const handleLogin = async () => {
    setLoginStatus("Authenticating with AI model...");

    const userData = {
      email: "test@retail.com",
      ip: "192.168.1.104",
      location: "Unknown Region",
      time: new Date().toISOString(),
    };

    const response = await mockFraudDetectionAPI(userData);

    if (response.isThreat) {
      setSuspiciousActivity(true);
      setLoginStatus("⚠️ Suspicious login detected by AI! Access denied.");
    } else {
      setSuspiciousActivity(false);
      setLoginStatus("✅ Login successful. AI confirms it's safe.");
    }
  };

  const mockFraudDetectionAPI = async (userData) => {
    console.log("Checking with ML model...", userData);
    await new Promise((res) => setTimeout(res, 1000));
    const threatScore = Math.random();
    return {
      isThreat: threatScore > 0.7,
      score: threatScore,
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-center mb-2">Retail Security Login</h2>
          <input
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Email address"
            type="email"
          />
          <input
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Password"
            type="password"
          />
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          >
            Secure Login
          </button>

          {loginStatus && (
            <div
              className={`mt-4 p-4 rounded-xl text-white font-semibold flex items-center gap-2 ${
                suspiciousActivity ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {suspiciousActivity ? <AlertTriangle /> : <ShieldCheck />}
              {loginStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
