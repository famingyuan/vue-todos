<template>
  <div
    v-show="visible"
    class="notification"
  >
    <span>{{ content }}</span>
    <button @click="removeNotification">
      {{ btn }}
    </button>
  </div>
</template>

<style lang="less" scoped>
.notification {
  position: absolute;
  bottom: 0;
  right: 20px;
  padding: 10px 15px;
  background: #ddd;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  span {
      font-size: 20px;
  }

  button{
      font-size:16px;

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
        }
    },
    data () {
        return {
            visible: true
        };
    },

    mounted () {
        this.createTimer();
    },
    beforeDestroy () {
        this.removeNotification();
    },
    destroyed () {
        this.$emit('closed');
    },
    methods: {
        removeNotification () {
            this.$emit('close');
            this.visible = false;
        },
        createTimer () {
            this.timer = setTimeout(() => {
                this.visible = false;
            }, +this.timeCount);
        },
        clearTimer () {
            this.timer && clearTimeout(this.timer);
        }
    }
};
</script>
