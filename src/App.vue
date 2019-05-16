<template>
  <div id="app">
    <router-link to="/" ></router-link>
    <router-view/>
  </div>
</template>

<style lang="less">
body,html,ul,li{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
li{
  list-style: none;
}
html, body, :global(#root){
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  overflow-x: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;
}
#nav {
  padding: 3rem;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
