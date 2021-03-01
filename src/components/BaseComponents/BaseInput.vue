<template>
  <div class="container-input">
    <label
      v-if="label"
      :for="id"
      class="label"
    >{{label}}</label>
    <input
      type="text"
      data-form="form"
      :id="id"
      class="field"
      :value="value"
      :required="required"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: String,
    placeholder: String,
    required: Boolean,
    value: String,
  },
  data() {
    return {
      id: `${Date.now()}${Math.random()}`,
    };
  },
};
</script>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.field {
  padding: 5px 0;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: .5s;
}

.field:focus {
  padding: 5px 10px;
  border-bottom: 1px solid rgb(118, 118, 118);
}

.label {
  padding: 5px 0;
  margin: 0 0 5px;
  cursor: pointer;
}
</style>
