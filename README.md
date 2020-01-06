```js
import moaline from 'moaline.js'

moaline({dom: document.querySelector('body')});

/* 你可以只选择传递dom参数，下面是所有的参数↓
const moaline = function ({
    dom, // 挂载在哪个dom上
    span = 50, // 单个元素的大小
    scale = 1000, // 与噪声晶格的映射比，值越大动画越混沌无序
    speed = 0.002, // 单个元素旋转速度
    duration = 1000, // 颜色改变时间
    colors = [{
            r: 212,
            g: 192,
            b: 255
        },
        {
            r: 192,
            g: 255,
            b: 244
        },
        {
            r: 255,
            g: 192,
            b: 203
        }
    ], // 颜色组，点击dom时颜色将在这个数组间切换
})
*/
```