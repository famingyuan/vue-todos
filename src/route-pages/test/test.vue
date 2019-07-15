<template>
  <div class="test-page">
    <div>hello , this is test page.</div>
    <div>id: {{ id }}, name:{{ name }}</div>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.test-page {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
}
</style>

<script>
export default {
    props: {
        id: {
            type: String,
            required: false,
            default: '0'
        },
        name: {
            type: String,
            required: false,
            default: 'no name'
        }
    },
    mounted () {
    // 当前路径下显示的所有的组件 都可以通过 this.$route 获取到当前的路由信息
    // 但是独立组件 一般不通过这种方式取值，而是通过 prop 传递值
        console.log(this.$route);
        console.log('id -->' + this.id);
    }
};
</script>
