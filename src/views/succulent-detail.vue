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
              <label class="input" name="id" readonly>{{ succulent.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="name">name</label>
              <input class="input" name="name" v-model="succulent.name" />
            </div>
            <div class="field">
              <label class="label" for="name">family</label>
              <select v-model="succulent.family_id">
                <option value="" selected disabled>Choose</option>
                <option
                  v-for="family in families"
                  :value="family.id"
                  :key="family.id"
                >
                  {{ family.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label class="label" for="life_time">life time</label>
              <input
                class="input"
                name="life_time"
                v-model="succulent.life_time"
              />
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="link card-footer-item cancel-button"
            @click="cancelSucculent()"
          >
            <i class="fas fa-undo"></i>
            <span>Cancel</span>
          </button>
          <button class="link card-footer-item" @click="saveSucculent()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { dataService } from '../shared';

export default {
  name: 'SucculentDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      succulent: {},
      families: [],
    };
  },
  async created() {
    this.families = await dataService.getFamilies();
    if (this.isAddMode) {
      this.succulent = {
        id: undefined,
        name: '',
        life_time: '',
        family_id: '',
      };
    } else {
      try {
        const token = await this.$auth.getTokenSilently();
        this.succulent = await dataService.getSucculent(this.id, token);
      } catch (error) {
        this.$router.push({ name: 'auth-required' });
        return;
      }
    }
  },
  computed: {
    fullName() {
      return this.succulent ? `${this.succulent.name}` : '';
    },
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? 'Add' : 'Edit'} Succulent`;
    },
  },
  methods: {
    cancelSucculent() {
      this.$router.push({ name: 'succulents' });
    },
    async saveSucculent() {
      try {
        const token = await this.$auth.getTokenSilently();
        this.succulent.id
          ? await dataService.updateSucculent(this.succulent, token)
          : await dataService.addSucculent(this.succulent, token);
        this.$router.push({ name: 'succulents' });
      } catch (error) {
        this.$router.push({ name: 'auth-required' });
        return;
      }
    },
  },
};
</script>
