<template>
  <Header/>
  <div id="dashboard">
    <Sidebar v-bind:items="items" @clicked="changeMode"/>
    <div id="board">

      <div id="default" v-if="mode === null || mode === 'Dashboard'">

        <div class="cardAlign">
          <div class="card purple card-medium">
            <p class="title">Welcome {{ username }} <i class="twa twa-waving-hand"></i></p>
            <p class="txt-content">{{ biography === null ? "No biography" : biography }}</p>
          </div>
          <a href="https://github.com/StudioDEVIOO/vuejs-dashboard" class="card green external txt-big">
            Open Source on Github <i class="twa twa-red-heart"></i>
          </a>
        </div>
        <div class="cardAlign">
          <div class="card orange card-medium">
            <p class="title">Edit username</p>
            <p class="txt-content">
              <input type="text" v-model="editUsername" maxlength="20" class="editAccount"/>
              <button @click="updateUsername()" class="btn-save">Update</button>
            </p>
          </div>
          <div class="card orange card-medium">
            <p class="title">Edit email</p>
            <p class="txt-content">
              <input type="text" v-model="editEmail" maxlength="50" class="editAccount"/>
              <button @click="updateEmail()" class="btn-save">Update</button>
            </p>
          </div>
          <div class="card orange card-medium">
            <p class="title">Edit password</p>
            <p class="txt-content">
              <input type="password" v-model="editPassword" maxlength="20" class="editAccount"/>
              <input type="password" v-model="editPasswordConfirm" maxlength="20" class="editAccount"/>
              <button @click="updatePassword()" class="btn-save">Update</button>
            </p>
          </div>
          <div class="card orange card-big">
            <p class="title">Edit bio</p>
            <textarea v-model="editBio" maxlength="500" class="editAccount"></textarea>
            <button @click="saveBiography" class="btn-save">Update</button>
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
      biography: null,
      items: [
        {
         name: "Dashboard",
         icon: "fas fa-tachometer-alt",
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