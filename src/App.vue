<template>
  <div id="app">
    <div class="viewport-wrapper">
      <router-view @hide="hide" @show="show" />
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
      visiable: true
    };
  },
  methods: {
    hide(val) {
      console.log(val);
      this.visiable = val;
    },
    show(val) {
      this.visiable = val;
    }
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
