<template>
  <main-section :class="$style['block']">
    <textarea-item
      :class="$style['block-textarea']"
      :add-class-bool="addClassBool"
      :text-array="textArray"
      :text-length="textLength"
      @wrong="wrong()"
      @right="right()"
      @end="end()"
    />
    <actions-item
      :class="$style['block-actions']"
      :wrong="wrongCount"
      :right="rightCount"
      :end="endBool"
      :text-length="textLength"
      @addClass="addClass()"
      @delClass="delClass()"
    />
  </main-section>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      addClassBool: false,
      wrongCount: 0,
      rightCount: 0,
      endBool: false,
    }
  },
  computed: {
    textArray() {
      return this.$store.getters.getText
    },
    textLength() {
      return this.$store.getters.getLength
    },
  },
  methods: {
    addClass() {
      this.addClassBool = true
    },
    delClass() {
      this.addClassBool = false
      this.endBool = false
      this.wrongCount = 0
      this.rightCount = 0
      this.length = 0
    },
    wrong() {
      this.wrongCount++
    },
    right() {
      this.rightCount++
    },
    end() {
      this.endBool = true
    },
  },
}
</script>

<style lang="scss" module>
.block {
}

.block-textarea {
  margin-bottom: 2rem;
}
</style>
