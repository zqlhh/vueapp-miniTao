<template>
  <div class="home" ref="home">
    <div class="content">
      <!-- 搜索框 -->
      <div class="search">
        <input
          ref="input"
          type="text"
          placeholder="请输入搜索内容"
          v-model="searchText"
        />
        <span class="search-icon" @click="onSearch"></span>
      </div>
      <!-- 商品区域 -->
      <ul class="good-wrapper" @click="onClickWrapper">
        <li
          class="item"
          contenteditable="true"
          v-for="(good, index) in dataList"
          :key="index"
          @click.stop.prevent="onShare(good)"
        >
          <div class="left">
            <img :src="good.pictUrl" alt="" width="80" height="80" />
          </div>
          <div class="right">
            <h1 class="title">{{ good.title | _dealTitle }}</h1>
            <div class="price">
              <span class="old-price">原价: {{ good.zkFinalPrice }}</span>
              <span class="new-price"
                >券后:
                {{ _dealPrice(good.zkFinalPrice, good.couponInfo) }}</span
              >
            </div>
          </div>
          <span class="tkl">淘</span>
        </li>
      </ul>
    </div>
    <!-- 返回顶部 -->
    <span class="top" @click="onScrollTop">
      <img src="../assets/images/top.png" alt="" width="30" height="30" />
    </span>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import copy from "../utils/copy.js";
import { searchGood, token } from "../api/api";

export default {
  name: "home",
  inject: ["showToast"],
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      searchText: "",
      number: 100,
      dataList: []
    };
  },
  filters: {
    _dealTitle(value) {
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    }
  },
  created() {
    this.loadData();
    this.initScroll();
  },
  methods: {
    onScrollTop() {
      console.log(11);
      this.scroll.scrollTo(0, 0, 300);
    },
    // 点击正文项时
    onClickWrapper() {
      this.hideKeyboard();
    },
    // 隐藏键盘
    hideKeyboard() {
      this.$refs.input.blur();
    },
    // 复制淘口令
    onShare(good) {
      token({
        couponClickUrl: good.couponClickUrl,
        pictUrl: good.pictUrl,
        title: good.title
      })
        .then(result => {
          copy(result.data.data.model);
          this.showToast();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索
    onSearch() {
      this.hideKeyboard();
      this.dataList = [];
      this.loadData();
    },
    // 处理券后价格
    _dealPrice(price, desc) {
      let arr = desc.split("元");
      let num1 = arr[0].substring(1);
      let num2 = arr[1].substring(1);

      if (price >= num1) {
        let p = price - num2;
        return p.toFixed(2);
      }
      return price;
    },

    // 初始化滚动
    initScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.home, {
          click: true,
          scrollY: true,
          pullUpLoad: true
        });

        this.scroll.on("pullingUp", () => {
          this.pageNum++;
          this.loadData();
        });
      });
    },
    // 获取数据
    loadData() {
      searchGood({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        searchText: this.searchText
      })
        .then(result => {
          this.dataList = this.dataList.concat(result.data.data);
          if (this.scroll) {
            this.scroll.finishPullUp();
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .content {
    padding: 20px;
    box-sizing: border-box;
    .search {
      position: relative;
      margin-bottom: 10px;
      input {
        width: 82%;
        height: 30px;
        border-radius: 15px;
        text-indent: 20px;
        border: 1px solid #eee;
      }

      .search-icon {
        position: absolute;
        top: 2px;
        right: 15px;
        width: 25px;
        height: 25px;
        background-image: url("../assets/images/search.png");
        background-repeat: no-repeat;
        background-size: 25px 25px;
        background-position: center;
      }
    }
    .good-wrapper {
      .item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        padding: 15px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .left {
          margin-right: 15px;
          img {
            border-radius: 5px;
            border: 1px solid #eee;
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-size: 14px;
            line-height: 20px;
            color: #444;
          }

          .price {
            font-size: 14px;
            margin-bottom: 4px;

            .old-price {
              margin-right: 10px;
              color: rgb(172, 141, 4);
            }

            .new-price {
              color: rgb(187, 56, 24);
            }
          }
        }

        .tkl {
          position: absolute;
          bottom: 20px;
          right: 10px;
          padding: 5px;
          font-size: 14px;
          border-radius: 50%;
          color: #fff;
          background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
        }
      }
    }
  }
  .top {
    position: absolute;
    right: 20px;
    bottom: 40px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }
}
</style>
