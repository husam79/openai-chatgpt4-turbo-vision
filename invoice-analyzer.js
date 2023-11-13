import OpenAI from "openai";
import fs from "fs/promises";
import { MAX_TOKENS } from "./constants.js";

const openai = new OpenAI();

export default async function analyzeInvoice(filePath) {
    const base64Image = await convertToBase64(filePath);
    if(!base64Image){
        console.error("The image file you specified is either not valid, or doesn't exist.");
        return;        
    }
    
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `In this receipt, list (numbered list) ONLY the product category's
                                        name of the purchased item and its price accourding
                                        to right-handed side price column, and don't include any further information.`},
              {
                type: "image_url",
                image_url: {
                  "url": `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: MAX_TOKENS
      });

      return response.choices[0];
}

async function convertToBase64(filename) {
    try {
      const data = await fs.readFile(filename, 'base64');
      return data;
    } catch (err) {
      console.error('Error reading file:', err);
      return null;
    }
}