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
  },
  created: async function () {
    if (this.$route.query.token) {

      this.$store.state.user = {
        token: this.$route.query.token,
        expired: false,
        expIn: this.$route.query.exp
      }

      this.$store.commit('setToken')
      await this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
#head {
  margin: 50px 300px 0 300px;
}
</style>
