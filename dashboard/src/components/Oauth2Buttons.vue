<template>
  <hr style="border: none; border-bottom: 1px solid #bfbfbf; width: 80%;margin-bottom: 10px">
  <div class="btn-oauth2">
    <div class="google-btn" @click="openGoogleOauth2">
      <div class="google-icon-wrapper">
        <img class="google-icon" src="../assets/medias/google_logo.svg"/>
      </div>
      <p class="btn-text"><b> Login with Google</b></p>
    </div>
    <br>
    <div class="discord-btn" @click="openDiscordOauth2">
      <div class="discord-icon-wrapper">
        <img class="discord-icon" src="../assets/medias/discord_logo.svg"/>
      </div>
      <p class="btn-text"><b> Login with Discord</b></p>
    </div>
  </div>
</template>

<script>
import config from "@/config.json";

export default {
  name: 'Oauth2Buttons',
  methods: {
    openGoogleOauth2() {
      return window.location.href = (config.oauth2.google)
    },
    openDiscordOauth2() {
      return window.location.href = (config.oauth2.discord)
    }
  }
}
</script>

<style>
.btn-big {
  width: 100%;
}

.google-btn {
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .25);
}
.google-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
}
.google-icon {
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;
}

.discord-btn {
  width: 184px;
  height: 42px;
  background-color: #5865F2;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .25);
}
.discord-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
}
.discord-icon {
  position: absolute;
  margin-top: 7px;
  margin-left: 7px;
  width: 28px;
  height: 28px;
}

.btn-text {
  float: right;
  margin: 11px 11px 0 0;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
}

.btn-oauth2 {
  cursor: pointer;
}
</style>
