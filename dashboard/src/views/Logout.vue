<template>
  <Header/>
  <div style="text-align: center">
    Success logout!
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Logout',
  components: {
    Header
  },
  created() {
    this.$store.commit('deleteToken');
    this.$router.push('/');
  }
}
</script>

<style>

</style>
