<template>
  <div id="sidebar">
    <div>
      <button class="sidebar__item home_button" @click="this.$router.push('/')"><i class="fas fa-home"></i> Home</button>
    </div>
    <div v-for="item in items" :key="item">
      <button class="sidebar__item" @click="itemClicked(item.name)"><i v-bind:class="item.icon"></i> {{ item.name }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    itemClicked(event) {
      this.$emit('clicked', event);
    }
  }
}
</script>

<style lang="css" scoped>
#sidebar {
  position: absolute;
  width: 250px;
  height: calc(100% - 65px);
  top: 65px;
}
button {
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: #e5e5e5;
}
button.home_button {
  background-color: #3398d5;
}
</style>