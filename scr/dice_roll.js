class DiceRoll {
	constructor(){
		this.log_roll = [];
    this.result_message = ""
}

	get result_rolls(){
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

  text_roll(source) {
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
      result += calculation
			this.log_roll.push(calculation);
    }
    return result;
  }
}

module.exports = DiceRoll;
