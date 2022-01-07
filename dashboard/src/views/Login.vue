<template>
  <Header/>
  <div id="Login">
    <div class="login-heading">
      <h1>Login</h1>
    </div>
    <div>
      <form role="form">
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <button class="btn-primary btn-yellow" type="submit" @click.prevent="login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Login',
  components: {
    Header
  }
}
</script>

<style>
#Login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #d2d2d2;
  padding: 20px 50px 50px 50px;
  border-radius: 10px;
  width: fit-content;
  width: -moz-fit-content;
  margin: auto;
  margin-top: 50px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #7b7b7b;
  font-family: 'Roboto', sans-serif;
  outline: none;
  background-color: transparent;
}
::placeholder {
  color: var(--placeholder-color);
  opacity: 1;
}
:-ms-input-placeholder {
  color: var(--placeholder-color);
}
::-ms-input-placeholder {
  color: var(--placeholder-color);
}
</style>