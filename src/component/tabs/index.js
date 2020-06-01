import Tabs from './Tabs.vue';
import Tab from './Tab.vue';

export default (Vue) => {
    Vue.component(Tab.name, Tab);
    Vue.component(Tabs.name, Tabs);
};
