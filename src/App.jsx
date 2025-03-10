import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [numRequests, setNumRequests] = useState("");
  const [status, setStatus] = useState(null); // "success" or "error"
  const [isSending, setIsSending] = useState(false);
  const url = `http://localhost:5000/api/report_usage`;

     const questionsAndAnswers = [
    { q: "What is Kite AI?", a: "Kite AI is an EVM-compatible Layer 1 blockchain designed specifically for AI applications." },
    { q: "How does Kite AI ensure transparency?", a: "It uses Proof of AI (PoAI) to fairly attribute contributions." },
    { q: "What tools does Kite AI provide?", a: "Kite AI offers developer tools, data pools, and an AI marketplace." },
    { q: "Is Kite AI compatible with Ethereum?", a: "Yes, it is EVM-compatible, allowing easy integration with Ethereum-based projects." },
    { q: "What industries can benefit from Kite AI?", a: "Industries like finance, healthcare, and research can utilize Kite AI." },
    { q: "Does Kite AI support smart contracts?", a: "Yes, Kite AI supports AI-enhanced smart contracts." },
    { q: "How does Kite AI handle data ownership?", a: "It promotes ownership and control of AI models and data." },
    { q: "What is the consensus mechanism of Kite AI?", a: "Kite AI uses Proof of AI (PoAI) for validation." },
    { q: "Can developers build DApps on Kite AI?", a: "Yes, developers can build AI-powered decentralized applications (DApps)." },
    { q: "Does Kite AI have an AI marketplace?", a: "Yes, it includes a marketplace for AI applications." },
    { q: "What kind of applications can be built on Kite AI?", a: "AI-driven applications across multiple industries." },
    { q: "How does Kite AI enhance AI collaboration?", a: "It provides data pools and a collaborative AI ecosystem." },
    { q: "What makes Kite AI unique?", a: "Its PoAI consensus ensures fair AI attribution." },
    { q: "Can AI researchers use Kite AI?", a: "Yes, it provides resources for AI research and development." },
    { q: "Is Kite AI scalable?", a: "Yes, it is designed for scalability and efficiency." },
    { q: "Does Kite AI support decentralized AI governance?", a: "Yes, governance is decentralized within the ecosystem." },
    { q: "What role does blockchain play in Kite AI?", a: "Blockchain ensures security, transparency, and immutability." },
    { q: "Can businesses integrate Kite AI?", a: "Yes, businesses can leverage Kite AI for AI-driven solutions." },
    { q: "Is Kite AI open-source?", a: "Yes, Kite AI is open-source, allowing developers to contribute." },
    { q: "Does Kite AI use machine learning?", a: "Yes, it enables AI and machine learning integrations." }
    ];   

  const handleSend = async () => {
    // Validate inputs
    if (!walletAddress) {
      alert("Please enter a wallet address.");
      return;
    }
    const requestsCount = parseInt(numRequests);
    if (!requestsCount || isNaN(requestsCount) || requestsCount <= 0) {
      alert("Please enter a valid number of requests.");
      return;
    }

    setIsSending(true);
    setStatus("sending");

    for (let i = 0; i < requestsCount; i++) {
      try {
        const randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
        const payload = {
          wallet_address: walletAddress,
          agent_id: "deployment_Hp4Y88pxNQXwLMPxlLICJZzN",
          request_text: questionsAndAnswers[randomIndex].q,
          response_text: questionsAndAnswers[randomIndex].a,
          request_metadata: {}
        };

        const response = await fetch(url, {  // Use apiUrl here
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error("Error sending request:", error);
        setStatus("error");
        setIsSending(false);
        return;
      }
      
      // If there are more requests to send, wait 30 seconds before the next one.
      if (i < requestsCount - 1) {
        await new Promise((resolve) => setTimeout(resolve, 30000));
      }
    }

    setStatus("success");
    setIsSending(false);
  };

  return (
    <div className="form-container">
      <h1>Kite AI</h1>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Number of Requests"
        value={numRequests}
        onChange={(e) => setNumRequests(e.target.value)}
      />
      <button onClick={handleSend} disabled={isSending}>
        Send Payload{parseInt(numRequests) > 1 ? "s" : ""}
      </button>

      {isSending && (
        <div className="status-popup sending">
          Sending, please wait...
        </div>
      )}

      {status === "success" && !isSending && (
        <div className="status-popup success">
          Payload sent successfully!
        </div>
      )}

      {status === "error" && !isSending && (
        <div className="status-popup error">
          Failed to send payload.
        </div>
      )}
    </div>
  );
};

export default App;
