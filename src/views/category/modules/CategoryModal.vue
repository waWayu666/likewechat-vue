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
      
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="父级id">-->
<!--          <a-input placeholder="请输入父级id" v-decorator="['parentId', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类别名称">
          <a-input placeholder="请输入类别名称" v-decorator="['categoryName', validatorRules.categoryName ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="图标">-->
<!--          <a-input placeholder="请输入图标" v-decorator="['icon', validatorRules.icon ]" />-->
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
            <img v-if="picUrlPic" :src="this.model.icon" alt="商品主图" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="是否删除（0：删除 1：未删除）">-->
<!--          <a-input placeholder="请输入是否删除（0：删除 1：未删除）" v-decorator="['delFlag', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序号">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import Vue from 'vue'
  import JEditor from '@/components/jeecg/JEditor'
  import {ACCESS_TOKEN} from "@/store/mutation-types"

  export default {
    name: "CategoryModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        picUrlPic: "",
        headers: {},
        uploadLoading: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        categoryName:{rules: [{ required: true, message: '请输入类别名称!' }]},
        icon:{rules: [{ required: true, message: '请输入图标!' }]},
        sort:{rules: [{ required: true, message: '请输入排序号!' }]},
        },
        url: {
          add: "/category/category/add",
          edit: "/category/category/edit",
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
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'parentId','categoryName','icon','delFlag','sort'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
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
                    this.model.icon = response.message;
                    console.log(this.model.icon);
                    this.picUrlPic = "Has no pic url yet";
                } else {
                    this.$message.warning(response.message);
                }
            }
        },
        getAvatarView() {
            return this.url.imgerver + "/" + this.model.icon;
        },

    }
  }
</script>

<style lang="less" scoped>

</style>