import Vue from 'vue';

const app = new Vue({
    el: '#root',
    data: {
        msg: 'hello this is practice demo'
    },
    template: `
    <div>{{msg}} </div>
    `
});
// 用于删除 $set 添加的属性，可以删除绑定的响应代码
// app.$delete
// app.$emit $on 都只能作用同一个组件上才能监听

console.log(app.$root === app);
var i = 1;
setInterval(() => {
    i++;
    // $data ==
    app.$data.msg = i;
    // $data 包装了 data
    console.log(app.$data !== app.data);
}, 1000);
