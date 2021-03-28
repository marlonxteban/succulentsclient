<template>
  <div class="navbar-brand">
    <a
      class="navbar-item"
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab js-logo fa-vuejs fa-2x" aria-hidden="true" />
    </a>
    <div class="navbar-item nav-home">
      <span class="tour">SUCCULENTS</span>
      <span class="heroes">CLIENT</span>
    </div>
    <AuthNav />
    <button
      class="link navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>
</template>
<script>
import AuthNav from '@/components/AuthNav';

export default {
  components: { AuthNav },
};
</script>
