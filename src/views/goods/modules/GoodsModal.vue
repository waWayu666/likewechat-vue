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
          <a-input placeholder="请输入商品名称" v-decorator="['goodsName', validatorRules.goodsName ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="商品编号">-->
<!--          <a-input placeholder="请输入商品编号" v-decorator="['goodsNum', validatorRules.goodsNum ]" />-->
<!--        </a-form-item>-->
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
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="积分商品市场价">-->
<!--          <a-input-number v-decorator="[ 'price', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="现金比例">-->
<!--          <a-input-number v-decorator="[ 'moneyRatio', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="积分商品所需积分">-->
<!--          <a-input-number v-decorator="[ 'score', {}]" />-->
<!--        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请选择分类">
          <a-select
            mode="multiple"
            showSearch
            style="width: 100%"
            placeholder="请选择分类"
            v-decorator="[ 'categoryId', validatorRules.categoryId]"
            optionFilterProp="children"
          >
            <a-select-option v-for="(category,categoryindex) in goodsCategoryList" :key="categoryindex" :value="category.id" >
              {{category.categoryName}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-textarea placeholder="请输入描述" v-decorator="['desc', validatorRules.desc ]" :rows="4"/>
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
          <j-editor v-model="jeditor.goodsDesc"/>
        </a-form-item>

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="商品类别  1：普通商品  2：积分商品">-->
<!--          <a-input placeholder="请输入商品类别  1：普通商品  2：积分商品" v-decorator="['goodsType', {}]" />-->
<!--        </a-form-item>-->

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

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品状态">
<!--          <a-select v-decorator="[ 'status', validatorRules.status]" placeholder="请选择商品状态">-->
<!--            <a-select-option :value="0">下架</a-select-option>-->
<!--            <a-select-option :value="1">上架中</a-select-option>-->
<!--          </a-select>-->
            <a-switch v-decorator="['status', validatorRules.status]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {selectCategoryList} from '@/api/api'
  import JEditor from '@/components/jeecg/JEditor'

  export default {
    name: "GoodsModal",
    components: {
        JEditor
    },
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
        jeditor: {
            goodsDesc:''
        },
        goodsCategoryList:[],
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
        this.getGoodsCategoryValue();//初始化商品分类
    },
    methods: {
      add () {
        this.edit({});
        this.jeditor.goodsDesc = '';
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.jeditor.goodsDesc = decodeURIComponent(this.model.goodsDesc);
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'finishFlag','goodsName','goodsNum','startPrice','evaluatePrice','maxPrice','addPrice','commissionPrice','price','moneyRatio','score','categoryId','desc','sort','mianImage','goodsDesc','status','goodsType','dealPrice','auctionCount'))
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
        let goodsDesc = encodeURIComponent(this.jeditor.goodsDesc);
        this.model.goodsDesc = goodsDesc;
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
      //初始化商品分类数据
      getGoodsCategoryValue() {
          selectCategoryList().then((res)=>{
              console.log(res);
              if(res.code == 0){
                  this.goodsCategoryList = res.result;
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