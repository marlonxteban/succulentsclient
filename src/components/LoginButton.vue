<template>
  <button
    class="button is-success"
    v-if="!$auth.isAuthenticated"
    @click="login"
  >
    Log In
  </button>
</template>

<script>
export default {
  name: 'LoginButton',
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
  },
};
</script>
