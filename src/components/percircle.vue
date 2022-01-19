<template>
  <div
    :class="[
      'percircle',
      { animate, perclock, perdown, initialized: initialized },
    ]"
    @mouseenter="startHover"
    @mouseleave="stopHover"
    @click="timerReset"
  >
    <span :style="{ color: textColor }">{{ displayText }}</span>

    <svg viewBox="0 0 120 120">
      <circle
        class="filler-bar circle-bar"
        cx="60"
        cy="60"
        r="54"
        fill="none"
      />

      <circle
        class="progress-bar circle-bar"
        cx="60"
        cy="60"
        r="54"
        fill="none"
        :stroke="progressBarColor"
        :pathLength="fillerMax"
        :stroke-dasharray="fillerMax"
        :stroke-dashoffset="fillerOffset"
      />
    </svg>
  </div>
</template>

<script>
export default {
  //External classes with styles - set on component itself (<percircle class="big" />): .big, .small, .dark
  props: {
    //Whether to animate the progress bar on load (or view)
    animate: {
      type: Boolean,
      default: true,
    },

    //Display a clock in the percircle
    perclock: {
      type: Boolean,
      default: false,
    },

    //Display a countdown in the percircle
    perdown: {
      type: Boolean,
      default: false,
    },

    //The amount of seconds to countdown.
    secs: {
      type: Number,
      default: 15,
    },

    //Text to display when countdown has completed.
    timeUpText: {
      type: String,
      default: "Done!",
    },

    //Whether to reset the countdown on percircle click
    resetOnClick: {
      type: Boolean,
      default: true,
    },

    //Whether to display text even when the percentage is 0
    displayTextAtZero: {
      type: Boolean,
      default: true,
    },

    //The wrapper class, generally used for setting colors.
    //Available options:
    //red, blue, green, purple, yellow, pink
    //Can also be an inline color
    progressBarColor: {
      type: String,
      default: "#A6CE39",
    },

    //How full the bar is
    percent: {
      type: Number,
      default: 0,
    },

    //Text to display in circle
    text: {
      type: String,
      default: "",
    },

    animateOnScroll: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hovering: false,
      //Set progress bar to 0 initially to trigger transition
      initialized: false,
      clockInterval: null,
      date: new Date(),
      secsRemaining: this.secs,
      timerInterval: null,
    };
  },

  computed: {
    fillerMax() {
      return this.perclock || this.perdown ? 60 : 100;
    },

    fillerOffset() {
      let max = this.fillerMax;
      let val = this.renderedPercent;

      if (this.perclock) {
        val = this.date.getSeconds();
      }

      if (this.perdown) {
        val = this.secsRemaining;
      }

      return max - val;
    },

    renderedPercent() {
      if (!this.initialized) {
        return 0;
      }

      return this.percent > 100 ? 100 : this.percent < 0 ? 0 : this.percent;
    },

    displayText() {
      let text = this.text;

      if (this.perclock) {
        text =
          this.getPadded(this.date.getHours()) +
          ":" +
          this.getPadded(this.date.getMinutes()) +
          ":" +
          this.getPadded(this.date.getSeconds());
      } else if (this.perdown) {
        if (this.secsRemaining <= 0) {
          text = this.timeUpText;
        } else {
          text = this.secsRemaining;
        }
      } else if (this.renderedPercent || this.displayTextAtZero) {
        text = text || `${this.percent}%`;
      }

      return text;
    },

    textColor() {
      return this.hovering ? this.progressBarColor : "";
    },
  },

  mounted() {
    if (
      (this.animateOnScroll && this.isInViewport()) ||
      !this.animateOnScroll
    ) {
      this.initPercircle();
    } else {
      this.setScrollEventListener();
    }
  },

  beforeDestroy() {
    this.deleteClockInterval();
    this.deleteTimerInterval();
    this.deleteEventListeners();
  },

  watch: {
    perclock: {
      immediate: true,
      handler(val) {
        if (val) {
          this.setClockInterval();
        } else {
          this.deleteClockInterval();
        }
      },
    },

    perdown: {
      immediate: true,
      handler(val) {
        if (val) {
          this.setTimerInterval();
        } else {
          this.deleteTimerInterval();
        }
      },
    },
  },

  methods: {
    isInViewport() {
      const rect = this.$el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    initPercircle() {
      setTimeout(() => {
        //Display start up animation
        this.initialized = true;
      }, 0);
    },

    setClockInterval() {
      this.clockInterval = setInterval(() => {
        this.date = new Date();
      }, 1000);
    },

    deleteClockInterval() {
      if (this.clockInterval) {
        clearInterval(this.clockInterval);
      }

      this.clockInterval = null;
    },

    setTimerInterval() {
      this.timerInterval = setInterval(() => {
        this.secsRemaining -= 1;

        if (this.secsRemaining <= 0) {
          this.deleteTimerInterval();
        }
      }, 1000);
    },

    deleteTimerInterval() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timerInterval = null;
    },

    timerReset() {
      if (!this.perdown || !this.resetOnClick) {
        return;
      }

      this.deleteTimerInterval();

      this.secsRemaining = this.secs;

      this.setTimerInterval();
    },

    // display a presentable format of current time
    getPadded(val) {
      return val < 10 ? "0" + val : val;
    },

    startHover() {
      this.hovering = true;
    },

    stopHover() {
      this.hovering = false;
    },

    setScrollEventListener() {
      this.scrollEventListener = window.addEventListener(
        "scroll",
        this.scrollEventListener
      );
    },

    scrollEventListener() {
      if (!this.initialized && this.animateOnScroll && this.isInViewport()) {
        this.initPercircle();
      }
    },

    deleteEventListeners() {
      window.removeEventListener("scroll", this.scrollEventListener);
    },
  },
};
</script>

<style lang="scss" scoped>
.percircle {
  position: relative;
  font-size: 120px;
  width: 1.3em;
  height: 1.3em;
  margin: 0 auto;
  background: transparent;

  svg {
    transform: rotate(-90deg);
  }

  &.animate {
    & > span,
    .circle-bar {
      transition: all 0.2s ease-in-out;
    }
  }

  & > span {
    position: absolute;
    z-index: 1;
    width: 100%;
    top: 50%;
    height: 1em;
    display: block;
    text-align: center;
    white-space: nowrap;
    font-size: 0.2em;
    margin-top: -0.5em;
    color: rgba(52, 59, 62, 0.5);
  }

  &:hover {
    cursor: default;

    & > span {
      -webkit-transform: scale(1.3);
      -moz-transform: scale(1.3);
      -ms-transform: scale(1.3);
      -o-transform: scale(1.3);
      transform: scale(1.3);
      color: #307bbb;
    }

    .circle-bar {
      stroke-width: 5;
    }
  }

  &.small {
    font-size: 80px;
  }

  &.big {
    font-size: 240px;
  }

  &.dark {
    > span {
      color: #ffffff;
    }

    .filler-bar {
      stroke: rgba(255, 255, 255, 0.7);
    }
  }

  .filler-bar {
    stroke: rgba(0, 0, 0, 0.1);
  }

  .circle-bar {
    stroke-width: 8;
  }
}

.perclock > span {
  font-size: 0.15em;
}
</style>
