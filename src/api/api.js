import http from "../utils/http.js";
const headers = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  ISFORMDATA: true
};

// 商品搜索
const searchGood = params => {
  return http.get("/item/search", {
    params
  });
};

// 淘口令
const token = data => {
  return http.post("/item/token", data, headers);
};

export { searchGood, token };
