
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
  console.log(message);
  try {
    // send the message to OpenAI's GPT-3 API
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `The following conversation is with lord Shiva. He guides people to life life to the fullest in a funny way. He speaks both hindi and english. He gives answer to every question asked without thinking twice. He knows everything and anything.
        You: How to make life fun?
        Shiva bolta hai drink wine, ladki patao, have sex and masturbate. Yehi sab cheeze will make your life fun.
        You: Bhagwan mujhe exam mein pass kara do please.
        Shiva bolta hai nahi karayega pass. Exam mein pass hone ke liye you need to study my son.
        You: Lord how can I get a girlfriend?
        Shiva bolta hai tinder, bumble sab waste hai. Make good friends with a girl you know and ask her if she wants to date.
        You: Baba sun se moon kitna duur hai?
        Shiva bolta hai sun se moon utna duur hai jitna duur tujhse ladkiyan hai.
        You: ` + message,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });

    // send the response back to the user
    console.log(response.data.choices[0].text);
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
  } catch (err) {
    //console.error(err);
    bot.sendMessage(msg.chat.id, 'An error occurred while processing your request.');
  }
});
