import { wave, wind, rain } from "./index";
import {move} from './utils'

const div2 = document.createElement('div');
div2.style.width = '100px';
div2.style.height = '100px';
div2.style.backgroundColor = 'green';
document.body.appendChild(div2);

const div = document.createElement('div');
div.style.width = '100px';
div.style.height = '100px';
div.style.backgroundColor = 'red';
document.body.appendChild(div);

window.addEventListener('click', () => {
  move({x: 0}, {x: 100}, 5000, e => {
    div.style.transform = `translateX(${e.x}px)`;
  })
  
  move({x: 0}, {x: 100}, 5000, e => {
    div2.style.transform = `translateX(${e.x}px)`;
  }, pro => {
    return pro * 2;
  })
})
// wind({
//   dom: document.querySelector(".main"),
//   duration: 2000
// });
