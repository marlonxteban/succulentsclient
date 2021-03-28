<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">{{ title }}</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ family.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="name">name</label>
              <input class="input" name="name" v-model="family.name" />
            </div>
            <div class="field">
              <label class="label" for="environment">environment</label>
              <input
                class="input"
                name="environment"
                v-model="family.environment"
              />
            </div>
            <div class="field">
              <label class="label" for="name">weather</label>
              <input class="input" name="weather" v-model="family.weather" />
            </div>
            <div class="field">
              <label class="label" for="name">differentiator</label>
              <input
                class="input"
                name="differentiator"
                v-model="family.differentiator"
              />
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="link card-footer-item cancel-button"
            @click="cancelFamily()"
          >
            <i class="fas fa-undo"></i>
            <span>Cancel</span>
          </button>
          <button class="link card-footer-item" @click="saveFamily()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
          <button class="link card-footer-item" @click="deleteFamily()">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { dataService } from '../shared';

export default {
  name: 'FamilyDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      family: {},
    };
  },
  async created() {
    if (this.isAddMode) {
      this.family = {
        id: undefined,
        name: '',
        environment: '',
        weather: '',
        differentiator: '',
      };
    } else {
      this.family = await dataService.getFamily(this.id);
    }
  },
  computed: {
    fullName() {
      return this.family ? `${this.family.name}` : '';
    },
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? 'Add' : 'Edit'} Family`;
    },
  },
  methods: {
    cancelFamily() {
      this.$router.push({ name: 'families' });
    },
    async saveFamily() {
      try {
        const token = await this.$auth.getTokenSilently();
        this.family.id
          ? await dataService.updateFamily(this.family, token)
          : await dataService.addFamily(this.family, token);
        this.$router.push({ name: 'families' });
      } catch (error) {
        this.$router.push({ name: 'auth-required' });
        return;
      }
    },
    async deleteFamily() {
      try {
        const token = await this.$auth.getTokenSilently();
        await dataService.deleteFamily(this.family.id, token);
        this.$router.push({ name: 'families' });
      } catch (error) {
        this.$router.push({ name: 'auth-required' });
        return;
      }
    },
  },
};
</script>
