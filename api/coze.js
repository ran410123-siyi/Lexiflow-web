export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "No input provided" });
  }

  try {
    const response = await fetch("https://api.coze.com/open_api/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.COZE_API_KEY}`
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_BOT_ID,
        user: "web-user",
        query: input,
        stream: false
      })
    });

    const data = await response.json();

    const result =
      data.messages &&
      data.messages.find(msg => msg.type === "answer")?.content;

    res.status(200).json({ result: result || "No response from Coze." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
