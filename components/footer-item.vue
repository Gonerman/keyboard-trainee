<template>
  <footer class="bg-dark text-center text-light shadow-lg">
    <b-container>
      <p class="m-0 p-2">
        © Copyright by
        <b-link
          href="mailto:ayder.iz666@gmail.com"
          class="text-primary underline"
          >Izmaylov Ayder</b-link
        >
        {{ date }}
      </p>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: 'FooterItem',
  data() {
    return {
      date: null,
    }
  },
  mounted() {
    this.date = new Date().getFullYear()
  },
}
</script>
