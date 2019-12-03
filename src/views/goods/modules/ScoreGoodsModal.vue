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
            @change="ch"
          >
            <a-select-option v-for="(goods,roleindex) in selectGoods" :key="roleindex" :value="goods.id" >
              {{goods.goodsName}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="规格名称">
          <a-select
            style="width: 100%"
            placeholder="请选择规格"
            v-decorator="[ 'skuId', validatorRules.skuId ]"
          >
            <a-select-option v-for="(sku,skuindex) in selectSkuList" :key="skuindex" :value="sku.id" >
              {{sku.skuName}}
            </a-select-option>
          </a-select>
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="兑换商品所需积分">
          <a-input placeholder="请输入兑换商品所需积分" v-decorator="['score', validatorRules.score ]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { joinActivity,querySkuListByGoodsId } from '@/api/api'

  export default {
    name: "ScoreGoodsModal",
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
        selectSkuList:[],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        goodsId:{rules: [{ required: true, message: '请输入商品id!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        skuId:{rules: [{ required: true, message: '请输入规格id!' }]},
        skuName:{rules: [{ required: true, message: '请输入规格名称!' }]},
        score:{rules: [{ required: true, message: '请输入兑换商品所需积分!' }]},
        },
        url: {
          add: "/goods/scoreGoods/add",
          edit: "/goods/scoreGoods/edit",
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
          this.form.setFieldsValue(pick(this.model,'goodsId','goodsName','skuId','skuName','score'))
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
      },
      ch(value) {
        if(value === undefined){
          value = '0'
        }
        console.log(value);
        querySkuListByGoodsId(value,null).then((res)=>{
          console.log(res.result);
          if(res.code === 0){
            this.selectSkuList = res.result;
            console.log(this.selectSkuList)
          }else{
            console.log("23333");
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>

</style>