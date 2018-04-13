function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 星星转换为一个数组
 */
function starscanvas2Array(stars) {
  var num = stars.substring(0, 1);
  var array = [];
  for (var i = 0; i <= 5; i++) {
    if (i < num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}
function converToCastString(casts) {
  var castjoin = "";
  for (var ids in casts) {
    castjoin = castjoin + casts[ids].name + "/";
  }
  return castjoin.substring(0, castjoin.length - 2)
}
function converToCastInfo(casts) {
  var castArray = [];
  for (var ids in casts) {
    var cast = {
      img: casts[ids].avatars ? casts[ids].avatars.large : '',
      name: casts[ids].name
    };
    castArray.push(cast);
  }
  return castArray
}
module.exports = {
  formatTime: formatTime,
  starscanvas2Array: starscanvas2Array,
  converToCastString: converToCastString,
  converToCastInfo: converToCastInfo
}
