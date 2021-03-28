<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Families</h2>
          <button class="button refresh-button" @click="loadFamilies()">
            <i class="fas fa-sync"></i>
          </button>
          <router-link
            tag="button"
            class="button add-button"
            :to="{ name: 'family-detail', params: { id: 0 } }"
          >
            <i class="fas fa-plus"></i>
          </router-link>
          <ul>
            <li v-for="family in families" :key="family.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="family.name" class="name">
                      {{ family.name }}
                    </div>
                    <div class="environment">{{ family.environment }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link
                    :to="{
                      name: 'family-detail',
                      params: { id: family.id },
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
  name: 'Families',
  data() {
    return {
      families: [],
      message: '',
    };
  },
  async created() {
    await this.loadFamilies();
  },
  methods: {
    async loadFamilies() {
      this.families = [];
      this.message = 'getting the families, please be patient';
      this.families = await dataService.getFamilies();
      this.message = '';
    },
  },
};
</script>
