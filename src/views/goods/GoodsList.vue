<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="请选择竞价状态">
              <a-input placeholder="请输入0竞拍未开始  1进行中  2竞拍已完成" v-model="queryParam.finishFlag"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="商品名称">
              <a-input placeholder="请输入商品名称" v-model="queryParam.goodsName"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="商品编号">
                <a-input placeholder="请输入商品编号" v-model="queryParam.goodsNum"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="起拍价">
                <a-input placeholder="请输入起拍价" v-model="queryParam.startPrice"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="预估价">
                <a-input placeholder="请输入预估价" v-model="queryParam.evaluatePrice"></a-input>
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
      <!--      <a-button type="primary" icon="download" @click="handleExportXls('商品表')">导出</a-button>-->
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
      <!--        <a-button type="primary" icon="import">导入</a-button>-->
      <!--      </a-upload>-->
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
    <goods-modal ref="modalForm" @ok="modalFormOk"></goods-modal>
  </a-card>
</template>

<script>
    import GoodsModal from './modules/GoodsModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'

    export default {
        name: "GoodsList",
        mixins: [JeecgListMixin],
        components: {
            GoodsModal
        },
        data() {
            return {
                description: '商品表管理页面',
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
                        title: '竞价状态',
                        align: "center",
                        dataIndex: 'finishFlag',
                        customRender: function (t) {
                            if (t == 0) {
                                return "竞拍未开始";
                            } else if (t == 1) {
                                return "进行中";
                            } else {
                                return "竞拍已完成";
                            }
                        }
                    },
                    {
                        title: '商品名称',
                        align: "center",
                        dataIndex: 'goodsName'
                    },
                    {
                        title: '商品编号',
                        align: "center",
                        dataIndex: 'goodsNum'
                    },
                    {
                        title: '起拍价',
                        align: "center",
                        dataIndex: 'startPrice'
                    },
                    {
                        title: '预估价',
                        align: "center",
                        dataIndex: 'evaluatePrice'
                    },
                    {
                        title: '最高价',
                        align: "center",
                        dataIndex: 'maxPrice'
                    },
                    {
                        title: '顶一手价格',
                        align: "center",
                        dataIndex: 'addPrice'
                    },
                    {
                        title: '佣金',
                        align: "center",
                        dataIndex: 'commissionPrice'
                    },
                    {
                        title: '分类id',
                        align: "center",
                        dataIndex: 'categoryId',
                    },
                    {
                        title: '描述',
                        align: "center",
                        dataIndex: 'desc'
                    },
                    {
                        title: '排序号',
                        align: "center",
                        dataIndex: 'sort'
                    },
                    {
                        title: '商品主图',
                        align: "center",
                        dataIndex: 'mianImage'
                    },
                    {
                        title: '商品详情',
                        align: "center",
                        dataIndex: 'goodsDesc'
                    },
                    {
                        title: '0：下架   1：上架中',
                        align: "center",
                        dataIndex: 'status'
                    },
                    {
                        title: '成交价格',
                        align: "center",
                        dataIndex: 'dealPrice'
                    },
                    {
                        title: '拍卖次数',
                        align: "center",
                        dataIndex: 'auctionCount'
                    },
                    {
                        title: '开拍时间',
                        align: "center",
                        dataIndex: 'startTime'
                    },
                    {
                        title: '结束时间',
                        align: "center",
                        dataIndex: 'endTime'
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align: "center",
                        scopedSlots: {customRender: 'action'},
                    }
                ],
                url: {
                    list: "/goods/goods/list",
                    delete: "/goods/goods/delete",
                    deleteBatch: "/goods/goods/deleteBatch",
                    exportXlsUrl: "goods/goods/exportXls",
                    importExcelUrl: "goods/goods/importExcel",
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