<script>
export default {
    name: 'Tabs',
    // 组件设计规范
    // props 一般只应该在外部做修改，也就是提供者 进行修改
    props: {
        value: {
            type: [Number, String],
            default: 0
        }
    },
    provide () {
        return {
            tabStatus: {
                value: this.value
            }
        };
    },
    data () {
        return {

        };
    },
    methods: {
        handleChange (index) {
            console.log('---base change----');
            this.$emit('change', index);
        }
    },
    render (createElement) {
        return (
            <div class="tabs">
                <ul class="tabs-header">
                    {this.$slots.default}
                </ul>
            </div>
        );
    }
};
</script>

<style lang="less" scoped>
.tabs{
    display: inline-block;
    border:1px dashed #eee;
}
</style>
