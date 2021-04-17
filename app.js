function getRandom(min,max){
    return Math.floor(Math.random()*(max-min) + min);

}
const app = Vue.createApp({
    
    data(){
        return{
            currentAttack: 0,
            playerHealth: 100,
            monsterHealth: 100,
            winner: null,
            logMessages: [],
        };
    },
    computed:{
        playerBarStyle(){
            console.log({width: this.playerHealth + '%'});
            return {width: this.playerHealth + '%'};
        },
        monsterBarStyle(){
            return {width: this.monsterHealth + '%'};
        },
        specialCount() {
            return this.currentAttack % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0)
                this.winner = 'draw';
            
            else  if(value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(this.playerHealth <= 0 && value <= 0)
                this.winner = 'draw';
            
            else if(value <= 0){
                this.winner = 'player';
            }
        }
    },
    methods: {
        newGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = '';
            this.currentAttack = 0;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentAttack++;
            const redValue = getRandom(5,12);
            this.monsterHealth-=redValue;
            this.addlog('player','attack',redValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const redValue = getRandom(8,18);
            this.playerHealth-=redValue;
            this.addlog('monster','attack',redValue);
        },
        specialAttack() {
            this.currentAttack++;
            const redValue = getRandom(10,25);
            this.monsterHealth-=redValue;
            this.addlog('player','Special attack',redValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentAttack++;
            
            const redValue = getRandom(8,18);
            this.playerHealth+=redValue;
            if(this.playerHealth > 100){
                this.playerHealth = 100;
            }
            this.addlog('player','heal',redValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
            this.addlog('player','surrender',0);
        },
        addlog(who,what,howMuch){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionAmount:howMuch
            });
        },
    }
});

app.mount('#game');