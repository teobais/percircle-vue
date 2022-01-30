<template>
  <div class="container">
    <div class="mb-5">
      <h3 class="text-center">Percircle (Custom colors and reactive percents)</h3>
      <ssh-pre class="mb-4" language="html" copy-button @copied="onCopySuccess" dark reactive>
        <template #copy-button>
          <span class="small text-white">{{ copyText }}</span>
        </template>
        &lt;percircle :percent="{{ percent }}" :displayTextAtZero="true" progressBarColor="#1B75BC"/&gt;
      </ssh-pre>
      <percircle :percent="percent" progressBarColor="#1B75BC" />
      <div class="text-center mt-4">
        <b-button variant="outline-secondary" @click="add(10)">Add 10</b-button>
        <b-button variant="outline-secondary" @click="add(-10)" class="ms-3"> Subtract 10 </b-button>
      </div>
    </div>

    <div class="mb-5">
      <h3 class="text-center">
        Percircle (Text based, small size, dark background, uses same percent as above but translates it to a letter
        grade)
      </h3>
      <ssh-pre class="mb-4" language="html" copy-button @copied="onCopySuccess" dark reactive>
        <template #copy-button>
          <span class="small text-white">{{ copyText }}</span>
        </template>
        &lt;percircle :percent="{{ percent }}" :displayTextAtZero="true" text="{{ letterGrade }}"/&gt;
      </ssh-pre>
      <div class="dark-background">
        <percircle class="small dark" :percent="percent" :text="letterGrade" />
      </div>
      <div class="text-center mt-4">
        <b-button variant="outline-secondary" @click="add(10)">Add 10</b-button>
        <b-button variant="outline-secondary" @click="add(-10)" class="ms-3"> Subtract 10 </b-button>
      </div>
    </div>

    <div class="mb-5">
      <h3 class="text-center">Perdown (Countdown timer, big size, clicking resets it)</h3>
      <ssh-pre class="mb-4" language="html" copy-button @copied="onCopySuccess" dark reactive>
        <template #copy-button>
          <span class="small text-white">{{ copyText }}</span>
        </template>
        &lt;percircle :perdown="true" :secs="{{ secs }}" timeUpText="Done" :resetOnClick="true"/&gt;
      </ssh-pre>
      <percircle class="big" perdown :secs="secs" timeUpText="Done" />
    </div>

    <div class="mb-5">
      <h3 class="text-center">Perclock (Clock)</h3>
      <ssh-pre class="mb-4" language="html" copy-button @copied="onCopySuccess" dark reactive>
        <template #copy-button>
          <span class="small text-white">{{ copyText }}</span>
        </template>
        &lt;percircle :perclock="true"/&gt;
      </ssh-pre>
      <percircle perclock />
    </div>

    <div class="mb-5">
      <h3 class="text-center">Percircle (Animate on scroll)</h3>
      <ssh-pre class="mb-4" language="html" copy-button @copied="onCopySuccess" dark reactive>
        <template #copy-button>
          <span class="small text-white">{{ copyText }}</span>
        </template>
        &lt;percircle :percent="{{ percent }}" :displayTextAtZero="true" progressBarColor="#1B75BC"
        :animateOnScroll="true"/&gt;
      </ssh-pre>
      <percircle :percent="percent" progressBarColor="#1B75BC" animateOnScroll />
      <div class="text-center mt-4">
        <b-button variant="outline-secondary" @click="add(10)">Add 10</b-button>
        <b-button variant="outline-secondary" @click="add(-10)" class="ms-3"> Subtract 10 </b-button>
      </div>
    </div>

    <div class="mb-5">
      <h3 class="text-center">Percircle (Animation off)</h3>
      <ssh-pre class="mb-4" language="html" copy-button @copied="onCopySuccess" dark reactive>
        <template #copy-button>
          <span class="small text-white">{{ copyText }}</span>
        </template>
        &lt;percircle :percent="{{ percent }}" :displayTextAtZero="true" :animate="false"/&gt;
      </ssh-pre>
      <percircle :percent="percent" :animate="animate" />
      <div class="text-center mt-4">
        <b-button variant="outline-secondary" @click="add(10)">Add 10</b-button>
        <b-button variant="outline-secondary" @click="add(-10)" class="ms-3"> Subtract 10 </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import SshPre from 'simple-syntax-highlighter'
import Percircle from './percircle.vue'
export default {
  name: 'HelloWorld',

  components: {
    Percircle,
    SshPre,
  },

  data() {
    return {
      copyText: 'Copy',
      percent: 60,
      secs: 35,
      animate: false,
    }
  },

  computed: {
    letterGrade() {
      if (this.percent >= 90) {
        return 'A'
      }

      if (this.percent >= 80) {
        return 'B'
      }

      if (this.percent >= 70) {
        return 'C'
      }

      if (this.percent >= 60) {
        return 'D'
      }

      return 'F'
    },
  },

  methods: {
    add(amount) {
      this.percent += amount
    },

    onCopy() {
      this.copyText = 'Copied!'
      setTimeout(() => {
        this.copyText = 'Copy'
      }, 2000)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 20px;
}

.button {
  cursor: pointer;
  margin-left: 10px;
}

.dark-background {
  background-color: black;
  margin-bottom: 20px;
  padding: 20px;
}
</style>
