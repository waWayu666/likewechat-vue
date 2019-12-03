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
          label="父ID">
          <a-input placeholder="请输入父ID" v-decorator="['pid', validatorRules.pid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="标题">
          <a-input placeholder="请输入标题" v-decorator="['title', validatorRules.title ]" />
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
  import JEditor from '@/components/jeecg/JEditor'
  import moment from "moment"

  export default {
    name: "HelpCenterModal",
    components: {
      JEditor
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        jeditor: {content:''},
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
        pid:{rules: [{ required: true, message: '请输入父ID!' }]},
        title:{rules: [{ required: true, message: '请输入标题!' }]},
        content:{rules: [{ required: true, message: '请输入内容!' }]},
        },
        url: {
          add: "/help/helpCenter/add",
          edit: "/help/helpCenter/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
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
          this.form.setFieldsValue(pick(this.model,'pid','title','content','sort','delFlag'))
		  //时间格式化
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


    }
  }
</script>

<style lang="less" scoped>

</style>