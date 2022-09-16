<template>
  <b-row class="align-items-center text-center">
    <b-col lg="4">
      <b-row :class="$style['block-analytics']">
        <b-col lg="6" :class="$style['block-stopwatch']">
          <span>{{ minutes }}</span>
          :
          <span>{{ seconds }}</span>
        </b-col>
        <b-col lg="6" :class="$style['block-frequency']"> {{ lpm }}/PM </b-col>
      </b-row>
    </b-col>
    <b-col lg="2">
      <b-button
        ref="startButton"
        variant="success"
        :class="['w-100 shadow', $style['block-btn']]"
        @click.prevent="startGame()"
      >
        Start
      </b-button>
    </b-col>
    <b-col lg="2">
      <b-button
        variant="danger"
        :class="['w-100 shadow', $style['block-btn']]"
        @click.prevent="clearText()"
      >
        Reset
      </b-button>
    </b-col>
    <b-col lg="4">
      <b-row :class="$style['block-analytics']">
        <b-col lg="6" :class="$style['block-mistake']">
          <span>{{ wrongCount }}</span>
          /
          <span>{{ rightCount }}</span>
        </b-col>
        <b-col lg="6" :class="$style['block-accuracy']">
          {{ accuracy }}
        </b-col>
      </b-row>
    </b-col>
    <div>
      <b-modal id="congratulation" hide-footer>
        <template #modal-title> Congratulations </template>
        <div class="d-block text-left">
          <div>Time: {{ showMinutes }}:{{ showSeconds }}</div>
          <div>Frequency: {{ showLpm }} Letter per minute</div>
          <div>Mistake: {{ showWrongCount }} | Right: {{ showRightCount }}</div>
          <div>Accuracy: {{ showAccuracy }}</div>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('congratulation')"
          >Close Me</b-button
        >
      </b-modal>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'ActionsItem',
  props: { wrong: Number, right: Number, end: Boolean, textLength: Number },
  data() {
    return {
      wrongCount: 0,
      rightCount: 0,
      seconds: '00',
      minutes: '00',
      intervalId: null,
      accuracy: '0%',
      lpm: 0,
      showWrongCount: 0,
      showRightCount: 0,
      showSeconds: '00',
      showMinutes: '00',
      showAccuracy: '0%',
      showLpm: 0,
      length: 0,
    }
  },
  watch: {
    wrong(e) {
      this.wrongCount = e
      this.checkAccuracy()
    },
    right(e) {
      this.rightCount = e
      this.checkAccuracy()
    },
    seconds() {
      this.letterPM()
    },
    end(e) {
      if (e) {
        this.clearText()
        this.$bvModal.show('congratulation')
      }
    },
    textLength(e) {
      this.length = e
    },
  },
  methods: {
    async startGame() {
      await this.$store.dispatch('getText')
      this.$emit('addClass')
      this.$refs.startButton.disabled = true
      this.stopWatch()
    },
    clearText() {
      this.showWrongCount = this.wrongCount
      this.showRightCount = this.rightCount
      this.showSeconds = this.seconds
      this.showMinutes = this.minutes
      this.showAccuracy = this.accuracy
      this.showLpm = this.lpm
      this.accuracy = '0%'
      this.wrongCount = 0
      this.rightCount = 0
      this.minutes = '00'
      this.seconds = '00'
      this.lpm = 0
      this.length = 0
      this.$store.dispatch('clearText')
      this.$emit('delClass')
      this.$refs.startButton.disabled = false
      this.stopWatchReset()
    },
    stopWatch() {
      let second = 0
      let minute = 0
      this.intervalId = setInterval(() => {
        this.seconds = second < 9 ? `0${++second}` : `${++second}`
        if (second === 59) {
          this.seconds = '00'
          second = 0
          this.minutes = minute < 9 ? `0${++minute}` : `${++minute}`
        }
      }, 1000)
    },
    stopWatchReset() {
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    checkAccuracy() {
      if (this.right === 0) {
        this.accuracy = '0%'
      } else {
        this.accuracy = `${(100 - this.wrong / (this.length / 100)).toFixed(
          2
        )}%`
      }
    },
    letterPM() {
      if (Number(this.minutes) !== 0) {
        const second = Number(this.minutes) * 60 + Number(this.seconds)
        this.lpm = Math.round((this.rightCount / second) * 60)
      } else if (this.intervalId === null) {
        this.lpm = 0
      } else {
        const second = Number(this.seconds)
        this.lpm = Math.round((this.rightCount / second) * 60)
      }
    },
  },
}
</script>

<style lang="scss" module>
.block-analytics {
  font-size: 22px;
  color: #fff;
  font-weight: 500;
}
.block-btn {
  transform: translateY(50%);
}
.block-stopwatch {
  position: relative;
  &::after {
    content: 'Stopwatch';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -100%;
    font-size: 16px;
  }
}
.block-frequency {
  position: relative;
  &::after {
    content: 'Frequency';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -100%;
    font-size: 16px;
  }
}
.block-mistake {
  position: relative;
  &::after {
    content: 'Mistake/Right';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -100%;
    font-size: 16px;
  }
}
.block-accuracy {
  position: relative;
  &::after {
    content: 'Accuracy';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -100%;
    font-size: 16px;
  }
}
</style>
