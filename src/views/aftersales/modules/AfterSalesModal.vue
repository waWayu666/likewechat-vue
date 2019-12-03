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
          label="商品名称">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['goodsName', validatorRules.goodsName ]" />-->
          {{ this.model.goodsName }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买家会员名称">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['userName', validatorRules.userName ]" />-->
          {{ this.model.userName }}
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="skuID">
          <a-input v-decorator="['skuId', validatorRules.skuId ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sku名称">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['skuName', validatorRules.skuName ]" />-->
          {{ this.model.skuName }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品价格">
          <!--<a-input-number v-bind:disabled="isEdit" v-decorator="[ 'price', validatorRules.price ]" />-->
          {{ this.model.price }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品图片">
          <div class="anty-img-wrap">
            <img :src="this.model.goodsPicture"/>
          </div>
          <!--<a-input placeholder="请输入商品图片" v-decorator="['goodsPicture', validatorRules.goodsPicture ]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买数量">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['num', validatorRules.num ]" />-->
          {{ this.model.num }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品总价">
          <!--<a-input-number v-bind:disabled="isEdit" v-decorator="[ 'goodsMoney', validatorRules.goodsMoney ]" />-->
          {{ this.model.goodsMoney }}
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺ID">
          <a-input v-decorator="['shopId', validatorRules.shopId ]" />
        </a-form-item>-->
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买人ID">
          <a-input v-decorator="['userId', validatorRules.userId ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单类型">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['orderType', validatorRules.orderType ]" />-->
          {{ this.model.orderType }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否收到">
          {{ this.model.goodsState | goodsStateFilter }}
          <!--<a-input placeholder="请输入1未收到2已收到" v-decorator="['goodsState', {}]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款金额">
          <!--<a-input-number v-bind:disabled="isEdit" v-decorator="[ 'refundMoney', validatorRules.refundMoney ]" />-->
          {{ this.model.refundMoney }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款方式">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['refundWay', validatorRules.refundWay ]" />-->
          {{ this.model.refundWay }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款原因">
          <!--<a-textarea autosize v-bind:disabled="isEdit" v-decorator="['refundReason', validatorRules.refundReason ]" />-->
          {{ this.model.refundReason }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退款说明">
          <!--<a-textarea autosize v-bind:disabled="isEdit" v-decorator="['refundExplain', {}]" />-->
          {{ this.model.refundExplain }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证">
          <div class="anty-img-wrap">
            <img :src="this.model.evidence"/>
          </div>
          <!--<a-input placeholder="请输入凭证" v-decorator="['evidence', {}]" />-->
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核状态">
          <a-input placeholder="请输入审核状态" v-decorator="['auditStatus', validatorRules.auditStatus ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请时间">
          <!--<a-date-picker v-bind:disabled="isEdit" showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'applyTime', validatorRules.applyTime ]" />-->
          {{ this.model.applyTime }}
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'auditTime', {}]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单来源">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['orderFrom', validatorRules.orderFrom ]" />-->
          {{ this.model.orderFrom }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付类型">
          <!--<a-input v-bind:disabled="isEdit" v-decorator="['paymentType', validatorRules.paymentType ]" />-->
          {{ this.model.paymentType }}
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单退款余额">
          <!--<a-input-number v-bind:disabled="isEdit" v-decorator="[ 'refundBalanceMoney', validatorRules.refundBalanceMoney ]" />-->
          {{ this.model.refundBalanceMoney }}
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
          label="收货人的手机号码">
          <a-input placeholder="请输入收货人的手机号码" v-decorator="['receiverMobile', validatorRules.receiverMobile ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定电话">
          <a-input placeholder="请输入固定电话" v-decorator="['fixedTelephone', validatorRules.fixedTelephone ]" />
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
          label="收货人所在城市">
          <a-input placeholder="请输入收货人所在城市" v-decorator="['receiverCity', validatorRules.receiverCity ]" />
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
          label="收货人详细地址">
          <a-textarea autosize placeholder="请输入收货人详细地址" v-decorator="['receiverAddress', validatorRules.receiverAddress ]" />
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
          label="审核状态">
          <a-select placeholder="请选择审核状态.." v-decorator="[ 'auditStatus', {rules: [{ required: true, message: '请选择审核状态..' }]}]">
            <a-select-option :value="0">待审核</a-select-option>
            <a-select-option :value="1">审核通过</a-select-option>
            <a-select-option :value="2">审核未通过</a-select-option>
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

  export default {
    name: "AfterSalesModal",
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
       /* goodsId:{rules: [{ required: true, message: '请输入商品id!' }]},
        orderId:{rules: [{ required: true, message: '请输入订单id!' }]},
        orderNo:{rules: [{ required: true, message: '请输入订单编号!' }]},
        orderGoodsId:{rules: [{ required: true, message: '请输入订单项id!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        skuId:{rules: [{ required: true, message: '请输入skuID!' }]},
        skuName:{rules: [{ required: true, message: '请输入sku名称!' }]},
        price:{rules: [{ required: true, message: '请输入商品价格!' }]},
        goodsPicture:{rules: [{ required: true, message: '请输入商品图片!' }]},
        num:{rules: [{ required: true, message: '请输入购买数量!' }]},
        shopId:{rules: [{ required: true, message: '请输入店铺ID!' }]},
        userId:{rules: [{ required: true, message: '请输入购买人ID!' }]},
        orderType:{rules: [{ required: true, message: '请输入订单类型!' }]},
        refundMoney:{rules: [{ required: true, message: '请输入退款金额!' }]},
        refundWay:{rules: [{ required: true, message: '请输入退款方式  退款退货!' }]},
        refundReason:{rules: [{ required: true, message: '请输入退款原因!' }]},
        auditStatus:{rules: [{ required: true, message: '请选择审核状态!' }]},
        applyTime:{rules: [{ required: true, message: '请输入申请时间!' }]},
        orderFrom:{rules: [{ required: true, message: '请输入订单来源!' }]},*/
        receiverProvince:{rules: [{ required: true, message: '请输入收货人所在省!' }]},
        receiverCity:{rules: [{ required: true, message: '请输入收货人所在城市!' }]},
        receiverDistrict:{rules: [{ required: true, message: '请输入收货人所在街道!' }]},
        receiverAddress:{rules: [{ required: true, message: '请输入收货人详细地址!' }]},
        /*paymentType:{rules: [{ required: true, message: '请输入支付类型。取值范围：...!' }]},*/
        receiverMobile:{rules: [{ required: true, message: '请输入收货人的手机号码!' }]},
        shippingType:{rules: [{ required: true, message: '请输入订单配送方式!' }]},
        /*goodsMoney:{rules: [{ required: true, message: '请输入商品总价!' }]},*/
        /*fixedTelephone:{rules: [{ required: true, message: '请输入固定电话!' }]},*/
        receiverName:{rules: [{ required: true, message: '请输入收货人姓名!' }]},
        /*userName:{rules: [{ required: true, message: '请输入买家会员名称!' }]},*/
        refundShippingCode:{rules: [{ required: true, message: '请输入退款物流单号!' }]},
        refundShippingCompany:{rules: [{ required: true, message: '请输入退款物流公司名称!' }]},
        /*refundBalanceMoney:{rules: [{ required: true, message: '请输入订单退款余额!' }]},*/
        },
        isEdit: true,
        url: {
          add: "/aftersales/afterSales/add",
          edit: "/aftersales/afterSales/edit"
        },
      }
    },
    created () {
    },
    filters: {
      goodsStateFilter(state) {
        const statusMap = {
          1: '未收到',
          2: '已收到'
        };
        return statusMap[state]
      }
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
          this.form.setFieldsValue(pick(this.model,'goodsId','orderId','orderNo','orderGoodsId','goodsName','skuId','skuName','price','goodsPicture','num','shopId','userId','orderType','goodsState','refundMoney','refundWay','refundReason','refundExplain','evidence','auditStatus','orderFrom','receiverProvince','receiverCity','receiverDistrict','receiverAddress','paymentType','receiverMobile','shippingType','goodsMoney','fixedTelephone','receiverName','userName','refundShippingCode','refundShippingCompany','refundBalanceMoney'))
		  //时间格式化
          /*this.form.setFieldsValue({applyTime:this.model.applyTime?moment(this.model.applyTime):null})*/
          /*this.form.setFieldsValue({auditTime:this.model.auditTime?moment(this.model.auditTime):null})*/
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
            /*formData.applyTime = formData.applyTime?formData.applyTime.format('YYYY-MM-DD HH:mm:ss'):null;*/
            /*formData.auditTime = formData.auditTime?formData.auditTime.format('YYYY-MM-DD HH:mm:ss'):null;*/
            
            console.log(formData);
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