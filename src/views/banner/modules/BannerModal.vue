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
          label="标题">
          <a-input placeholder="请输入标题" v-decorator="['title', validatorRules.title ]" />
        </a-form-item>

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="图片地址">-->
<!--          <a-input placeholder="请输入图片地址" v-decorator="['imgUrl', validatorRules.imgUrl ]" />-->
<!--        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片地址">

          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrlPic" :src="this.model.imgUrl" alt="图片地址" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <j-editor v-model="jeditor.description"/>
        </a-form-item>

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="链接类型：">-->
<!--          <a-select v-decorator="[ 'linkType', validatorRules.linkType]" placeholder="请选择链接类型">-->
<!--            <a-select-option :value="0">无连接</a-select-option>-->
<!--            <a-select-option :value="1">规则</a-select-option>-->
<!--            <a-select-option :value="2">商品详情</a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="链接地址">-->
<!--          <a-input placeholder="请输入链接地址" v-decorator="['link', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用：">
          <a-select v-decorator="[ 'useFlag', validatorRules.useFlag]" placeholder="请选择是否有用">
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">不启用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
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
  import JEditor from '@/components/jeecg/JEditor'
  import {ACCESS_TOKEN} from "@/store/mutation-types"

  export default {
    name: "BannerModal",
    components: {
        JEditor
    },
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
        jeditor: {
            description:''
        },
        picUrlPic: "",
        headers: {},
        uploadLoading: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        title:{rules: [{ required: true, message: '请输入标题!' }]},
        imgUrl:{rules: [{ required: true, message: '请输入图片地址!' }]},
        description:{rules: [{ required: true, message: '请输入描述!' }]},
        linkType:{rules: [{ required: true, message: '请选择链接类型!' }]},
        useFlag:{rules: [{ required: true, message: '请输入是否有用：0-不启用 1-启用!' }]},
        sort:{rules: [{ required: true, message: '请输入排序!' }]},
        },
        url: {
          add: "/banner/banner/add",
          edit: "/banner/banner/edit",
          fileUpload: window._CONFIG['domianURL'] + "/sys/common/uploadQiNiuYun",
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
        },
      }
    },
    created () {
    },
    computed: {
        uploadAction: function () {
            return this.url.fileUpload;
        }
    },
    methods: {
      add () {
        this.edit({});
        this.jeditor.description = '';
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.jeditor.description = decodeURIComponent(this.model.description);
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'title','imgUrl','description','linkType','link','useFlag','sort'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        let description = encodeURIComponent(this.jeditor.description);
        this.model.description = description;
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
                    this.model.imgUrl = response.message;
                    console.log(this.model.imgUrl);
                    this.picUrlPic = "Has no pic url yet";
                } else {
                    this.$message.warning(response.message);
                }
            }
        },

    }
  }
</script>

<style lang="less" scoped>

</style>