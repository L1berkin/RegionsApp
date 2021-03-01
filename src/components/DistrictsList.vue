<template>
  <div class="container-districts">
    <p class="title">
      <router-link
        :to="{
            name: 'RegionPage',
            path: `/region/${region.id}`,
            params: {id: region.id}
          }"
      >
        {{region.name}}
      </router-link>
    </p>
    <ul
      class="list"
      v-if="region.children.length"
    >
      <li
        class="list__item"
        v-for="area in region.children"
        :key="area.id"
      >
        <router-link
          :to="{
            name: 'RegionPage',
            path: `/region/${area.id}`,
            params: {id: area.id}
          }"
        >{{area.name}}</router-link>
      </li>
    </ul>
    <p
      class="message"
      v-else
    >Нет регионов</p>
  </div>
</template>

<script>
export default {
  name: 'DistrictsList',
  props: {
    region: Object,
  },
};
</script>

<style scoped>
.container-districts {
  width: 30%;
  margin: 0 1.5% 20px;
}

.title {
  position: relative;
  padding: 0 5px;
  font-size: .9rem;
  font-weight: bold;
  line-height: 1.5rem;
}

.title::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  border-radius: 2px;
  background: #274696;
}

.title a {
  text-decoration: none;
  color: #000;
}

.title a:hover {
  color: #274696;
}

.title a:active {
  color: #000;
}

.message {
  font-size: .9rem;
  color: rgb(120, 120, 120);
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list__item {
  font-size: .8rem;
  border: 1px solid #eee;
}

.list__item a {
  display: block;
  padding: 10px 20px;
  color: #000;
  text-decoration: none;
}

.list__item a:hover {
  background: rgba(204, 204, 204, 0.2);
}

.list__item a:active {
  background: rgba(204, 204, 204, 0.1);
}

@media screen and (max-width: 840px) {
  .container-districts {
    width: 45%;
    margin: 0 2.5% 20px;
  }
}

@media screen and (max-width: 560px) {
  .container-districts {
    width: 100%;
    margin: 0 0 20px;
  }
}
</style>
