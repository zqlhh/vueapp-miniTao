<template>
  <div class="recommend">
    <h1 class="recommend-title">每日推荐</h1>
    <div class="recommend-content">
      <img class="pic" :src="pictUrl" alt="" />
      <h2 class="title">{{ title }}</h2>
      <p class="text">{{ couponInfo }}</p>
      <button class="copy css-3d-btn" @click="onCopy">淘</button>
    </div>
  </div>
</template>

<script>
import copy from "../utils/copy.js";
import urlParse from "../utils/url.js";
import { token } from "../api/api";

export default {
  name: "Recommend",
  inject: ["showToast"],
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
        const goodInfo = urlParse();
        this.setData(goodInfo);
        localStorage.goodInfo = JSON.stringify(goodInfo);
      } else {
        const localGoodInfo = JSON.parse(localStorage.goodInfo);
        this.setData(localGoodInfo);
      }
    },
    // 设置数据项
    setData(obj) {
      this.pictUrl = obj.pictUrl;
      this.title = obj.title;
      this.couponInfo = obj.couponInfo;
      this.couponClickUrl = obj.couponClickUrl;
      this.zkFinalPrice = obj.zkFinalPrice;
    },
    // 复制淘口令
    onCopy() {
      token({
        couponClickUrl: this.couponClickUrl,
        pictUrl: this.pictUrl,
        title: this.title
      })
        .then(result => {
          if (!result.data.data) return;
          copy(result.data.data.model || "复制出错了");
          this.showToast();
        })
        .catch(err => {
          console.log(err);
        });
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
    margin-bottom: 30px;
    display: inline-block;
    font-size: 24px;
    background-image: -webkit-gradient(
      linear,
      left center,
      right center,
      from(rgb(231, 164, 63)),
      to(rgb(233, 102, 27))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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

    .copy {
      border: none;
      outline: none;
      display: inline-block;
      margin-top: 40px;
      font-size: 24px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      color: #fff;
      background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);

      &.css-3d-btn {
        position: relative;
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.4);
        transition: all 0.1s ease;
      }
      &.css-3d-btn:active {
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
        top: 2px;
      }
    }
  }
}
</style>
