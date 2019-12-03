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
          <a-input placeholder="请输入标题" v-decorator="['titile', validatorRules.titile]" />
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
          label="选择状态">
          <a-select v-decorator="[ 'sendStatus', validatorRules.sendStatus]" placeholder="选择状态">
            <a-select-option value="0">发布</a-select-option>
            <a-select-option value="1">取消</a-select-option>
          </a-select>
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

  export default {
    name: "AnnouncementModal",
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
          titile:{rules: [{ required: true, message: '请输入公告标题!' }]},
          sendStatus:{rules: [{ required: true, message: '请选择状态!' }]},
        },
        url: {
          add: "/announcement/announcement/add",
          edit: "/announcement/announcement/edit",
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
          this.form.setFieldsValue(pick(this.model,'titile','content','sender','sendStatus','imgUrl','delFlag'))
		  //时间格式化
          this.form.setFieldsValue({startTime:this.model.startTime?moment(this.model.startTime):null})
          this.form.setFieldsValue({endTime:this.model.endTime?moment(this.model.endTime):null})
          this.form.setFieldsValue({sendTime:this.model.sendTime?moment(this.model.sendTime):null})
          this.form.setFieldsValue({cancelTime:this.model.cancelTime?moment(this.model.cancelTime):null})
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
            formData.startTime = formData.startTime?formData.startTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.endTime = formData.endTime?formData.endTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.sendTime = formData.sendTime?formData.sendTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.cancelTime = formData.cancelTime?formData.cancelTime.format('YYYY-MM-DD HH:mm:ss'):null;

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