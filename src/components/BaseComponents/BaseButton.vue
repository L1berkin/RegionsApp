<template>
  <button
    class="base-btn"
    :type="type"
    :style="styles"
    :disabled="disabled"
    :title="title"
    @click="$emit('click', $event)"
  >
    <slot>Отправить</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    styles: Object,
    type: String,
    disabled: Boolean,
    title: String,
  },
};
</script>

<style scoped>
.base-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-transform: lowercase;
  color: #fff;
  font-size: 1rem;
  background: #274696;
  transition: .1s;
  border-radius: 2px;
  border: none;
  outline: none;
  cursor: pointer;
}

.base-btn:hover {
  background: #3157b8;
}

.base-btn:active {
  background: #274696;
}

.base-btn[disabled] {
  background: #ccc;
}

@media screen and (max-width: 560px) {
  .base-btn {
    padding: 7px;
    font-size: .8rem;
  }
}
</style>
