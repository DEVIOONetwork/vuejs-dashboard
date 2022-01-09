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
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token')
      console.log('Success logout')
      this.$router.push('/');
    } else {
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>