<template>
  <div class="home">
    <Header/>
    <div id="head">
      <h1>A <a class="link-primary" href="https://github.com/studiodevioo/vuejs-dashboard">VueJS dashboard template</a></h1>
      <p>Available on GitHub, created by <a href="https://cetus.devioo.com" class="link-primary link-yellow">Cetus</a></p>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style scoped>
#head {
  margin: 50px 300px 0 300px;
}
</style>