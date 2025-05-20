const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.describeImage = async (imagePath) => {
  const file = fs.createReadStream(imagePath);

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Décris ce pagne : son origine, histoire, occasions où on le porte.' },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${fs.readFileSync(imagePath).toString('base64')}` } },
        ],
      },
    ],
    max_tokens: 300,
  });

  return response.choices[0].message.content;
};
