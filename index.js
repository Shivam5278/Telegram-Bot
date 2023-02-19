
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
        prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:

        You: How many pounds are in a kilogram?
        Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
        You: What does HTML stand for?
        Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
        You: When did the first airplane fly?
        Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
        You: What is the meaning of life?
        Marv: I’m not sure. I’ll ask my friend Google.
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
