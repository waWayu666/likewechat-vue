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
          label="商品规格">
          <!--<a-input placeholder="请输入商品属性ID" v-decorator="['specId', validatorRules.specId ]" />-->
          <a-select v-decorator="[ 'specId', validatorRules.specId]" placeholder="请选择商品规格" showSearch optionFilterProp="children" >
            <a-select-option v-for="(goodsSpec,index) in specList" :key="index.toString()" :value="goodsSpec.id">
              {{ goodsSpec.specName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品属性值名称">
          <a-input placeholder="请输入商品属性值名称" v-decorator="['specValueName', validatorRules.specValueName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否可视">
          <a-select v-decorator="[ 'isVisible', validatorRules.isVisible]" placeholder="请选择是否可视">
            <a-select-option :value="0">否</a-select-option>
            <a-select-option :value="1">是</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
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
  import {goodsSpecList} from '@/api/api'

  export default {
    name: "GoodsSpecValueModal",
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
          specId:{rules: [{ required: true, message: '请输入商品属性ID!' }]},
          specValueName:{rules: [{ required: true, message: '请输入商品属性值名称!' }]},
          isVisible:{rules: [{ required: true, message: '请输入是否可视!' }]},
          sort:{rules: [{ required: true, message: '请输入排序!' }]},
        },
        url: {
          add: "/goods/goodsSpecValue/add",
          edit: "/goods/goodsSpecValue/edit",
        },
        specList : [],
      }
    },
    created () {
      this.initialGoodsSpecList();
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
          this.form.setFieldsValue(pick(this.model,'specId','specValueName','isVisible','sort'))
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
      initialGoodsSpecList(){
        goodsSpecList().then((res)=>{
          if(res.code === 1){
            this.specList= res.data;
          }else {
            console.log(res.message);
          }
        });
      },

    }
  }
</script>

<style lang="less" scoped>

</style>