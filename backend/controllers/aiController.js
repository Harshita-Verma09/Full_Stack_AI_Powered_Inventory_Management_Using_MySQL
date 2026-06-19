const db = require('../config/db');
const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const runInventoryAgent = async (req, res) => {
    try {
        // 1. DB se check karo kaun se items low stock hain
        const [lowStockItems] = await db.query('SELECT * FROM products WHERE quantity <= min_stock_level');

        if (lowStockItems.length === 0) {
            return res.json({ message: "AI Agent Report: All items are well stocked. No automation needed!" });
        }

        // 2. AI ke liye prompt taiyar kiya
        const prompt = `
        You are an intelligent Inventory Manager AI Agent. 
        Below is the list of items that are low in stock. 
        For each item, generate a professional reorder draft email to be sent to the supplier.
        
        Low Stock Data: ${JSON.stringify(lowStockItems)}
        
        Provide the response strictly in JSON format like this:
        {
          "summary": "Brief summary of what needs ordering",
          "orders": [
             {
               "product_name": "item name",
               "supplier_email": "email",
               "suggested_quantity_to_order": 50,
               "email_draft": "Full professional email draft text here"
             }
          ]
        }`;

        // 3. FIX: Gemini 2.5 Flash use kar rahe hain jo v1beta/v1 dono par stable hai
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json' // Clean JSON output ke liye, responseMimeType → response ka format.
            }
        });

        const aiAnalysis = JSON.parse(response.text);
        res.json({
            message: "AI Automation Agent completed analysis successfully!",
            data: aiAnalysis
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI Agent failed: " + error.message });
    }
};

module.exports = { runInventoryAgent };