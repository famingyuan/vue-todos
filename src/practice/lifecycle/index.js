import Vue from 'vue';

const app = new Vue({
    el: '#root',
    data: {
        txt: 1
    },
    // template: `
    // <div>{{msg}} </div>
    // `,
    beforeCreate: function () {
        console.log('----onBeforeCreate------');
        // undefined $el
        console.log(this.$el);
    },
    created: function () {
        // undefined $el
        console.log('-------created-----');
        console.log(this.$el);
    },
    beforeMount: function () {
        // 原始数据 还未渲染
        console.log(this.$el);
        console.log('-------beforeMount-----');
    },

    mounted: function () {
        // 渲染后的数据
        console.log(this.$el);
        console.log('-------mounted-----');
    },
    beforeUpdate: function () {
        console.log('----beforeUpdate----');
    },
    updated: function () {
        console.log('----updated----');
    },
    beforeDestroy: function () {
        console.log('-------beforeDestroy-----');
    },
    destroyed: function () {
        console.log('-------destroyed-----');
    },
    // mounted 前 将 render内容  替换 el
    render: function (h) {
        console.log('-----this is render----');
        return h('div', {}, this.txt);
    }

});

console.log(app);

setInterval(() => {
    // 每次数据更新 都将导致 beforeUpdate render updated 被调用
    app.txt = app.txt + 1;
}, 1000);

setTimeout(() => {
    app.$destroy();
}, 3000);
