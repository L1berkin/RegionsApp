<template>
  <div class="container-regions">
    <districts-list
      v-for="region in regions"
      :key="region.id"
      :region="region"
    ></districts-list>
    <p
      class="message"
      v-if="!regions.length"
    >Регионов, соответствующих поиску, не найдено.</p>
  </div>
</template>

<script>
import DistrictsList from './DistrictsList.vue';

export default {
  name: 'RegionsList',
  components: { DistrictsList },
  props: {
    regions: Array,
  },
};
</script>

<style scoped>
.container-regions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 30px auto 0;
}

.message {
  text-align: center;
  color: rgb(120, 120, 120);
}
</style>
