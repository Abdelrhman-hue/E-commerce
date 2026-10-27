/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GROQ_API_KEY =
  process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

async function fetchCatalogContext(): Promise<string> {
  try {
    const res = await fetch("http://localhost:5000/products?limit=25", {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        return data.products
          .map(
            (p: any) =>
              `- ID: ${p.id || p._id}, Title: "${p.title}", Category: ${p.category}, Price: $${p.price}, Rating: ${p.rating || 4.5}/5, Brand: ${p.brand || "Standard"}`
          )
          .join("\n");
      }
    }
  } catch {
    // If backend is offline or slow, fallback to default store sample items
  }

  return `
- ID: 1, Title: "Essence Mascara Lash Princess", Category: "beauty", Price: $9.99, Rating: 4.8/5, Brand: "Essence"
- ID: 2, Title: "Eyeshadow Palette with Mirror", Category: "beauty", Price: $19.99, Rating: 4.6/5, Brand: "Glamour"
- ID: 3, Title: "Powder Canister Matte Finish", Category: "beauty", Price: $14.99, Rating: 4.4/5, Brand: "Velvet"
- ID: 4, Title: "Red Lipstick Long-Lasting", Category: "beauty", Price: $12.99, Rating: 4.7/5, Brand: "Chic"
- ID: 5, Title: "Red Nail Polish Gloss", Category: "beauty", Price: $8.99, Rating: 4.3/5, Brand: "NailPro"
- ID: 6, Title: "Calvin Klein CK One Fragrance", Category: "fragrances", Price: $49.99, Rating: 4.9/5, Brand: "Calvin Klein"
- ID: 7, Title: "Chanel Coco Mademoiselle", Category: "fragrances", Price: $129.99, Rating: 5.0/5, Brand: "Chanel"
- ID: 8, Title: "Dior Sauvage Eau de Parfum", Category: "fragrances", Price: $115.00, Rating: 4.9/5, Brand: "Dior"
- ID: 9, Title: "Gucci Bloom Floral Scent", Category: "fragrances", Price: $98.50, Rating: 4.7/5, Brand: "Gucci"
- ID: 10, Title: "Modern Ergonomic Office Chair", Category: "furniture", Price: $189.99, Rating: 4.8/5, Brand: "ComfortPlus"
- ID: 11, Title: "Solid Oak Wooden Coffee Table", Category: "furniture", Price: $149.00, Rating: 4.6/5, Brand: "WoodCraft"
- ID: 12, Title: "Scandinavian 3-Seater Sofa", Category: "furniture", Price: $499.00, Rating: 4.9/5, Brand: "NordicHome"
- ID: 13, Title: "Organic Green Tea Leaves", Category: "groceries", Price: $12.50, Rating: 4.8/5, Brand: "NatureLeaf"
- ID: 14, Title: "Premium Cold-Pressed Olive Oil", Category: "groceries", Price: $22.00, Rating: 4.9/5, Brand: "Mediterraneo"
`;
}

export async function POST(req: Request) {
  try {
    const {
      messages = [],
      type = "chat",
      selectedProducts = [],
    } = await req.json();

    const catalogSummary = await fetchCatalogContext();

    let comparisonPrompt = "";
    if (selectedProducts && selectedProducts.length > 0) {
      comparisonPrompt = `\n\nUSER HAS SELECTED THESE PRODUCTS TO ANALYZE/COMPARE:\n${JSON.stringify(
        selectedProducts,
        null,
        2
      )}`;
    }

    const systemPrompt = `You are "ShopBog AI" — the official, intelligent shopping assistant and product comparison specialist for the ShopBog e-commerce platform.

CORE CAPABILITIES:
1. Product Comparison:
   - When asked to compare two or more products, deliver an in-depth, structured side-by-side analysis.
   - Cover: Key features, quality, pricing, value for money, target user, pros & cons, and final verdict.
2. Recommendations:
   - Suggest relevant items from the catalog matching user's budget, taste, or gifting needs.
3. Bilingual Mastery (Arabic & English):
   - If the user writes in Arabic, respond in fluent, elegant, and helpful Arabic (اللغة العربية).
   - If the user writes in English, respond in fluent, engaging, and professional English.
   - If the user requests comparison in both languages or asks for bilingual output, provide a clear structured bilingual breakdown.
   - You can seamlessly understand and translate between Arabic and English.

OUTPUT STRUCTURE FOR COMPARISONS:
🌟 **Quick Verdict / الخلاصة السريعة**
📊 **Detailed Comparison / مقارنة المواصفات والأسعار**
⚖️ **Pros & Cons / المميزات والعيوب لكل منتج**
🏆 **Recommendation / التوصية النهائية ولماذا**

CATALOG SUMMARY:
${catalogSummary}
${comparisonPrompt}
`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-8),
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: apiMessages,
          temperature: 0.6,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      // Fallback model
      const fallbackResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "allam-2-7b",
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 1024,
          }),
        }
      );

      if (!fallbackResponse.ok) {
        return NextResponse.json(
          {
            error: "Failed to communicate with AI provider.",
          },
          { status: 500 }
        );
      }

      const fallbackData = await fallbackResponse.json();
      return NextResponse.json({
        content:
          fallbackData.choices?.[0]?.message?.content ||
          "No response generated.",
      });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({
      content: reply,
    });
  } catch (error: any) {
    console.error("AI Assistant route exception:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
