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
          label="订单编号">
          <a-input placeholder="请输入订单编号" v-decorator="['orderNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外部交易号">
          <a-input placeholder="请输入外部交易号" v-decorator="['outTradeNo', validatorRules.outTradeNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单类型">
          <a-input placeholder="请输入订单类型" v-decorator="['orderType', validatorRules.orderType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付类型1余额2支付宝3微信">
          <a-input placeholder="请输入支付类型1余额2支付宝3微信" v-decorator="['paymentType', validatorRules.paymentType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单配送方式">
          <a-input placeholder="请输入订单配送方式" v-decorator="['shippingType', validatorRules.shippingType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单来源">
          <a-input placeholder="请输入订单来源" v-decorator="['orderFrom', validatorRules.orderFrom ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家id">
          <a-input placeholder="请输入买家id" v-decorator="['buyerId', validatorRules.buyerId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家会员名称">
          <a-input placeholder="请输入买家会员名称" v-decorator="['userName', validatorRules.userName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家ip">
          <a-input placeholder="请输入买家ip" v-decorator="['buyerIp', validatorRules.buyerIp ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家附言">
          <a-input placeholder="请输入买家附言" v-decorator="['buyerMessage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家发票信息">
          <a-input placeholder="请输入买家发票信息" v-decorator="['buyerInvoice', validatorRules.buyerInvoice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发票状态0不需要1个人2公司">
          <a-input placeholder="请输入发票状态0不需要1个人2公司" v-decorator="['invoiceStatus', validatorRules.invoiceStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发票ID">
          <a-input placeholder="请输入发票ID" v-decorator="['invoiceId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人的手机号码">
          <a-input placeholder="请输入收货人的手机号码" v-decorator="['receiverMobile', validatorRules.receiverMobile ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人所在省">
          <a-input placeholder="请输入收货人所在省" v-decorator="['receiverProvince', validatorRules.receiverProvince ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人所在省份名称">
          <a-input placeholder="请输入收货人所在省份名称" v-decorator="['receiverProvinceName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人所在城市">
          <a-input placeholder="请输入收货人所在城市" v-decorator="['receiverCity', validatorRules.receiverCity ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人所在城市名称">
          <a-input placeholder="请输入收货人所在城市名称" v-decorator="['receiverCityName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人所在街道">
          <a-input placeholder="请输入收货人所在街道" v-decorator="['receiverDistrict', validatorRules.receiverDistrict ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人所在街道名称">
          <a-input placeholder="请输入收货人所在街道名称" v-decorator="['receiverDistrictName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人详细地址">
          <a-input placeholder="请输入收货人详细地址" v-decorator="['receiverAddress', validatorRules.receiverAddress ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人邮编">
          <a-input placeholder="请输入收货人邮编" v-decorator="['receiverZip', validatorRules.receiverZip ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收货人姓名">
          <a-input placeholder="请输入收货人姓名" v-decorator="['receiverName', validatorRules.receiverName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卖家店铺id">
          <a-input placeholder="请输入卖家店铺id" v-decorator="['shopId', validatorRules.shopId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卖家店铺名称">
          <a-input placeholder="请输入卖家店铺名称" v-decorator="['shopName', validatorRules.shopName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卖家对订单的标注星标">
          <a-input placeholder="请输入卖家对订单的标注星标" v-decorator="['sellerStar', validatorRules.sellerStar ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卖家对订单的备注">
          <a-input placeholder="请输入卖家对订单的备注" v-decorator="['sellerMemo', validatorRules.sellerMemo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卖家延迟发货时间">
          <a-input-number v-decorator="[ 'consignTimeAdjust', validatorRules.consignTimeAdjust ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品总价">
          <a-input-number v-decorator="[ 'goodsMoney', validatorRules.goodsMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单总价">
          <a-input-number v-decorator="[ 'orderMoney', validatorRules.orderMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单消耗积分">
          <a-input-number v-decorator="[ 'point', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单消耗积分抵多少钱">
          <a-input-number v-decorator="[ 'pointMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单代金券支付金额">
          <a-input-number v-decorator="[ 'couponMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单代金券id">
          <a-input placeholder="请输入订单代金券id" v-decorator="['couponId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单余额支付金额">
          <a-input-number v-decorator="[ 'userMoney', validatorRules.userMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户平台余额支付">
          <a-input-number v-decorator="[ 'userPlatformMoney', validatorRules.userPlatformMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单优惠活动金额">
          <a-input-number v-decorator="[ 'promotionMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单运费">
          <a-input-number v-decorator="[ 'shippingMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单实付金额">
          <a-input-number v-decorator="[ 'payMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单退款金额">
          <a-input-number v-decorator="[ 'refundMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购物币金额">
          <a-input-number v-decorator="[ 'coinMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单赠送积分">
          <a-input-number v-decorator="[ 'givePoint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单成功之后返购物币">
          <a-input-number v-decorator="[ 'giveCoin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单状态1代付款 2代发货 3代签收 4待评价 5已完成	6已关闭0 已取消  7退款">
          <a-input placeholder="请输入订单状态1代付款 2代发货 3代签收 4待评价 5已完成	6已关闭0 已取消  7退款" v-decorator="['orderStatus', validatorRules.orderStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单付款状态">
          <a-input placeholder="请输入订单付款状态" v-decorator="['payStatus', validatorRules.payStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单配送状态">
          <a-input placeholder="请输入订单配送状态" v-decorator="['shippingStatus', validatorRules.shippingStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单评价状态">
          <a-input placeholder="请输入订单评价状态" v-decorator="['reviewStatus', validatorRules.reviewStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单维权状态">
          <a-input placeholder="请输入订单维权状态" v-decorator="['feedbackStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否评价 0为未评价 1为已评价 2为已追评">
          <a-input placeholder="请输入是否评价 0为未评价 1为已评价 2为已追评" v-decorator="['isEvaluate', validatorRules.isEvaluate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="taxMoney">
          <a-input-number v-decorator="[ 'taxMoney', validatorRules.taxMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配送物流公司ID">
          <a-input placeholder="请输入配送物流公司ID" v-decorator="['shippingCompanyId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分返还类型 1 订单完成  2 订单收货 3  支付订单">
          <a-input placeholder="请输入积分返还类型 1 订单完成  2 订单收货 3  支付订单" v-decorator="['givePointType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单付款时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'payTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家要求配送时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'shippingTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家签收时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'signTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卖家发货时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'consignTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单完成时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'finishTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单是否已删除">
          <a-input placeholder="请输入订单是否已删除" v-decorator="['isDeleted', validatorRules.isDeleted ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作人类型  1店铺  2用户">
          <a-input placeholder="请输入操作人类型  1店铺  2用户" v-decorator="['operatorType', validatorRules.operatorType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作人id">
          <a-input placeholder="请输入操作人id" v-decorator="['operatorId', validatorRules.operatorId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单退款余额">
          <a-input-number v-decorator="[ 'refundBalanceMoney', validatorRules.refundBalanceMoney ]" />
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
    name: "OrderModal",
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
        outTradeNo:{rules: [{ required: true, message: '请输入外部交易号!' }]},
        orderType:{rules: [{ required: true, message: '请输入订单类型!' }]},
        paymentType:{rules: [{ required: true, message: '请输入支付类型1余额2支付宝3微信!' }]},
        shippingType:{rules: [{ required: true, message: '请输入订单配送方式!' }]},
        orderFrom:{rules: [{ required: true, message: '请输入订单来源!' }]},
        buyerId:{rules: [{ required: true, message: '请输入买家id!' }]},
        userName:{rules: [{ required: true, message: '请输入买家会员名称!' }]},
        buyerIp:{rules: [{ required: true, message: '请输入买家ip!' }]},
        buyerInvoice:{rules: [{ required: true, message: '请输入买家发票信息!' }]},
        invoiceStatus:{rules: [{ required: true, message: '请输入发票状态0不需要1个人2公司!' }]},
        receiverMobile:{rules: [{ required: true, message: '请输入收货人的手机号码!' }]},
        receiverProvince:{rules: [{ required: true, message: '请输入收货人所在省!' }]},
        receiverCity:{rules: [{ required: true, message: '请输入收货人所在城市!' }]},
        receiverDistrict:{rules: [{ required: true, message: '请输入收货人所在街道!' }]},
        receiverAddress:{rules: [{ required: true, message: '请输入收货人详细地址!' }]},
        receiverZip:{rules: [{ required: true, message: '请输入收货人邮编!' }]},
        receiverName:{rules: [{ required: true, message: '请输入收货人姓名!' }]},
        shopId:{rules: [{ required: true, message: '请输入卖家店铺id!' }]},
        shopName:{rules: [{ required: true, message: '请输入卖家店铺名称!' }]},
        sellerStar:{rules: [{ required: true, message: '请输入卖家对订单的标注星标!' }]},
        sellerMemo:{rules: [{ required: true, message: '请输入卖家对订单的备注!' }]},
        consignTimeAdjust:{rules: [{ required: true, message: '请输入卖家延迟发货时间!' }]},
        goodsMoney:{rules: [{ required: true, message: '请输入商品总价!' }]},
        orderMoney:{rules: [{ required: true, message: '请输入订单总价!' }]},
        userMoney:{rules: [{ required: true, message: '请输入订单余额支付金额!' }]},
        userPlatformMoney:{rules: [{ required: true, message: '请输入用户平台余额支付!' }]},
        orderStatus:{rules: [{ required: true, message: '请输入订单状态1代付款 2代发货 3代签收 4待评价 5已完成	6已关闭0 已取消  7退款!' }]},
        payStatus:{rules: [{ required: true, message: '请输入订单付款状态!' }]},
        shippingStatus:{rules: [{ required: true, message: '请输入订单配送状态!' }]},
        reviewStatus:{rules: [{ required: true, message: '请输入订单评价状态!' }]},
        isEvaluate:{rules: [{ required: true, message: '请输入是否评价 0为未评价 1为已评价 2为已追评!' }]},
        taxMoney:{rules: [{ required: true, message: '请输入taxMoney!' }]},
        isDeleted:{rules: [{ required: true, message: '请输入订单是否已删除!' }]},
        operatorType:{rules: [{ required: true, message: '请输入操作人类型  1店铺  2用户!' }]},
        operatorId:{rules: [{ required: true, message: '请输入操作人id!' }]},
        refundBalanceMoney:{rules: [{ required: true, message: '请输入订单退款余额!' }]},
        },
        url: {
          add: "/order/order/add",
          edit: "/order/order/edit",
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
          this.form.setFieldsValue(pick(this.model,'orderNo','outTradeNo','orderType','paymentType','shippingType','orderFrom','buyerId','userName','buyerIp','buyerMessage','buyerInvoice','invoiceStatus','invoiceId','receiverMobile','receiverProvince','receiverProvinceName','receiverCity','receiverCityName','receiverDistrict','receiverDistrictName','receiverAddress','receiverZip','receiverName','shopId','shopName','sellerStar','sellerMemo','consignTimeAdjust','goodsMoney','orderMoney','point','pointMoney','couponMoney','couponId','userMoney','userPlatformMoney','promotionMoney','shippingMoney','payMoney','refundMoney','coinMoney','givePoint','giveCoin','orderStatus','payStatus','shippingStatus','reviewStatus','feedbackStatus','isEvaluate','taxMoney','shippingCompanyId','givePointType','isDeleted','operatorType','operatorId','refundBalanceMoney'))
		  //时间格式化
          this.form.setFieldsValue({payTime:this.model.payTime?moment(this.model.payTime):null})
          this.form.setFieldsValue({shippingTime:this.model.shippingTime?moment(this.model.shippingTime):null})
          this.form.setFieldsValue({signTime:this.model.signTime?moment(this.model.signTime):null})
          this.form.setFieldsValue({consignTime:this.model.consignTime?moment(this.model.consignTime):null})
          this.form.setFieldsValue({finishTime:this.model.finishTime?moment(this.model.finishTime):null})
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
            formData.payTime = formData.payTime?formData.payTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.shippingTime = formData.shippingTime?formData.shippingTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.signTime = formData.signTime?formData.signTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.consignTime = formData.consignTime?formData.consignTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.finishTime = formData.finishTime?formData.finishTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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