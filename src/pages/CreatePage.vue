<template>
  <div class="container-create">
    <h2 class="title">
      Создать новый регион
    </h2>
    <create-region></create-region>
  </div>
</template>

<script>
import CreateRegion from '../components/CreateRegion.vue';

export default {
  name: 'CreatePage',
  components: { CreateRegion },
};
</script>

<style scoped>
.title {
  font-size: 2rem;
  text-align: center;
}

@media screen and (max-width: 560px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
