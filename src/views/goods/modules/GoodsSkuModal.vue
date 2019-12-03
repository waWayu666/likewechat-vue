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
          label="商家ID">
          <a-input placeholder="请输入 如曦编码" v-decorator="['shopId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商家名称">
          <a-input placeholder="请输入商家名称" v-decorator="['shopName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品编号">
          <a-input placeholder="请输入商品编号" v-decorator="['goodsId', validatorRules.goodsId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="SKU名称">
          <a-input placeholder="请输入SKU名称" v-decorator="['skuName', validatorRules.skuName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="属性和属性值 id串 attribute + attribute value 表ID分号分隔">
          <a-input placeholder="请输入属性和属性值 id串 attribute + attribute value 表ID分号分隔" v-decorator="['attrValueItems', validatorRules.attrValueItems ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="属性和属性值id串组合json格式">
          <a-input placeholder="请输入属性和属性值id串组合json格式" v-decorator="['attrValueItemsFormat', validatorRules.attrValueItemsFormat ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市场价">
          <a-input-number v-decorator="[ 'marketPrice', validatorRules.marketPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="价格">
          <a-input-number v-decorator="[ 'price', validatorRules.price ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拼团价">
          <a-input-number v-decorator="[ 'teamPrice', validatorRules.teamPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="秒杀价格">
          <a-input-number v-decorator="[ 'seckillPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="促销价格">
          <a-input-number v-decorator="[ 'promotePrice', validatorRules.promotePrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成本价">
          <a-input-number v-decorator="[ 'costPrice', validatorRules.costPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库存">
          <a-input-number v-decorator="[ 'stock', validatorRules.stock ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片">
          <a-input placeholder="请输入图片" v-decorator="['picture', validatorRules.picture ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商家编码">
          <a-input placeholder="请输入商家编码" v-decorator="['code', validatorRules.code ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品二维码">
          <a-input placeholder="请输入商品二维码" v-decorator="['qrcode', validatorRules.qrcode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在当前商品中的排序">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
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
    name: "GoodsSkuModal",
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
        goodsId:{rules: [{ required: true, message: '请输入商品编号!' }]},
        skuName:{rules: [{ required: true, message: '请输入SKU名称!' }]},
        attrValueItems:{rules: [{ required: true, message: '请输入属性和属性值 id串 attribute + attribute value 表ID分号分隔!' }]},
        attrValueItemsFormat:{rules: [{ required: true, message: '请输入属性和属性值id串组合json格式!' }]},
        marketPrice:{rules: [{ required: true, message: '请输入市场价!' }]},
        price:{rules: [{ required: true, message: '请输入价格!' }]},
        teamPrice:{rules: [{ required: true, message: '请输入拼团价!' }]},
        promotePrice:{rules: [{ required: true, message: '请输入促销价格!' }]},
        costPrice:{rules: [{ required: true, message: '请输入成本价!' }]},
        stock:{rules: [{ required: true, message: '请输入库存!' }]},
        picture:{rules: [{ required: true, message: '请输入图片!' }]},
        code:{rules: [{ required: true, message: '请输入商家编码!' }]},
        qrcode:{rules: [{ required: true, message: '请输入商品二维码!' }]},
        sort:{rules: [{ required: true, message: '请输入在当前商品中的排序!' }]},
        },
        url: {
          add: "/goods/goodsSku/add",
          edit: "/goods/goodsSku/edit",
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
          this.form.setFieldsValue(pick(this.model,'shopId','shopName','goodsId','skuName','attrValueItems','attrValueItemsFormat','marketPrice','price','teamPrice','seckillPrice','promotePrice','costPrice','stock','picture','code','qrcode','sort'))
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

</style>