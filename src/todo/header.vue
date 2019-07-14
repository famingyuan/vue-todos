<template>
  <header class="main-header">
    <h1>TODO LIST</h1>
    <slot />
  </header>
</template>

<style lang="less" scoped>
.main-header {
  text-align: center;
  h1 {
    font-size: 100px;

    font-weight: bold;
  }
  a {
    margin: 20px;
    font-size: 18px;
  }
}
</style>

<style scoped>
.main-header h1 {
  color: rgba(175, 47, 47, 0.4);
}
</style>
