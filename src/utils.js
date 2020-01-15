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
  } // 缓动函数
) => {
  if (fn(1) != 1) throw '[moaline-move] The fn must satisfy "fn (1) == 1"';

  let st, sp;
  st = performance.now();
  sp = copy(origin);
  let d = {};
  for (let i in origin) {
    d[i] = target[i] - origin[i];
  }

  let frame = t => {
    let pro = (t - st) / duration;
    if (pro >= 1) {
      return;
    }

    for (let i in origin) {
      origin[i] = sp[i] + fn(pro) * d[i];
    }

    if(after) after(copy(origin), pro);
    requestAnimationFrame(frame);
  };

  frame(st);
};

export { copy, move };