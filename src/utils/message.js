import { message } from 'antd';

function showMsg(msg, isSuccess = false) {
  let _msg = isSuccess ? '成功' : '错误';
  if (msg) {
    _msg = msg.message || msg._message ||  msg.msg || (typeof msg === 'object' ? _msg : msg);
  }
  const type = isSuccess ? 'success' : 'error';
  return message[type](_msg);
}

export default showMsg;
