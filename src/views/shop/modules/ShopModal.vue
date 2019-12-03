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
          label="店铺名称">
          <a-input placeholder="请输入店铺名称" v-decorator="['shopName', validatorRules.shopName ]" />
        </a-form-item>
<!--        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺类型等级">
          <a-input placeholder="请输入店铺类型等级" v-decorator="['shopType', validatorRules.shopType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="会员id">
          <a-input placeholder="请输入会员id" v-decorator="['userId', validatorRules.userId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺分类">
          <a-input placeholder="请输入店铺分类" v-decorator="['shopGroupId', validatorRules.shopGroupId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺公司名称">
          <a-input placeholder="请输入店铺公司名称" v-decorator="['shopCompanyName', validatorRules.shopCompanyName ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺所在省份ID">
          <a-input placeholder="请输入店铺所在省份ID" v-decorator="['provinceId', validatorRules.provinceId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺所在市ID">
          <a-input placeholder="请输入店铺所在市ID" v-decorator="['cityId', validatorRules.cityId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="详细地区">
          <a-input placeholder="请输入详细地区" v-decorator="['shopAddress', validatorRules.shopAddress ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮政编码">
          <a-input placeholder="请输入邮政编码" v-decorator="['shopZip', validatorRules.shopZip ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺状态，0关闭，1开启，2审核中">
          <a-input placeholder="请输入店铺状态，0关闭，1开启，2审核中" v-decorator="['shopState', validatorRules.shopState ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺排序">
          <a-input-number v-decorator="[ 'shopSort', validatorRules.shopSort ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺logo">
          <a-input placeholder="请输入店铺logo" v-decorator="['shopLogo', validatorRules.shopLogo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺横幅">
          <a-input placeholder="请输入店铺横幅" v-decorator="['shopBanner', validatorRules.shopBanner ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺头像">
          <a-input placeholder="请输入店铺头像" v-decorator="['shopAvatar', validatorRules.shopAvatar ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商家电话">
          <a-input placeholder="请输入商家电话" v-decorator="['shopPhone', validatorRules.shopPhone ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推荐，0为否，1为是，默认为0">
          <a-input placeholder="请输入推荐，0为否，1为是，默认为0" v-decorator="['shopRecommend', validatorRules.shopRecommend ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺信用">
          <a-input-number v-decorator="[ 'shopCredit', validatorRules.shopCredit ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述相符度分数">
          <a-input placeholder="请输入描述相符度分数" v-decorator="['shopDesccredit', validatorRules.shopDesccredit ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务态度分数">
          <a-input placeholder="请输入服务态度分数" v-decorator="['shopServicecredit', validatorRules.shopServicecredit ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发货速度分数">
          <a-input placeholder="请输入发货速度分数" v-decorator="['shopDeliverycredit', validatorRules.shopDeliverycredit ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺收藏数量">
          <a-input-number v-decorator="[ 'shopCollect', validatorRules.shopCollect ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺销售额（不计算退款）">
          <a-input-number v-decorator="[ 'shopSales', validatorRules.shopSales ]" />
        </a-form-item>
<!--        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺账户余额">
          <a-input-number v-decorator="[ 'shopAccount', validatorRules.shopAccount ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺可提现金额">
          <a-input-number v-decorator="[ 'shopCash', validatorRules.shopCash ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工作时间">
          <a-input placeholder="请输入工作时间" v-decorator="['shopWorkingtime', validatorRules.shopWorkingtime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商铺名称">
          <a-input placeholder="请输入商铺名称" v-decorator="['liveStoreName', validatorRules.liveStoreName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商家地址">
          <a-input placeholder="请输入商家地址" v-decorator="['liveStoreAddress', validatorRules.liveStoreAddress ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商铺电话">
          <a-input placeholder="请输入商铺电话" v-decorator="['liveStoreTel', validatorRules.liveStoreTel ]" />
        </a-form-item>

