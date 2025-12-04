import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash"; // hoặc "gemini-2.5-flash" nếu tài khoản hỗ trợ

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is missing" },
      { status: 500 },
    );
  }

  const { topic } = (await req.json()) as { topic?: string };
  const finalTopic =
    topic ||
    "blog về tool automation, proxy, account farm và bảo mật tài khoản";

  const prompt = `
Bạn là copywriter cho website bán tool ForgeVault.
Hãy tạo ra một đối tượng JSON duy nhất với cấu trúc:

{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "tags": ["tag1","tag2",...],
  "coverImageUrl": "https://..."
}

YÊU CẦU:
- Viết bằng tiếng Việt, giọng điệu chuyên nghiệp nhưng dễ hiểu.
- "content" là nội dung dài, có thể dùng markdown (## heading, bullet, numbered list).
- "excerpt" khoảng 1–3 câu tóm tắt.
- "tags" là các từ khoá tiếng Anh không dấu, dạng slug.
- "coverImageUrl": URL ảnh minh hoạ (có thể dùng ảnh stock bất kỳ).
KHÔNG giải thích thêm, chỉ trả về JSON thuần.

Chủ đề: ${finalTopic}
`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent(prompt);
    const text = result.response.text(); // SDK xử lý join parts

    let parsed: any = {};
    try {
      const jsonText = text.trim().replace(/^```json/i, "").replace(/```$/, "");
      parsed = JSON.parse(jsonText);
    } catch (e) {
      console.warn("Cannot parse JSON from Gemini, returning fallback", e);
      parsed = {
        title: "Bài viết từ AI",
        excerpt: text.slice(0, 200),
        content: text,
        tags: ["ai-draft"],
      };
    }

    return NextResponse.json({
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      tags: parsed.tags,
      coverImageUrl: parsed.coverImageUrl,
    });
  } catch (err) {
    console.error("Gemini API error", err);
    return NextResponse.json(
      { error: "Internal error calling Gemini" },
      { status: 500 },
    );
  }
}
