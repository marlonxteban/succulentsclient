<template>
  <button
    class="button is-danger"
    v-if="$auth.isAuthenticated"
    @click.prevent="logout"
  >
    Log Out
  </button>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push({ path: '/' });
    },
  },
};
</script>
