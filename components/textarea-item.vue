<template>
  <b-card
    :class="['shadow-sm overflow-hidden h-100', $style['block']]"
    header="Your Practice Text"
    header-bg-variant="dark"
    header-text-variant="light"
    header-class="text-center"
    body-class="font-weight-bold h-100 overflow-auto"
  >
    <span
      v-for="(item, indx) in text"
      :key="indx"
      :class="['js-span', $style['block-letter']]"
      >{{ item }}</span
    >
  </b-card>
</template>

<script>
export default {
  name: 'TextareaItem',
  props: {
    addClassBool: Boolean,
    textArray: Array,
    textLength: Number,
  },
  data() {
    return {
      indexLetter: 0,
      text: null,
      length: null,
    }
  },
  watch: {
    addClassBool(e) {
      if (e) {
        document.querySelectorAll('.js-span').forEach((e, indx) => {
          if (indx === 0) {
            e.classList.add('bg-success', 'active')
          }
        })
        document.addEventListener('keypress', this.keyPress)
      } else {
        document.removeEventListener('keypress', this.keyPress)
        this.indexLetter = 0
      }
    },
    textArray(e) {
      this.text = e
    },
    textLength(e) {
      this.length = e
    },
  },
  methods: {
    keyPress(e) {
      const spanLetter = document.querySelector('.active')
      const spanArray = document.querySelectorAll('.js-span')
      const key = e.key
      if (key === spanLetter.innerHTML) {
        if (this.indexLetter === this.textLength - 1) {
          this.$emit('end')
          spanLetter.classList.remove('bg-success', 'bg-danger', 'active')
          spanLetter.classList.add('bg-secondary')
        } else {
          spanLetter.classList.remove('bg-success', 'bg-danger', 'active')
          spanLetter.classList.add('bg-secondary')
          this.indexLetter++
          spanArray[this.indexLetter].classList.add('bg-success', 'active')
          this.$emit('right')
        }
      } else {
        spanLetter.classList.remove('bg-success')
        spanLetter.classList.add('bg-danger')
        this.$emit('wrong')
      }
    },
  },
}
</script>

<style lang="scss" module>
.block {
  max-height: 500px;
}
.block-letter {
  padding: 2px;
  color: #000;
}
</style>
