<template>
  <router-link
    class="base-link"
    exact
    :to="to"
    :style="styles"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    styles: Object,
    to: Object,
  },
};
</script>

<style scoped>
.base-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-transform: lowercase;
  text-decoration: none;
  color: #fff;
  background: #274696;
  transition: .1s;
  border-radius: 2px;
  border: none;
  outline: none;
  cursor: pointer;
}

.base-link:hover {
  background: #3157b8;
}

.base-link:active {
  background: #274696;
}

@media screen and (max-width: 560px) {
  .base-link {
    padding: 7px;
    font-size: .8rem;
  }
}
</style>
