<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="运费模板名称">
              <a-input placeholder="请输入运费模板名称" v-model="queryParam.shippingFeeName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="是否是默认模板">
              <a-input placeholder="请输入是否是默认模板" v-model="queryParam.isDefault"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="物流公司ID">
              <a-input placeholder="请输入物流公司ID" v-model="queryParam.companyId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="店铺ID">
              <a-input placeholder="请输入店铺ID" v-model="queryParam.shopId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="省ID组">
              <a-input placeholder="请输入省ID组" v-model="queryParam.provinceIdArray"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('运费模板')">导出</a-button>
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
    <orderShippingFee-modal ref="modalForm" @ok="modalFormOk"></orderShippingFee-modal>
  </a-card>
</template>

<script>
  import OrderShippingFeeModal from './modules/OrderShippingFeeModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "OrderShippingFeeList",
    mixins:[JeecgListMixin],
    components: {
      OrderShippingFeeModal
    },
    data () {
      return {
        description: '运费模板管理页面',
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
            title: '运费模板名称',
            align:"center",
            dataIndex: 'shippingFeeName'
           },
		   {
            title: '是否是默认模板',
            align:"center",
            dataIndex: 'isDefault'
           },
		   {
            title: '物流公司ID',
            align:"center",
            dataIndex: 'companyId'
           },
		   {
            title: '店铺ID',
            align:"center",
            dataIndex: 'shopId'
           },
		   {
            title: '省ID组',
            align:"center",
            dataIndex: 'provinceIdArray'
           },
		   {
            title: '市ID组',
            align:"center",
            dataIndex: 'cityIdArray'
           },
		   {
            title: '是否启用重量运费',
            align:"center",
            dataIndex: 'weightIsUse'
           },
		   {
            title: '首重',
            align:"center",
            dataIndex: 'weightSnum'
           },
		   {
            title: '首重运费',
            align:"center",
            dataIndex: 'weightSprice'
           },
		   {
            title: '续重',
            align:"center",
            dataIndex: 'weightXnum'
           },
		   {
            title: '续重运费',
            align:"center",
            dataIndex: 'weightXprice'
           },
		   {
            title: '是否启用体积计算运费',
            align:"center",
            dataIndex: 'volumeIsUse'
           },
		   {
            title: '首体积量',
            align:"center",
            dataIndex: 'volumeSnum'
           },
		   {
            title: '首体积运费',
            align:"center",
            dataIndex: 'volumeSprice'
           },
		   {
            title: '续体积量',
            align:"center",
            dataIndex: 'volumeXnum'
           },
		   {
            title: '续体积运费',
            align:"center",
            dataIndex: 'volumeXprice'
           },
		   {
            title: '是否启用计件方式运费',
            align:"center",
            dataIndex: 'bynumIsUse'
           },
		   {
            title: '首件',
            align:"center",
            dataIndex: 'bynumSnum'
           },
		   {
            title: '首件运费',
            align:"center",
            dataIndex: 'bynumSprice'
           },
		   {
            title: '续件',
            align:"center",
            dataIndex: 'bynumXnum'
           },
		   {
            title: '续件运费',
            align:"center",
            dataIndex: 'bynumXprice'
           },
		   {
            title: '区县ID组',
            align:"center",
            dataIndex: 'districtIdArray'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/order/orderShippingFee/list",
          delete: "/order/orderShippingFee/delete",
          deleteBatch: "/order/orderShippingFee/deleteBatch",
          exportXlsUrl: "order/orderShippingFee/exportXls",
          importExcelUrl: "order/orderShippingFee/importExcel",
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