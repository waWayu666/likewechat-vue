<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="订单号">
              <a-input placeholder="请输入订单号" v-model="queryParam.orderNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="昵称">
              <a-input placeholder="请输入昵称" v-model="queryParam.nickname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="支付状态">
              <a-select v-model="queryParam.status" placeholder="请选择订单状态">
                <a-select-option value="0">未到账</a-select-option>
                <a-select-option value="1">已到账</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="10">
            <a-form-item label="提现时间">
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
          <a-col :md="8" :sm="12" style="line-height: 32px;">
            <span style="margin-right: 100px;">提现申请总金额:{{this.withdrawMoney.noToTheAccount}}</span>
            <span>提现到账金额:{{this.withdrawMoney.toTheAccount}}</span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <!--      <a-button type="primary" icon="download" @click="handleExportXls('提现记录')">导出</a-button>-->
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
          <a @click="handleEdit(record)" v-if="record.status==0" >提现</a>
<!--          <span v-if="record.status==1">已提现</span>-->
<!--          <span v-if="record.status==2">已拒绝</span>-->
          <!--          <a-divider type="vertical" />-->
          <!--          <a-dropdown>-->
          <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
          <!--            <a-menu slot="overlay">-->
          <!--              <a-menu-item>-->
          <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
          <!--                  <a>删除</a>-->
          <!--                </a-popconfirm>-->
          <!--              </a-menu-item>-->
          <!--            </a-menu>-->
          <!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <withdraw-modal ref="modalForm" @ok="modalFormOk"></withdraw-modal>
  </a-card>
</template>

<script>
    import WithdrawModal from './modules/WithdrawModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'
    import { queryWithdrawByStatus } from '@/api/api'

    export default {
        name: "WithdrawList",
        mixins: [JeecgListMixin],
        components: {
            WithdrawModal
        },
        data() {
            return {
                description: '提现记录管理页面',
                withdrawMoney:{},
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
                        title: '第三方订单号',
                        align: "center",
                        dataIndex: 'orderNo'
                    },
                    {
                        title: '用户昵称',
                        align: "center",
                        dataIndex: 'nickname'
                    },
                    {
                        title: '提现金额',
                        align: "center",
                        dataIndex: 'money'
                    },
                    {
                        title: '提现申请时间',
                        align: "center",
                        dataIndex: 'createTime'
                    },

                    {
                        title: '提现到账时间',
                        align: "center",
                        dataIndex: 'completeTime'
                    },
                    {
                        title: '支付状态',
                        align: "center",
                        dataIndex: 'status',
                        customRender: function (value) {
                            if (value == 0) {
                                return "未到账";
                            } else if (value == 1){
                                return "已到账";
                            } else {
                                return "已拒绝";
                            }
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align: "center",
                        scopedSlots: {customRender: 'action'},
                    }
                ],
                url: {
                    list: "/withdraw/withdraw/list",
                    delete: "/withdraw/withdraw/delete",
                    deleteBatch: "/withdraw/withdraw/deleteBatch",
                    exportXlsUrl: "withdraw/withdraw/exportXls",
                    importExcelUrl: "withdraw/withdraw/importExcel",
                },
            }
        },
        computed: {
            importExcelUrl: function () {
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
            }
        },
        mounted() {
            this.getWithdrawByStatus();
        },
        methods: {
            onDateChange: function (dateString) {
                this.queryParam.startTime=dateString[0].format('YYYY-MM-DD HH:mm:ss');
                this.queryParam.endTime=dateString[1].format('YYYY-MM-DD HH:mm:ss');
            },
            getWithdrawByStatus() {
                queryWithdrawByStatus(null).then(res => {
                    if(res.success){
                        this.withdrawMoney = res.result;
                    }else{
                        that.$message.warning(res.message);
                    }
                })
            },
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>