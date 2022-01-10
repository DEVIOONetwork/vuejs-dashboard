<template>
  <Header/>
  <div id="AuthForm">
    <div id="authForm-heading">
      Login
    </div>
    <hr style="border: none; border-bottom: 1px solid #bfbfbf; width: 80%;margin-bottom: 10px">
    <div>
      <form role="form">
        <div v-if="this.error !== null">
          <div class="alert alert-danger">
            {{ this.error }}
          </div>
        </div>
        <input type="text" placeholder="Username or email" maxlength="20" autofocus v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <button class="btn-big btn-blue" @click="login" type="submit">Login</button>
      </form>
    </div>
    <Oauth2Buttons/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Oauth2Buttons from "@/components/Oauth2Buttons";
import config from '../config.json'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default {
  name: 'Login',
  components: {
    Header,
    Oauth2Buttons
  },
  data() {
    return {
      username: '',
      password: '',
      error: null,
      windowObjectReference: null
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
    login() {
      let valid = this.validateFields()
      if (valid) {

        fetch(`${config.api.url}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
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
          let toast = new Toast()
          new toast.error('API error: ' + err.message)
        })
      }
    }
  }
}
</script>

<style>
@import url('../assets/css/authForm.css');
</style>
