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
        turns: [],
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
            var damage = this.calculateRNG(min, max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the monster for ' + damage
            });
        },
        myHeal: function (min, max) {
            var heal = this.calculateRNG(min, max);
            this.myHealth += heal;
            this.turns.unshift({
                isPlayer: true,
                text: 'You healed for ' + heal
            });
        },
        myMana: function (val) {
            var mana = val;
            this.currentMana += mana;
            this.turns.unshift({
                isPlayer: true,
                text: 'You restored ' + mana + ' mana'
            });
        },
        monsterAttack: function (min, max) {
            var monsterDamage = this.calculateRNG(min, max);
            this.myHealth -= monsterDamage;
            this.turns.unshift({
                isPlayer: false,
                text: 'The monster hit you for ' + monsterDamage
            });
        },
        lessThanZero: function (char) {
            return char <= 0
        },
        fullBarsCheck: function (char) {
            return char >= 90
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
            var damage =
            this.myAttack(this.attackMin, this.attackMax);
            this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
            this.anyDeadCheck()
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
        manaTurn: function () {
            if (!this.fullBarsCheck(this.currentMana)) {
                this.myMana(30);
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax)
            } else if (this.fullBarsCheck(this.currentMana)) {
                alert("You can't recharge up to full mana!");
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax)
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