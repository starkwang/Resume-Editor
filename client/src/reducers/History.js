import { initialState } from './initialState';
const init = JSON.stringify(initialState);
export var History = {
    histories: [init],
    now: 1,
    add: function(state) {
        this.histories = this.histories.slice(0, this.now + 1);
        this.histories.push(JSON.stringify(state));
        this.now++;
    },
    backward: function() {
        if( this.now == 1 ){
            return JSON.parse(init);
        }else{
            this.now--;
            return JSON.parse(this.histories[this.now - 1]);
        }
    },
    forward: function() {
        if( this.now == this.histories.length ){
            return JSON.parse(this.histories[this.now - 1]);
        }else{
            this.now++;
            return JSON.parse(this.histories[this.now - 1]);
        }
    }

}
