<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Succulents</h2>
          <button class="button refresh-button" @click="loadSucculents()">
            <i class="fas fa-sync"></i>
          </button>
          <router-link
            tag="button"
            class="button add-button"
            :to="{ name: 'succulent-detail', params: { id: 0 } }"
          >
            <i class="fas fa-plus"></i>
          </router-link>
          <ul>
            <li v-for="succulent in succulents" :key="succulent.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="succulent.name" class="name">
                      {{ succulent.name }}
                    </div>
                    <div class="description">{{ succulent.life_time }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link
                    :to="{
                      name: 'succulent-detail',
                      params: { id: succulent.id },
                    }"
                    tag="button"
                    class="link card-footer-item"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataService } from '../shared';

export default {
  name: 'Succulents',
  data() {
    return {
      succulents: [],
      message: '',
    };
  },
  async created() {
    await this.loadSucculents();
  },
  methods: {
    async loadSucculents() {
      this.succulents = [];
      this.message = 'getting the succulents, please be patient';
      this.succulents = await dataService.getSucculents();
      this.message = '';
    },
  },
};
</script>
