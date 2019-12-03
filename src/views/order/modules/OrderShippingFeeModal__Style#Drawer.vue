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
          label="运费模板名称">
          <a-input placeholder="请输入运费模板名称" v-decorator="['shippingFeeName', validatorRules.shippingFeeName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否是默认模板">
          <a-input placeholder="请输入是否是默认模板" v-decorator="['isDefault', validatorRules.isDefault ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="物流公司ID">
          <a-input placeholder="请输入物流公司ID" v-decorator="['companyId', validatorRules.companyId ]" />
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
          label="省ID组">
          <a-input placeholder="请输入省ID组" v-decorator="['provinceIdArray', validatorRules.provinceIdArray ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市ID组">
          <a-input placeholder="请输入市ID组" v-decorator="['cityIdArray', validatorRules.cityIdArray ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用重量运费">
          <a-input placeholder="请输入是否启用重量运费" v-decorator="['weightIsUse', validatorRules.weightIsUse ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首重">
          <a-input-number v-decorator="[ 'weightSnum', validatorRules.weightSnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首重运费">
          <a-input-number v-decorator="[ 'weightSprice', validatorRules.weightSprice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续重">
          <a-input-number v-decorator="[ 'weightXnum', validatorRules.weightXnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续重运费">
          <a-input-number v-decorator="[ 'weightXprice', validatorRules.weightXprice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用体积计算运费">
          <a-input placeholder="请输入是否启用体积计算运费" v-decorator="['volumeIsUse', validatorRules.volumeIsUse ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首体积量">
          <a-input-number v-decorator="[ 'volumeSnum', validatorRules.volumeSnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首体积运费">
          <a-input-number v-decorator="[ 'volumeSprice', validatorRules.volumeSprice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续体积量">
          <a-input-number v-decorator="[ 'volumeXnum', validatorRules.volumeXnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续体积运费">
          <a-input-number v-decorator="[ 'volumeXprice', validatorRules.volumeXprice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用计件方式运费">
          <a-input placeholder="请输入是否启用计件方式运费" v-decorator="['bynumIsUse', validatorRules.bynumIsUse ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首件">
          <a-input-number v-decorator="[ 'bynumSnum', validatorRules.bynumSnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首件运费">
          <a-input-number v-decorator="[ 'bynumSprice', validatorRules.bynumSprice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续件">
          <a-input-number v-decorator="[ 'bynumXnum', validatorRules.bynumXnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续件运费">
          <a-input-number v-decorator="[ 'bynumXprice', validatorRules.bynumXprice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="区县ID组">
          <a-input placeholder="请输入区县ID组" v-decorator="['districtIdArray', {}]" />
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
    name: "OrderShippingFeeModal",
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
        shippingFeeName:{rules: [{ required: true, message: '请输入运费模板名称!' }]},
        isDefault:{rules: [{ required: true, message: '请输入是否是默认模板!' }]},
        companyId:{rules: [{ required: true, message: '请输入物流公司ID!' }]},
        shopId:{rules: [{ required: true, message: '请输入店铺ID!' }]},
        provinceIdArray:{rules: [{ required: true, message: '请输入省ID组!' }]},
        cityIdArray:{rules: [{ required: true, message: '请输入市ID组!' }]},
        weightIsUse:{rules: [{ required: true, message: '请输入是否启用重量运费!' }]},
        weightSnum:{rules: [{ required: true, message: '请输入首重!' }]},
        weightSprice:{rules: [{ required: true, message: '请输入首重运费!' }]},
        weightXnum:{rules: [{ required: true, message: '请输入续重!' }]},
        weightXprice:{rules: [{ required: true, message: '请输入续重运费!' }]},
        volumeIsUse:{rules: [{ required: true, message: '请输入是否启用体积计算运费!' }]},
        volumeSnum:{rules: [{ required: true, message: '请输入首体积量!' }]},
        volumeSprice:{rules: [{ required: true, message: '请输入首体积运费!' }]},
        volumeXnum:{rules: [{ required: true, message: '请输入续体积量!' }]},
        volumeXprice:{rules: [{ required: true, message: '请输入续体积运费!' }]},
        bynumIsUse:{rules: [{ required: true, message: '请输入是否启用计件方式运费!' }]},
        bynumSnum:{rules: [{ required: true, message: '请输入首件!' }]},
        bynumSprice:{rules: [{ required: true, message: '请输入首件运费!' }]},
        bynumXnum:{rules: [{ required: true, message: '请输入续件!' }]},
        bynumXprice:{rules: [{ required: true, message: '请输入续件运费!' }]},
        },
        url: {
          add: "/order/orderShippingFee/add",
          edit: "/order/orderShippingFee/edit",
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
          this.form.setFieldsValue(pick(this.model,'shippingFeeName','isDefault','companyId','shopId','provinceIdArray','cityIdArray','weightIsUse','weightSnum','weightSprice','weightXnum','weightXprice','volumeIsUse','volumeSnum','volumeSprice','volumeXnum','volumeXprice','bynumIsUse','bynumSnum','bynumSprice','bynumXnum','bynumXprice','districtIdArray'))
		  //时间格式化
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