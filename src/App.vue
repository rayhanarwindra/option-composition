<template>
  <nav>
    <router-link to="/options">Options</router-link>
    <router-link to="/composition">Composition</router-link>
  </nav>
  <router-view/>
</template>

<script>
  document.body.style.background = '#000'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #CF0A0A;
}

nav {
  text-align: center;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #EEEEEE;
  margin-left: 10px;
}

nav a.router-link-exact-active {
  color: #DC5F00;
}
</style>
