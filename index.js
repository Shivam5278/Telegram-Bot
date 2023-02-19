
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const token = process.env.Tele_API;


const bot = new TelegramBot(token, { polling: true });

const configuration = new Configuration({
    apiKey: process.env.Open_API,
  });
const openaiClient = new OpenAIApi(configuration);
// register a message listener
bot.on('message', async (msg) => {
  // get the user's message
  const message = msg.text;
  try {
    // send the message to OpenAI's GPT-3 API
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `ST is a chatbot that reluctantly answers questions with smart funny responses in hindi:

        You: How many pounds are in a kilogram?
        ST: Itna bhi nahi pata? Ek kilogram mein 2.2 pound hota hai. Likh ke rakh le.
        You: HTML ka full form?
        ST: Google kar le Hypertext Markup Language hota hai uska full form. T matlab tatti.
        You: When did the first airplane fly?
        ST: On December 17, 1903, Wilbur and Orville Wright pehli baar udaye the. Kaash mai bhi ud gaya hota.
        You: What is the meaning of life?
        ST: life ka matlab lavda lassan.
        You: ` + message,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });

    // send the response back to the user
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
  } catch (err) {
    //console.error(err);
    bot.sendMessage(msg.chat.id, 'An error occurred while processing your request.');
  }
});
