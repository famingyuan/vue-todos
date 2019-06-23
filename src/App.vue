<template>
  <div id="test">
    <div class="title">{{title}} -- {{date}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "this is title2",
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
