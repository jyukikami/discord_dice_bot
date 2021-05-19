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
		let dice = new DiceRoll();
    const roll_result = dice.text_roll(text);
		if (roll_result == 0) {
			message.channel.send(`error コマンドが正しくありません in: ${text}`);
			return;
		}
    message.reply(`${roll_result} [${dice.result_rolls.join("+")}]  ||log:${text}||`);
    return;
  }
});
