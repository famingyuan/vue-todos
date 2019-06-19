<template>
  <div id="app">
    <view class="title">{{title}} -- {{date}}</view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "this is title",
      date: new Date().getTime()
    };
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  .date {
    color: #999;
    font-size: 18px;
  }
}
</style>
