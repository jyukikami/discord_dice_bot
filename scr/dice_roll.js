class DiceRoll {
  constructor() {
    this.log_roll = [];
    this.result_message = "";
  }

  get result_rolls() {
    return this.log_roll;
  }

  /**
   *ダイスロールのパターン
   *
   * @readonly
   * @memberof DiceRoll
   */
  get dice_roll_args() {
    return ["(\\d+)[dD](\\d+)", "g"];
  }

  /**
   *ダイスロール形式でロールを行う
   *
   * @param {str} source ダイスロールテキスト
   * @param {str} [option=""] オプション
   * @return {int}
   * @memberof DiceRoll
   */
  text_roll(source, option = "") {
    this.log_roll = [];
    const min = 1;
    let max = 1;
    let rolls = 1;
    let result = 0;
    try {
      const DiceRollPattern = new RegExp(
        this.dice_roll_args[0],
        this.dice_roll_args[1]
      );
      const match = DiceRollPattern.exec(source);
      max = match[2];
      rolls = match[1];
      if (max == 0) max = 100;
    } catch (e) {
      console.log(e);
      return 0;
    }
    for (let i = 0; i < rolls; i++) {
      const calculation = Math.floor(Math.random() * max) + min;
      result += calculation;
      this.log_roll.push(calculation);
    }
    this.result_option(result, option, max);
    return result;
  }

  /**
   *オプションで成功失敗を設定
   *
   * @param {int} result ロールの結果
   * @param {str} option オプション
   * @param {int} max ロールの最大値
   * @memberof DiceRoll
   */
  result_option(result, option, max) {
    if (!option) return;
    // 数値なら、以下で成功
    if (!isNaN(option)) {
      if (result <= option) {
        this.result_message = "成功";
        if (result <= max * 0.05) {
          this.result_message = "クリティカル";
        }
      } else {
        this.result_message = "失敗";
        if (result > max * 0.95) {
          this.result_message = "ファンブル";
        }
      }
      return;
    }
    // (数値=)の形式なら、同じなら失敗
    if (/^(\d*)=$/.test(option)) {
      option = option.replace(/=$/, "");
      if (result == option) {
        this.result_message = "失敗";
      } else {
        this.result_message = "成功";
      }
    }
  }
}

module.exports = DiceRoll;
