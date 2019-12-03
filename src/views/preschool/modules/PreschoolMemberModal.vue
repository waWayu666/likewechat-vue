<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">


  <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账号号码"
          v-model="this.userMobile">
          <a-input placeholder="请输入主账号号码" v-decorator="['userMobile',{}]" disabled="disable"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成员手机号">
          <a-input placeholder="请输入成员手机号" v-decorator="['memberMobile', validatorRules.memberMobile ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成员昵称">
          <a-input placeholder="请输入成员昵称" v-decorator="['memberName', validatorRules.memberName ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="选择状态">
          <a-select v-decorator="['status', {}]" placeholder="请选择审核状态">
            <a-select-option :value="1">待处理</a-select-option>
            <a-select-option :value="2">通过</a-select-option>
            <a-select-option :value="3">拒绝</a-select-option>
          </a-select>
        </a-form-item>
         <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="合作园id"
            v-model="this.preschoolId"
            :hidden="hiding"
            hasFeedback>
            <a-input v-decorator="[ 'preschoolId', {}]" disabled="disabled"/>
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {checkPreschoolMemberById} from '@/api/api'

  export default {
    name: "PreschoolMemberModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        checkPreschoolMember:[],
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
        preschoolId:{rules: [{ required: true, message: '请输入合作园id!' }]},
        userId:{rules: [{ required: true, message: '请输入主账号id!' }]},
        userMobile:{rules: [{ required: true, message: '请输入主账号号码!' }]},
        memberId:{rules: [{ required: true, message: '请输入成员id!' }]},
        memberMobile:{rules: [{ required: true, message: '请输入成员手机号!' }]},
          memberName:{rules: [{ required: true, message: '请输入成员昵称!' }]},
        applyTime:{rules: [{ required: true, message: '请输入申请时间!' }]},
        status:{rules: [{ required: true, message: '请输入1:待处理2:通过3:拒绝!' }]},
        },
        url: {
          add: "/preschool/preschoolMember/add",
          edit: "/preschool/preschoolMember/edit",
          checkPreschool: "/preschool/preschoolMember/checkPreschoolMemberById",
          getPreschoolMemberList: "/preschool/preschool/listPreschoolMemberByMainId",
        },
      }
    },
    created () {
    },
    methods: {
      add (preschoolId,userMobile) {
        console.log(userMobile)
        console.log("==========")
        console.log(preschoolId)
        this.hiding=false;
        if(preschoolId){
          this.preschoolId=preschoolId;
          this.userMobile=userMobile;
          this.edit({preschoolId,userMobile},'');
        }else{
          this.$message.warning("请选择一个合作园信息")
        }
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.checkPreschoolMember=record;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'preschoolId','userId','userMobile','memberId','memberMobile','memberName','avatar','status'))
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
       /* let str=[this.checkPreschoolMember.id,2]
        checkPreschoolMemberById(str.toString(),null).then((res)=>{
          if(res.code === 1){
            //this.usersList = res.data;
            console.log('审核通过成功');
            this.$message.success('审核通过成功');
          }else {
            console.log('审核通过失败');
            this.$message.success('审核通过失败');
          }
        });*/

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
        });
        this.close();
      },
      handleCancel () {
       /* let str=[this.checkPreschoolMember.id,3]
        checkPreschoolMemberById(str.toString(),null).then((res)=>{
          if(res.code === 1){
            //this.usersList = res.data;
            console.log('审核拒绝成功');
            this.$message.success('审核拒绝成功');
          }else {
            console.log('审核拒绝失败');
            this.$message.success('审核拒绝失败');
          }
        });*/
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>