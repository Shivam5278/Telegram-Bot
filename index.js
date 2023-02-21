
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
  console.log('User: ',msg.chat.id)
  console.log(message);
  try {
    // send the message to OpenAI's GPT-3 API
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. It can answer any question in the simplest way and can perform any task.

        Human: Hello, who are you?
        AI: I am an AI created by OpenAI. How can I help you today?
        Human: ` + message + '.',
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });

    // send the response back to the user
    console.log('Bot: ',response.data.choices[0].text);
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
  } catch (err) {
    //console.error(err);
    bot.sendMessage(msg.chat.id, 'An error occurred while processing your request.');
  }
});
