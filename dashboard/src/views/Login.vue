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
    <hr style="border: none; border-bottom: 1px solid #bfbfbf; width: 80%;margin-bottom: 10px">
    <div class="btn-oauth2">
      <div class="google-btn" @click="openGoogleOauth2">
        <div class="google-icon-wrapper">
          <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p class="btn-text"><b> Login with google</b></p>
      </div>
      <br>
      <div class="discord-btn" @click="openDiscordOauth2">
        <div class="discord-icon-wrapper">
          <img class="discord-icon" src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg"/>
        </div>
        <p class="btn-text"><b>  Login with discord</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import config from '../config.json'

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      username: '',
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
          this.error = 'API error: ' + err.message
        })
      }
    },
    openGoogleOauth2() {
      window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://127.0.0.1:3000/oauth2/google/login&client_id=712321817044-fk6kbn5vcj6pdt6ehbr9es3bl7rmp757.apps.googleusercontent.com");
    },
    openDiscordOauth2() {
      window.open("https://discord.com/api/oauth2/authorize?client_id=929791388541943858&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Foauth2%2Fdiscord%2Flogin&response_type=code&scope=identify%20email");
    }
  }
}
</script>

<style>
@import url('../assets/css/authForm.css');
</style>
