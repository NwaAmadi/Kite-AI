const axios = require("axios");
const readline = require("readline");

// Config
const BACKEND_URL = "https://quests-usage-dev.prod.zettablock.com/api/report_usage";

const AVAILABLE_WALLETS = [
  "0x3F674024b7A0e0D8Aeb9b0683a8d826Ff9445f1B", //Gospel
  "NILL-0x7890qrst1234uvwx5678yzab9012cdef",
  "NILL-0x3456ghij7890klmn1234opqr5678stuv",
  "0x299223E617D0ea30c0084C526244A25B2d8dFcC6", //Pirok
  "0x37Cc3D9943E27A74fB7480f34e66098b8f3E4607",//Freedom
];

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


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const promptUser = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};


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

const getWalletAddress = async () => {
  console.log("Available wallet addresses:");
  AVAILABLE_WALLETS.forEach((addr, index) => {
    console.log(`${index + 1}. ${addr}`);
  });
  console.log(`${AVAILABLE_WALLETS.length + 1}. Enter a new address`);

  let choice = await promptUser("Select a wallet address by number (1-" + (AVAILABLE_WALLETS.length + 1) + "): ");
  choice = parseInt(choice);

  if (isNaN(choice) || choice < 1 || choice > AVAILABLE_WALLETS.length + 1) {
    console.log("Invalid choice. Please try again.");
    return getWalletAddress(); 
  }

  if (choice === AVAILABLE_WALLETS.length + 1) {
    const newAddress = await promptUser("Enter your wallet address: ");
    if (!newAddress.trim()) {
      console.log("Wallet address cannot be empty. Please try again.");
      return getWalletAddress(); 
    }
    return newAddress;
  }

  return AVAILABLE_WALLETS[choice - 1];
};

const Payload = async () => {
  let walletAddress = "";
  let numRequests = 0;

  if (!walletAddress) {
    walletAddress = await getWalletAddress();
  }

  while (isNaN(numRequests) || numRequests <= 0) {
    const input = await promptUser("Enter the number of requests: ");
    numRequests = parseInt(input);
    if (isNaN(numRequests) || numRequests <= 0) {
      console.log("Please enter a valid number greater than 0.");
    }
  }

  console.log(`Starting to send ${numRequests} payloads for wallet ${walletAddress}...`);

  for (let i = 0; i < numRequests; i++) {
    const randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
    const payload = {
      wallet_address: walletAddress,
      agent_id: "deployment_Hp4Y88pxNQXwLMPxlLICJZzN",
      request_text: questionsAndAnswers[randomIndex].q,
      response_text: questionsAndAnswers[randomIndex].a,
      request_metadata: {},
    };

    console.log(`Sending request ${i + 1}/${numRequests}...`);
    try {
      await sendRequest(payload);
      if (i < numRequests - 1) {
        console.log("Waiting 20 seconds before next request...");
        await delay(20000); // 20-second delay between requests
      }
    } catch (error) {
      console.error("Stopping due to error.");
      rl.close();
      return;
    }
  }

  console.log("Payloads sent successfully!");
  rl.close();
};

Payload();