<template>
  <transition name="fade">
    <div>
      <div class="toast">
        淘口令复制成功
      </div>
      <div class="mock"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.mock {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 88;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 2px;
  z-index: 99;
}
</style>
