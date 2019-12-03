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
      
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="店铺ID">-->
<!--          <a-input placeholder="请输入店铺ID" v-decorator="['shopId', validatorRules.shopId ]" />-->
<!--        </a-form-item>-->
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
          label="每人最大领取个数">
          <a-input-number v-decorator="[ 'maxFetch', validatorRules.maxFetch ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="满多少元使用">
          <a-input-number v-decorator="[ 'atLeast', validatorRules.atLeast ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用范围">
          <a-select placeholder="请选择使用范围" v-decorator="['rangeType', validatorRules.rangeType ]" @change="ch">
            <a-select-option :value="1">全场商品</a-select-option>
            <a-select-option :value="2">店铺商品</a-select-option>
            <a-select-option :value="3">部分商品</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请选择商品">
          <a-select
            mode="multiple"
            showSearch
            style="width: 100%"
            placeholder="请选择商品"
            v-decorator="[ 'rangeGoodsId', {}]"
            :disabled="goodsdisabled" optionFilterProp="children"
          >
            <a-select-option v-for="(goods,roleindex) in selectGoods" :key="roleindex" :value="goods.id" >
              {{goods.goodsName}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效日期开始时间">
          <a-date-picker showTime format='YYYY-MM-DD' v-decorator="[ 'startTime', validatorRules.startTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效日期结束时间">
          <a-date-picker showTime format='YYYY-MM-DD' v-decorator="[ 'endTime', validatorRules.endTime ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="是否允许首页显示0不显示1显示">-->
<!--          <a-input placeholder="请输入是否允许首页显示0不显示1显示" v-decorator="['isShow', validatorRules.isShow ]" />-->
<!--        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { queryByShopId } from '@/api/api'

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

        goodsdisabled:false,
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
        goodsId:[],
        selectGoods:[],
      }
    },
    created () {
      this.queryGoodsList();
    },
    methods: {
      ch(value) {
        if(value === undefined){
          value = '0'
        }
        if (value == 1) {
          this.goodsdisabled = true
        } else {
          this.goodsdisabled = false
        }
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'shopId','couponName','money','count','maxFetch','atLeast','needUserLevel','rangeType','rangeGoodsId','isShow'))
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
      queryGoodsList() {
        queryByShopId().then((res)=>{
          console.log(res);
          if(res.code == 0){
            this.selectGoods = res.result;
            console.log(res.result)
          }else{
            console.log("23333");
          }
        })
      }

    }
  }
</script>

<style lang="less" scoped>

</style>