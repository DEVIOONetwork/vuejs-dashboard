<template>
  <Header/>
  <div id="dashboard">
    <Sidebar v-bind:items="items" @clicked="changeMode"/>
    <div id="board">

      <div id="default" v-if="mode === null || mode === 'Dashboard'">

        <div class="card purple card-medium">
          <p class="title">Welcome {{ username }} <i class="twa twa-waving-hand"></i></p>
          <p class="txt-content">{{ biography === null ? "No biography" : biography }}</p>
        </div>
        <div class="card orange card-big">
          <p class="title">Random title</p>
          <p class="txt-content">Random text...</p>
        </div>

        <div class="cardAlign">
          <div class="card card-small green">
            <p class="title">Random title</p>
            <p class="txt-content">Random text...</p>
          </div>

          <div class="card card-large red">
            <p class="title">Random title</p>
            <p class="txt-content">Random text...</p>
          </div>

          <div class="card card-medium blue">
            <p class="title">Random title</p>
            <p class="txt-content">Random text...</p>
          </div>
            <div class="card card-large orange">
              <p class="title">Random title</p>
              <p class="txt-content">Random text...</p>
            </div>
            <div class="card card-big purple">
              <p class="title">Random title</p>
              <p class="txt-content">Random text...</p>
            </div>
        </div>
      </div>

      <div v-if="mode === 'Logout'">
        {{ this.$router.push('/Logout') }}) }}
      </div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import config from "@/config.json";
import { useToast } from "vue-toastification"
import "vue-toastification/dist/index.css";

export default {
  name: 'Dashboard',
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      username: null,
      email: null,
      biography: null,
      items: [
        {
         name: "Dashboard",
         icon: "fas fa-tachometer-alt",
        },
        {
          name: "My profile",
          icon: "fas fa-user-circle",
        },
        {
          name: "Settings",
          icon: "fas fa-cogs",
        },
        {
          name: "Logout",
          icon: "fas fa-sign-out-alt",
        }
      ],
      mode: null
      }
    },
    methods: {
      changeMode(mode) {
        this.mode = mode
      }
    },
    created() {

      const toast = useToast();

      if (localStorage.getItem("token") === null) {
        this.$router.push("/login");
      }

      fetch(`${config.api.url}/users/me`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(async response => {
          if (!response.ok) return await this.$router.push("/login");

          let data = await response.json();
          this.username = data.username;
          this.email = data.email;
          this.biography = data.biography;

        })
      .catch(error => {
        toast.error(error.toString());
      });

    }
}

</script>

<style lang="css">
@import url('../assets/css/twemoji.min.css');
@import url('../assets/css/dashboard.css');
</style>