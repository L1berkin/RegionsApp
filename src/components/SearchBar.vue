<template>
  <div class="container-search">
    <base-button
      @click="filterRegions"
    >
      <img
        src="../assets/icons/icon-search.svg"
        alt="Поиск"
        width="20px"
      >
    </base-button>
    <input
      type="text"
      placeholder="Введите МО"
      class="field"
      v-model.trim="fieldValue"
      @keypress.enter="filterRegions"
    >
    <base-button
      @click="filterRegions"
    >Поиск</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseComponents/BaseButton.vue';

export default {
  name: 'SearchBar',
  components: { BaseButton },
  data() {
    return {
      fieldValue: '',
    };
  },
  methods: {
    filterRegions() {
      this.$emit('filter', this.fieldValue);
    },
  },
};
</script>

<style scoped>
.container-search {
  display: flex;
  width: 60%;
  margin: 20px auto 0;
}

.field {
  padding: 0 10px;
  flex-grow: 1;
  box-shadow: 0 0 10px -7px #000;
  border-radius: 2px;
  border: 1px solid #eee;
  outline: none;
}

@media screen and (max-width: 840px) {
  .container-search {
    width: 70%;
  }
}

@media screen and (max-width: 560px) {
  .container-search {
    width: 90%;
  }
}
</style>
