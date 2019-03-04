/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */

export default () => {
  let url = decodeURIComponent(window.location.search).slice(1);
  let obj = {};
  let arr = url.split("&");

  if (arr) {
    arr.forEach(item => {
      let index = item.indexOf("=");
      let key = decodeURIComponent(item.slice(0, index));
      let val = decodeURIComponent(item.slice(index + 1));
      obj[key] = val;
    });
  }
  return obj;
};
