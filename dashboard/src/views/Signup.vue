<template>
  <Header/>
  <div id="AuthForm">
    <div id="authForm-heading">
      Register
    </div>
    <hr style="border: none; border-bottom: 1px solid #bfbfbf; width: 80%;margin-bottom: 10px">
    <div>
      <form v-on:submit.prevent="register">
        <div v-if="this.error !== null">
          <div class="alert alert-danger">
            {{ this.error }}
          </div>
        </div>
        <input type="text" placeholder="Username" autofocus maxlength="20" v-model="username">
        <input type="email" placeholder="Email" maxlength="30" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <button class="btn-big btn-blue" @click="register" type="submit">Register</button>
      </form>
    </div>
    <Oauth2Buttons/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Oauth2Buttons from '../components/Oauth2Buttons.vue';
import config from '../config.json'

export default {
  name: 'Signup',
  components: {
    Header,
    Oauth2Buttons
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    validateFields() {
      if (this.username === '' || this.password === '') {
        this.error = 'Please fill in all fields'
        return false
      }
      return true
    },
    register() {
      let valid = this.validateFields()
      if (valid) {

        fetch(`${config.api.url}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        }).then(async res => {
          let data = await res.json()
          if (data.error) {
            data.message ? this.error = data.message : this.error = data.error
          } else {
            localStorage.setItem('token', data.token)
            console.log('Success login!')
            await this.$router.push('/dashboard')
          }
      }).catch(err => {
        this.error = 'API error: ' + err.message
      })
      }
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style>
@import url('../assets/css/authForm.css');
</style>
