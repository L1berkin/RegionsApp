<template>
  <div class="container-info">
    <table class="table">
      <caption class="title">Краткая информация по региону</caption>
      <tr>
        <td>Имя</td>
        <td>{{region.name}}</td>
      </tr>
      <tr>
        <td>Тип</td>
        <td>{{typeRegion}}</td>
      </tr>
      <tr v-if="region.parent">
        <td>Место</td>
        <td>
          <router-link
            :to="{
              name: 'RegionPage',
              params: {id: region.parent.id}
            }"
          >
            {{region.parent.name}}
          </router-link>
        </td>
      </tr>
      <tr
        v-if="region.children && region.children.length"
      >
        <td>Содержит</td>
        <td>
          <router-link
            v-for="child in region.children"
            :key="child.id"
            :to="{
              name: 'RegionPage',
              params: {id: child.id}
            }"
          >{{child.name}}</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'InfoRegion',
  props: {
    region: {
      type: Object,
      required: true,
    },
  },
  computed: {
    typeRegion() {
      switch (this.region.type) {
        case 1: return 'Город';
        case 2: return 'Район';
        case 3: return 'Округ';
        default: return '';
      }
    },
  },
};
</script>

<style scoped>
.container-info {
  width: 80%;
  padding: 10px;
  min-height: 200px;
  box-shadow: 0 3px 10px -7px #000;
  border-radius: 10px;
}

.title {
  font-size: 1.5rem;
  padding: 5px;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table td {
  padding: 10px;
  font-weight: bold;
  border: 1px solid #000;
}

.table td a {
  display: block;
  white-space: nowrap;
  color: #000;
  text-decoration: none;
  margin-right: 10px;
}

.table td a:hover {
  color: #274696;
}

.table td a:active {
  color: #000;
}

@media screen and (max-width: 560px) {
  .title {
    font-size: 1rem;
  }

  .table {
    font-size: .8rem;
  }
}
</style>
