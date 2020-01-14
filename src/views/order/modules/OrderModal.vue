<template>
  <a-modal
    title="详情"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleCancel"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <div v-if="this.model.address!=null && this.model.address !=''">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="收货人">
            {{this.model.address.userId}}
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="联系方式">
            {{this.model.address.reciverTelephone}}
          </a-form-item>


          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="地址">
            {{this.model.address.detailAddress}}
          </a-form-item>
        </div>

        <div v-if="this.model.expressName!=''">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="快递">
            {{this.model.expressName}}
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="单号">
            {{this.model.expressNum}}
          </a-form-item>
        </div>


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
        orderFrom:{rules: [{ required: true, message: '请输入订单来源!' }]},
        userId:{rules: [{ required: true, message: '请输入买家id!' }]},
        nickname:{rules: [{ required: true, message: '请输入买家会员名称!' }]},
        orderType:{rules: [{ required: true, message: '请输入1:竞拍商品  2：积分商品!' }]},
        orderStatus:{rules: [{ required: true, message: '请输入订单状态0流拍 1待付款 2待发货 3待签收 4已完成!' }]},
        delFlag:{rules: [{ required: true, message: '请输入订单是否已删除!' }]},
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
          this.form.setFieldsValue(pick(this.model,'orderNum','orderFrom','userId','nickname','orderType','orderMoney','point','userMoney','orderStatus','delFlag','cancelReason'))
		  //时间格式化
      //     this.form.setFieldsValue({payTime:this.model.payTime?moment(this.model.payTime):null})
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