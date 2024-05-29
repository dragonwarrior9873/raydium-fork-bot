const axios = require("axios")
var vApiTokenTelegram = "6777923138:AAEY0Ft7WS3G9kLlk80IplZJcOdJ6z-b2wM"; // @?????Bot API token
var vUrlTelegram = "https://api.telegram.org/bot" + vApiTokenTelegram;


exports.getPixelDrifterChatId = (chatInfos) => {
    for (let index = 0; index < chatInfos.length; index++) {
        const element = chatInfos[index];
        if ( element.userName == "dragonwarrior9873")  //replace username here 
            return element.chatId
    }
    return null
}