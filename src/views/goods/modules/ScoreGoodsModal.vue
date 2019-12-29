<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品名称">
          <a-input placeholder="请输入商品名称" v-decorator="['goodsName', validatorRules.goodsName ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="商品编号">-->
<!--          <a-input placeholder="请输入商品编号" v-decorator="['goodsNum', validatorRules.goodsNum ]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品主图">

          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrlPic" :src="this.model.mainImage" alt="商品主图" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <!-- 轮播图mainImages -->
        <a-form-item label="轮播图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :action="uploadAction"
            :fileList="fileListLb"
            :multiple="true"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @preview="handlePreview"
            @change="handleChangeLb"
          >
            <div v-if="fileListLb.length < 6">
              <a-icon type="plus"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
            <img alt="example" style="width: 100%" :src="previewImage"/>
          </a-modal>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市场价">
          <a-input-number v-decorator="[ 'price', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金比例">
          <a-input-number v-decorator="[ 'moneyRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所需积分">
          <a-input-number v-decorator="[ 'score', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述介绍">
          <a-textarea placeholder="请输入描述介绍" v-decorator="['introduction', validatorRules.introduction ]" :rows="4"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序号">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品详情">
          <j-editor v-model="jeditor.goodsDesc"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品状态">
          <a-select v-decorator="[ 'status', validatorRules.status]" placeholder="请选择商品状态">
            <a-select-option :value="1">上架</a-select-option>
            <a-select-option :value="0">下架</a-select-option>
          </a-select>
          <!--            <a-switch checkedChildren="上架" unCheckedChildren= "下架"  @change="handleSwitch"/>-->
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品状态">
          <a-select v-decorator="[ 'goodsType', validatorRules.goodsType]" placeholder="请选择商品属性">
            <a-select-option :value="0">邮寄</a-select-option>
            <a-select-option :value="1">寄拍</a-select-option>
          </a-select>
          <!--            <a-switch checkedChildren="上架" unCheckedChildren= "下架"  @change="handleSwitch"/>-->
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import Vue from 'vue'
  import moment from "moment"
  import JEditor from '@/components/jeecg/JEditor'
  import {ACCESS_TOKEN} from "@/store/mutation-types"

  export default {
    name: "ScoreGoodsModal",
    components: {
        JEditor
    },
    data () {
      return {
        title:"操作",
        visible: false,
        previewVisible: false,
        previewImage: '',
        fileListLb: [],
        fileTempLb: [],
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        jeditor: {
            goodsDesc:''
        },
        picUrlPic: "",
        headers: {},
        uploadLoading: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        goodsNum:{rules: [{ required: true, message: '请输入商品编号!' }]},
        introduction:{rules: [{ required: true, message: '请输入描述介绍!' }]},
        sort:{rules: [{ required: true, message: '请输入排序号!' }]},
        mainImage:{rules: [{ required: true, message: '请输入商品主图!' }]},
        goodsDesc:{rules: [{ required: true, message: '请输入商品详情!' }]},
        status:{rules: [{ required: true, message: '请选择商品上下架!' }]},
        goodsType:{rules: [{ required: true, message: '请选择商品状态!' }]},
        },
        url: {
          add: "/goods/scoreGoods/add",
          edit: "/goods/scoreGoods/edit",
          fileUpload: window._CONFIG['domianURL'] + "/sys/common/uploadQiNiuYun",
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
        },
      }
    },
    created () {
        const token = Vue.ls.get(ACCESS_TOKEN);
        this.headers = {"TOKEN": token};
    },
    computed: {
        uploadAction: function () {
            return this.url.fileUpload;
        }
    },
    methods: {
      add () {
        this.edit({});
        this.jeditor.goodsDesc = '';
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.jeditor.goodsDesc = decodeURIComponent(this.model.goodsDesc);
        if (record.hasOwnProperty("id")) { //编辑的时候回显主图
            this.picUrlPic = "Has no pic url yet";
        }
        // 轮播图回显
        this.fileListLb = [];
        this.fileTempLb = [];
        let ss = [];
        if (record.mainImages != undefined && record.mainImages != "") {
            this.fileTempLb = record.mainImages.split(",");
            this.fileTempLb.map((item, num) => {
                ss.push({
                    uid: num,
                    url: item
                });
            })
        }
        this.fileListLb = ss;

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'goodsName','goodsNum','price','moneyRatio','score','introduction','sort','mainImage','goodsDesc','status','goodsType'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        let goodsDesc = encodeURIComponent(this.jeditor.goodsDesc);
        this.model.goodsDesc = goodsDesc;

        // 轮播图片地址
        this.model.mainImages = this.fileTempLb.toString();

        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },
      beforeUpload: function (file) {
          var fileType = file.type;
          if (fileType.indexOf('image') < 0) {
              this.$message.warning('请上传图片');
              return false;
          }
          //TODO 验证文件大小
      },
      handleChange(info) { //上传主图(一张图)
          console.log(info);
          this.picUrlPic = "";
          if (info.file.status === 'uploading') {
              this.uploadLoading = true;
              return
          }
          if (info.file.status === 'done') {
              let response = info.file.response;
              this.uploadLoading = false;
              console.log(response);
              if (response.success) {
                  this.model.mainImage = response.message;
                  console.log(this.model.mainImage);
                  this.picUrlPic = "Has no pic url yet";
              } else {
                  this.$message.warning(response.message);
              }
          }
      },
      getAvatarView() {
          return this.url.imgerver + "/" + this.model.mainImage;
      },
      handleCancelImg() {
          this.previewVisible = false
      },
      handlePreview(file) {
          this.mainImages = file.url || file.thumbUrl;
          this.previewVisible = true
      },
      handleChangeLb({file, fileList}) {
          /*debugger;*/
          if (file.status == "removed") {
              this.fileListLb.map((item, index) => {
                  if (item.uid == file.uid) {
                      this.fileListLb.splice(index, 1);
                      this.fileTempLb.splice(index, 1);
                  }
              });
              if (file.name) {
                  this.fileTempLb.map((item, index) => {
                      if (item == file.response.message) {
                          this.fileTempLb.splice(index, 1);
                      }
                  })
              } else {
                  let removeFileImgUrl = file.url.split('view/')[1];
                  this.fileTempLb.map((item, index) => {
                      if (item == removeFileImgUrl) {
                          this.fileTempLb.splice(index, 1);
                      }
                  })
              }
          } else {
              this.fileListLb = fileList;
              this.fileTempLb.push(file.response.message);
          }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>