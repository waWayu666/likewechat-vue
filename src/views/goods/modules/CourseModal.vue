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
          label="课程名称">
          <a-input placeholder="请输入课程名称" v-decorator="['goodsName', validatorRules.goodsName ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品分类id">
          <a-input placeholder="请输入商品分类id" v-decorator="['categoryId', validatorRules.categoryId ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否参与促销">
          <a-select v-decorator="[ 'promotionType', validatorRules.promotionType]" placeholder="请选择是否参与促销">
            <a-select-option :value="0">无促销</a-select-option>
            <a-select-option :value="1">拼团</a-select-option>
            <a-select-option :value="2">秒杀</a-select-option>
          </a-select>
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
          label="商品主图">
          <!--<a-input placeholder="请输入商品主图" v-decorator="['picture', validatorRules.picture ]" />-->

          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrlPic" :src="this.model.picture" alt="商品主图" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品简介，促销语">
          <a-input placeholder="请输入商品简介，促销语" v-decorator="['introduction', validatorRules.introduction ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="介绍视频">
          {{ this.model.introduceVideo }}
          <!--<a-input placeholder="请输入介绍视频" v-decorator="['introduceVideo', {}]" />-->
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="介绍视频">
          <!--<a-input placeholder="请输入文件链接" v-decorator="['fileLink', {}]" />-->
          <a-upload name="file"
                    :multiple="true"
                    :headers = "headers"
                    :action="this.url.fileUpload"
                    :fileList="fileList2"
                    :beforeUpload="beforeUploadFile"
                    @change="handleChange2">
            <a-button>
              <a-icon type="upload" /> 点击上传视频
            </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否热销商品">
          <a-select v-decorator="[ 'isHot', validatorRules.isHot]" placeholder="请选择是否热销商品">
            <a-select-option :value="0">是</a-select-option>
            <a-select-option :value="1">否</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否推荐">
          <a-select v-decorator="[ 'isRecommend', validatorRules.isRecommend]" placeholder="请选择是否推荐">
            <a-select-option :value="0">是</a-select-option>
            <a-select-option :value="1">否</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否新品">
          <a-select v-decorator="[ 'isNew', validatorRules.isNew]" placeholder="请选择是否新品">
            <a-select-option :value="0">是</a-select-option>
            <a-select-option :value="1">否</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否新用户专享">
          <a-select v-decorator="[ 'isNewuserExclusive', validatorRules.isNewuserExclusive]" placeholder="请选择是否新用户专享">
            <a-select-option :value="0">是</a-select-option>
            <a-select-option :value="1">否</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否课程专属">
          <a-select v-decorator="[ 'isCourseExclusive', validatorRules.isCourseExclusive]" placeholder="是否课程专属">
            <a-select-option :value="0">是</a-select-option>
            <a-select-option :value="1">否</a-select-option>
          </a-select>
        </a-form-item>



        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="商品图片序列">-->
