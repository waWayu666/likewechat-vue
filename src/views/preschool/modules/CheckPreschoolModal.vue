<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :bodystyle="visible"
    @ok="handleOk"
    @cancel="handleCancel"
   >
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="幼儿园名称">
          <!--<a-input placeholder="请输入幼儿园名称" v-decorator="['preschoolName', validatorRules.preschoolName ]" />-->
          {{checkPreschool.preschoolName}}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="园长昵称">
          <!--<a-input placeholder="请输入园长昵称" v-decorator="['realname', validatorRules.realname ]" />-->
          {{checkPreschool.realname}}
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
          <!--<a-input placeholder="请输入主账号号码" v-decorator="['mobile', validatorRules.mobile ]" />-->
          {{checkPreschool.mobile}}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人数">
          <!--<a-input-number v-decorator="[ 'peopleNumber', validatorRules.peopleNumber ]" />-->
          {{checkPreschool.peopleNumber}}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省份名称">
          <!--<a-input placeholder="请输入省份名称" v-decorator="['areapName', {}]" />-->
          {{checkPreschool.areapName}}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市区名称">
          <!--<a-input placeholder="请输入市区名称" v-decorator="['areacName', {}]" />-->
          {{checkPreschool.areacName}}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="县（区）名称">
          <!--<a-input placeholder="请输入县（区）名称" v-decorator="['areaxName', {}]" />-->
          {{checkPreschool.areaxName}}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <div v-if="checkPreschool.status==1">待处理</div>
          <div v-else-if="checkPreschool.status==2">通过</div>
          <div v-else-if="checkPreschool.status==3">拒绝</div>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核">
          <a-button @click="checkPreschoolNo" type="danger" >拒绝</a-button>
          <a-button @click="checkPreschoolOk" type="primary" >通过</a-button>
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
    inject:['reload'],
    name: "CheckPreschoolModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        checkPreschool:{},
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
      show () {
        this.visible = true;
      },
      initial(data){
        this.checkPreschool = data;
        console.log(this.checkPreschool)
      },
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
      checkPreschoolOk(){
        const that = this;
        console.log(this.checkPreschool.id);
        let str=[this.checkPreschool.id,2];
        checkPreschoolById(str.toString(),null).then((res)=>{
          if(res.code === 1){
            //this.usersList = res.data;
            console.log('审核通过成功');
            this.$message.success('审核通过成功');
          }else {
            console.log('审核通过失败');
            this.$message.success('审核通过失败');
          }
        });
        this.reload();
        this.close();
      },
      checkPreschoolNo(){
        let str=[this.checkPreschool.id,3]
        checkPreschoolById(str.toString(),null).then((res)=>{
        if(res.code === 1){
          //this.usersList = res.data;
          console.log('审核拒绝成功');
          this.$message.success('审核拒绝成功');
        }else {
          console.log('审核拒绝失败');
          this.$message.success('审核拒绝失败');
        }
      });
        this.reload();
        this.close();
      },
      handleOk () {
        const that = this;
        console.log(this.checkPreschool.id)
        // 触发表单验证
        /*this.form.validateFields((err, values) => {
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
        })*/
        this.close();
      },
      handleCancel () {
        /*let str=[this.checkPreschool.id,3]
        checkPreschoolById(str.toString(),null).then((res)=>{
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