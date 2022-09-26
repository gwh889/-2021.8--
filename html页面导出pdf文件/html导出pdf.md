## 需求

将整个页面导出成pdf文件，页面中包含文字、表格、echarts图标

## 效果

### 页面效果：

![image-20220223133544303](D:\mine\北京数慧-评估区划系统-日常问题\html页面导出pdf文件\image-20220223133544303.png)

### 导出效果：

![image-20220223133151270](D:\mine\北京数慧-评估区划系统-日常问题\html页面导出pdf文件\image-20220223133151270.png)

## 使用技术

```
1.将页面html转换成图片
npm install --save html2canvas 
2.将图片生成pdf
npm install jspdf --save
```

## 具体实现

安装好技术插件之后，需要定义一个全局函数，我是放在全局utils文件夹中，新建了一个htmlTopdf.js文件。

注意：页面整体，包括页面中的表格都有滚动条，所以要在页面生成canvas画板前，将有滚动条的div的高度/宽度设置成可以展示全的高度。canvas生成之后，再将高度/宽度还原至页面原有的样子，这样就保证了现有页面样式保持不变，导出的页面是完整的。

```js
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
    install(Vue, options) {
        Vue.prototype.getPdf = function (title) {
            // 获取当前某个标签的原始高度
            let mainHeight = $('.historyResultExamine_content').height()
            $('.historyResultExamine_content').css('height', 15000)

            let basicIndex_height = $('.historyResultExamine_content .basicIndex_content_left').height()
            let basicIndex_tableHeight = $('.basicIndex_content_left .el-table').height()
            let disasterPopulation_height = $('.historyResultExamine_content .disasterPopulation_content_left').height()
            let disasterPopulation_tableHeight = $('.disasterPopulation_content_left .el-table').height()
            let disasterSpecies_height = $('.historyResultExamine_content .disasterSpecies_content_right').height()
            let disasterSpecies_tableHeight = $('.disasterSpecies_content_right .el-table').height()

            // 设置一个可将滚动条展示全的高度（不够完善，应该动态获取而不是写死）
            $('.historyResultExamine_content .basicIndex_content_left').css('height', 2200)
            $('.basicIndex_content_left .el-table').css('height', 2200)
            $('.historyResultExamine_content .disasterPopulation_content_left').css('height', 2200)
            $('.disasterPopulation_content_left .el-table').css('height', 2200)
            $('.historyResultExamine_content .disasterSpecies_content_right').css('height', 700)
            $('.disasterSpecies_content_right .el-table').css('height', 700)
            $('.historyResultExamine_content .historyResultExamine_content_footer').css('display', 'none')
            //   console.log(x);
            html2Canvas(document.querySelector('.historyResultExamine_content'), {
                allowTaint: true, //避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰会停止处理html2Canvas
                useCORS:true //允许canvas画布内可以跨域请求外部图片
            }).then(function (canvas) {
                // canvas渲染完成之后将样式恢复到原始高度
                $('.historyResultExamine_content').css('height', '80vh')

                $('.historyResultExamine_content .basicIndex_content_left').css('height', basicIndex_height)
                $('.basicIndex_content_left .el-table').css('height', basicIndex_tableHeight)
                $('.historyResultExamine_content .disasterPopulation_content_left').css('height', disasterPopulation_height)
                $('.disasterPopulation_content_left .el-table').css('height', disasterPopulation_tableHeight)
                $('.historyResultExamine_content .disasterSpecies_content_right').css('height', disasterSpecies_height)
                $('.disasterSpecies_content_right .el-table').css('height', disasterSpecies_tableHeight)
                $('.historyResultExamine_content .historyResultExamine_content_footer').css('display', 'block')

                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89 //一页pdf的canvas高度（定义成A4纸的高度）
                let leftHeight = contentHeight //未生成pdf截图时的实际高度
                let position = 0 //页面偏移
                let imgWidth = 595.28 //由html页面生成的canvas在pdf中图片的宽高
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0) //将图片装换成base64编码的jpeg图片
                let PDF = new JsPDF('', 'pt', 'a4') //l:横向  p:纵向； 单位：pt; 画布大小:A4，当内容为数组，则是自定义大小
                
                //let PDF = new JsPDF('', 'pt', [imgWidth,imgHeight])
                //则下边的if语句只需保留添加那一条语句（PDF.addImage），其它都不需要
                
                if (leftHeight < pageHeight) { //一页pdf显示html页面生成的canvas高度<a4纸高度
                    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight) //(pageData,'JPEG','左边距','上边距','宽度','高度')设置在pdf中显示
                } else { //否则，分页
                    while (leftHeight > 0) {
                        // addImage后两个参数控制添加图片的尺寸，此处将页面的高度按照A4纸宽高比例进行压缩
                        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 841.89 //每一页画完后重新回到高度的起始位置 
                        if (leftHeight > 0) { //避免添加空白页
                            PDF.addPage()
                        }
                    }
                }
                
                PDF.save(title + '.pdf')
            }
            )
        }
    }
}
```

