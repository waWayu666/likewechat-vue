<template>
  <!--<div class="page-header-index-wide" align="center">-->
    <!--<img style="width: 50%; margin: auto;" src="./img/1.png">-->

  <!--</div>-->

  <span>开发中暂无</span>
</template>
<!--
<template>
  <div>
    <a-upload action="http://127.0.0.1:8081/xlkc-boot/api/v1/common/upload_image_local" :multiple="true" :fileList="fileList" @change="handleChange">
      <a-button>
        <a-icon type="upload" /> Upload
      </a-button>
    </a-upload>
    <button @click="cc">实验</button>
    <a href="http://www.shengnlp.com/xlkc-boot/user/20190831/1_1567244219293.png">下載</a>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        i : 0,
        fileList: [{
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        }],
      }
    },
    methods: {
      cc() {
        window.open("http://www.shengnlp.com/xlkc-boot/user/20190831/_1567242382108.gitignore");
      },
      handleChange(info) {
        this.i = this.i +1;
        console.log(this.i)
        console.log(info)
        if (this.i == 3) {
          console.log(222)
          console.log(info.file.response.data)
        }

        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
          if (this.i == 3) {
            console.log(info.file.response.data)
            // file.url = info.file.response.data;
            file.url = "http://www.shengnlp.online/upload/user/20190831/_1567238767623.prettierrc";
          }
          // if (file.response) {
          //   // Component will show file.url as link
          //   console.log(file.response.thumbUrl)
          //   file.url = file.response.url;
          //   console.log(file.url)
          // }
          return file;
        });

        this.fileList = fileList
      },
    },
  }
</script>
-->

<!--<template>-->


