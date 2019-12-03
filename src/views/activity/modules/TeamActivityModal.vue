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
          label="拼团活动名称">
          <a-input placeholder="请输入拼团活动名称" v-decorator="['name', validatorRules.name ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拼团活动描述">
          <a-input placeholder="请输入拼团活动描述" v-decorator="['description', validatorRules.description ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成团需要人数">
          <a-input placeholder="请输入成团需要人数" v-decorator="['needer', validatorRules.needer ]" />
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
          label="参加活动的商品id">
          <a-input placeholder="请输入参加活动的商品id" v-decorator="['goodsId', validatorRules.goodsId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单次团购买限制数0为不限制">
          <a-input-number v-decorator="[ 'buyLimit', validatorRules.buyLimit ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已拼多少件">
          <a-input-number v-decorator="[ 'salesSum', validatorRules.salesSum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="虚拟销售基数">
          <a-input-number v-decorator="[ 'virtualNum', validatorRules.virtualNum ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="分享标题">-->
<!--          <a-input placeholder="请输入分享标题" v-decorator="['shareTitle', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="分享描述">-->
<!--          <a-input placeholder="请输入分享描述" v-decorator="['shareDesc', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="分享图片">-->
<!--          <a-input placeholder="请输入分享图片" v-decorator="['shareImg', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否推荐">
          <a-input placeholder="请输入是否推荐" v-decorator="['isRecommend', validatorRules.isRecommend ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="0关闭1正常">-->
<!--          <a-input placeholder="请输入0关闭1正常" v-decorator="['status', validatorRules.status ]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="是否已删除0否，1删除">-->
<!--          <a-input placeholder="请输入是否已删除0否，1删除" v-decorator="['isDel', validatorRules.isDel ]" />-->
<!--        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "TeamActivityModal",
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
        name:{rules: [{ required: true, message: '请输入拼团活动名称!' }]},
        description:{rules: [{ required: true, message: '请输入拼团活动描述!' }]},
        needer:{rules: [{ required: true, message: '请输入成团需要人数!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        goodsId:{rules: [{ required: true, message: '请输入参加活动的商品id!' }]},
        buyLimit:{rules: [{ required: true, message: '请输入单次团购买限制数0为不限制!' }]},
        salesSum:{rules: [{ required: true, message: '请输入已拼多少件!' }]},
        virtualNum:{rules: [{ required: true, message: '请输入虚拟销售基数!' }]},
        sort:{rules: [{ required: true, message: '请输入排序!' }]},
        isRecommend:{rules: [{ required: true, message: '请输入是否推荐!' }]},
        status:{rules: [{ required: true, message: '请输入0关闭1正常!' }]},
        isDel:{rules: [{ required: true, message: '请输入是否已删除0否，1删除!' }]},
        },
        url: {
          add: "/activity/teamActivity/add",
          edit: "/activity/teamActivity/edit",
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
          this.form.setFieldsValue(pick(this.model,'name','description','needer','goodsName','goodsId','buyLimit','salesSum','virtualNum','shareTitle','shareDesc','shareImg','sort','isRecommend','status','isDel'))
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