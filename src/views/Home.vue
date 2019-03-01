<template>
  <div class="home" ref="home">
    <div class="content">
      <!-- 搜索框 -->
      <div class="search">
        <input type="text" placeholder="请输入搜索内容" v-model="searchText" />
        <span class="search-icon" @click="onSearch"></span>
      </div>
      <!-- 商品区域 -->
      <ul class="good-wrapper">
        <li class="item" v-for="(good, index) in dataList" :key="index">
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
        </li>
      </ul>
      <!-- 返回顶部 -->
      <span class="top"></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { searchGood, produceLink } from "../api/api";
export default {
  name: "home",
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
    // 搜索
    onSearch() {
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
            font-weight: 700;

            .old-price {
              margin-right: 10px;
              color: rgb(172, 141, 4);
            }

            .new-price {
              color: rgb(187, 56, 24);
            }
          }
        }
      }
    }
  }
}
</style>
