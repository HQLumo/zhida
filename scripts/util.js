export default function Default(){
	console.log("util function");
}

export const url='https://zhida.moushiya.cn'
export const ws='ws://zhida.moushiya.cn:8887'

export function formatTime(ms){
  const current = new Date(Date.now());
  const target = new Date(ms);

  // 检查是否在同一天
  if (current.getFullYear() === target.getFullYear() &&
      current.getMonth() === target.getMonth() &&
      current.getDate() === target.getDate()) {
    // 如果是同一天，显示几时几分（24小时制）
    return target.getHours() + ':' + (target.getMinutes() < 10 ? '0' : '') + target.getMinutes();
  } else {
    // 如果不是同一天，显示几月几日
    return (target.getMonth() + 1) + '月' + target.getDate() + '日';
  }
}

export function maskString(input) {
    if (!input || input.length <= 1) {
        return input; // 如果输入为空或者只有一个字符，直接返回
    }

    const length = input.length;
    const maskLength = Math.floor(length * 0.5); // 计算需要替换的字符数量
    const start = Math.floor((length - maskLength) / 2); // 计算开始替换的位置
    const end = start + maskLength; // 计算结束替换的位置

    let maskedString = input.slice(0, start); // 获取开始部分
    maskedString += '*'.repeat(end - start); // 添加星号
    maskedString += input.slice(end); // 添加结束部分

    return maskedString;
}

export function getImageUrl(img){
	if(img==null){
		return '/static/logo.png'
	}else{
		return url+'/file/getImage/'+img
	}
}