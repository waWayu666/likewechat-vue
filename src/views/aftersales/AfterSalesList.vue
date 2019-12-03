<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <!--<a-col :md="6" :sm="8">
            <a-form-item label="商品id">
              <a-input placeholder="请输入商品id" v-model="queryParam.goodsId"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="商品名称">
              <a-input placeholder="请输入商品名称" v-model="queryParam.goodsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="订单项ID">
              <a-input placeholder="请输入订单项ID" v-model="queryParam.orderGoodsId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="订单ID">
              <a-input placeholder="请输入订单ID" v-model="queryParam.orderId"></a-input>
            </a-form-item>
          </a-col>
          <!--<template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="订单编号">
                <a-input placeholder="请输入订单编号" v-model="queryParam.orderNo"></a-input>
              </a-form-item>
            </a-col>

          </template>-->
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('售后')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
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

        <template slot="imgUrlslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.goodsPicture"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
         <!-- <a @click="handleEdit(record)">编辑</a>-->
          <a v-if="record.auditStatus == 0" @click="handleReview(record)">审核</a>
          <span v-else-if="record.auditStatus == 1">审核通过</span>
          <span v-else-if="record.auditStatus == 2">审核未通过</span>
          <span v-else-if="record.auditStatus == 3">审核取消</span>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
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
    <afterSales-modal ref="modalForm" @ok="modalFormOk"></afterSales-modal>
  </a-card>
</template>

<script>
  import AfterSalesModal from './modules/AfterSalesModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    name: "AfterSalesList",
    mixins: [JeecgListMixin],
    components: {
      AfterSalesModal
    },
    data() {
      return {
        description: '售后管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          /*{
            title: '商品id',
            align: "center",
            dataIndex: 'goodsId'
          },
          {
            title: '订单id',
            align: "center",
            dataIndex: 'orderId'
          },
          {
            title: '订单编号',
            align: "center",
            dataIndex: 'orderNo'
          },
          {
            title: '订单项id',
            align: "center",
            dataIndex: 'orderGoodsId'
          },*/
          {
            title: '商品名称',
            align: "center",
            dataIndex: 'goodsName'
          },
          {
            title: '商品图片',
            align: "center",
            dataIndex: 'goodsPicture',
            scopedSlots: { customRender: 'imgUrlslot' }

          },
          /*{
            title: 'skuID',
            align: "center",
            dataIndex: 'skuId'
          },*/
          {
            title: 'sku名称',
            align: "center",
            dataIndex: 'skuName'
          },
          {
            title: '价格',
            align: "center",
            dataIndex: 'price'
          },
          {
            title: '数量',
            align: "center",
            dataIndex: 'num'
          },
          {
            title: '总价',
            align: "center",
            dataIndex: 'goodsMoney'
          },
          {
            title: '买家名称',
            align: "center",
            dataIndex: 'userName'
          },
          {
            title: '店铺',
            align: "center",
            dataIndex: 'shopId_dicText'
          },
          /*{
            title: '购买人ID',
            align: "center",
            dataIndex: 'userId'
          },*/
          {
            title: '订单类型',
            align: "center",
            dataIndex: 'orderType'
          },
          {
            title: '是否收到',
            align: "center",
            dataIndex: 'goodsState',
            customRender: function (t) {
              if (t==1){
                return "未收到";
              }else if (t == 2){
                return "已收到";
              }
            }
          },
          {
            title: '退款金额',
            align: "center",
            dataIndex: 'refundMoney'
          },
          /*{
            title: '退款方式  退款退货',
            align: "center",
            dataIndex: 'refundWay'
          },*/
          {
            title: '退款原因',
            align: "center",
            dataIndex: 'refundReason'
          },
          /*{
            title: '退款说明',
            align: "center",
            dataIndex: 'refundExplain'
          },*/
          /*{
            title: '凭证',
            align: "center",
            dataIndex: 'evidence'
          },*/
          {
            title: '审核状态',
            align: "center",
            dataIndex: 'auditStatus',
            customRender: function (t) {
              if (t==0){
                return "待审核";
              }else if (t == 1){
                return "审核通过";
              }else if (t == 2) {
                return "审核未通过";
              }else if (t == 3) {
                return "审核取消";
              }
            }
          },
          {
            title: '申请时间',
            align: "center",
            dataIndex: 'applyTime'
          },
          {
            title: '审核时间',
            align: "center",
            dataIndex: 'auditTime'
          },
          {
            title: '订单来源',
            align: "center",
            dataIndex: 'orderFrom'
          },
          /*{
            title: '收货人所在省',
            align: "center",
            dataIndex: 'receiverProvince'
          },
          {
            title: '收货人所在城市',
            align: "center",
            dataIndex: 'receiverCity'
          },
          {
            title: '收货人所在街道',
            align: "center",
            dataIndex: 'receiverDistrict'
          },
          {
            title: '收货人详细地址',
            align: "center",
            dataIndex: 'receiverAddress'
          },*/
          /*{
            title: '支付类型。取值范围：...',
            align: "center",
            dataIndex: 'paymentType'
          },
          {
            title: '收货人的手机号码',
            align: "center",
            dataIndex: 'receiverMobile'
          },
          {
            title: '订单配送方式',
            align: "center",
            dataIndex: 'shippingType'
          },
          {
            title: '固定电话',
            align: "center",
            dataIndex: 'fixedTelephone'
          },
          {
            title: '收货人姓名',
            align: "center",
            dataIndex: 'receiverName'
          },*/
          {
            title: '退款物流单号',
            align: "center",
            dataIndex: 'refundShippingCode'
          },
          {
            title: '退款物流名称',
            align: "center",
            dataIndex: 'refundShippingCompany'
          },
          {
            title: '订单退款余额',
            align: "center",
            dataIndex: 'refundBalanceMoney'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/aftersales/afterSales/list",
          delete: "/aftersales/afterSales/delete",
          deleteBatch: "/aftersales/afterSales/deleteBatch",
          exportXlsUrl: "aftersales/afterSales/exportXls",
          importExcelUrl: "aftersales/afterSales/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleReview: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "审核";
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>