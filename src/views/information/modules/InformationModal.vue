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

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首页封面">

          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleHomeChange"
          >
            <img v-if="this.model.homePageCover" :src="this.model.homePageCover" alt="首页封面" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="选择首页展示">
          <a-select v-decorator="[ 'isHomePage', validatorRules.isHomePage]" placeholder="选择首页展示">
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">是</a-select-option>
          </a-select>
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="列表封面">

          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="this.model.listCover" :src="this.model.listCover" alt="首页封面" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input placeholder="请输入排序" v-decorator="['sort', {}]" />
        </a-form-item>

        <a-col>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="请输入内容"
            style="min-height: 300px">
            <j-editor v-model="jeditor.content"/>
          </a-form-item>
        </a-col>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JEditor from '@/components/jeecg/JEditor'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"

  export default {
    name: "InformationModal",
    components: {
      JEditor
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        headers:{},
        jeditor: {content:''},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        uploadLoading:false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        title:{rules: [{ required: true, message: '请输入标题!' }]},
        content:{rules: [{ required: true, message: '请输入内容!' }]},
        isHomePage:{rules: [{ required: true, message: '请输入是否首页展示0:否1:是!' }]},
        homePageCover:{rules: [{ required: true, message: '请输入首页封面!' }]},
        listCover:{rules: [{ required: true, message: '请输入列表封面!' }]},
        delFlag:{rules: [{ required: true, message: '请输入删除状态（0已删除，1正常）!' }]},
        },
        url: {
          add: "/information/information/add",
          edit: "/information/information/edit",
          fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",
          imgerver: window._CONFIG['domianURL']+"/sys/common/view",
        },
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"TOKEN":token};
    },
    computed:{
      uploadAction:function () {
        return this.url.fileUpload;
      }
    },
    methods: {
      add () {
        this.edit({});
        this.model.homePageCover='';
        this.model.listCover='';
        this.jeditor.content = '';
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        if(JSON.stringify(record)!= '{}' ){
          this.jeditor.content = decodeURIComponent(this.model.content);
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'title','content','sort','isHomePage','homePageCover','listCover','delFlag','readNumber'))
		  //时间格式化
          this.form.setFieldsValue({sendTime:this.model.sendTime?moment(this.model.sendTime):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        let content = encodeURIComponent(this.jeditor.content);
        this.model.content = content;
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
            formData.sendTime = formData.sendTime?formData.sendTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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
      beforeUpload: function(file){
        var fileType = file.type;
        if(fileType.indexOf('image')<0){
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      handleHomeChange (info) { //上传首页封面
        console.log(info)
        if (info.file.status === 'uploading') {
          this.uploadLoading = true
          return
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.homePageCover = response.message;
            console.log(this.model.homePageCover);
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      getHomeAvatarView(){
        console.log(this.url.imgerver +"/"+ this.model.homePageCover);
        return this.url.imgerver +"/"+ this.model.homePageCover;
      },

      handleChange (info) { //上传首页封面
        console.log(info)
        if (info.file.status === 'uploading') {
          this.uploadLoading = true
          return
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.listCover = response.message;
            console.log(this.model.listCover);
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      getAvatarView(){
        console.log(this.url.imgerver +"/"+ this.model.listCover);
        return this.url.imgerver +"/"+ this.model.listCover;
      },

    }
  }
</script>

<style lang="less" scoped>

</style>