<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

            <a-col :md="6" :sm="8">
              <a-form-item label="第三方订单号">
                <a-input placeholder="请输入第三方订单号" v-model="queryParam.orderNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="充值状态">
                <a-select placeholder="请选择充值状态" v-model="queryParam.status">
                  <a-select-option value="1">成功</a-select-option>
                  <a-select-option value="0">失败</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="充值方式">
                <a-select placeholder="请选择充值方式" v-model="queryParam.rechargeType">
                  <a-select-option value="1">支付宝</a-select-option>
                  <a-select-option value="2">微信</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="10">
              <a-form-item label="下单时间">
                <a-range-picker
                  :showTime="{ format: 'HH:mm:00' }"
                  style="width: 320px"
                  format="YYYY-MM-DD HH:mm:00"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onDateChange"
                />
              </a-form-item>
            </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('充值')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete"/>-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{-->
<!--        selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a @click="handleEdit(record)">编辑</a>-->

<!--          <a-divider type="vertical"/>-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
<!--        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <recharge-modal ref="modalForm" @ok="modalFormOk"></recharge-modal>
  </a-card>
</template>

<script>
    import RechargeModal from './modules/RechargeModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'

    export default {
        name: "RechargeList",
        mixins: [JeecgListMixin],
        components: {
            RechargeModal
        },
        data() {
            return {
                description: '充值管理页面',
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
                        title: '昵称',
                        align: "center",
                        dataIndex: 'userId_dictText'
                    },
                    {
                        title: '充值金额',
                        align: "center",
                        dataIndex: 'rechargeMoney'
                    },
                    {
                        title: '充值状态',
                        align: "center",
                        dataIndex: 'status',
                        customRender: function (value) {
                            if (value == 1) {
                                return "成功";
                            } else {
                                return "失败";
                            }
                        }
                    },
                    {
                        title: '充值方式',
                        align: "center",
                        dataIndex: 'rechargeType',
                        customRender: function (value) {
                            if (value == 1) {
                                return "支付宝";
                            } else {
                                return "微信";
                            }
                        }
                    },
                    {
                        title: '第三方订单号',
                        align: "center",
                        dataIndex: 'orderNo'
                    },
                    {
                        title: '充值时间',
                        align:"center",
                        dataIndex: 'createTime'
                    },
                    // {
                    //     title: '操作',
                    //     dataIndex: 'action',
                    //     align: "center",
                    //     scopedSlots: {customRender: 'action'},
                    // }
                ],
                url: {
                    list: "/recharge/recharge/list",
                    delete: "/recharge/recharge/delete",
                    deleteBatch: "/recharge/recharge/deleteBatch",
                    exportXlsUrl: "recharge/recharge/exportXls",
                    importExcelUrl: "recharge/recharge/importExcel",
                },
            }
        },
        computed: {
            importExcelUrl: function () {
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
            }
        },
        methods: {
            onDateChange: function (dateString) {
                this.queryParam.startTime=dateString[0].format('YYYY-MM-DD HH:mm:ss');
                this.queryParam.endTime=dateString[1].format('YYYY-MM-DD HH:mm:ss');
            },
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>