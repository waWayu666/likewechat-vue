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
          label="可加入商品">
          <a-select
            showSearch
            style="width: 100%"
            placeholder="请选择商品"
            v-decorator="[ 'goodsId', validatorRules.goodsId]"
            optionFilterProp="children"
          >
            <a-select-option v-for="(goods,roleindex) in selectGoods" :key="roleindex" :value="goods.id" >
              {{goods.goodsName}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库存">
          <a-input-number v-decorator="['stock', validatorRules.stock ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="秒杀价格">
          <a-input-number v-decorator="[ 'seckillPrice', validatorRules.seckillPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="秒杀开始时间">
          <a-time-picker use24Hours format="A H" v-decorator="['startTime', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="秒杀持续时间">
          <a-input-number v-decorator="['endHourInterval', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持续天数">
          <a-input-number v-decorator="[ 'endDaysInterval', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { joinActivity } from '@/api/api'

  export default {
    name: "SeckillModal",
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
        selectGoods:[],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        goodsId:{rules: [{ required: true, message: '请输入商品id!' }]},
        goodsType:{rules: [{ required: true, message: '请输入类型1:商品2:课程!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        stock:{rules: [{ required: true, message: '请输入库存!' }]},
        seckillPrice:{rules: [{ required: true, message: '请输入秒杀价格!' }]},
        startTime:{rules: [{ required: true, message: '请输入秒杀开始时间!' }]},
        endTime:{rules: [{ required: true, message: '请输入秒杀结束时间!' }]},
        },
        url: {
          add: "/activity/seckill/add",
          edit: "/activity/seckill/edit",
        },
      }
    },
    created () {
      this.queryGoodsList();
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
          this.form.setFieldsValue(pick(this.model,'goodsId','goodsType','goodsName','stock','seckillPrice'))
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
            formData.startTime = formData.startTime?formData.startTime.format('YYYY-MM-DD HH:00:00'):null;
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
        joinActivity().then((res)=>{
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