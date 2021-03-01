<template>
  <div id="app">
    <base-link
      v-if="this.$route.path === '/'"
      :to="{
        name: 'CreatePage',
        path: '/create'
      }"
      :styles="linkStyle"
    >Создать регион</base-link>
    <base-link
      v-else
      :to="{
        name: 'HomePage',
      }"
      :styles="linkStyle"
    >Главная</base-link>
    <div
      class="poster"
    ></div>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseLink from './components/BaseComponents/BaseLink.vue';

export default {
  name: 'App',
  data() {
    return {
      linkStyle: {
        position: 'absolute',
        top: '10px',
        left: '10px',
      },
    };
  },
  components: { BaseLink },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow-y: scroll;
  min-width: 320px;
  min-height: 100vh;
}

.poster {
  width: 100%;
  height: 30vh;
  background: url("./assets/main-background.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
