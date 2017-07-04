/**
 * Created by fruiz on 7/3/17.
 */
var vm = new Vue({
    el: '#app',
    data: {
        monsterHealth: 100,
        myHealth: 100,
        attackMin: 3,
        attackMax: 10,
        spAttackMin: 10,
        spAttackMax: 20,
        spAttackCost: 33.333,
        currentMana: 100,
        healMin: 10,
        healMax: 16,
        healCost: 25,
        monsterAttackMin: 5,
        monsterAttackMax: 12,
        inGame: false
    },
    methods: {
        startGemu: function () {
            this.inGame = !this.inGame;
            this.monsterHealth = 100;
            this.currentMana = 100;
            this.myHealth = 100
        },
        calculateRNG: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        myAttack: function (min, max) {
            return this.monsterHealth -= this.calculateRNG(min, max);
        },
        myHeal: function (min, max) {
            return this.myHealth += this.calculateRNG(min, max);
        },
        myMana: function (val) {
            return this.currentMana += val
        },
        monsterAttack: function (min, max) {
            return this.myHealth -= this.calculateRNG(min, max);
        },
        lessThanZero: function (char) {
            return char <= 0
        },
        fullBarsCheck: function (char) {
            return char >=90
        },
        anyDeadCheck: function() {

            if (this.lessThanZero(this.monsterHealth)) {
                alert('"I YIELD", the monster says.');
                this.inGame = false;
            } else if (this.lessThanZero(this.myHealth)) {
                alert("You're fucking dead");
                this.inGame = false
            }
        },
        manaCheck: function () {
            if (this.lessThanZero(this.currentMana)) {
                alert('Not enough mana!');
                return false
            } else {
                return true
            }
        },
        attackTurn: function () {
            this.myAttack(this.attackMin, this.attackMax);
            this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
            this.anyDeadCheck()
        },
        manaTurn: function () {
            if (!this.fullBarsCheck(this.currentMana)) {
                this.myMana(30);
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax)
            } else if (this.fullBarsCheck(this.currentMana)) {
                alert("You can't recharge up to full mana!");
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax)
            }
        },
        spAttackTurn: function () {
            if (this.manaCheck()) {
                this.myAttack(this.spAttackMin, this.spAttackMax);
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
                this.currentMana -= this.spAttackCost;
            } else {
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
            }
            this.anyDeadCheck()
        },
        healTurn: function () {
            if (this.manaCheck() && !this.fullBarsCheck(this.myHealth)) {
                this.myHeal(this.healMin, this.healMax);
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
                this.currentMana -= this.healCost;
            } else if (this.fullBarsCheck(this.myHealth)) {
                alert("You can't heal up to full health!");
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
            }

            if (this.lessThanZero(this.myHealth)) {
                alert("You're fucking dead.");
                this.inGame = false;
            }
        },
        giveUp: function () {
            alert('QUITTER');
            this.monsterHealth = 100;
            this.myHealth = 100;
            this.currentMana = 100;
            this.inGame = !this.inGame
        }
    }
});