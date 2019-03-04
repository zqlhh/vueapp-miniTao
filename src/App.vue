<template>
  <div id="app">
    <div class="viewport-wrapper">
      <router-view />
    </div>
    <tab-bar v-if="visiable"></tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/tab-bar/tab-bar";
export default {
  components: {
    TabBar
  },
  data() {
    return {
      visiable: true,
      bodyHeight: ""
    };
  },
  created() {
    this.bodyHeight = document.body.clientHeight;
    document.getElementsByTagName("body")[0].style.minHeight =
      this.bodyHeight + "px";
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
  overflow: hidden;

  .viewport-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    background: #ffffff;
    overflow: hidden;
  }
}
* {
  box-sizing: border-box;
}
</style>
