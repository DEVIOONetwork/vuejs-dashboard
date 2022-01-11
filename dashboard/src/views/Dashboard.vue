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
            <form class="txt-content">
              <input type="text" v-model="editUsername" maxlength="20" placeholder="Username" class="editAccount"/>
              <button @click="updateUsername()" class="btn-save">Update</button>
            </form>
          </div>
          <div class="card orange card-medium">
            <p class="title">Edit email</p>
            <form class="txt-content">
              <input type="text" v-model="editEmail" maxlength="30" placeholder="exemple@mail.com" class="editAccount"/>
              <button @click="updateEmail()" class="btn-save">Update</button>
            </form>
          </div>
          <div v-if="this.oauth" class="card orange card-medium">
            <p class="title">Edit password</p>
            <form class="txt-content">
              <input type="password" v-model="editPassword" maxlength="20" placeholder="Password" class="editAccount"/>
              <input type="password" v-model="editPasswordConfirm" maxlength="20" placeholder="Confirm Password" class="editAccount"/>
              <button @click="updatePassword()" class="btn-save">Update</button>
            </form>
          </div>
          <div class="card orange card-big">
            <p class="title">Edit bio</p>
            <form>
              <textarea v-model="editBio" maxlength="500" placeholder="I'm a developer!" class="editAccount"></textarea>
              <button @click="updateBiography" class="btn-save">Update</button>
            </form>
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
import "../assets/css/toast.min.css";

const toast = useToast();

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
      oauth: null,
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
      },

      updateUsername() {
        fetch(`${config.api.url}/users/me/username`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            username: this.editUsername
          })
        }).then(async res => {
          if (res.status === 200) {
            this.username = this.editUsername
            this.editUsername = null
            toast.success("Username updated")
          } else if (res.status === 400) {
            let data = await res.json()
            toast.error(data.error)
          } else {
            toast.error("Something went wrong")
          }
        }).catch(err => {
          toast.error(err.toString())
        })
      },
      updateEmail() {
        fetch(`${config.api.url}/users/me/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            email: this.editEmail
          })
        }).then(async res => {
          if (res.status === 200) {
            this.editEmail = null
            toast.success("Email updated")
          } else if (res.status === 400) {
            let data = await res.json()
            toast.error(data.error)
          } else {
            toast.error("Something went wrong")
          }
        }).catch(err => {
          toast.error(err.toString())
        })
      },
      updatePassword() {
        fetch(`${config.api.url}/users/me/password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            password: this.editPassword,
            passwordConfirm: this.editPasswordConfirm
          })
        }).then(async res => {
          if (res.status === 200) {
            this.editPassword = null
            this.editPasswordConfirm = null
            toast.success("Password updated")
          } else if (res.status === 400) {
            let data = await res.json()
            toast.error(data.error)
          } else {
            toast.error("Something went wrong")
          }
        }).catch(err => {
          toast.error(err.toString())
        })
      },
      updateBiography() {
        fetch(`${config.api.url}/users/me/biography`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            biography: this.editBio
          })
        }).then(async res => {
          if (res.status === 200) {
            this.biography = this.editBio
            this.editBio = null
            toast.success("Biography updated")
          } else if (res.status === 400) {
            let data = await res.json()
            toast.error(data.error)
          } else {
            toast.error("Something went wrong")
          }
        }).catch(err => {
          toast.error(err.toString())
        })
      },
    },
    created() {

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
          this.oauth = data.oauth;

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