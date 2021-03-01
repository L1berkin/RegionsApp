<template>
  <div class="container-region">
    <loader
      v-if="loading"
    ></loader>
    <template
      v-else
    >
      <h2 class="title">{{this.region.name}}</h2>
      <info-region
        :region="region"
      ></info-region>
      <base-button
        :styles="stylesButton"
        @click="deleteRegion"
        :disabled="!canDelete"
        :title="buttonTitle"
      >Удалить компонент</base-button>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import BaseButton from '../components/BaseComponents/BaseButton.vue';
import InfoRegion from '../components/InfoRegion.vue';
import Loader from '../components/Loader.vue';

export default {
  name: 'RegionPage',
  components: { InfoRegion, BaseButton, Loader },
  data() {
    return {
      region: {},
      loading: true,
      children: [],
      stylesButton: {
        marginTop: '30px',
      },
    };
  },
  computed: {
    canDelete() {
      return this.children.length === 0;
    },
    buttonTitle() {
      return this.canDelete ? null : 'Данный регион имеет вложенные регионы';
    },
  },
  mounted() {
    this.getRegion();
  },
  methods: {
    async getRegion() {
      const { id } = this.$route.params;
      const { data } = await axios.get(`https://salty-shelf-51947.herokuapp.com/api/region/${id}`);
      this.children = data.children ? data.children : [];
      this.region = data;
      this.loading = false;
    },
    async deleteRegion() {
      if (this.canDelete) {
        const { id } = this.$route.params;
        await axios.delete(`https://salty-shelf-51947.herokuapp.com/api/region/${id}`);
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.container-region {
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
}

@media screen and (max-width: 560px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
