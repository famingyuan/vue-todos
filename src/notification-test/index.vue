<template>
  <div>
    this is notification test page.

    <div class="test-module">
      <div class="tm-item">
        <!-- <button @click="showNotification">
          Show Notification
        </button> -->

        <div class="test-title">
          局部组件 传统使用方式
        </div>
        <notification-local
          content="this is first notification"
          time-count="1000"
        />
        <div class="test-title">
          全局插件 传统使用方式
        </div>
        <notification
          content="this is first notification"
          time-count="1000"
        />
      </div>

      <div class="tm-item">
        <div class="test-title">
          全局API Jquery插件类型使用方式
        </div>
        <button @click="showNotification">
          Show Notification
        </button>
        <button @click="showOrgNotification">
          Show Org Notification
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/component/notification/notification.vue';

export default {
    components: {
        'notification-local': Notification
    },
    data () {
        return {

        };
    },
    methods: {
        showNotification () {
            this.$notify({
                autoClose: 3000,
                content: Math.random() + ' from notify api.',
                verticalPos: 200
            });
        },
        showOrgNotification () {
            this.$orgNotify({
                autoClose: 3000,
                content: 'xxx'
            });
        }
    }
};
</script>
