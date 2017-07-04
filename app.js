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
        monsterAttack: function (min, max) {
            return this.myHealth -= this.calculateRNG(min, max);
        },
        attackTurn: function () {
            this.myAttack(this.attackMin, this.attackMax);
            this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
            if (this.monsterHealth <=0) {
                alert('"I YIELD", the monster says.');
                this.inGame = false;
                return
            } else if (this.myHealth <= 0) {
                alert("You're fucking dead.");
                this.inGame = false;
            }
        },
        manaCheck: function () {
            if (this.currentMana <= 0) {
                alert('Not enough mana!');
                return false
            } else {
                return true
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
            if (this.monsterHealth <=0) {
                alert('"I YIELD", the monster says.');
                this.inGame = false;
                return
            } else if (this.myHealth <= 0) {
                alert("You're fucking dead.");
                this.inGame = false;
            }
        },
        fullHealthCheck: function () {
            return this.myHealth >=90
        },
        healTurn: function () {
            if (this.manaCheck() && !this.fullHealthCheck()) {
                this.myHeal(this.healMin, this.healMax);
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
                this.currentMana -= this.healCost;
            } else if (this.fullHealthCheck()) {
                alert("You can't heal up to full health!");
                this.monsterAttack(this.monsterAttackMin, this.monsterAttackMax);
            }

            if (this.myHealth <= 0) {
                alert("You're fucking dead.");
                this.inGame = false;
            }
        },
        giveUp: function () {
            alert('QUITTER');
            this.monsterHealth = 100;
            this.myHealth = 100;
            this.inGame = false
        }
    }
});