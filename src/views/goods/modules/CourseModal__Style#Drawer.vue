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
          label="商品/课程编号">
          <a-input placeholder="请输入商品/课程编号" v-decorator="['goodsCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品/课程名称">
          <a-input placeholder="请输入商品/课程名称" v-decorator="['goodsName', validatorRules.goodsName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="课程链接">
          <a-input placeholder="请输入课程链接" v-decorator="['goodsLink', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品试看链接">
          <a-input placeholder="请输入商品试看链接" v-decorator="['goodsTemporaryLink', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺id">
          <a-input placeholder="请输入店铺id" v-decorator="['shopId', validatorRules.shopId ]" />
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
          label="品牌id">
          <a-input placeholder="请输入品牌id" v-decorator="['brandId', validatorRules.brandId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺分类id 首尾用,隔开">
          <a-input placeholder="请输入店铺分类id 首尾用,隔开" v-decorator="['groupIdArray', validatorRules.groupIdArray ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="促销类型 0无促销，1拼团，2秒杀">
          <a-input placeholder="请输入促销类型 0无促销，1拼团，2秒杀" v-decorator="['promotionType', validatorRules.promotionType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="促销活动ID">
          <a-input placeholder="请输入促销活动ID" v-decorator="['promoteId', validatorRules.promoteId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实物或虚拟商品标志 1实物商品 0 虚拟商品 2 F码商品">
          <a-input placeholder="请输入实物或虚拟商品标志 1实物商品 0 虚拟商品 2 F码商品" v-decorator="['goodsType', validatorRules.goodsType ]" />
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
          label="商品/课程原价格">
          <a-input-number v-decorator="[ 'price', validatorRules.price ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品促销价格">
          <a-input-number v-decorator="[ 'promotionPrice', validatorRules.promotionPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成本价">
          <a-input-number v-decorator="[ 'costPrice', validatorRules.costPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分兑换类型 0 非积分兑换 1 只能积分兑换 ">
          <a-input placeholder="请输入积分兑换类型 0 非积分兑换 1 只能积分兑换 " v-decorator="['pointExchangeType', validatorRules.pointExchangeType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分兑换">
          <a-input-number v-decorator="[ 'pointExchange', validatorRules.pointExchange ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买商品赠送积分">
          <a-input-number v-decorator="[ 'givePoint', validatorRules.givePoint ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="参与会员折扣">
          <a-input-number v-decorator="[ 'isMemberDiscount', validatorRules.isMemberDiscount ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="运费 0为免运费">
          <a-input-number v-decorator="[ 'shippingFee', validatorRules.shippingFee ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="售卖区域id 物流模板id  ns_order_shipping_fee 表id">
          <a-input placeholder="请输入售卖区域id 物流模板id  ns_order_shipping_fee 表id" v-decorator="['shippingFeeId', validatorRules.shippingFeeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品库存">
          <a-input-number v-decorator="[ 'stock', validatorRules.stock ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="限购 0 不限购">
          <a-input-number v-decorator="[ 'maxBuy', validatorRules.maxBuy ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品点击数量">
          <a-input-number v-decorator="[ 'clicks', validatorRules.clicks ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库存预警值">
          <a-input-number v-decorator="[ 'minStockAlarm', validatorRules.minStockAlarm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="虚拟销售量">
          <a-input-number v-decorator="[ 'virtualSales', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="虚拟收藏量">
          <a-input-number v-decorator="[ 'virtualCollect', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销售数量">
          <a-input-number v-decorator="[ 'sales', validatorRules.sales ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收藏数量">
          <a-input-number v-decorator="[ 'collects', validatorRules.collects ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="好评星级">
          <a-input placeholder="请输入好评星级" v-decorator="['star', validatorRules.star ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价数">
          <a-input-number v-decorator="[ 'evaluates', validatorRules.evaluates ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分享数">
          <a-input-number v-decorator="[ 'shares', validatorRules.shares ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一级地区id">
          <a-input placeholder="请输入一级地区id" v-decorator="['provinceId', validatorRules.provinceId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="二级地区id">
          <a-input placeholder="请输入二级地区id" v-decorator="['cityId', validatorRules.cityId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品主图">
          <a-input-number v-decorator="[ 'picture', validatorRules.picture ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品关键词">
          <a-input placeholder="请输入商品关键词" v-decorator="['keywords', validatorRules.keywords ]" />
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
          label="商品详情">
          <a-input placeholder="请输入商品详情" v-decorator="['description', validatorRules.description ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品二维码">
          <a-input placeholder="请输入商品二维码" v-decorator="['qrcode', validatorRules.qrcode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商家编号">
          <a-input placeholder="请输入商家编号" v-decorator="['code', validatorRules.code ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="0:不可试看1:可试看">
          <a-input placeholder="请输入0:不可试看1:可试看" v-decorator="['isTemporary', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="页面不显示库存">
          <a-input placeholder="请输入页面不显示库存" v-decorator="['isStockVisible', validatorRules.isStockVisible ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否热销商品">
          <a-input placeholder="请输入是否热销商品" v-decorator="['isHot', validatorRules.isHot ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否推荐">
          <a-input placeholder="请输入是否推荐" v-decorator="['isRecommend', validatorRules.isRecommend ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否新品">
          <a-input placeholder="请输入是否新品" v-decorator="['isNew', validatorRules.isNew ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="isPreSale">
          <a-input-number v-decorator="[ 'isPreSale', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开具增值税发票 1是，0否">
          <a-input placeholder="请输入是否开具增值税发票 1是，0否" v-decorator="['isBill', validatorRules.isBill ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品状态 0下架，1正常，10违规（禁售）">
          <a-input placeholder="请输入商品状态 0下架，1正常，10违规（禁售）" v-decorator="['state', validatorRules.state ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品图片序列">
          <a-input placeholder="请输入商品图片序列" v-decorator="['imgIdArray', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品sku应用图片列表  属性,属性值，图片ID">
          <a-input placeholder="请输入商品sku应用图片列表  属性,属性值，图片ID" v-decorator="['skuImgArray', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实物与描述相符（根据评价计算）">
          <a-input-number v-decorator="[ 'matchPoint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实物与描述相符（根据评价计算）百分比">
          <a-input-number v-decorator="[ 'matchRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际销量">
          <a-input-number v-decorator="[ 'realSales', validatorRules.realSales ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品类型">
          <a-input placeholder="请输入商品类型" v-decorator="['goodsAttributeId', validatorRules.goodsAttributeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品规格">
          <a-input placeholder="请输入商品规格" v-decorator="['goodsSpecFormat', validatorRules.goodsSpecFormat ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品重量">
          <a-input-number v-decorator="[ 'goodsWeight', validatorRules.goodsWeight ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品体积">
          <a-input-number v-decorator="[ 'goodsVolume', validatorRules.goodsVolume ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计价方式1.重量2.体积3.计件">
          <a-input-number v-decorator="[ 'shippingFeeType', validatorRules.shippingFeeType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品展示">
          <a-input placeholder="请输入商品展示" v-decorator="['exhibition', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品参数展示">
          <a-input placeholder="请输入商品参数展示" v-decorator="['parameter', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品售后展示">
          <a-input placeholder="请输入商品售后展示" v-decorator="['aftersale', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品视频地址，不为空时前台显示视频">
          <a-input placeholder="请输入商品视频地址，不为空时前台显示视频" v-decorator="['goodsVideoAddress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分兑换：0不参与积分兑换，积分和现金的兑换比例见后台配置">
          <a-input-number v-decorator="[ 'exchangeIntegral', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="佣金用于分销分成">
          <a-input-number v-decorator="[ 'commission', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="供货商id">
          <a-input placeholder="请输入供货商id" v-decorator="['supplierId', validatorRules.supplierId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上下架时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'saleDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最少买几件">
          <a-input-number v-decorator="[ 'minBuy', validatorRules.minBuy ]" />
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
    name: "CourseModal",
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
        goodsName:{rules: [{ required: true, message: '请输入商品/课程名称!' }]},
        shopId:{rules: [{ required: true, message: '请输入店铺id!' }]},
        categoryId:{rules: [{ required: true, message: '请输入商品分类id!' }]},
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
        qrcode:{rules: [{ required: true, message: '请输入商品二维码!' }]},
        code:{rules: [{ required: true, message: '请输入商家编号!' }]},
        isStockVisible:{rules: [{ required: true, message: '请输入页面不显示库存!' }]},
        isHot:{rules: [{ required: true, message: '请输入是否热销商品!' }]},
        isRecommend:{rules: [{ required: true, message: '请输入是否推荐!' }]},
        isNew:{rules: [{ required: true, message: '请输入是否新品!' }]},
        isBill:{rules: [{ required: true, message: '请输入是否开具增值税发票 1是，0否!' }]},
        state:{rules: [{ required: true, message: '请输入商品状态 0下架，1正常，10违规（禁售）!' }]},
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
          this.form.setFieldsValue(pick(this.model,'goodsCode','goodsName','goodsLink','goodsTemporaryLink','shopId','categoryId','brandId','groupIdArray','promotionType','promoteId','goodsType','marketPrice','price','promotionPrice','costPrice','pointExchangeType','pointExchange','givePoint','isMemberDiscount','shippingFee','shippingFeeId','stock','maxBuy','clicks','minStockAlarm','virtualSales','virtualCollect','sales','collects','star','evaluates','shares','provinceId','cityId','picture','keywords','introduction','description','qrcode','code','isTemporary','isStockVisible','isHot','isRecommend','isNew','isPreSale','isBill','state','sort','imgIdArray','skuImgArray','matchPoint','matchRatio','realSales','goodsAttributeId','goodsSpecFormat','goodsWeight','goodsVolume','shippingFeeType','exhibition','parameter','aftersale','goodsVideoAddress','exchangeIntegral','commission','supplierId','minBuy'))
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
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.saleDate = formData.saleDate?formData.saleDate.format('YYYY-MM-DD HH:mm:ss'):null;
            
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