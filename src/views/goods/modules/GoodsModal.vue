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
          <a-input placeholder="请输入商品名称" v-decorator="['goodsName', validatorRules.goodsName ]"/>
        </a-form-item>
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="店铺id">
                  <a-input placeholder="请输入店铺id" v-decorator="['shopId'`, validatorRules.shopId ]" />
                </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品分类">
          <a-input placeholder="请输入商品分类id" v-decorator="['categoryId', validatorRules.categoryId ]"/>
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
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <!-- 轮播图imgIdArray -->
        <a-form-item label="轮播图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :action="uploadAction"
            :fileList="fileListLb"
            :multiple="true"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @preview="handlePreview"
            @change="handleChangeLb"
          >
            <div v-if="fileListLb.length < 6">
              <a-icon type="plus"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
            <img alt="example" style="width: 100%" :src="previewImage"/>
          </a-modal>
        </a-form-item>

        <a-card class="card" title="商品规格" :bordered="false">

          <a-button @click="editSpec()" v-if="selectSkuBtn">选择规格</a-button>
          <edit-goodsSpec-page ref="editGoodsSpecPage"></edit-goodsSpec-page>

          <a-card>
            <a-table
              :columns="columns"
              :dataSource="dataSource"
              :pagination="false"
              :scroll="{ x: 900}"
            >

              <template slot="skuName" slot-scope="text, record, index">
                <template>{{ text }}</template>
              </template>
              <template slot="picture" slot-scope="text, record, index">

                <a-upload
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :action="uploadAction"
                  :headers="headers"
                  :beforeUpload="beforeUpload"
                  @change="changeSkuPic"
                  :disabled="disabled"
                >
                  <img v-if="record.picture" :src="record.picture" alt="规格图片"
                       style="height:104px;max-width:300px"/>
                  <div v-else>
                    <a-icon :type="uploadLoadingSku ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>


              </template>
              <template v-for="(col, i) in ['price','stock','seckillPrice','promotePrice','sort']" :slot="col"
                        slot-scope="text, record, index">
                <div :key="col">
                  <a-input
                    :key="col"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChangeSku(e.target.value, record.key, col)"
                  />
                  <template v-else>{{ text }}</template>
                </div>
              </template>

              <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                <span v-if="record.editable">
                 <a @click="saveRow(record.key)">保存</a>
                  <a-divider type="vertical"/>
                  <a @click="cancel(record.key)">取消</a>
                </span>

                  <span v-else>
                  <a @click="toggle(record.key)">编辑</a>
                  <a-divider type="vertical"/>
                  <a-popconfirm title='是否要删除此行?' @confirm="() => remove(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
                </div>
              </template>

            </a-table>
          </a-card>

        </a-card>
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="商品规格">
                  <a-input placeholder="请输入商品规格" v-decorator="['goodsSpecFormat', validatorRules.goodsSpecFormat ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="促销活动ID">
                  <a-input placeholder="请输入促销活动ID" v-decorator="['promoteId', validatorRules.promoteId ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="实物或虚拟商品标志 1实物商品 0 虚拟商品 2 F码商品">
                  <a-input placeholder="请输入实物或虚拟商品标志 1实物商品 0 虚拟商品 2 F码商品" v-decorator="['goodsType', validatorRules.goodsType ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="市场价">
                  <a-input-number v-decorator="[ 'marketPrice', validatorRules.marketPrice ]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="商品原价格">
                  <a-input-number v-decorator="[ 'price', validatorRules.price ]" />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="商品促销价格">
                  <a-input-number v-decorator="[ 'promotionPrice', validatorRules.promotionPrice ]" />
                </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品/课程原价格">
          <a-input-number v-decorator="[ 'price', validatorRules.price ]"/>
        </a-form-item>

        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="购买商品赠送积分">
                  <a-input-number v-decorator="[ 'givePoint', validatorRules.givePoint ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="参与会员折扣">
                  <a-input-number v-decorator="[ 'isMemberDiscount', validatorRules.isMemberDiscount ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="运费">
                  <a-input-number v-decorator="[ 'shippingFee', validatorRules.shippingFee ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="售卖区域id 物流模板id  ns_order_shipping_fee 表id">
                  <a-input placeholder="请输入售卖区域id 物流模板id  ns_order_shipping_fee 表id" v-decorator="['shippingFeeId', validatorRules.shippingFeeId ]" />
                </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="商品库存">-->
        <!--          <a-input-number v-decorator="[ 'stock', validatorRules.stock ]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否限购">
                  <a-select v-decorator="[ 'isOrnament', validatorRules.maxBuy]" placeholder="请选择是否限购">
                    <a-select-option value="0">否</a-select-option>
                    <a-select-option value="1">是</a-select-option>
                  </a-select>
                </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品简介，促销语">
          <a-input placeholder="请输入商品简介，促销语" v-decorator="['introduction', validatorRules.introduction ]"/>
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品详情">
          <a-input placeholder="请输入商品详情" v-decorator="['description', validatorRules.description ]" />
        </a-form-item>-->
        <!--        <a-form-item
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
                </a-form-item>-->

        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否显示库存">
                  <a-select v-decorator="[ 'isOrnament', validatorRules.isStockVisible]" placeholder="请选择是否显示库存">
                    <a-select-option value="0">否</a-select-option>
                    <a-select-option value="1">是</a-select-option>
                  </a-select>
                </a-form-item>-->


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
          label="限购 0 不限购">
          <a-input-number v-decorator="[ 'maxBuy', validatorRules.maxBuy ]"/>
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分兑换">
          <a-input-number v-decorator="[ 'pointExchange', validatorRules.pointExchange ]"/>
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

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'sort', validatorRules.sort ]"/>
        </a-form-item>
        <a-row :gutter="24">
          <div>
            <a-col>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="产品展示"
                style="min-height: 300px">
                <j-editor v-model="jeditor.exhibition"/>
              </a-form-item>
            </a-col>
          </div>
        </a-row>
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
        <a-row :gutter="24">
          <div>
            <a-col>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="规格参数"
                style="min-height: 300px">
                <j-editor v-model="jeditor.parameter"/>
              </a-form-item>
            </a-col>
          </div>
        </a-row>
        <a-row :gutter="24">
          <div>
            <a-col>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="包装售后"
                style="min-height: 300px">
                <j-editor v-model="jeditor.aftersale"/>
              </a-form-item>
            </a-col>
          </div>
        </a-row>
        <!--        <a-form-item
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
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="实际销量">
                  <a-input-number v-decorator="[ 'realSales', validatorRules.realSales ]" />
                </a-form-item>-->
        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="商品类型">
                  <a-input placeholder="请输入商品类型" v-decorator="['goodsAttributeId', validatorRules.goodsAttributeId ]" />
                </a-form-item>-->
        <!--<a-form-item
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
          label="extendCategoryId">
          <a-input placeholder="请输入extendCategoryId" v-decorator="['extendCategoryId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="extendCategoryId1">
          <a-input placeholder="请输入extendCategoryId1" v-decorator="['extendCategoryId1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="extendCategoryId2">
          <a-input placeholder="请输入extendCategoryId2" v-decorator="['extendCategoryId2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="extendCategoryId3">
          <a-input placeholder="请输入extendCategoryId3" v-decorator="['extendCategoryId3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品展示">
          <a-input placeholder="请输入商品展示" v-decorator="['show', {}]" />
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
        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import Vue from 'vue'
  import moment from "moment"
  import EditGoodsSpecPage from './EditGoodsSpecPage'
  import JEditor from '@/components/jeecg/JEditor'
  import {ACCESS_TOKEN} from "@/store/mutation-types"
  import Self from '../../../Self.js'

  export default {
    name: "GoodsModal",
    components: {
      EditGoodsSpecPage,
      JEditor
    },
    data() {
      return {
        title: "操作",
        visible: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        uploadLoading: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          goodsName: {rules: [{required: true, message: '请输入商品名称!'}]},
          shopId: {rules: [{required: true, message: '请输入店铺id!'}]},
          categoryId: {rules: [{required: true, message: '请输入商品分类id!'}]},
          categoryId1: {rules: [{required: true, message: '请输入一级分类id!'}]},
          categoryId2: {rules: [{required: true, message: '请输入二级分类id!'}]},
          categoryId3: {rules: [{required: true, message: '请输入三级分类id!'}]},
          brandId: {rules: [{required: true, message: '请输入品牌id!'}]},
          groupIdArray: {rules: [{required: true, message: '请输入店铺分类id 首尾用,隔开!'}]},
          promotionType: {rules: [{required: true, message: '请输入促销类型 0无促销，1团购，2限时折扣!'}]},
          promoteId: {rules: [{required: true, message: '请输入促销活动ID!'}]},
          goodsType: {rules: [{required: true, message: '请输入实物或虚拟商品标志 1实物商品 0 虚拟商品 2 F码商品!'}]},
          marketPrice: {rules: [{required: true, message: '请输入市场价!'}]},
          price: {rules: [{required: true, message: '请输入商品原价格!'}]},
          promotionPrice: {rules: [{required: true, message: '请输入商品促销价格!'}]},
          costPrice: {rules: [{required: true, message: '请输入成本价!'}]},
          pointExchangeType: {rules: [{required: true, message: '请输入积分兑换类型 0 非积分兑换 1 只能积分兑换 !'}]},
          pointExchange: {rules: [{required: true, message: '请输入积分兑换!'}]},
          givePoint: {rules: [{required: true, message: '请输入购买商品赠送积分!'}]},
          isMemberDiscount: {rules: [{required: true, message: '请输入参与会员折扣!'}]},
          shippingFee: {rules: [{required: true, message: '请输入运费 0为免运费!'}]},
          shippingFeeId: {rules: [{required: true, message: '请输入售卖区域id 物流模板id  ns_order_shipping_fee 表id!'}]},
          stock: {rules: [{required: true, message: '请输入商品库存!'}]},
          isNewuserExclusive: {rules: [{required: true, message: '请选择是否参与新用户专享!'}]},
          maxBuy: {rules: [{required: true, message: '请输入限购 0 不限购!'}]},
          clicks: {rules: [{required: true, message: '请输入商品点击数量!'}]},
          minStockAlarm: {rules: [{required: true, message: '请输入库存预警值!'}]},
          sales: {rules: [{required: true, message: '请输入销售数量!'}]},
          collects: {rules: [{required: true, message: '请输入收藏数量!'}]},
          star: {rules: [{required: true, message: '请输入好评星级!'}]},
          evaluates: {rules: [{required: true, message: '请输入评价数!'}]},
          shares: {rules: [{required: true, message: '请输入分享数!'}]},
          provinceId: {rules: [{required: true, message: '请输入一级地区id!'}]},
          cityId: {rules: [{required: true, message: '请输入二级地区id!'}]},
          picture: {rules: [{required: true, message: '请输入商品主图!'}]},
          keywords: {rules: [{required: true, message: '请输入商品关键词!'}]},
          introduction: {rules: [{required: true, message: '请输入商品简介，促销语!'}]},
          description: {rules: [{required: true, message: '请输入商品详情!'}]},
          qrcode: {rules: [{required: true, message: '请输入商品二维码!'}]},
          code: {rules: [{required: true, message: '请输入商家编号!'}]},
          isStockVisible: {rules: [{required: true, message: '请输入页面不显示库存!'}]},
          isHot: {rules: [{required: true, message: '请输入是否热销商品!'}]},
          isRecommend: {rules: [{required: true, message: '请输入是否推荐!'}]},
          isNew: {rules: [{required: true, message: '请输入是否新品!'}]},
          isBill: {rules: [{required: true, message: '请输入是否开具增值税发票 1是，0否!'}]},
          state: {rules: [{required: true, message: '请输入商品状态 0下架，1正常，10违规（禁售）!'}]},
          sort: {rules: [{required: true, message: '请输入排序!'}]},
          realSales: {rules: [{required: true, message: '请输入实际销量!'}]},
          goodsAttributeId: {rules: [{required: true, message: '请输入商品类型!'}]},
          goodsSpecFormat: {rules: [{required: true, message: '请输入商品规格!'}]},
          goodsWeight: {rules: [{required: true, message: '请输入商品重量!'}]},
          goodsVolume: {rules: [{required: true, message: '请输入商品体积!'}]},
          shippingFeeType: {rules: [{required: true, message: '请输入计价方式1.重量2.体积3.计件!'}]},
          supplierId: {rules: [{required: true, message: '请输入供货商id!'}]},
          minBuy: {rules: [{required: true, message: '请输入最少买几件!'}]},
        },
        url: {
          add: "/goods/goods/add",
          edit: "/goods/goods/edit",
          /*fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",*/
          fileUpload: window._CONFIG['domianURL'] + "/sys/common/uploadAli",
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
        },
        jeditor: {
          exhibition: '',
          description: '',
          parameter: '',
          aftersale: '',
          value: ''
        },
        selectSkuBtn: true,
        uploadLoadingSku: false,
        disabled: true,
        veris: true,
        keyNum: '',
        picUrlSku: '',
        headers: {},
        picUrlPic: "",
        dataSource: [],
        columns: [
          {
            title: '商品规格',
            dataIndex: 'skuName',
            key: 'skuName',
            width: '11%',
            scopedSlots: {customRender: 'skuName'}
          },
          {
            title: ' 规格图片',
            dataIndex: 'picture',
            key: 'picture',
            width: '12%',
            scopedSlots: {customRender: 'picture'}
          },
          {
            title: '销售价格',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            scopedSlots: {customRender: 'price'}
          },
          {
            title: '秒杀价格',
            dataIndex: 'seckillPrice',
            key: 'seckillPrice',
            width: '10%',
            scopedSlots: {customRender: 'seckillPrice'}
          },
          {
            title: '促销价格',
            dataIndex: 'promotePrice',
            key: 'promotePrice',
            width: '10%',
            scopedSlots: {customRender: 'promotePrice'}
          },
          {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            width: '10%',
            scopedSlots: {customRender: 'stock'}
          },
          {
            title: ' 排序',
            dataIndex: 'sort',
            key: 'sort',
            width: '10%',
            scopedSlots: {customRender: 'sort'}
          },

          {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'operation'}
          }
        ],
        previewVisible: false,
        previewImage: '',
        fileListLb: [],
        fileTempLb: []
      }
    },
    created() {
      this.getSkuValue();
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"TOKEN": token};
    },
    computed: {
      uploadAction: function () {
        return this.url.fileUpload;
      }
    },
    methods: {
      add() {
        this.edit({});
        this.dataSource = [];
        this.picUrlPic = "";
        this.jeditor.exhibition = '';
        this.jeditor.description = '';
        this.jeditor.parameter = '';
        this.jeditor.aftersale = '';
        this.veris = true;
      },
      edit(record) {

        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.veris = false;
        console.log(record);
        this.jeditor.exhibition = decodeURIComponent(this.model.exhibition);
        this.jeditor.description = decodeURIComponent(this.model.description);
        this.jeditor.parameter = decodeURIComponent(this.model.parameter);
        this.jeditor.aftersale = decodeURIComponent(this.model.aftersale);

        if (record.hasOwnProperty("id")) { //编辑的时候回显主图
          this.picUrlPic = "Has no pic url yet";
        }

        //编辑的时候回显商品规格
        if (record.skuList != undefined && record.skuList != null) {
          record.skuList.map((items, num) => {
            items.key = num;
          });
          this.dataSource = record.skuList;
          console.log(this.dataSource)
        }

        // 轮播图回显
        this.fileListLb = [];
        let ss = [];
        this.fileTempLb = [];
        if (record.imgIdArray != undefined && record.imgIdArray != "") {
          this.fileTempLb = record.imgIdArray.split(",");
          this.fileTempLb.map((item, num) => {
            ss.push({
              uid: num,
              url: item
            });
          })
        }
        this.fileListLb = ss;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'goodsName', 'shopId', 'categoryId', 'categoryId1', 'categoryId2', 'categoryId3', 'brandId', 'groupIdArray', 'promotionType', 'promoteId', 'goodsType', 'marketPrice', 'price', 'promotionPrice', 'costPrice', 'pointExchangeType', 'pointExchange', 'givePoint', 'isMemberDiscount', 'shippingFee', 'shippingFeeId', 'stock', 'maxBuy', 'clicks', 'minStockAlarm', 'virtualSales', 'virtualCollect', 'sales', 'collects', 'star', 'evaluates', 'shares', 'provinceId', 'cityId', 'picture', 'keywords', 'introduction', 'description', 'qrcode', 'code', 'isStockVisible', 'isHot', 'isRecommend', 'isNew', 'isPreSale', 'isBill', 'state', 'sort', 'imgIdArray', 'skuImgArray', 'matchPoint', 'matchRatio', 'realSales', 'goodsAttributeId', 'goodsSpecFormat', 'goodsWeight', 'goodsVolume', 'shippingFeeType', 'extendCategoryId', 'extendCategoryId1', 'extendCategoryId2', 'extendCategoryId3', 'show', 'parameter', 'aftersale', 'goodsVideoAddress', 'exchangeIntegral', 'isNewuserExclusive', 'commission', 'supplierId', 'minBuy'));
          //时间格式化
          this.form.setFieldsValue({saleDate: this.model.saleDate ? moment(this.model.saleDate) : null})
        });

      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        let exhibition = encodeURIComponent(this.jeditor.exhibition);
        this.model.exhibition = exhibition;
        let description = encodeURIComponent(this.jeditor.description);
        this.model.description = description;
        let parameter = encodeURIComponent(this.jeditor.parameter);
        this.model.parameter = parameter;
        let aftersale = encodeURIComponent(this.jeditor.aftersale);

        //商品规格list放到goods表进行保存
        if (this.dataSource != "") {
          this.model.skuList = this.dataSource;
        }

        this.model.aftersale = aftersale;
        // 轮播图片地址
        this.model.imgIdArray = this.fileTempLb.toString();
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.saleDate = formData.saleDate ? formData.saleDate.format('YYYY-MM-DD HH:mm:ss') : null;

            console.log(formData);
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })


          }
        })
      },
      handleCancel() {
        this.close()
      },
      editSpec() {
        console.log("单品进入编辑规格页面");
        this.$refs.editGoodsSpecPage.show();
      },

      //规格属性值显示在table中的按钮操作方法
      remove(key) {
        const newData = this.dataSource.filter(item => item.key != key);
        this.dataSource = newData
      },
      saveRow(key) {
        this.disabled = true;
        let target = this.dataSource.filter(item => item.key === key)[0];
        target.editable = false
      },
      toggle(key) {
        this.disabled = false;
        this.keyNum = key;
        this.dataSource.map(item => {
          this.$set(item, "editable", false);
          if (item.key === key) {
            item.editable = !item.editable
          }
        });

        console.log(key)
      },
      cancel(key) {
        this.disabled = true;
        let target = this.dataSource.filter(item => item.key === key)[0];
        target.editable = false
      },
      handleChangeSku(value, key, column) { //商品规格值修改
        const newData = [...this.dataSource];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.dataSource = newData
        }
      },

      //得到规格属性值list
      getSkuValue() {
        console.log("进入了");
        let num = 0;
        this.skuValue = [];
        Self.$on('skuValue', (message) => {   //这里最好用箭头函数，不然this指向有问题
          message.map(aa => {
            num++;
            this.skuValue.push({
              skuName: aa.specName,
              attrValueItems: aa.specIdJoint,
              attrValueItemsFormat: aa.specIdJointValue,
              price: '0',
              seckillPrice: '0',
              promotePrice: '0',
              stock: '0',
              sort: '0',
              editable: false,
              key: num
            })
          });
          this.dataSource = this.skuValue;
          console.log(this.dataSource)
        });

        Self.$on('goodsSpecFormat', (value) => {   //这里最好用箭头函数，不然this指向有问题
          this.model.goodsSpecFormat = value;
          console.log(this.model.goodsSpecFormat)
        })

      },
      beforeUpload: function (file) {
        var fileType = file.type;
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      handleChange(info) { //上传主图(一张图)
        console.log(info);
        this.picUrlPic = "";
        if (info.file.status === 'uploading') {
          this.uploadLoading = true
          return
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if (response.success) {
            this.model.picture = response.message;
            console.log(this.model.picture);
            this.picUrlPic = "Has no pic url yet";
          } else {
            this.$message.warning(response.message);
          }
        }
      },
      getAvatarView() {
        return this.url.imgerver + "/" + this.model.picture;
      },

      changeSkuPic({file}) { //上传规格图片(一张图)
        console.log("上传成功返回信息");
        console.log(file);
        //console.log(info)
        this.picUrlSku = "";
        if (file.status === 'uploading') {
          this.uploadLoadingSku = true;
          return
        }
        if (file.status === 'done') {
          let response = file.response;
          this.uploadLoadingSku = false;
          console.log(6666);
          console.log(this.keyNum);
          console.log(6666);
          if (this.veris === true) {
            this.dataSource[this.keyNum - 1].picture = response.message;
            console.log(response.message);
          } else {
            this.dataSource[this.keyNum].picture = response.message;
            console.log(response.message);
          }
          if (response.success) {
            //this.model.picture = response.message;
            this.picUrlSku = "Has no pic url yet";
          } else {
            this.$message.warning(response.message);
          }
        }
      },
      handleCancelImg() {
        this.previewVisible = false
      },
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true
      },
      handleChangeLb({file, fileList}) {
        /*debugger;*/
        if (file.status == "removed") {
          this.fileListLb.map((item, index) => {
            if (item.uid == file.uid) {
              this.fileListLb.splice(index, 1);
              this.fileTempLb.splice(index, 1);
            }
          });
          if (file.name) {
            this.fileTempLb.map((item, index) => {
              if (item == file.response.message) {
                this.fileTempLb.splice(index, 1);
              }
            })
          } else {
            let removeFileImgUrl = file.url.split('view/')[1];
            this.fileTempLb.map((item, index) => {
              if (item == removeFileImgUrl) {
                this.fileTempLb.splice(index, 1);
              }
            })
          }
        } else {
          this.fileListLb = fileList;
          this.fileTempLb.push(file.response.message);
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>