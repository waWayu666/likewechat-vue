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
          label="优惠券类型id">
          <a-input placeholder="请输入优惠券类型id" v-decorator="['couponTypeId', validatorRules.couponTypeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺Id">
          <a-input placeholder="请输入店铺Id" v-decorator="['shopId', validatorRules.shopId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠券编码">
          <a-input placeholder="请输入优惠券编码" v-decorator="['couponCode', validatorRules.couponCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领用人">
          <a-input placeholder="请输入领用人" v-decorator="['userId', validatorRules.userId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠券使用订单id">
          <a-input placeholder="请输入优惠券使用订单id" v-decorator="['useOrderId', validatorRules.useOrderId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建订单id(优惠券只有是完成订单发放的优惠券时才有值)">
          <a-input placeholder="请输入创建订单id(优惠券只有是完成订单发放的优惠券时才有值)" v-decorator="['createOrderId', validatorRules.createOrderId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="面额">
          <a-input-number v-decorator="[ 'money', validatorRules.money ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领取时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'fetchTime', validatorRules.fetchTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'useTime', validatorRules.useTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠券状态 0未领用 1已领用（未使用） 2已使用 3已过期">
          <a-input placeholder="请输入优惠券状态 0未领用 1已领用（未使用） 2已使用 3已过期" v-decorator="['state', validatorRules.state ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效期开始时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'startTime', validatorRules.startTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效期结束时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endTime', validatorRules.endTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="获取方式1订单2.首页领取">
          <a-input-number v-decorator="[ 'getType', validatorRules.getType ]" />
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
    name: "CouponModal",
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
        couponTypeId:{rules: [{ required: true, message: '请输入优惠券类型id!' }]},
        shopId:{rules: [{ required: true, message: '请输入店铺Id!' }]},
        couponCode:{rules: [{ required: true, message: '请输入优惠券编码!' }]},
        userId:{rules: [{ required: true, message: '请输入领用人!' }]},
        useOrderId:{rules: [{ required: true, message: '请输入优惠券使用订单id!' }]},
        createOrderId:{rules: [{ required: true, message: '请输入创建订单id(优惠券只有是完成订单发放的优惠券时才有值)!' }]},
        money:{rules: [{ required: true, message: '请输入面额!' }]},
        fetchTime:{rules: [{ required: true, message: '请输入领取时间!' }]},
        useTime:{rules: [{ required: true, message: '请输入使用时间!' }]},
        state:{rules: [{ required: true, message: '请输入优惠券状态 0未领用 1已领用（未使用） 2已使用 3已过期!' }]},
        startTime:{rules: [{ required: true, message: '请输入有效期开始时间!' }]},
        endTime:{rules: [{ required: true, message: '请输入有效期结束时间!' }]},
        getType:{rules: [{ required: true, message: '请输入获取方式1订单2.首页领取!' }]},
        },
        url: {
          add: "/coupon/coupon/add",
          edit: "/coupon/coupon/edit",
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
          this.form.setFieldsValue(pick(this.model,'couponTypeId','shopId','couponCode','userId','useOrderId','createOrderId','money','state','getType'))
		  //时间格式化
          this.form.setFieldsValue({fetchTime:this.model.fetchTime?moment(this.model.fetchTime):null})
          this.form.setFieldsValue({useTime:this.model.useTime?moment(this.model.useTime):null})
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
            formData.fetchTime = formData.fetchTime?formData.fetchTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.useTime = formData.useTime?formData.useTime.format('YYYY-MM-DD HH:mm:ss'):null;
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