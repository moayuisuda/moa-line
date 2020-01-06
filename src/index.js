import {
    noise
} from './perlin';
import {move, copy} from './utils';

const wave = function ({
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
}) {
    dom.style.position = 'relative';
    dom.style.overflow = 'hidden';
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '-999';
    canvas.height = parseInt(getComputedStyle(dom)['height']) * 1.2;
    canvas.width = parseInt(getComputedStyle(dom)['width']) * 1.2;
    canvas.style.top = parseInt(getComputedStyle(dom)['width']) * 0.1;
    canvas.style.left = parseInt(getComputedStyle(dom)['height']) * 0.1;
    dom.appendChild(canvas);
    const context = canvas.getContext('2d');

    let r = span / 2;
    let seed = 0;
    let ci = 0;
    const color = copy(colors[ci]);

    function Point({
        cx,
        cy
    }) {
        this.cx = cx;
        this.cy = cy;
    }

    Point.prototype.line = function () {
        context.beginPath();
        let s = noise.simplex3(this.cx / scale, this.cy / scale, seed);
        let sa = Math.abs(s);
        context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${sa})`;
        context.lineWidth = Math.abs(s) * 8;
        let a = Math.PI * 2 * s;
        let ap = Math.PI + a;

        context.moveTo(this.cx + Math.cos(a) * r, this.cy);
        context.lineTo(this.cx + Math.cos(ap) * r, this.cy + Math.sin(ap) * r);

        context.stroke();
    }

    let points = [];

    function initPoints() {
        for (let y = 0; y < canvas.height; y += span) {
            for (let x = 0; x < canvas.width; x += span) {
                points.push(new Point({
                    cx: x + r,
                    cy: y + r,
                }))
            }
        }
    }

    const p = {
        x: 0,
        y: 0
    };
    function draw() {
        context.translate(p.x, p.y);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        for (let i of points) {
            i.line();
        }
    }

    function animate() {
        draw();
        seed += speed;

        requestAnimationFrame(animate);
    }

    initPoints();
    animate();

    dom.addEventListener('mousemove', (e) => {
        p.x = e.movementX / 50;
        p.y = e.movementY / 50;
    });

    dom.addEventListener('mouseleave', () => {
        [p.x, p.y] = [0, 0];
    })

    window.addEventListener('resize', () => {
        initPoints();
        canvas.height = parseInt(getComputedStyle(dom)['height']);
        canvas.width = parseInt(getComputedStyle(dom)['width']);
    })

    dom.addEventListener("click", () => {
        let target = copy(colors[(++ci) % colors.length]);
        move(color, target, duration);
    });
}

export {wave};