在main.js中使用我们自定义函数的文件

```js
import htmlToPdf from '@/utils/htmlTopdf.js'
Vue.use(htmlToPdf)
```

在需要导出的页面调用该函数

```html
<div @click="getPdf(codeName + '历史年度自然灾害评估结果')">下载</div>
```

## 下载奔溃的问题

刚开始页面不是很长还可以，后面整个页面比较长，点击下载的时候直接浏览器奔溃，查资料发现是因为jspdf对canvans也是有最大限度的，太大就转不了啦。之后通过查找资料，决定采用模板的方式。就是前端写好一个导出的页面模板，样式也都写好，里边的表格数据通过后端自己查询通过拼接字符串的方式将数据放到表格里（就是只能用原生代码，不能使用组件），生成的echarts图标，通过转换成base64传给后端，后端再解析成图片插入；至于用到那些数据，需要把相关的接口和传参传给后端，实现后端的查询。

```js
//转换base64
createBase64(ele) { //ele为传入的id
  let docEle = ele + ' canvas'
  let canvasFixed = document.querySelector(docEle) //获取图表元素
  if (canvasFixed) {
    let canvasWidth = canvasFixed.width, //获取图表元素宽度
      canvasHeigth = canvasFixed.heigth, //获取图表元素高度,
      canvas2D = canvasFixed.getContext('2d')
    canvas2D.drawImage(canvasFixed, canvasWidth, canvasHeigth)
    return canvasFixed.toDataURL()
  } else {
    return null
  }
},
```

## 一键置底

element-ui只提供了一键置顶的功能，需要自己整个一键置底。

```js
<a class="toBottom" @click="goBottom">底</a>
//一键置底的函数
goBottom() {
  // this.$refs.historyResultExamine_content.scrollTop = this.$refs.historyResultExamine_content.scrollHeight
  //上下两种方式都可以
  //.historyResultExamine_content为需要滚动的区域的类名
  this.$nextTick(function () {
    document.querySelector('.historyResultExamine_content').scrollTo({
      top: document.querySelector('.historyResultExamine_content').scrollHeight,
      behavior: 'smooth',
    })
  })
},
```

同时想要实现向上滚动时显示一键置顶，向下滚动时显示一键置底，需要监听滚动条

```js
<a class="toBottom" v-show="scrollToBottom" @click="goBottom">底</a>
<el-backtop style="background: #f2f5f6" target=".historyResultExamine_content" v-show="scrollToTop">顶</el-backtop>
//需要事先定义好scrollToBottom、scrollToTop、oldScrollTop
//在created中添加监听函数，可能不生效，需要将第三个参数写成true，捕获阶段触发
window.addEventListener('scroll', this.scrolling, true)
//methods
scrolling() {
  // 滚动条距文档顶部的距离
  let scrollTop =
    window.pageYOffset ||
    document.querySelector('.historyResultExamine_content').scrollTop ||
    document.body.scrollTop
  // 滚动条滚动的距离
  let scrollStep = scrollTop - this.oldScrollTop
  // 更新——滚动前，滚动条距文档顶部的距离
  this.oldScrollTop = scrollTop
  if (scrollStep < 0) {
    this.scrollToTop = true
    this.scrollToBottom = false
    console.log('滚动条向上滚动了！')
  } else {
    this.scrollToTop = false
    this.scrollToBottom = true
    console.log('滚动条向下滚动了！')
  }
},
```

