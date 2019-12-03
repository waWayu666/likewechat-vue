<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="店铺名称">
              <a-input placeholder="请输入店铺名称" v-model="queryParam.shopName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('店铺')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shop-modal ref="modalForm" @ok="modalFormOk"></shop-modal>
  </a-card>
</template>

<script>
  import ShopModal from './modules/ShopModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ShopList",
    mixins:[JeecgListMixin],
    components: {
      ShopModal
    },
    data () {
      return {
        description: '店铺管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '店铺名称',
            align:"center",
            dataIndex: 'shopName'
           },
		/*   {
            title: '店铺类型等级',
            align:"center",
            dataIndex: 'shopType'
           },
		   {
            title: '会员id',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '店铺分类',
            align:"center",
            dataIndex: 'shopGroupId'
           },
		   {
            title: '店铺公司名称',
            align:"center",
            dataIndex: 'shopCompanyName'
           },*/
		   {
            title: '店铺所在省份ID',
            align:"center",
            dataIndex: 'provinceId'
           },
		   {
            title: '店铺所在市ID',
            align:"center",
            dataIndex: 'cityId'
           },
		   {
            title: '详细地区',
            align:"center",
            dataIndex: 'shopAddress'
           },
		   {
            title: '邮政编码',
            align:"center",
            dataIndex: 'shopZip'
           },
		   {
            title: '店铺状态，0关闭，1开启，2审核中',
            align:"center",
            dataIndex: 'shopState'
           },
		 /*  {
            title: '店铺关闭原因',
            align:"center",
            dataIndex: 'shopCloseInfo'
           },
		   {
            title: '店铺排序',
            align:"center",
            dataIndex: 'shopSort'
           },*/
		   {
            title: '店铺logo',
            align:"center",
            dataIndex: 'shopLogo'
           },
		   /*{
            title: '店铺横幅',
            align:"center",
            dataIndex: 'shopBanner'
           },*/
		   {
            title: '店铺头像',
            align:"center",
            dataIndex: 'shopAvatar'
           },
		   /*{
            title: '店铺seo关键字',
            align:"center",
            dataIndex: 'shopKeywords'
           },
		   {
            title: '店铺seo描述',
            align:"center",
            dataIndex: 'shopDescription'
           },
		   {
            title: 'QQ',
            align:"center",
            dataIndex: 'shopQq'
           },
		   {
            title: '阿里旺旺',
            align:"center",
            dataIndex: 'shopWw'
           },*/
		   {
            title: '商家电话',
            align:"center",
            dataIndex: 'shopPhone'
           },
		   /*{
            title: '店铺二级域名',
            align:"center",
            dataIndex: 'shopDomain'
           },
		   {
            title: '二级域名修改次数',
            align:"center",
            dataIndex: 'shopDomainTimes'
           },*/
		   {
            title: '推荐，0为否，1为是，默认为0',
            align:"center",
            dataIndex: 'shopRecommend'
           },
		   {
            title: '店铺信用',
            align:"center",
            dataIndex: 'shopCredit'
           },
/*		   {
            title: '描述相符度分数',
            align:"center",
            dataIndex: 'shopDesccredit'
           },
		   {
            title: '服务态度分数',
            align:"center",
            dataIndex: 'shopServicecredit'
           },
		   {
            title: '发货速度分数',
            align:"center",
            dataIndex: 'shopDeliverycredit'
           },*/
		   {
            title: '店铺收藏数量',
            align:"center",
            dataIndex: 'shopCollect'
           },
/*		   {
            title: '店铺印章',
            align:"center",
            dataIndex: 'shopStamp'
           },*/
		   /*{
            title: '打印订单页面下方说明文字',
            align:"center",
            dataIndex: 'shopPrintdesc'
           },
		   {
            title: '店铺销售额（不计算退款）',
            align:"center",
            dataIndex: 'shopSales'
           },
		   {
            title: '店铺账户余额',
            align:"center",
            dataIndex: 'shopAccount'
           },
		   {
            title: '店铺可提现金额',
            align:"center",
            dataIndex: 'shopCash'
           },
		   {
            title: '工作时间',
            align:"center",
            dataIndex: 'shopWorkingtime'
           },*/
		   /*{
            title: '商铺名称',
            align:"center",
            dataIndex: 'liveStoreName'
           },
		   {
            title: '商家地址',
            align:"center",
            dataIndex: 'liveStoreAddress'
           },
		   {
            title: '商铺电话',
            align:"center",
            dataIndex: 'liveStoreTel'
           },
		   {
            title: '公交线路',
            align:"center",
            dataIndex: 'liveStoreBus'
           },
		   {
            title: '商家兑换码前缀',
            align:"center",
            dataIndex: 'shopVrcodePrefix'
           },*/
/*		   {
            title: '7天退换',
            align:"center",
            dataIndex: 'storeQtian'
           },
		   {
            title: '正品保障',
            align:"center",
            dataIndex: 'shopZhping'
           },
		   {
            title: '两小时发货',
            align:"center",
            dataIndex: 'shopErxiaoshi'
           },
		   {
            title: '退货承诺',
            align:"center",
            dataIndex: 'shopTuihuo'
           },
		   {
            title: '试用中心',
            align:"center",
            dataIndex: 'shopShiyong'
           },
		   {
            title: '实体验证',
            align:"center",
            dataIndex: 'shopShiti'
           },
		   {
            title: '消协保证',
            align:"center",
            dataIndex: 'shopXiaoxie'
           },*/
		  /* {
            title: '货到付款',
            align:"center",
            dataIndex: 'shopHuodaofk'
           },
		   {
            title: '商家配送时间',
            align:"center",
            dataIndex: 'shopFreeTime'
           },
		   {
            title: '店铺默认配送区域',
            align:"center",
            dataIndex: 'shopRegion'
           },
		   {
            title: '推荐招商员用户id',
            align:"center",
            dataIndex: 'recommendUid'
           },
		   {
            title: '店铺公众号',
            align:"center",
            dataIndex: 'shopQrcode'
           },
		   {
            title: '店铺时间',
            align:"center",
            dataIndex: 'shopCreateTime'
           },
		   {
            title: '店铺关闭时间',
            align:"center",
            dataIndex: 'shopEndTime'
           },*/
/*		   {
            title: '平台抽取佣金比率',
            align:"center",
            dataIndex: 'shopPlatformCommissionRate'
           },*/
/*		   {
            title: '线下店铺地图经纬度',
            align:"center",
            dataIndex: 'latitudeLongitude'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/shop/shop/list",
          delete: "/shop/shop/delete",
          deleteBatch: "/shop/shop/deleteBatch",
          exportXlsUrl: "shop/shop/exportXls",
          importExcelUrl: "shop/shop/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>