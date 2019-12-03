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
          label="订单ID">
          <a-input placeholder="请输入订单ID" v-decorator="['orderId', validatorRules.orderId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品ID">
          <a-input placeholder="请输入商品ID" v-decorator="['goodsId', validatorRules.goodsId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品名称">
          <a-input placeholder="请输入商品名称" v-decorator="['goodsName', validatorRules.goodsName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="skuID">
          <a-input placeholder="请输入skuID" v-decorator="['skuId', validatorRules.skuId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sku名称">
          <a-input placeholder="请输入sku名称" v-decorator="['skuName', validatorRules.skuName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品价格">
          <a-input-number v-decorator="[ 'price', validatorRules.price ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品成本价">
          <a-input-number v-decorator="[ 'costPrice', validatorRules.costPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买数量">
          <a-input placeholder="请输入购买数量" v-decorator="['num', validatorRules.num ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input-number v-decorator="[ 'adjustMoney', validatorRules.adjustMoney ]" />
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
          label="商品图片">
          <a-input placeholder="请输入商品图片" v-decorator="['goodsPicture', validatorRules.goodsPicture ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺ID">
          <a-input placeholder="请输入店铺ID" v-decorator="['shopId', validatorRules.shopId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买人ID">
          <a-input placeholder="请输入购买人ID" v-decorator="['buyerId', validatorRules.buyerId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分兑换类型0.非积分兑换1.积分兑换">
          <a-input-number v-decorator="[ 'pointExchangeType', validatorRules.pointExchangeType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品类型">
          <a-input placeholder="请输入商品类型" v-decorator="['goodsType', validatorRules.goodsType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="促销ID">
          <a-input placeholder="请输入促销ID" v-decorator="['promotionId', validatorRules.promotionId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="促销类型">
          <a-input-number v-decorator="[ 'promotionTypeId', validatorRules.promotionTypeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单类型">
          <a-input-number v-decorator="[ 'orderType', validatorRules.orderType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单状态">
          <a-input-number v-decorator="[ 'orderStatus', validatorRules.orderStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分数量">
          <a-input-number v-decorator="[ 'givePoint', validatorRules.givePoint ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="物流状态">
          <a-input-number v-decorator="[ 'shippingStatus', validatorRules.shippingStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款方式">
          <a-input-number v-decorator="[ 'refundType', validatorRules.refundType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款金额">
          <a-input-number v-decorator="[ 'refundRequireMoney', validatorRules.refundRequireMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款原因">
          <a-input placeholder="请输入退款原因" v-decorator="['refundReason', validatorRules.refundReason ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款物流单号">
          <a-input placeholder="请输入退款物流单号" v-decorator="['refundShippingCode', validatorRules.refundShippingCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款物流公司名称">
          <a-input placeholder="请输入退款物流公司名称" v-decorator="['refundShippingCompany', validatorRules.refundShippingCompany ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际退款金额">
          <a-input-number v-decorator="[ 'refundRealMoney', validatorRules.refundRealMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款状态">
          <a-input-number v-decorator="[ 'refundStatus', validatorRules.refundStatus ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['memo', validatorRules.memo ]" />
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
          label="退款时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'refundTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单退款余额">
          <a-input-number v-decorator="[ 'refundBalanceMoney', validatorRules.refundBalanceMoney ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批量打印时添加的临时物流公司">
          <a-input placeholder="请输入批量打印时添加的临时物流公司" v-decorator="['tmpExpressCompany', validatorRules.tmpExpressCompany ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批量打印时添加的临时物流公司id">
          <a-input placeholder="请输入批量打印时添加的临时物流公司id" v-decorator="['tmpExpressCompanyId', validatorRules.tmpExpressCompanyId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批量打印时添加的临时订单编号">
          <a-input placeholder="请输入批量打印时添加的临时订单编号" v-decorator="['tmpExpressNo', validatorRules.tmpExpressNo ]" />
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
    name: "OrderGoodsModal",
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
        orderId:{rules: [{ required: true, message: '请输入订单ID!' }]},
        goodsId:{rules: [{ required: true, message: '请输入商品ID!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        skuId:{rules: [{ required: true, message: '请输入skuID!' }]},
        skuName:{rules: [{ required: true, message: '请输入sku名称!' }]},
        price:{rules: [{ required: true, message: '请输入商品价格!' }]},
        costPrice:{rules: [{ required: true, message: '请输入商品成本价!' }]},
        num:{rules: [{ required: true, message: '请输入购买数量!' }]},
        adjustMoney:{rules: [{ required: true, message: '请输入调整金额!' }]},
        goodsMoney:{rules: [{ required: true, message: '请输入商品总价!' }]},
        goodsPicture:{rules: [{ required: true, message: '请输入商品图片!' }]},
        shopId:{rules: [{ required: true, message: '请输入店铺ID!' }]},
        buyerId:{rules: [{ required: true, message: '请输入购买人ID!' }]},
        pointExchangeType:{rules: [{ required: true, message: '请输入积分兑换类型0.非积分兑换1.积分兑换!' }]},
        goodsType:{rules: [{ required: true, message: '请输入商品类型!' }]},
        promotionId:{rules: [{ required: true, message: '请输入促销ID!' }]},
        promotionTypeId:{rules: [{ required: true, message: '请输入促销类型!' }]},
        orderType:{rules: [{ required: true, message: '请输入订单类型!' }]},
        orderStatus:{rules: [{ required: true, message: '请输入订单状态!' }]},
        givePoint:{rules: [{ required: true, message: '请输入积分数量!' }]},
        shippingStatus:{rules: [{ required: true, message: '请输入物流状态!' }]},
        refundType:{rules: [{ required: true, message: '请输入退款方式!' }]},
        refundRequireMoney:{rules: [{ required: true, message: '请输入退款金额!' }]},
        refundReason:{rules: [{ required: true, message: '请输入退款原因!' }]},
        refundShippingCode:{rules: [{ required: true, message: '请输入退款物流单号!' }]},
        refundShippingCompany:{rules: [{ required: true, message: '请输入退款物流公司名称!' }]},
        refundRealMoney:{rules: [{ required: true, message: '请输入实际退款金额!' }]},
        refundStatus:{rules: [{ required: true, message: '请输入退款状态!' }]},
        memo:{rules: [{ required: true, message: '请输入备注!' }]},
        isEvaluate:{rules: [{ required: true, message: '请输入是否评价 0为未评价 1为已评价 2为已追评!' }]},
        refundBalanceMoney:{rules: [{ required: true, message: '请输入订单退款余额!' }]},
        tmpExpressCompany:{rules: [{ required: true, message: '请输入批量打印时添加的临时物流公司!' }]},
        tmpExpressCompanyId:{rules: [{ required: true, message: '请输入批量打印时添加的临时物流公司id!' }]},
        tmpExpressNo:{rules: [{ required: true, message: '请输入批量打印时添加的临时订单编号!' }]},
        },
        url: {
          add: "/order/orderGoods/add",
          edit: "/order/orderGoods/edit",
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
          this.form.setFieldsValue(pick(this.model,'orderId','goodsId','goodsName','skuId','skuName','price','costPrice','num','adjustMoney','goodsMoney','goodsPicture','shopId','buyerId','pointExchangeType','goodsType','promotionId','promotionTypeId','orderType','orderStatus','givePoint','shippingStatus','refundType','refundRequireMoney','refundReason','refundShippingCode','refundShippingCompany','refundRealMoney','refundStatus','memo','isEvaluate','refundBalanceMoney','tmpExpressCompany','tmpExpressCompanyId','tmpExpressNo'))
		  //时间格式化
          this.form.setFieldsValue({refundTime:this.model.refundTime?moment(this.model.refundTime):null})
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
            formData.refundTime = formData.refundTime?formData.refundTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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