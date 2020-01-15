const copy = target => {
  let re = [];
  for (let i in target) {
    re[i] = target[i];
  }

  return re;
};

const move = (
  origin,
  target,
  duration,
  after,
  fn = pro => {
    return Math.sqrt(pro, 2);
  }
) => {
  if (fn(1) != 1) throw '[moaline-move] The fn must satisfy "fn (1) == 1"'; // 当参数为1时，对应的值也一定要为1

  let st, sp;
  st = performance.now(); // 保存开始时间
  sp = copy(origin); // 保存起点
  let d = {}; // 源与目标之间每一项的距离
  for (let i in origin) {
    d[i] = target[i] - origin[i];
  }

  let frame = t => {
    let pro = (t - st) / duration; // 当前进程
    if (pro >= 1) {
      return;
    }

    for (let i in origin) {
      origin[i] = sp[i] + fn(pro) * d[i]; // fn(pro)得出当前时间对应的缓动函数的距离百分比，再乘以总距离
    }

    if(after) after(copy(origin), pro);
    requestAnimationFrame(frame);
  };

  frame(st);
};

export { copy, move };
