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
          label="幼儿园名称">
          <a-input placeholder="请输入幼儿园名称" v-decorator="['preschoolName', validatorRules.preschoolName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="园长昵称">
          <a-input placeholder="请输入园长昵称" v-decorator="['realname', validatorRules.realname ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="园长id">-->
<!--          <a-input placeholder="请输入园长id" v-decorator="['userId', validatorRules.userId ]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账号号码">
          <a-input placeholder="请输入主账号号码" v-decorator="['mobile', validatorRules.mobile ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人数">
          <a-input-number v-decorator="[ 'peopleNumber', validatorRules.peopleNumber ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省份名称">
          <a-input placeholder="请输入省份名称" v-decorator="['areapName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市区名称">
          <a-input placeholder="请输入市区名称" v-decorator="['areacName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="县（区）名称">
          <a-input placeholder="请输入县（区）名称" v-decorator="['areaxName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-select v-decorator="['status', {}]" placeholder="请选择审核状态">
            <a-select-option :value="1">待处理</a-select-option>
            <a-select-option :value="2">通过</a-select-option>
            <a-select-option :value="3">拒绝</a-select-option>
          </a-select>
         <!-- <div v-if="checkPreschool.status==1">待处理</div>
          <div v-else-if="checkPreschool.status==2">通过</div>
          <div v-else-if="checkPreschool.status==3">拒绝</div>-->
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {checkPreschoolById} from '@/api/api'

  export default {
    name: "PreschoolModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        checkPreschool:[],
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
        preschoolName:{rules: [{ required: true, message: '请输入幼儿园名称!' }]},
        realname:{rules: [{ required: true, message: '请输入园长昵称!' }]},
        userId:{rules: [{ required: true, message: '请输入园长id!' }]},
        mobile:{rules: [{ required: true, message: '请输入主账号号码!' }]},
        peopleNumber:{rules: [{ required: true, message: '请输入人数!' }]},
        status:{rules: [{ required: true, message: '请输入1:待处理2:通过3:拒绝!' }]},
        },
        url: {
          add: "/preschool/preschool/add",
          edit: "/preschool/preschool/edit",
          checkPreschool: "/preschool/preschool/checkPreschoolById",
          preschoolMemberList: "/preschool/preschool/listPreschoolMemberByMainId",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.checkPreschool = record;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'preschoolName','realname','userId','mobile','peopleNumber','areap','areapName','areac','areacName','areax','areaxName','status'))
		  //时间格式化
          this.form.setFieldsValue({applyTime:this.model.applyTime?moment(this.model.applyTime):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        console.log(this.checkPreschool.id)
        this.close()
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
            formData.applyTime = formData.applyTime?formData.applyTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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