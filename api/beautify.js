import { formatText } from "lua-fmt";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { script } = req.body;

    if (!script) return res.status(400).json({ error: "No script provided" });

    const beautified = formatText(script, {
      indentCount: 2,
      lineWidth: 80,
      useTabs: false
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(beautified);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Beautify failed" });
  }
}
