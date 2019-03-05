<template>
  <div id="app">
    <div class="viewport-wrapper">
      <router-view />
    </div>
    <tab-bar></tab-bar>
    <toast v-show="visiable"></toast>
  </div>
</template>

<script>
import TabBar from "./components/tab-bar/tab-bar";
import Toast from "./components/toast/toast";
export default {
  components: {
    TabBar,
    Toast
  },
  data() {
    return {
      visiable: false,
      bodyHeight: ""
    };
  },
  // 依赖
  provide() {
    return {
      showToast: this.showToast
    };
  },
  created() {
    this.bodyHeight = document.body.clientHeight;
    document.getElementsByTagName("body")[0].style.minHeight =
      this.bodyHeight + "px";
  },
  methods: {
    // 显示提示
    showToast() {
      if (!this.visiable) {
        this.visiable = true;
        setTimeout(() => {
          this.visiable = false;
        }, 1500);
      }
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
