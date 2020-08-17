import {getAction} from '@/api/manage'
import axios from 'axios'

var getSignatureUrl = window._CONFIG['domianURL'] + "/autograph/queryAutograph";

// 创建 axios 实例
const service = axios.create({
  timeout: 2 * 60 * 60 * 1000 // 请求超时时间 2小时的超时时间
});

/**
 * 生成上传 oss的参数
 * @param data
 * @param file
 * @returns {FormData}
 */
var getFormData = function (data, file) {
  var formData = new FormData();
  var suffix = file.name.substring(file.name.indexOf(".") + 1);
  var fileName = data.fileName + '.' + suffix;
  //注意formData里append添加的键的大小写
  formData.append('key', fileName); //存储在oss的文件路径
  formData.append('OSSAccessKeyId', data.accessid); //accessKeyId
  formData.append('policy', data.policy); //policy
  formData.append('signature', data.signature); //签名
  formData.append("file", file);
  formData.append('success_action_status', 200); //成功后返回的操作码
  return formData;
};


/**
 *
 * @param data 上传文件
 * @param callBack 自定义回调
 * @param uploadLodding 上传lodding回调
 * @param compressFlag 是否需要压缩图片
 */
var ossUpload = function (file, callBack, uploadLodding, compressFlag) {//自定义上传文件
  //判断是不是图片是否需要压缩
  if (!filtration(file, callBack, uploadLodding) && !compressFlag) {
    return;
  }
  getAction(getSignatureUrl).then((res) => {

    if (res.code == 1) {
      var data = res.data;
      var url = data.host;
      var formData = getFormData(data, file);
      service({
        url: url,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': "multipart/form-data",
          "Accept": "*/*"
        },
        onUploadProgress: function (progressEvent) {
          if (progressEvent.lengthComputable && uploadLodding) {
            var data = Math.round(progressEvent.loaded / progressEvent.total * 100);
            uploadLodding(data);
          }
        },
      }).then(res => {
        if (callBack) {
          callBack(formData.get("key"));
        }
      })
    }
  })
};

/**
 * 上传视频同时同时上传缩略图
 * @param mediaFile 视频
 * @param coverFile 缩略图
 * @param callBack 全部上传完后的回调
 * @param uploadLodding 视频上传的lodding
 */
var ossVideoUpload = function (mediaFile, coverFile, callBack, uploadLodding) {
  getAction(getSignatureUrl).then((res) => {
    if (res.code == 1) {
      var data = res.data;
      var url = data.host;

      //视频参数
      var mediaFormData = getFormData(data, mediaFile);
      //缩略图参数
      var coverFormData = getFormData(data, coverFile);

      //上传缩略图
      service({
        url: url,
        method: 'post',
        data: coverFormData,
        headers: {
          'Content-Type': "multipart/form-data",
          "Accept": "*/*"
        },
      });

      //上传视频
      service({
        url: url,
        method: 'post',
        data: mediaFormData,
        headers: {
          'Content-Type': "multipart/form-data",
          "Accept": "*/*"
        },
        onUploadProgress: function (progressEvent) {
          if (progressEvent.lengthComputable && uploadLodding) {
            var data = Math.round(progressEvent.loaded / progressEvent.total * 100);
            uploadLodding(data);
          }
        },

      }).then(res => {
        if (callBack) {
          var result = {
            "video": mediaFormData.get("key"),
            "cover": coverFormData.get("key"),
          };
          callBack(result);
        }
      });

      //由于视频100% 会比图片上传的快  故不作两个一起的lodding
      /*axios.all([f1, f2]).then(
        axios.spread(function (r1, r2) {

        })
      );*/
    }
  })
};


/**
 * 判断是否是图片
 * @param: fileName - 文件名称
 * @param:  无后缀匹配 - false
 * @param:  匹配图片 - image
 * @param:  匹配 txt - txt
 * @param:  匹配 excel - excel
 * @param:  匹配 word - word
 * @param:  匹配 pdf - pdf
 * @param:  匹配 ppt - ppt
 * @param: 匹配 视频 - video
 * @param:  匹配 音频 - radio
 * @param:  其他匹配项 - other
 */
var getFileType = (fileName) => {
  // 后缀获取
  var suffix = '';
  // 获取类型结果
  var result = '';
  try {
    var flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) {
    result = false;
    return result;
  }
  // 图片格式
  var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'bmp', 'JPG', 'PNG', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp'];
  // 进行图片匹配
  result = imglist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'image';
    return result;
  }
  // 匹配txt
  var txtlist = ['txt'];
  result = txtlist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'txt';
    return result;
  }
  ;
  // 匹配 excel
  var excelist = ['xls', 'xlsx'];
  result = excelist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'excel';
    return result;
  }
  ;
  // 匹配 word
  var wordlist = ['doc', 'docx'];
  result = wordlist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'word';
    return result;
  }
  ;
  // 匹配 pdf
  var pdflist = ['pdf'];
  result = pdflist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'pdf';
    return result;
  }
  ;
  // 匹配 ppt
  var pptlist = ['ppt'];
  result = pptlist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'ppt';
    return result;
  }
  ;
  // 匹配 视频
  var videolist = ['mp4', 'm2v', 'mkv'];
  result = videolist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'video';
    return result;
  }
  ;
  // 匹配 音频
  var radiolist = ['mp3', 'wav', 'wmv'];
  result = radiolist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'radio';
    return result;
  }
  // 其他 文件类型
  result = 'other';
  return result;

};

/**
 * 判断是否是图片并且判断图片是否大于2m
 * @param fileName
 */
var checkImag = (file) => {
  if (getFileType(file.name) == 'image' && file.size > 2 * 1024 * 1024) {
    return true;
  }
  return false;
};

/**
 * 判断是否是图片在判断图片是否大于2m，符合条件进行图片压缩
 * @param file
 */
var filtration = (file, callBack, uploadLodding) => {
  if (!checkImag(file)) {
    return true;
  }
  let ndata;
  //压缩图片
  let reader = new FileReader();
  // 将图片2将转成 base64 格式
  reader.readAsDataURL(file);
  console.log(reader);
  // 读取成功后的回调
  reader.onloadend = function () {
    let result = this.result;
    let img = new Image();
    img.src = result;
    img.onload = function () {
      ndata = compress(img);
      //BASE64转图片
      var arr = ndata.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      ndata = new File([u8arr], file.name, {type: mime});
      ndata['uid'] = file.uid;
      ossUpload(ndata, callBack, uploadLodding, true)
    };

  }
};

/**
 * 压缩图片
 * @param img
 * @returns {string}
 */
var compress = (img) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
  //瓦片canvas
  let tCanvas = document.createElement("canvas");
  let tctx = tCanvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  // 		铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    let nw = ~~(width / count);
    let nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //将图片压缩至2m左右的
  let ndata = canvas.toDataURL('image/jpeg', initSize / 2 * 1024 * 1024);
  /*  console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log("ndata:" + ndata)

    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");*/
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
}

export default {
  //单文件上传
  ossUpload(data, callBack, uploadLodding, compressFlag) {
    return ossUpload(data, callBack, uploadLodding, compressFlag);
  },
  //上传视频同时同时上传缩略图
  ossVideoUpload(mediaFile, coverFile, callBack, uploadLodding) {
    return ossVideoUpload(mediaFile, coverFile, callBack, uploadLodding);
  }
}