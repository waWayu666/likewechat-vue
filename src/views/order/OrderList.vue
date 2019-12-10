<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="订单编号">
              <a-input placeholder="请输入订单编号" v-model="queryParam.orderNum"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="订单来源">
              <a-input placeholder="请输入订单来源" v-model="queryParam.orderFrom"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="买家会员名称">
                <a-input placeholder="请输入买家会员名称" v-model="queryParam.nickname"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="请选择商品类型">
                <a-select v-model="queryParam.orderType" placeholder="请选择商品类型">
                  <a-select-option value="1">竞拍商品</a-select-option>
                  <a-select-option value="2">积分商品</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
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

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

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
    <order-modal ref="modalForm" @ok="modalFormOk"></order-modal>
  </a-card>
</template>

<script>
    import OrderModal from './modules/OrderModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'

    export default {
        name: "OrderList",
        mixins: [JeecgListMixin],
        components: {
            OrderModal
        },
        data() {
            return {
                description: '订单管理页面',
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
                    {
                        title: '订单编号',
                        align: "center",
                        dataIndex: 'orderNum'
                    },
                    {
                        title: '订单来源',
                        align: "center",
                        dataIndex: 'orderFrom'
                    },
                    {
                        title: '买家id',
                        align: "center",
                        dataIndex: 'userId'
                    },
                    {
                        title: '买家会员名称',
                        align: "center",
                        dataIndex: 'nickname'
                    },
                    {
                        title: '1:竞拍商品  2：积分商品',
                        align: "center",
                        dataIndex: 'orderType'
                    },
                    {
                        title: '订单总价',
                        align: "center",
                        dataIndex: 'orderMoney'
                    },
                    {
                        title: '订单消耗积分',
                        align: "center",
                        dataIndex: 'point'
                    },
                    {
                        title: '订单余额支付金额',
                        align: "center",
                        dataIndex: 'userMoney'
                    },
                    {
                        title: '订单状态',
                        align: "center",
                        dataIndex: 'orderStatus',
                        customRender: function (t) {
                            if (t == 0) {
                                return "流拍";
                            } else if (t == 1) {
                                return "待付款";
                            } else if (t == 2) {
                                return "待发货"
                            } else if (t == 3) {
                                return "待签收"
                            } else if (t == 4) {
                                return "已完成"
                            }
                        }
                    },
                    // {
                    //     title: '订单付款时间',
                    //     align: "center",
                    //     dataIndex: 'payTime'
                    // },
                    // {
                    //     title: '订单是否已删除',
                    //     align: "center",
                    //     dataIndex: 'delFlag'
                    // },
                    // {
                    //     title: '取消订单原因',
                    //     align: "center",
                    //     dataIndex: 'cancelReason'
                    // },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align: "center",
                        scopedSlots: {customRender: 'action'},
                    }
                ],
                url: {
                    list: "/order/order/list",
                    delete: "/order/order/delete",
                    deleteBatch: "/order/order/deleteBatch",
                    exportXlsUrl: "order/order/exportXls",
                    importExcelUrl: "order/order/importExcel",
                },
            }
        },
        computed: {
            importExcelUrl: function () {
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
            }
        },
        methods: {}
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>