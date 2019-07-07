// jsx 实际上也是一个JS文件，只是将html代码 写在了js中
// style则只能由外部的文件提供 如下 则引入对应的外部样式
import '../less/footer.less'
export default {
  data () {
    return {
      author: 'famingyuan'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
