<template>
  <Header/>
  {{ username }}
</template>

<script>
import Header from "@/components/Header";
import config from "@/config.json";
import { useToast } from "vue-toastification"
import "vue-toastification/dist/index.css";

export default {
  name: 'Dashboard',
  components: {
    Header
  },
  data() {
    return {
      username: null
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
        let data = await response.json();
        console.log(data);
        this.username = data.username;
        console.log(this.username);
      })
    .catch(error => {
      toast.error(error.toString());
    });

  }
}

</script>

<style>

</style>