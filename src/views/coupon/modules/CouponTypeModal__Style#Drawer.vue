<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺ID">
          <a-input placeholder="请输入店铺ID" v-decorator="['shopId', validatorRules.shopId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠券名称">
          <a-input placeholder="请输入优惠券名称" v-decorator="['couponName', validatorRules.couponName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放面额">
          <a-input-number v-decorator="[ 'money', validatorRules.money ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放数量">
          <a-input-number v-decorator="[ 'count', validatorRules.count ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每人最大领取个数 0无限制">
          <a-input-number v-decorator="[ 'maxFetch', validatorRules.maxFetch ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="满多少元使用 0代表无限制">
          <a-input-number v-decorator="[ 'atLeast', validatorRules.atLeast ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领取人会员等级">
          <a-input placeholder="请输入领取人会员等级" v-decorator="['needUserLevel', validatorRules.needUserLevel ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用范围0部分产品使用 1全场产品使用">
          <a-input placeholder="请输入使用范围0部分产品使用 1全场产品使用" v-decorator="['rangeType', validatorRules.rangeType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效日期开始时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'startTime', validatorRules.startTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效日期结束时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endTime', validatorRules.endTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否允许首页显示0不显示1显示">
          <a-input placeholder="请输入是否允许首页显示0不显示1显示" v-decorator="['isShow', validatorRules.isShow ]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "CouponTypeModal",
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
        shopId:{rules: [{ required: true, message: '请输入店铺ID!' }]},
        couponName:{rules: [{ required: true, message: '请输入优惠券名称!' }]},
        money:{rules: [{ required: true, message: '请输入发放面额!' }]},
        count:{rules: [{ required: true, message: '请输入发放数量!' }]},
        maxFetch:{rules: [{ required: true, message: '请输入每人最大领取个数 0无限制!' }]},
        atLeast:{rules: [{ required: true, message: '请输入满多少元使用 0代表无限制!' }]},
        needUserLevel:{rules: [{ required: true, message: '请输入领取人会员等级!' }]},
        rangeType:{rules: [{ required: true, message: '请输入使用范围0部分产品使用 1全场产品使用!' }]},
        startTime:{rules: [{ required: true, message: '请输入有效日期开始时间!' }]},
        endTime:{rules: [{ required: true, message: '请输入有效日期结束时间!' }]},
        isShow:{rules: [{ required: true, message: '请输入是否允许首页显示0不显示1显示!' }]},
        },
        url: {
          add: "/coupon/couponType/add",
          edit: "/coupon/couponType/edit",
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
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'shopId','couponName','money','count','maxFetch','atLeast','needUserLevel','rangeType','isShow'))
		  //时间格式化
          this.form.setFieldsValue({startTime:this.model.startTime?moment(this.model.startTime):null})
          this.form.setFieldsValue({endTime:this.model.endTime?moment(this.model.endTime):null})
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
            formData.startTime = formData.startTime?formData.startTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.endTime = formData.endTime?formData.endTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>