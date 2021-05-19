// Discord bot implements
const DiceRoll = require("./dice_roll.js");
const discord = require("discord.js");
const client = new discord.Client();
client.login(process.env.DISCORD_BOT_TOKEN);

client.on("ready", (message) => {
  // console.log('bot is ready!');
});

client.on("message", (message) => {
  // 自分のメッセージは処理しない
  if (message.author == client.user) return;
  // メンションされたら
  if (message.mentions.has(client.user)) {
    message.reply("呼ぶんじゃねぇよ");
    return;
  }
  // ロールコマンド
  if (message.content.startsWith("/r ")) {
    const text = message.content.replace(/^\/r /, "");
    let words = text.split(/( |　)/);
    let roll_text = words[0];
    // 数値なら
    if (!isNaN(roll_text)) {
      roll_text = "1D" + roll_text;
    }
    let option = "";
    // オプションがあるなら
    if (words.length == 3) {
      option = words[2];
    }
    let dice = new DiceRoll();
    const roll_result = dice.text_roll(roll_text, option);
    if (roll_result == 0) {
      message.channel.send(`error コマンドが正しくありません in: ${text}`);
      return;
    }
    const rolls =
      dice.result_rolls.length > 1 ? `[${dice.result_rolls.join("+")}]` : "";
    message.reply(
      `${roll_result} ${dice.result_message}${rolls}  ||log:${text}||`
    );
    return;
  }
});