<!--          <a-input placeholder="请输入商品图片序列" v-decorator="['imgIdArray', {}]" />-->
<!--        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际销量">
          <a-input-number v-decorator="[ 'realSales', validatorRules.realSales ]" />
        </a-form-item>



        <a-row :gutter="24">
          <div>
            <a-col>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="商品介绍"
                style="min-height: 300px">
                <j-editor v-model="jeditor.description"/>
              </a-form-item>
            </a-col>
          </div>
        </a-row>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品视频地址">
          {{ this.model.goodsVideoAddress }}
          <!--<a-input placeholder="请输入商品视频地址" v-decorator="['goodsVideoAddress', {}]" />-->
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品视频地址">
          <!--<a-input placeholder="请输入文件链接" v-decorator="['fileLink', {}]" />-->
          <a-upload name="file"
                    :multiple="true"
                    :headers = "headers"
                    :action="this.url.fileUpload"
                    :fileList="fileList1"
                    :beforeUpload="beforeUploadFile"
                    @change="handleChange1">
            <a-button>
              <a-icon type="upload" /> 点击上传视频
            </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品状态">
          <a-select v-decorator="[ 'state', validatorRules.state]" placeholder="请选择商品状态">
            <a-select-option :value="0">下架</a-select-option>
            <a-select-option :value="1">上架</a-select-option>
          </a-select>
        </a-form-item>
        <!-- 子表单区域 -->
        <a-tabs defaultActiveKey="1" >
          <a-tab-pane tab="课程规格" key="1">
            <div>
              <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                <a-col :span="5">规格名称</a-col>
                <a-col :span="5">价格</a-col>
                <a-col :span="5">拼团价格</a-col>
                <a-col :span="5">秒杀价格</a-col>
              </a-row>

              <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                <a-col :span="5">
                  <a-form-item>
                    <a-input placeholder="规格名称" v-decorator="['skuName', {'initialValue':skuList.skuName,rules: [{ required: true, message: '请输入规格名称!' }]}]" />
                  </a-form-item>
                </a-col>
                <a-col :span="5">
                  <a-form-item>
                    <a-input placeholder="价格" v-decorator="['price', {'initialValue':skuList.price,rules: [{ required: true, message: '请输入价格!' }]}]"/>
                  </a-form-item>
                </a-col>
                <a-col :span="5">
                  <a-form-item>
                    <a-input placeholder="拼团价格" v-decorator="['teamPrice', {'initialValue':skuList.teamPrice,rules: [{ required: true, message: '请输入拼团价格!' }]}]"/>
                  </a-form-item>
                </a-col>
                <a-col :span="5">
                  <a-form-item>
                    <a-input placeholder="秒杀价格" v-decorator="['seckillPrice', {'initialValue':skuList.seckillPrice,rules: [{ required: true, message: '请输入秒杀价格!' }]}]"/>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import Vue from 'vue'
  import moment from "moment"
  import JEditor from '@/components/jeecg/JEditor'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { queryGoodsSkuByGoodsId } from '@/api/api'

  export default {
    name: "CourseModal",
    components: {
      JEditor
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {
        },
        skuList: {
          // skuName:'',
          // price:'',
          // teamPrice:'',
          // seckillPrice:'',
          stock: 0,
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        picUrlPic: "",
        uploadLoading:false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        goodsName:{rules: [{ required: true, message: '请输入课程名称!' }]},
        goodsLink:{rules: [{ required: true, message: '请输入课程链接!' }]},
        goodsTemporaryLink:{rules: [{ required: true, message: '请输入课程试看链接!' }]},
        shopId:{rules: [{ required: true, message: '请输入店铺id!' }]},
        categoryId:{rules: [{ required: true, message: '请选择课程分类!' }]},
        brandId:{rules: [{ required: true, message: '请输入品牌id!' }]},
        groupIdArray:{rules: [{ required: true, message: '请输入店铺分类id 首尾用,隔开!' }]},
        promotionType:{rules: [{ required: true, message: '请输入促销类型 0无促销，1拼团，2秒杀!' }]},
        promoteId:{rules: [{ required: true, message: '请输入促销活动ID!' }]},
        goodsType:{rules: [{ required: true, message: '请输入实物或虚拟商品标志 1实物商品 0 虚拟商品 2 F码商品!' }]},
        marketPrice:{rules: [{ required: true, message: '请输入市场价!' }]},
        price:{rules: [{ required: true, message: '请输入商品/课程原价格!' }]},
        promotionPrice:{rules: [{ required: true, message: '请输入商品促销价格!' }]},
        costPrice:{rules: [{ required: true, message: '请输入成本价!' }]},
        pointExchangeType:{rules: [{ required: true, message: '请输入积分兑换类型 0 非积分兑换 1 只能积分兑换 !' }]},
        pointExchange:{rules: [{ required: true, message: '请输入积分兑换!' }]},
        givePoint:{rules: [{ required: true, message: '请输入购买商品赠送积分!' }]},
        isMemberDiscount:{rules: [{ required: true, message: '请输入参与会员折扣!' }]},
        shippingFee:{rules: [{ required: true, message: '请输入运费 0为免运费!' }]},
        shippingFeeId:{rules: [{ required: true, message: '请输入售卖区域id 物流模板id  ns_order_shipping_fee 表id!' }]},
        stock:{rules: [{ required: true, message: '请输入商品库存!' }]},
        isNewuserExclusive:{rules: [{ required: true, message: '请选择是否新用户专享!' }]},
        maxBuy:{rules: [{ required: true, message: '请输入限购 0 不限购!' }]},
        clicks:{rules: [{ required: true, message: '请输入商品点击数量!' }]},
        minStockAlarm:{rules: [{ required: true, message: '请输入库存预警值!' }]},
        sales:{rules: [{ required: true, message: '请输入销售数量!' }]},
        collects:{rules: [{ required: true, message: '请输入收藏数量!' }]},
        star:{rules: [{ required: true, message: '请输入好评星级!' }]},
        evaluates:{rules: [{ required: true, message: '请输入评价数!' }]},
        shares:{rules: [{ required: true, message: '请输入分享数!' }]},
        provinceId:{rules: [{ required: true, message: '请输入一级地区id!' }]},
        cityId:{rules: [{ required: true, message: '请输入二级地区id!' }]},
        picture:{rules: [{ required: true, message: '请输入商品主图!' }]},
        keywords:{rules: [{ required: true, message: '请输入商品关键词!' }]},
        introduction:{rules: [{ required: true, message: '请输入商品简介，促销语!' }]},
        description:{rules: [{ required: true, message: '请输入商品详情!' }]},
        isTemporary:{rules: [{ required: true, message: '请选择是否试看!' }]},
        qrcode:{rules: [{ required: true, message: '请输入商品二维码!' }]},
        code:{rules: [{ required: true, message: '请输入商家编号!' }]},
        isStockVisible:{rules: [{ required: true, message: '请选择页面不显示库存!' }]},
        isHot:{rules: [{ required: true, message: '请选择是否热销商品!' }]},
        isRecommend:{rules: [{ required: true, message: '请选择是否推荐!' }]},
        isNew:{rules: [{ required: true, message: '请选择是否新品!' }]},
        isCourseExclusive:{rules: [{ required: true, message: '请选择是否课程专属!' }]},
        isBill:{rules: [{ required: true, message: '请输入是否开具增值税发票 1是，0否!' }]},
        state:{rules: [{ required: true, message: '请选择商品状态!' }]},
        sort:{rules: [{ required: true, message: '请输入排序!' }]},
        realSales:{rules: [{ required: true, message: '请输入实际销量!' }]},
        goodsAttributeId:{rules: [{ required: true, message: '请输入商品类型!' }]},
        goodsSpecFormat:{rules: [{ required: true, message: '请输入商品规格!' }]},
        goodsWeight:{rules: [{ required: true, message: '请输入商品重量!' }]},
        goodsVolume:{rules: [{ required: true, message: '请输入商品体积!' }]},
        shippingFeeType:{rules: [{ required: true, message: '请输入计价方式1.重量2.体积3.计件!' }]},
        supplierId:{rules: [{ required: true, message: '请输入供货商id!' }]},
        minBuy:{rules: [{ required: true, message: '请输入最少买几件!' }]},
        },
        url: {
          add: "/goods/goods/add",
          edit: "/goods/goods/edit",
          /*fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",*/
          fileUpload: window._CONFIG['domianURL'] + "/sys/common/uploadAli",
          imgerver: window._CONFIG['domianURL']+"/sys/common/view",
        },
        jeditor: {
          description:''
        },
        headers:{},
        fileList1:[],
        fileList2:[]
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"TOKEN":token};
    },
    computed:{
      uploadAction:function () {
        return this.url.fileUpload;
      }
    },
    methods: {
      add () {
        this.edit({});
        this.fileList1 = [];
        this.fileList2 = [];
        this.jeditor.description = '';
        this.picUrlPic = "";
        this.skuList = {
          skuName:'',
          price:'',
          teamPrice:'',
          seckillPrice:'',
          stock: 0,
        };
      },
      edit (record) {
        this.form.resetFields();
        if(JSON.stringify(record) != '{}'){
          this.queryGoodsSku(record.id);
        }
        this.model = Object.assign({}, record);
        this.jeditor.description = this.model.description;
        if (record.hasOwnProperty("id")) { //编辑的时候回显主图
          this.picUrlPic = "Has no pic url yet";
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'goodsCode','goodsName','goodsLink','goodsTemporaryLink','shopId','categoryId','brandId','groupIdArray','promotionType','promoteId','goodsType','marketPrice','price','promotionPrice','costPrice','pointExchangeType','pointExchange','givePoint','isMemberDiscount','shippingFee','shippingFeeId','stock','maxBuy','clicks','minStockAlarm','virtualSales','virtualCollect','sales','collects','star','evaluates','shares','provinceId','cityId','picture','keywords','introduction','description','qrcode','code','isTemporary','isStockVisible','isHot','isRecommend','isNew','isPreSale','isBill','state','sort','imgIdArray','skuImgArray','matchPoint','matchRatio','realSales','introduce','introduceVideo','introducePic','crowd','crowdPic','notice','noticePic','goodsAttributeId','goodsSpecFormat','goodsWeight','goodsVolume','shippingFeeType','exhibition','parameter','aftersale','goodsVideoAddress','commission','supplierId','minBuy','isNewuserExclusive','isCourseExclusive'))
		  //时间格式化
          this.form.setFieldsValue({saleDate:this.model.saleDate?moment(this.model.saleDate):null})
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
            this.model.goodsType = 2;
            this.model.description = this.jeditor.description;
            let courseData = Object.assign(this.model, values);
            let skuData = Object.assign(this.skuList, values);
            let formData ={
              ...courseData,
              skuList:skuData
            };
            //时间格式化
            formData.saleDate = formData.saleDate?formData.saleDate.format('YYYY-MM-DD HH:mm:ss'):null;

            console.log(formData);
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
      beforeUpload: function(file){
        var fileType = file.type;
        if(fileType.indexOf('image')<0){
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      handleChange (info) { //上传主图(一张图)
        console.log(info);
        this.picUrlPic = "";
        if (info.file.status === 'uploading') {
          this.uploadLoading = true;
          return
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.picture = response.message;
            console.log(this.model.picture);
            this.picUrlPic = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      getAvatarView(){
        console.log(this.url.imgerver +"/"+ this.model.picture);
        return this.url.imgerver +"/"+ this.model.picture;
      },
      queryGoodsSku(params) {
        queryGoodsSkuByGoodsId({goodsId: params}).then((res) => {
          console.log(res);
          if (res.success) {
            this.skuList = res.result;
            console.log(res.data);
          }
        })
      },

      beforeUploadFile: function(file){
        let fileType = file.type === 'video/mp4';
        let fileSize = file.size < 10 * 1024 * 1024;
        if(!fileType){
          this.$message.warning('请上传格式为mp4的视频..');
          return false;
        }else if (!fileSize){
          this.$message.warning('请上传视频大小在10MB以内..');
          return false;
        }
      },
      // 商品视频地址
      handleChange1(info) {
        console.log(info);
        this.fileList1 = info.fileList;
        if (info.file.status !== 'uploading') {
          console.log(info.file.status)
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          console.log(response);
          if(response.success){
            this.model.goodsVideoAddress = response.message;
            this.$message.success(`${info.file.name}文件上传成功`);
          }else{
            this.$message.warning(response.message);
          }
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name}文件上传失败`);
        }
      },
      //介绍视频
      handleChange2(info) {
        console.log(info);
        this.fileList2 = info.fileList;
        if (info.file.status !== 'uploading') {
          console.log(info.file)
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          console.log(response);
          if(response.success){
            this.model.introduceVideo = response.message;
            this.$message.success(`${info.file.name}文件上传成功`);
          }else{
            this.$message.warning(response.message);
          }
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name}文件上传失败`);
        }
      },

    }
  }
</script>

<style lang="less" scoped>

</style>