
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
    const response = await openaiClient.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": `${message} ?`}
    ]
)

    // send the response back to the user
    console.log('Bot: ',response.choices[0].message.content);
    bot.sendMessage(msg.chat.id, response.choices[0].message.content);
  } catch (err) {
    //console.error(err);
    bot.sendMessage(msg.chat.id, 'An error occurred while processing your request.');
  }
});
