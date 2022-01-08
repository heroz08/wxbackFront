// 查询 DOM 对象的 CSS 值
const getStyle = (target, style) => {
  const styles = window.getComputedStyle(target, null);
  return styles.getPropertyValue(style);
};

// 获取并解析元素当前的位移量
const getTranslate = (target) => {
  const matrix = getStyle(target, 'transform');
  const nums = matrix.substring(7, matrix.length - 1).split(', ');
  const left = parseInt(nums[4], 10) || 0;
  const top = parseInt(nums[5], 10) || 0;
  return { left, top };
};

export default function zoom(ref) {
  const node = ref.current;
  // 记录前一次触摸点的位置
  const preTouchPosition = {};

  const recordPreTouchPosition = (clientX, clientY) => {
    preTouchPosition.x = clientX;
    preTouchPosition.y = clientY;
  };

  const move = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = getTranslate(event.target);
    // 移动后的位置 = 当前位置 + （此刻触摸点位置 - 上一次触摸点位置）
    const translateX = left + (clientX - (preTouchPosition.x || 0));
    const translateY = top + (clientY - (preTouchPosition.y || 0));
    node.style.transform = `translate(${translateX}px, ${translateY}px)`;
    recordPreTouchPosition(clientX, clientY);
  };
  const addMouseMove = (event) => {
    event.preventDefault();
    console.log('mouseDown');
    document.getElementsByTagName('body')[0].addEventListener('mousemove', move);
  };

  const removeMouseMove = (event) => {
    document.getElementsByTagName('body')[0].removeEventListener('mousemove', move);
  };

  node.addEventListener('mousedown', addMouseMove);

  node.addEventListener('mouseup', removeMouseMove);
}
