<template>
  <div :class="$style['block']">
    <header-item :class="$style['block-header']" />
    <main :class="$style['block-main']">
      <nuxt />
    </main>
    <footer-item :class="$style['block-footer']" />
  </div>
</template>

<script>
import headerItem from '~/components/header-item.vue'
export default {
  name: 'DefaultLayout',
  components: { headerItem },
}
</script>

<style lang="scss" module>
.block {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('https://wallpaperaccess.com/full/672238.jpg');
}
.block-header {
  flex: 0 0 auto;
}
.block-main {
  flex: 1 1 auto;
}
.block-footer {
  flex: 0 0 auto;
}
</style>
