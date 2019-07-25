<template>
  <div
    v-show="visible"
    class="notification"
    :style="style"
  >
    <span>{{ content }}</span>
    <button @click="close">
      {{ btn }}
    </button>
  </div>
</template>

<style lang="less" scoped>
.notification {
    position: absolute;
    bottom: 0;
    left: 20px;
    padding: 10px 15px;
    background: #ddd;
    display: flex;
    justify-content: space-between;
    z-index: 999;
    span {
        font-size: 20px;
    }
    button {
        font-size: 16px;
    }
}
</style>

<script>
export default {
    name: 'Notification',
    props: {
        content: {
            type: String,
            required: true
        },
        btn: {
            type: String,
            default: '删除'
        },
        timeCount: {
            type: [Number, String],
            default: 3000
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        style () {
            return {};
        }
    },
    created () {
        console.log('----created notification');
    },
    methods: {
        // 由外层 控制 notification的显示与否
        close () {
            this.$emit('close');
        }
    }
};
</script>
