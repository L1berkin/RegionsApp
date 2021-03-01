<template>
  <div class="container-region">
    <img src="../assets/logo-city.png" alt="Регион" class="logo" />
    <form class="form">
      <div class="input-box">
        <base-input
          v-if="currentOption.value > 0"
          :label="'Введите название города'"
          :placeholder="'Санкт-Петербург'"
          :required="true"
          v-model.trim="cityName"
        ></base-input>
        <base-input
          v-if="currentOption.value > 1"
          :label="'Введите название района'"
          :placeholder="'Адмиралтейский район'"
          :required="true"
          v-model.trim="areaName"
        ></base-input>
        <base-input
          v-if="currentOption.value > 2"
          :label="'Введите название округа'"
          :placeholder="'МО Василевский'"
          :required="true"
          v-model.trim="districtName"
        ></base-input>
        <base-button
          :styles="{ marginTop: '20px' }"
          :type="'submit'"
          :disabled="!validate"
          @click.prevent.once="createAndRedirect"
        ></base-button>
      </div>
      <base-select
        :options="selectOptions"
        :currentValue="currentOption"
        :label="'Выберите тип МО:'"
        @change="changeOption"
      ></base-select>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { checkOnDuplicate, normalizeRegionName } from '../helpers/helper.functions';
import BaseButton from './BaseComponents/BaseButton.vue';
import BaseInput from './BaseComponents/BaseInput.vue';
import BaseSelect from './BaseComponents/BaseSelect.vue';

export default {
  name: 'CreateRegion',
  components: { BaseSelect, BaseInput, BaseButton },
  data() {
    return {
      regions: [],
      selectOptions: [
        { title: 'Город', value: 1 },
        { title: 'Район', value: 2 },
        { title: 'Округ', value: 3 },
      ],
      currentOption: { title: 'Город', value: 1 },
      cityName: '',
      areaName: '',
      districtName: '',
    };
  },
  computed: {
    validate() {
      const type = this.currentOption.value;
      if (type === 1) {
        return this.cityName.length;
      }
      if (type === 2) {
        return this.cityName.length && this.areaName.length;
      }
      if (type === 3) {
        return this.cityName.length && this.areaName.length && this.districtName.length;
      }
      return false;
    },
    validCityName() {
      return normalizeRegionName(this.cityName, 1);
    },
    validAreaName() {
      return normalizeRegionName(this.areaName, 2);
    },
    validDistrictName() {
      return normalizeRegionName(this.districtName, 3);
    },
  },
  mounted() {
    this.getRegions();
  },
  methods: {
    async getRegions() {
      const { data } = await axios.get('https://salty-shelf-51947.herokuapp.com/api/region');
      this.regions = data;
    },
    changeOption(option) {
      this.currentOption = option;
    },
    async getParentRegion(parentName, parentType) {
      const parent = this.regions.filter(el => el.name === parentName);
      if (parent.length) {
        return parent[0].id;
      }
      const id = await this.sendRegion(parentType);
      return id;
    },
    async createRegion(type) {
      const body = {};

      switch (type) {
        case 3:
          if (checkOnDuplicate(this.regions, type, this.districtName, this.areaName)) {
            this.$router.push('/');
            return false;
          }

          body.name = this.validDistrictName;
          body.parent_id = await this.getParentRegion(this.validAreaName, 2);
          break;
        case 2:
          if (checkOnDuplicate(this.regions, type, this.areaName, this.cityName)) {
            this.$router.push('/');
            return false;
          }

          body.name = this.validAreaName;
          body.parent_id = await this.getParentRegion(this.validCityName, 1);
          break;
        case 1:
          if (checkOnDuplicate(this.regions, type, this.cityName)) {
            this.$router.push('/');
            return false;
          }

          body.name = this.validCityName;
          break;
        default: return false;
      }

      body.type = type;
      return body;
    },
    async sendRegion(type = this.currentOption.value) {
      const body = await this.createRegion(type);
      if (body) {
        try {
          const response = await axios.post('https://salty-shelf-51947.herokuapp.com/api/region', body);
          const { id } = response.data.data;
          return id;
        } catch (e) {
          console.error(e);
        }
      }

      return body;
    },
    async createAndRedirect() {
      await this.sendRegion();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.container-region {
  width: 80%;
  max-width: 900px;
  padding: 20px;
  display: flex;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0 0 10px -5px #000;
}

.form {
  display: flex;
  flex-grow: 1;
}

.logo {
  width: 90px;
  height: 90px;
  pointer-events: none;
}

.input-box {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  flex-grow: 1;
}

@media screen and (max-width: 740px) {
  .logo {
    display: none;
  }
}

@media screen and (max-width: 560px) {
  .form {
    flex-direction: column-reverse;
  }

  .input-box {
    margin: 0;
  }
}
</style>
