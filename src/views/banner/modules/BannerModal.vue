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
          <a-input placeholder="请输入标题" v-decorator="['title', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="位置ID">
          <a-input placeholder="请输入位置ID" v-decorator="['positionId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片地址">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange">
            <img v-if="this.model.imgUrl" :src="this.model.imgUrl" alt="图片地址" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入描述" v-decorator="['description', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1内联2外链">
          <a-select style="width: 100%" placeholder="请选择内联/外链" v-decorator="['linkType', {}]">
            <a-select-option value="1">内联</a-select-option>
            <a-select-option value="2">外链</a-select-option>
          </a-select>
          <!--<a-input placeholder="请输入1内联2外链" v-decorator="['linkType', {}]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="链接地址">
          <a-input placeholder="请输入链接地址" v-decorator="['link', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用">
          <a-select style="width: 100%" placeholder="请选择是否启用" v-decorator="['useFlag', {}]">
            <a-select-option value="0">不启用</a-select-option>
            <a-select-option value="1">启用</a-select-option>
          </a-select>
          <!--<a-input placeholder="请输入是否有用：0-不启用 1-启用" v-decorator="['useFlag', {}]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否删除">
          <a-select style="width: 100%" placeholder="请选择是否删除" v-decorator="['delFlag', {}]">
            <a-select-option value="0">已删除</a-select-option>
            <a-select-option value="1">未删除</a-select-option>
          </a-select>
          <!--<a-input placeholder="请输入是否删除：0-已删除  1-未删除" v-decorator="['delFlag', {}]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'sort', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "BannerModal",
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

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        headers:{},
        uploadLoading:false,
        url: {
          add: "/banner/banner/add",
          edit: "/banner/banner/edit",
          /*fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",*/
          fileUpload: window._CONFIG['domianURL']+"/sys/common/uploadAli",
          imgerver: window._CONFIG['imgDomainURL']
        },
      }
    },
    created () {
    },
    computed: {
      uploadAction:function () {
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
          this.form.setFieldsValue(pick(this.model,'title','positionId','imgUrl','description','linkType','link','useFlag','delFlag','sort'))
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
      getAvatarView: function (imgUrl) {
        return this.url.imgerver + "/" + imgUrl;
      },
      beforeUpload: function(file){
        var fileType = file.type;
        if(fileType.indexOf('image')<0){
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      handleChange (info) {
        console.log(info);
        if (info.file.status === 'uploading') {
          this.uploadLoading = true
          return
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.imgUrl = response.message;
          }else{
            this.$message.warning(response.message);
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>