<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

            <a-col :md="6" :sm="8">
              <a-form-item label="提现状态">
                <a-select v-model="queryParam.status" placeholder="请选择提现状态">
                  <a-select-option value="0">未审核</a-select-option>
                  <a-select-option value="1">审核未通过</a-select-option>
                  <a-select-option value="2">审核已通过</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

<!--            <a-col :md="6" :sm="8">
              <a-form-item label="账户姓名">
                <a-input placeholder="请输入账户姓名" v-model="queryParam.withdrawName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="提现二维码">
                <a-input placeholder="请输入提现二维码" v-model="queryParam.withdrawQrcode"></a-input>
              </a-form-item>
            </a-col>-->
          <a-col :md="6" :sm="8">
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
      <a-button type="primary" icon="download" @click="handleExportXls('提现')">导出</a-button>
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
    <withdraw-modal ref="modalForm" @ok="modalFormOk"></withdraw-modal>
  </a-card>
</template>

<script>
  import WithdrawModal from './modules/WithdrawModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    name: "WithdrawList",
    mixins: [JeecgListMixin],
    components: {
      WithdrawModal
    },
    data() {
      return {
        description: '提现管理页面',
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
            title: '提现金额',
            align: "center",
            dataIndex: 'money'
          },
          {
            title: '提现状态',
            align: "center",
            dataIndex: 'status',
            customRender:function (value) {
              if(value == 0){
                return "未审核";
              }else if(value == 1){
                return "审核未通过";
              }else{
                return "审核已通过";
              }
            }
          },
          {
            title: '账户姓名',
            align: "center",
            dataIndex: 'withdrawName'
          },
          {
            title: '提现二维码',
            align: "center",
            dataIndex: 'withdrawQrcode'
          },
          {
            title: '提现方式',
            align: "center",
            dataIndex: 'withdrawType',
            customRender:function (value) {
              if(value == 1){
                return "支付宝";
              }else{
                return "微信";
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
    methods: {}
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>