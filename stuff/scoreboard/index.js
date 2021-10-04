Vue.component('counter', {
    props: {
        score: {
            type: Number,
            required: true
        }
    },

    methods: {
        changeScore(delta) {
            this.$emit('scoreChange', delta)
        }
    }
})

Vue.component('player', {
    props: {
        name: {
            type: String,
            required: true
        },
        score: {
            type: String,
            required: true
        }
    },

    methods: {
        changeScore(delta) {
            this.$emit('onScoreChange', delta)
        }
    },

    template: `
    <div class="player">
      <div class="player-object">
      <ul>
      <li>
        <a class="remove-player" @click="$emit('onRemove')">X</a>
        {{ name }}
        <button class="counter-actiondecrement" @click="changeScore(-1)"> - </button>
        {{ score }} 
      <button class="counter-actionincrement" @click="changeScore(+1)"> + </button>
      </div>
      <div class="player-score">
      
        <counter :score="this.score" @onScoreChange="changeScore"></counter>
      </div>
      </li>
</ul>
    </div>
  `
})

Vue.component('scoreboard', {
    data() {
        return {
            title: "Scoreboard",
            players: [
                {id: 1, name: "Lisa", score: 0},
                {id: 2, name: "Charlie", score: 0}
            ],
            nextId: 3,
            newName: ''

        }
    },

    methods: {
        changeScore(index, delta) {
            this.players[index].score += delta
        },

        addPlayer() {
            this.players.push({
                name:this.newName,
                score: 0,
                id: this.nextId
            })
            this.nextId += 1
        },
        removePlayer(index) {
            this.players.splice(index, 1)
        }


    },

    template: `
    <div class="scoreboard">
    <h1>{{title}}</h1>
    <section class="grid-container">
    
    <main>
    <article>
     <form v-on:submit.prevent="addPlayer">
        <label for="new-player">Add new player:</label>
        <input
        v-model="newName"
        id="new-player"
        placeholder="enter the players name..">
      
       <button>Add</button>
    </form>
</article>

<aside>
<fieldset>
<div class="players">

<player v-for="(player, index) in players"
          v-bind:name="player.name"
          v-bind:score="player.score"
          v-bind:key="player.id"
         @onRemove="removePlayer(index)"
          @onScoreChange="(delta) => changeScore(index, delta)">
                  </player>

      </div>
      </fieldset>
      </aside>
      
      

        </main>


    </div>
   </section>
  `
})



const app = new Vue({
    el: '#app'
})