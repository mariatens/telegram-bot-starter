import { Context, Telegraf } from 'telegraf'
import getBotTokenOrQuit from './util/getBotToken';
import axios from 'axios'
import { createGzip } from 'zlib';

//commands for the bot
// worldcuppoll - vote on who will win the world cup
// fortune- get a wise quote

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"))
bot.help((ctx) => ctx.reply('Hmm i am not programmed to be helpful, yet!'))
bot.hears('hello', (ctx) => ctx.reply('Ok, I heard you say hello'))
bot.command('sing', (ctx) => ctx.reply('La la la!  I got your command.'))



// new commands
bot.command("time", (ctx) => ctx.reply(new Date().toISOString().substring(0,10)))


bot.command("fortune", async (ctx) => {const res = await axios.get("http://yerkee.com/api/fortune"); ctx.reply(res.data.fortune)})

//    type: 'regular',
// allows_multiple_answers: true,
// open_period: 3600
// }

bot.command('worldcuppoll', (ctx)=>ctx.replyWithPoll("who will win the world cup", ["argentina", "france"], {
    "is_anonymous": true
}))

// bot.command(`dog ${breed}`, async (ctx)=> {

//     const res = await axios.get(`https://dog.ceo/dog-api/breed/${breed}/images/random`)
//     ctx.replyWithPhoto({url: {res}})


// }   


// ctx.replyWithPhoto({ url: randomPhotoURL })
// );

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
