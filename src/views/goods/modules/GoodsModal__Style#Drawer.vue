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
          label="0竞拍未开始  1进行中  2竞拍已完成">
          <a-input placeholder="请输入0竞拍未开始  1进行中  2竞拍已完成" v-decorator="['finishFlag', validatorRules.finishFlag ]" />
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
          label="商品编号">
          <a-input placeholder="请输入商品编号" v-decorator="['goodsNum', validatorRules.goodsNum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起拍价">
          <a-input-number v-decorator="[ 'startPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预估价">
          <a-input-number v-decorator="[ 'evaluatePrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高价">
          <a-input-number v-decorator="[ 'maxPrice', validatorRules.maxPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="顶一手价格">
          <a-input-number v-decorator="[ 'addPrice', validatorRules.addPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="佣金">
          <a-input-number v-decorator="[ 'commissionPrice', validatorRules.commissionPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类id">
          <a-input placeholder="请输入分类id" v-decorator="['categoryId', validatorRules.categoryId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入描述" v-decorator="['desc', validatorRules.desc ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序号">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品主图">
          <a-input placeholder="请输入商品主图" v-decorator="['mianImage', validatorRules.mianImage ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品详情">
          <a-input placeholder="请输入商品详情" v-decorator="['goodsDesc', validatorRules.goodsDesc ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="0：下架   1：上架中">
          <a-input placeholder="请输入0：下架   1：上架中" v-decorator="['status', validatorRules.status ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成交价格">
          <a-input-number v-decorator="[ 'dealPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拍卖次数">
          <a-input-number v-decorator="[ 'auctionCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开拍时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'startTime', validatorRules.startTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endTime', validatorRules.endTime ]" />
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
    name: "GoodsModal",
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
        finishFlag:{rules: [{ required: true, message: '请输入0竞拍未开始  1进行中  2竞拍已完成!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        goodsNum:{rules: [{ required: true, message: '请输入商品编号!' }]},
        maxPrice:{rules: [{ required: true, message: '请输入最高价!' }]},
        addPrice:{rules: [{ required: true, message: '请输入顶一手价格!' }]},
        commissionPrice:{rules: [{ required: true, message: '请输入佣金!' }]},
        categoryId:{rules: [{ required: true, message: '请输入分类id!' }]},
        desc:{rules: [{ required: true, message: '请输入描述!' }]},
        sort:{rules: [{ required: true, message: '请输入排序号!' }]},
        mianImage:{rules: [{ required: true, message: '请输入商品主图!' }]},
        goodsDesc:{rules: [{ required: true, message: '请输入商品详情!' }]},
        status:{rules: [{ required: true, message: '请输入0：下架   1：上架中!' }]},
        startTime:{rules: [{ required: true, message: '请输入开拍时间!' }]},
        endTime:{rules: [{ required: true, message: '请输入结束时间!' }]},
        },
        url: {
          add: "/goods/goods/add",
          edit: "/goods/goods/edit",
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
          this.form.setFieldsValue(pick(this.model,'finishFlag','goodsName','goodsNum','startPrice','evaluatePrice','maxPrice','addPrice','commissionPrice','categoryId','desc','sort','mianImage','goodsDesc','status','dealPrice','auctionCount'))
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