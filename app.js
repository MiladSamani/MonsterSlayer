const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },

  computed: {
    healthStyleMonster() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    healthStylePlayer() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayIUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },

  methods: {
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = randomNumber(12, 5);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randomNumber(12, 8);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = randomNumber(12, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = randomNumber(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        whoAction: who,
        whatAction: what,
        valueOfAction: value,
      });
    },
  },

  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
  },
});

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.mount("#game");
