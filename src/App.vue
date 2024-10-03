<script setup>
import Welcome from './components/Welcome.vue'
import SearchForm from './components/SearchForm.vue'
import MapContainer from './components/MapContainer.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <Welcome msg="Welcome!" />
    </div>
  </header>
  <MapContainer />

  <main>
    <SearchForm />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
