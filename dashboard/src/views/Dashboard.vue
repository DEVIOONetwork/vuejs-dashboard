<template>
  <Header/>
  <div id="dashboard">
    <Sidebar v-bind:items="items" @clicked="changeMode"/>
    <div id="board">

      <!-- Default view -->
      <div id="default" v-if="mode === null || mode === 'Dashboard'">

        <div class="cardAlign">
          <div class="card blue fit-content">
            <img v-if="avatar" :src="avatar" height="130" alt="avatar">
            <img v-if="!avatar" height="130" :src="`https://avatars.dicebear.com/api/avataaars/${username}.svg`" alt="avatar">
          </div>
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
            <form class="txt-content" v-on:submit.prevent="updateUsername">
              <input type="text" v-model="editUsername" maxlength="20" placeholder="Username" class="editAccount"/>
              <button class="btn-save">Update</button>
            </form>
          </div>
          <div v-if="this.oauth" class="card orange card-medium">
            <p class="title">Edit email</p>
            <form class="txt-content" v-on:submit.prevent="updateEmail">
              <input type="text" v-model="editEmail" maxlength="30" placeholder="exemple@mail.com" class="editAccount"/>
              <button class="btn-save">Update</button>
            </form>
          </div>
          <div v-if="this.oauth" class="card orange card-medium">
            <p class="title">Edit password</p>
            <form class="txt-content" v-on:submit.prevent="updatePassword">
              <input type="password" v-model="editPassword" maxlength="20" placeholder="Password" class="editAccount"/>
              <input type="password" v-model="editPasswordConfirm" maxlength="20" placeholder="Confirm Password" class="editAccount"/>
              <button class="btn-save">Update</button>
            </form>
          </div>
          <div class="card orange card-big">
            <p class="title">Edit bio</p>
            <form v-on:submit.prevent="updateBiography">
              <textarea v-model="editBio" maxlength="500" placeholder="I'm a developer!" class="editAccount"></textarea>
              <button class="btn-save">Update</button>
            </form>
          </div>
        </div>
      </div>

      <!--- Edit user Avatar -->
      <div v-if="mode === 'My Avatar'">
        <div class="cardAlign">
          <div class="card orange card-big">
            <p class="title">Custom avatar url</p>
            <form class="txt-content" v-on:submit.prevent="updateAvatarCustomUrl">
              <input type="text" v-model="avatarCustomUrl" maxlength="90" placeholder="https://i.imgur.com/..." class="editAccount"/>
              <button class="btn-save">Update</button>
            </form>
          </div>

          <div v-if="avatarCustomUrl" class="card green fit-content">
            <img :src="avatarCustomUrl" height="180" width="180" alt="avatar">
          </div>
        </div>

        <div class="cardAlign">
          <div class="card orange card-big">
            <p class="title">Custom avatar</p>
            <form class="txt-content" v-on:submit.prevent="updateCustomAvatar">
              <input type="text" placeholder="Name" maxlength="30" v-model="avatarName" class="editAccount"/>
              <select v-model="avatarType" class="editAccount">
                <option v-for="type in avatarTypes" :key="type">{{ type }}</option>
              </select>
              <button class="btn-save">Update</button>
            </form>
          </div>

          <div v-if="avatarType && avatarName" class="card green fit-content">
            <img :src="`https://avatars.dicebear.com/api/${this.avatarType}/${this.avatarName}.svg`" height="230" width="230" alt="avatar">
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
          name: "My Avatar",
          icon: "fas fa-sliders-h"
        },
        {
          name: "Logout",
          icon: "fas fa-sign-out-alt",
        }
      ],
      mode: null,
      avatar: null,
      avatarCustomUrl: null,
      avatarName: this.username,
      avatarTypes: ["adventurer", "adventurer-neutral", "avataaars", "big-ears", "big-ears-neutral", "big-smile", "bottts", "croodles", "croodles-neutral", "identicon", "initials", "micah", "miniavs", "open-peeps", "personas", "pixel-art", "pixel-art-neutral"],
      avatarType: "adventurer",
      }
    },
    methods: {
      changeMode(mode) {
        this.mode = mode
      },
      buildAvatarUrl() {
        return `https://avatars.dicebear.com/api/${this.avatarType}/${this.avatarName}.svg`
      },

      updateUsername() {
        fetch(`${config.api.url}/users/me/username`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.$store.state.user.token}`
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
            "Authorization": `Bearer ${this.$store.state.user.token}`
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
            "Authorization": `Bearer ${this.$store.state.user.token}`
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
            "Authorization": `Bearer ${this.$store.state.user.token}`
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
      updateAvatarCustomUrl() {
        this.updateAvatar(this.avatarCustomUrl)
      },
      updateCustomAvatar() {
        this.updateAvatar(this.buildAvatarUrl())
      },
      updateAvatar(url) {
        fetch(`${config.api.url}/users/me/avatar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.$store.state.user.token}`
          },
          body: JSON.stringify({
            avatar: url
          })
        }).then(async res => {
          if (res.status === 200) {
            this.avatar = url
            toast.success("Avatar updated")
          } else if (res.status === 400) {
            let data = await res.json()
            toast.error(data.error)
          } else {
            toast.error("Something went wrong")
          }
        }).catch(err => {
          toast.error(err.toString())
        })
      }
    },
    created() {

      if (!this.$store.state.user.token && this.$store.state.user.expired) {
        this.$router.push("/login");
      }

      fetch(`${config.api.url}/users/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.$store.state.user.token}`
        }
      })
        .then(async response => {
          let data = await response.json();

          if (!response.ok || response.status === 401) {
            return await this.$router.push("/login");
          }

          this.username = data.username;
          this.biography = data.biography;
          this.oauth = data.oauth;
          this.avatar = data.avatar;

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
