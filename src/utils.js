const copy = target => {
  let re = [];
  for (let i in target) {
    re[i] = target[i];
  }

  return re;
};

let isChangeing = false;
const move = (origin, target, duration) => {
  if(isChangeing) {
    return;
  }
  isChangeing = true;
  let st, from;
  st = from = performance.now();
  let d = {}; // 源与目标之间每一项的距离
  for(let i in origin) {
    d[i] = target[i] - origin[i];
  }

  let frame = (t) => {
    let dt = t - st, // 这次与上次间隔
        per = dt / duration, // 上一次到这一次的时间占总时间比
        pro = (t - from) / duration; // 当前进程
    if(pro >= 1) {
      isChangeing = false;
      return;
    }
    for(let i in origin) {
      origin[i] += d[i] * per // 每一项加上时间比(per)*总距离(d[i])
    }
    st = t; // 起始时间变为当前时间

    requestAnimationFrame(frame);
  }
  frame(st);
}

export {copy, move};