<template>
  <header>
    <ul class="no-list-style">
      <li><router-link class="btn-primary" to="/">Home</router-link></li>
      <li><router-link class="btn-primary" to="/Login">Login</router-link></li>
      <li><router-link class="btn-primary" to="/Signup">Sign up</router-link></li>
      <li><router-link class="btn-primary" to="/Dashboard">Dashboard</router-link></li>
      <li><a href="https://github.com/dev-cetus" class="btn-primary btn-blue"><i class="fab fa-github"></i> My GitHub</a></li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style>
  header {
    background-color: #3e3e3e;
    padding: 20px;
    text-align: center;
  }
  header ul {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0;
    padding: 0;
  }
  header ul li {
    margin: 0 10px;
  }
  header ul li a {
    color: #333;
    text-decoration: none;
  }
</style>