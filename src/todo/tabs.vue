<template>
  <div class="tabs-container">
    <span class="tabs">
      <span
        v-for="(state,index) in states"
        :key="index"
        :class="['state-item',state,(state==filter?'actived':'')]"
        @click="toggleFilter(state)"
      >{{ state }}</span>
    </span>
  </div>
</template>

<style lang="less" scoped>
.tabs{
  .state-item{
    font-size: 24px;
    color:#000;
    line-height: 1.6;
    padding:5px;
    &.actived{
      color:red;
      text-decoration: underline;
      font-weight: bold;
    }
  }
}
</style>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      states: ["active", "completed", "all"]
    };
  },
  methods: {
    toggleFilter: function(state) {
      this.$emit("toggleFilter", state);
    }
  }
};
</script>

<style lang="less" scoped>
.state-item {
  &.actived {
    color: red;
  }
}
</style>
