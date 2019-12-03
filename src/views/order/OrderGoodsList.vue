<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="订单ID">
              <a-input placeholder="请输入订单ID" v-model="queryParam.orderId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="商品ID">
              <a-input placeholder="请输入商品ID" v-model="queryParam.goodsId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="商品名称">
              <a-input placeholder="请输入商品名称" v-model="queryParam.goodsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="skuID">
              <a-input placeholder="请输入skuID" v-model="queryParam.skuId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="sku名称">
              <a-input placeholder="请输入sku名称" v-model="queryParam.skuName"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('订单商品')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
    <orderGoods-modal ref="modalForm" @ok="modalFormOk"></orderGoods-modal>
  </a-card>
</template>

<script>
  import OrderGoodsModal from './modules/OrderGoodsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction} from '@/api/manage'

  export default {
    name: "OrderGoodsList",
    mixins:[JeecgListMixin],
    components: {
      OrderGoodsModal
    },
    data () {
      return {
        description: '订单商品管理页面',
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
            title: '订单ID',
            align:"center",
            dataIndex: 'orderId'
           },
		 /*  {
            title: '商品ID',
            align:"center",
            dataIndex: 'goodsId'
           },*/
		   {
            title: '商品名称',
            align:"center",
            dataIndex: 'goodsName'
           },
		  /* {
            title: 'skuID',
            align:"center",
            dataIndex: 'skuId'
           },
		   {
            title: 'sku名称',
            align:"center",
            dataIndex: 'skuName'
           },*/
		   {
            title: '商品价格',
            align:"center",
            dataIndex: 'price'
           },
		   {
            title: '商品成本价',
            align:"center",
            dataIndex: 'costPrice'
           },
		   {
            title: '购买数量',
            align:"center",
            dataIndex: 'num'
           },
		  /* {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustMoney'
           },
		   {
            title: '商品总价',
            align:"center",
            dataIndex: 'goodsMoney'
           },*/
		  /* {
            title: '商品图片',
            align:"center",
            dataIndex: 'goodsPicture'
           },*/
		  /* {
            title: '店铺ID',
            align:"center",
            dataIndex: 'shopId'
           },*/
		  /* {
            title: '购买人ID',
            align:"center",
            dataIndex: 'buyerId'
           },*/
		  /* {
            title: '积分兑换类型0.非积分兑换1.积分兑换',
            align:"center",
            dataIndex: 'pointExchangeType'
           },*/
		   {
            title: '商品类型',
            align:"center",
            dataIndex: 'goodsType'
           },
		  /* {
            title: '促销ID',
            align:"center",
            dataIndex: 'promotionId'
           },*/
		   {
            title: '促销类型',
            align:"center",
            dataIndex: 'promotionTypeId'
           },
		   {
            title: '订单类型',
            align:"center",
            dataIndex: 'orderType'
           },
		   {
            title: '订单状态',
            align:"center",
            dataIndex: 'orderStatus'
           },
		   {
            title: '积分数量',
            align:"center",
            dataIndex: 'givePoint'
           },
		 /*  {
            title: '物流状态',
            align:"center",
            dataIndex: 'shippingStatus'
           },*/
		   /*{
            title: '退款方式',
            align:"center",
            dataIndex: 'refundType'
           },*/
		  /* {
            title: '退款金额',
            align:"center",
            dataIndex: 'refundRequireMoney'
           },
		   {
            title: '退款原因',
            align:"center",
            dataIndex: 'refundReason'
           },
		   {
            title: '退款物流单号',
            align:"center",
            dataIndex: 'refundShippingCode'
           },
		   {
            title: '退款物流公司名称',
            align:"center",
            dataIndex: 'refundShippingCompany'
           },
		   {
            title: '实际退款金额',
            align:"center",
            dataIndex: 'refundRealMoney'
           },
		   {
            title: '退款状态',
            align:"center",
            dataIndex: 'refundStatus'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'memo'
           },*/
		   {
            title: '是否评价',//0为未评价 1为已评价 2为已追评
            align:"center",
            dataIndex: 'isEvaluate'
           },
		   /*{
            title: '退款时间',
            align:"center",
            dataIndex: 'refundTime'
           },
		   {
            title: '订单退款余额',
            align:"center",
            dataIndex: 'refundBalanceMoney'
           },
		   {
            title: '批量打印时添加的临时物流公司',
            align:"center",
            dataIndex: 'tmpExpressCompany'
           },*/
		  /* {
            title: '批量打印时添加的临时物流公司id',
            align:"center",
            dataIndex: 'tmpExpressCompanyId'
           },
		   {
            title: '批量打印时添加的临时订单编号',
            align:"center",
            dataIndex: 'tmpExpressNo'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          // list: "/order/orderGoods/list",
          list: "/order/order/listOrderGoodsByMainId",
          delete: "/order/orderGoods/delete",
          deleteBatch: "/order/orderGoods/deleteBatch",
          exportXlsUrl: "order/orderGoods/exportXls",
          importExcelUrl: "order/orderGoods/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();
        getAction(this.url.list, {mainId: params.mainId}).then((res) => {
          if (res.success) {
            this.dataSource = res.result;
          } else {
            this.dataSource = null;
          }
        })
      },
      getOrderMain(orderId) {
        this.queryParam.mainId = orderId;
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>