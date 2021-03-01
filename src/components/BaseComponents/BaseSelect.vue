<template>
  <div class="container" :style="styleSelect">
    <p
      class="label"
      v-if="label"
      @click.stop="openDropdown = !openDropdown"
    >{{label}}</p>
    <div
      class="input item"
      data-form="form"
      :data-value="currentValue.value || currentValue.title"
      :class="{open: openDropdown, close: !openDropdown}"
      @click.stop="openDropdown = !openDropdown">
      {{ currentValue.title }}
    </div>

    <div class="dropdown" v-show="openDropdown">
      <div
        class="option item"
        v-for="(option, index) in options"
        @click.stop="changeOption(option)"
        :key="option.id || index"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      required: true,
      default() {
        return [
          { title: 'Value 1' },
          { title: 'Value 2' },
          { title: 'Value 3' },
          { title: 'Value 4' },
        ];
      },
    },
    currentValue: {
      type: Object,
      required: true,
      default() {
        return { title: 'Value 1' };
      },
    },
    label: String,
    styleSelect: Object,
  },
  data() {
    return {
      openDropdown: false,
    };
  },
  mounted() {
    window.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    changeOption(option) {
      this.$emit('change', option);
      this.openDropdown = false;
    },
    closeDropdown() {
      this.openDropdown = false;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 150px;
  margin-bottom: 20px;
  background: #fff;
}

.container > * {
  border: 1px solid rgba(204, 204, 204, 0.2);
}

.item {
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.dropdown {
  position: absolute;
  left: 0;
  right: 0;
  max-height: 115px;
  background: #fff;
  overflow-y: auto;
  border-top: none;
  border-bottom: none;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 5px 10px -7px #000;
}

.label {
  padding: 5px 0;
  margin: 0 0 5px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.input {
  position: relative;
}

.input:hover {
  background: rgba(204, 204, 204, 0.1);
}

.input:active {
  background: rgba(204, 204, 204, 0.3);
}

.input::before {
  content: "";
  position: absolute;
  right: 13.5px;
  width: 9.5px;
  transition: 0.2s;
  border-bottom: 1px solid #000;
}

.input::after {
  content: "";
  position: absolute;
  right: 7px;
  width: 9.5px;
  transition: 0.2s;
  border-bottom: 1px solid #000;
}

.option:hover {
  background: rgba(204, 204, 204, 0.3);
}

.close.input::after {
  transform: rotate(-45deg);
}

.close.input::before {
  transform: rotate(45deg);
}

.open.input::after {
  transform: rotate(45deg);
}

.open.input::before {
  transform: rotate(-45deg);
}
</style>
