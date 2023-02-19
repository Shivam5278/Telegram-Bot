
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");
const token = '6168989019:AAEO-YgqIf8UFvrm6Za9Ktfr6_4ujq1Bevk';


const bot = new TelegramBot(token, { polling: true });

const configuration = new Configuration({
    apiKey: "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",
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
        prompt: message,
        temperature: 0.1,
        max_tokens: 500,
      });

    // send the response back to the user
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
  } catch (err) {
    //console.error(err);
    bot.sendMessage(msg.chat.id, 'An error occurred while processing your request.');
  }
});