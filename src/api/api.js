import http from "../utils/http.js";

// 商品搜索
const searchGood = ({ pageNum, pageSize, searchText }) => {
  return http.get("/item/search", {
    params: {
      pageNum,
      pageSize,
      searchText
    }
  });
};

// 淘口令

const token = params => {
  return http.post("/item/token", {
    couponClickUrl: params.couponClickUrl,
    pictUrl: params.pictUrl,
    title: params.title
  });
};

export { searchGood, token };
