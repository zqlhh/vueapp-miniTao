<template>
  <div class="tab-bar">
    <router-link to="/Recommend" tag="div" class="tab-item">
      <img
        class="icon"
        src="../../assets/images/recommend.png"
        alt=""
        width="25"
        height="25"
      />
      <p class="text">每日推荐</p>
    </router-link>
    <router-link to="/Home" tag="div" class="tab-item">
      <img
        class="icon"
        src="../../assets/images/shopping.png"
        alt=""
        width="25"
        height="25"
      />
      <p class="text">优惠商城</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tab-bar",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);

  .tab-item {
    padding: 8px 0;
    flex: 1;
    font-size: 0;

    .text {
      font-size: 12px;
      margin-top: 2px;
    }

    &.router-link-active {
      color: #bb3818;
    }
  }
}
</style>
