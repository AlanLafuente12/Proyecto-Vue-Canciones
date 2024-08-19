<template>
  <Menu>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/canciones">Canciones</router-link>
    <router-link to="/artistas">Artistas</router-link>
  </Menu>
  <router-view class="m-3"/>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Menu
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss">
td{
  margin: 10px !important;
}
</style>
