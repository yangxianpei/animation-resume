

var result = `/*
 你好面试官,我是杨贤培
 我将以动画的形式来介绍自己!
 */

 *{
  transition: all 1s;
 }
html{
  color:rgb(222,222,222);background:rgb(0,43,54)
}
#code{
   padding:.5em;
   border:1px solid;
   margin:.5em;
   overflow:auto;
   width:45vw; height:90vh;
}
/* 让我们把代码高亮 */
.token.selector{color:rgb(133,153,0);}
.token.property{color:rgb(187,137,0);}
.token.punctuation{color:yellow;}
.token.function{color:rgb(42,161,152);}


/* 现在正式开始 */

/* 我需要一张白纸 */
html{
  perspective: 1000px;
}
#code{
  position: fixed;
  left: 0; top:0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px);
       transform: rotateY(10deg) translateZ(-100px);
       animation: breath 0.5s infinite alternate-reverse;
}


`

var result2 = `
#paper{
  position:fixed;
  right:0;
  width:50vw;
  height:92vh;
  background:#ddd;
  margin:.5em;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:15px;
}
#paper > .content{
  background:white;
  height:100%;
  width:100%;
  color:black;

  
}
`
var md = `
# 自我介绍
我叫 杨贤培
1996 年 2 月出生
浙江大学城市学院 学校毕业
自学前端半年
希望应聘贵企前端开发岗位
# 技能介绍
熟悉 JavaScript CSS vue
# 项目介绍
1. 无缝轮播
2. 贪吃蛇
3. Canvas 画板
# 联系方式

- QQ 1013128101
- Email: 1013128101@qq.com
- 手机: 17855811373
- github: https://github.com/yangxianpei

`



function writeCode(prefix, code, callback) {
  var domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  var n = 0
  var timeId = setInterval(() => {
    n += 1
    domCode.innerHTML =
      Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
    style.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      clearInterval(timeId)
      if (callback) {
        callback()
      }

    }
  }, 35)
}


writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, result2, () => {
      writeMarkDown(md ,()=>{
        convertMarkdownToHtml()
      })
    })
  })
})

function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className='content'
  paper.appendChild(content)
  document.body.appendChild(paper)

  fn()
}


function writeMarkDown(markdown,fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    console.log(markdown.substring(0, n))
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
}, 35)

}


function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}