const axios = require("axios");

// Configuration
const BACKEND_URL = "https://quests-usage-dev.prod.zettablock.com/api/report_usage";
const WALLET_ADDRESS = "0x3F674024b7A0e0D8Aeb9b0683a8d826Ff9445f1B";
const NUM_REQUESTS = 3; 


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

// Helper function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendRequest = async (payload) => {
  try {
    const response = await axios.post(BACKEND_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Request sent successfully: ${response.status} - ${response.data}`);
  } catch (error) {
    console.error(`Error sending request: ${error.message}`);
    throw error;
  }
};


const sendPayloads = async () => {
  console.log(`Starting to send ${NUM_REQUESTS} requests...`);

  for (let i = 0; i < NUM_REQUESTS; i++) {
    const randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
    const payload = {
      wallet_address: WALLET_ADDRESS,
      agent_id: "deployment_Hp4Y88pxNQXwLMPxlLICJZzN",
      request_text: questionsAndAnswers[randomIndex].q,
      response_text: questionsAndAnswers[randomIndex].a,
      request_metadata: {},
    };

    console.log(`Sending request ${i + 1}/${NUM_REQUESTS}...`);
    try {
      await sendRequest(payload);
      if (i < NUM_REQUESTS - 1) {
        console.log("Waiting 30 seconds before next request...");
        await delay(30000); 
      }
    } catch (error) {
      console.error("Stopping due to error.");
      return;
    }
  }

  console.log("All requests sent successfully!");
};

sendPayloads();