<template>
  <div id="app">
    <div class="viewport-wrapper">
      <router-view />
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/tab-bar/tab-bar";
export default {
  components: {
    TabBar
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  color: #707070;
  background: #fff;
  overflow: hidden;

  .viewport-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    overflow: hidden;
  }
}
* {
  box-sizing: border-box;
}
</style>