<!--        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="7天退换">
          <a-input placeholder="请输入7天退换" v-decorator="['storeQtian', validatorRules.storeQtian ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正品保障">
          <a-input placeholder="请输入正品保障" v-decorator="['shopZhping', validatorRules.shopZhping ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="两小时发货">
          <a-input placeholder="请输入两小时发货" v-decorator="['shopErxiaoshi', validatorRules.shopErxiaoshi ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退货承诺">
          <a-input placeholder="请输入退货承诺" v-decorator="['shopTuihuo', validatorRules.shopTuihuo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消协保证">
          <a-input placeholder="请输入消协保证" v-decorator="['shopXiaoxie', validatorRules.shopXiaoxie ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="货到付款">
          <a-input placeholder="请输入货到付款" v-decorator="['shopHuodaofk', validatorRules.shopHuodaofk ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商家配送时间">
          <a-input placeholder="请输入商家配送时间" v-decorator="['shopFreeTime', validatorRules.shopFreeTime ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺默认配送区域">
          <a-input placeholder="请输入店铺默认配送区域" v-decorator="['shopRegion', validatorRules.shopRegion ]" />
        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台抽取佣金比率">
          <a-input-number v-decorator="[ 'shopPlatformCommissionRate', validatorRules.shopPlatformCommissionRate ]" />
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
    name: "ShopModal",
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
        shopName:{rules: [{ required: true, message: '请输入店铺名称!' }]},
        shopType:{rules: [{ required: true, message: '请输入店铺类型等级!' }]},
        userId:{rules: [{ required: true, message: '请输入会员id!' }]},
        shopGroupId:{rules: [{ required: true, message: '请输入店铺分类!' }]},
        shopCompanyName:{rules: [{ required: true, message: '请输入店铺公司名称!' }]},
        provinceId:{rules: [{ required: true, message: '请输入店铺所在省份ID!' }]},
        cityId:{rules: [{ required: true, message: '请输入店铺所在市ID!' }]},
        shopAddress:{rules: [{ required: true, message: '请输入详细地区!' }]},
        shopZip:{rules: [{ required: true, message: '请输入邮政编码!' }]},
        shopState:{rules: [{ required: true, message: '请输入店铺状态，0关闭，1开启，2审核中!' }]},
        shopCloseInfo:{rules: [{ required: true, message: '请输入店铺关闭原因!' }]},
        shopSort:{rules: [{ required: true, message: '请输入店铺排序!' }]},
        shopLogo:{rules: [{ required: true, message: '请输入店铺logo!' }]},
        shopBanner:{rules: [{ required: true, message: '请输入店铺横幅!' }]},
        shopAvatar:{rules: [{ required: true, message: '请输入店铺头像!' }]},
        shopKeywords:{rules: [{ required: true, message: '请输入店铺seo关键字!' }]},
        shopDescription:{rules: [{ required: true, message: '请输入店铺seo描述!' }]},
        shopQq:{rules: [{ required: true, message: '请输入QQ!' }]},
        shopWw:{rules: [{ required: true, message: '请输入阿里旺旺!' }]},
        shopPhone:{rules: [{ required: true, message: '请输入商家电话!' }]},
        shopDomain:{rules: [{ required: true, message: '请输入店铺二级域名!' }]},
        shopDomainTimes:{rules: [{ required: true, message: '请输入二级域名修改次数!' }]},
        shopRecommend:{rules: [{ required: true, message: '请输入推荐，0为否，1为是，默认为0!' }]},
        shopCredit:{rules: [{ required: true, message: '请输入店铺信用!' }]},
        shopDesccredit:{rules: [{ required: true, message: '请输入描述相符度分数!' }]},
        shopServicecredit:{rules: [{ required: true, message: '请输入服务态度分数!' }]},
        shopDeliverycredit:{rules: [{ required: true, message: '请输入发货速度分数!' }]},
        shopCollect:{rules: [{ required: true, message: '请输入店铺收藏数量!' }]},
        shopStamp:{rules: [{ required: true, message: '请输入店铺印章!' }]},
        shopPrintdesc:{rules: [{ required: true, message: '请输入打印订单页面下方说明文字!' }]},
        shopSales:{rules: [{ required: true, message: '请输入店铺销售额（不计算退款）!' }]},
        shopAccount:{rules: [{ required: true, message: '请输入店铺账户余额!' }]},
        shopCash:{rules: [{ required: true, message: '请输入店铺可提现金额!' }]},
        shopWorkingtime:{rules: [{ required: true, message: '请输入工作时间!' }]},
        liveStoreName:{rules: [{ required: true, message: '请输入商铺名称!' }]},
        liveStoreAddress:{rules: [{ required: true, message: '请输入商家地址!' }]},
        liveStoreTel:{rules: [{ required: true, message: '请输入商铺电话!' }]},
        liveStoreBus:{rules: [{ required: true, message: '请输入公交线路!' }]},
        shopVrcodePrefix:{rules: [{ required: true, message: '请输入商家兑换码前缀!' }]},
        storeQtian:{rules: [{ required: true, message: '请输入7天退换!' }]},
        shopZhping:{rules: [{ required: true, message: '请输入正品保障!' }]},
        shopErxiaoshi:{rules: [{ required: true, message: '请输入两小时发货!' }]},
        shopTuihuo:{rules: [{ required: true, message: '请输入退货承诺!' }]},
        shopShiyong:{rules: [{ required: true, message: '请输入试用中心!' }]},
        shopShiti:{rules: [{ required: true, message: '请输入实体验证!' }]},
        shopXiaoxie:{rules: [{ required: true, message: '请输入消协保证!' }]},
        shopHuodaofk:{rules: [{ required: true, message: '请输入货到付款!' }]},
        shopFreeTime:{rules: [{ required: true, message: '请输入商家配送时间!' }]},
        shopRegion:{rules: [{ required: true, message: '请输入店铺默认配送区域!' }]},
        recommendUid:{rules: [{ required: true, message: '请输入推荐招商员用户id!' }]},
        shopQrcode:{rules: [{ required: true, message: '请输入店铺公众号!' }]},
        shopPlatformCommissionRate:{rules: [{ required: true, message: '请输入平台抽取佣金比率!' }]},
        latitudeLongitude:{rules: [{ required: true, message: '请输入线下店铺地图经纬度!' }]},
        },
        url: {
          add: "/shop/shop/add",
          edit: "/shop/shop/edit",
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
          this.form.setFieldsValue(pick(this.model,'shopName','shopType','userId','shopGroupId','shopCompanyName','provinceId','cityId','shopAddress','shopZip','shopState','shopCloseInfo','shopSort','shopLogo','shopBanner','shopAvatar','shopKeywords','shopDescription','shopQq','shopWw','shopPhone','shopDomain','shopDomainTimes','shopRecommend','shopCredit','shopDesccredit','shopServicecredit','shopDeliverycredit','shopCollect','shopStamp','shopPrintdesc','shopSales','shopAccount','shopCash','shopWorkingtime','liveStoreName','liveStoreAddress','liveStoreTel','liveStoreBus','shopVrcodePrefix','storeQtian','shopZhping','shopErxiaoshi','shopTuihuo','shopShiyong','shopShiti','shopXiaoxie','shopHuodaofk','shopFreeTime','shopRegion','recommendUid','shopQrcode','shopPlatformCommissionRate','latitudeLongitude'))
		  //时间格式化
          this.form.setFieldsValue({shopCreateTime:this.model.shopCreateTime?moment(this.model.shopCreateTime):null})
          this.form.setFieldsValue({shopEndTime:this.model.shopEndTime?moment(this.model.shopEndTime):null})
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
            formData.shopCreateTime = formData.shopCreateTime?formData.shopCreateTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.shopEndTime = formData.shopEndTime?formData.shopEndTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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