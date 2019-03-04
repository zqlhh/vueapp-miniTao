<template>
  <div class="recommend">
    <h1 class="recommend-title">每日推荐</h1>
    <div class="recommend-content">
      <img class="pic" :src="pictUrl" alt="" />
      <h2 class="title">{{ title }}</h2>
      <p class="text">{{ couponInfo }}</p>
    </div>
  </div>
</template>

<script>
import urlParse from "../utils/url.js";
export default {
  name: "Recommend",
  data() {
    return {
      pictUrl: "",
      title: "",
      couponInfo: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (!localStorage.goodInfo) {
        const {
          couponInfo,
          itemUrl,
          pictUrl,
          title,
          zkFinalPrice
        } = urlParse();
        this.pictUrl = pictUrl;
        this.title = title;
        this.couponInfo = couponInfo;
        localStorage.goodInfo = JSON.stringify(urlParse());
      } else {
        const good = JSON.parse(localStorage.goodInfo);
        this.pictUrl = good.pictUrl;
        this.title = good.title;
        this.couponInfo = good.couponInfo;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .recommend-title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #bb3818;
  }
  .recommend-content {
    text-align: center;
    .pic {
      width: 250px;
      height: 250px;
      border-radius: 3px;
      overflow: hidden;
    }

    .title {
      width: 50%;
      line-height: 1.5;
      margin: 10px auto;
    }

    .text {
      color: #ac8d04;
    }
  }
}
</style>
