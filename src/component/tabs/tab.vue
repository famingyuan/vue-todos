<script>
export default {
    name: 'Tab',
    props: {
        label: {
            type: String,
            default: 'tab'
        },
        index: {
            type: [Number, String],
            required: true
        }
    },
    inject: ['tabStatus'],
    computed: {
        active () {
            return (+this.index) === (+this.$parent.value);
        }
    },
    methods: {
        handleClick (e) {
            console.log('----xxx---');
            this.$parent.handleChange(this.index);
        }
    },
    render () {
        var label = this.$slots.label || <span>{this.label}</span>;
        var clsName = {
            tab: true,
            active: this.active === true
        };
        return (
            <li class={clsName} on-click={this.handleClick}>
                {label}
            </li>
        );
    }
};
</script>

<style lang="less" scoped>
li.tab {
  display: inline-block;
  padding: 5px 5px;
  height: 30px;
  line-height: 30px;
  list-style: none;
  color: #fff;
  font-size: 14px;
  text-align: center;
  min-width: 100px;
  cursor: pointer;
  &.active {
    color: #ddd;
    font-weight: bold;

    span{
        border-bottom: 2px solid red;
    }
  }
}
</style>
