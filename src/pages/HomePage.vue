<template>
  <div class="conatiner-home">
    <search-bar
      @filter="filterRegions"
    ></search-bar>
    <loader
      v-if="loading"
    ></loader>
    <regions-list
      v-else
      :regions="currentRegions"
    ></regions-list>
  </div>
</template>

<script>
import axios from 'axios';
import { toUpperCaseFirst } from '../helpers/helper.functions';
import RegionsList from '../components/RegionsList.vue';
import SearchBar from '../components/SearchBar.vue';
import Loader from '../components/Loader.vue';

export default {
  name: 'HomePage',
  components: { RegionsList, SearchBar, Loader },
  data() {
    return {
      loading: true,
      regions: [],
      currentRegions: [],
    };
  },
  mounted() {
    this.getRegions();
  },
  methods: {
    async getRegions() {
      const { data } = await axios.get('https://salty-shelf-51947.herokuapp.com/api/region');
      this.regions = data;
      this.currentRegions = data.filter(el => el.type === 1);
      this.loading = false;
    },
    getFilteredRegions(value) {
      const currentElements = this.regions
        .filter(el => el.name === value
        || el.name === `МО ${value}`
        || el.name === `${value} район`);

      if (currentElements.length && currentElements[0].parent) {
        const parentElement = this.regions.filter(region => {
          const newArr = currentElements.filter(el => region.id === el.parent.id);
          return newArr.length;
        });
        return parentElement;
      }

      return currentElements;
    },
    filterRegions(title) {
      if (!title.trim()) {
        this.currentRegions = this.regions.filter(el => el.type === 1);
        return;
      }

      const value = toUpperCaseFirst(title.toLowerCase());
      this.currentRegions = this.getFilteredRegions(value);
    },
  },
};
</script>
