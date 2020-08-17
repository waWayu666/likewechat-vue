<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="手机号">
              <a-input placeholder="请输入手机号" v-model="queryParam.userId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="类型">
              <a-select placeholder="请选择类型" v-model="queryParam.billType">
                <a-select-option value="0">佣金增加</a-select-option>
                <a-select-option value="1">充值</a-select-option>
                <a-select-option value="2">保证金解冻</a-select-option>
                <a-select-option value="3">支付</a-select-option>
                <a-select-option value="4">提现</a-select-option>
                <a-select-option value="5">保证金冻结</a-select-option>
                <a-select-option value="6">保证金扣除</a-select-option>
                <a-select-option value="7">订单过期扣除保证金</a-select-option>
                <a-select-option value="8">寄卖所得</a-select-option>
                <a-select-option value="10">粉丝返佣</a-select-option>
                <a-select-option value="11">团队返佣</a-select-option>
                <a-select-option value="12">平台回购</a-select-option>
              </a-select>
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
    <div class="table-operator">
    </div>

    <!-- table区域-begin -->
    <div>

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
    <bill-modal ref="modalForm" @ok="modalFormOk"></bill-modal>
  </a-card>
</template>

<script>
  import BillModal from './modules/BillModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "BillList",
    mixins:[JeecgListMixin],
    components: {
      BillModal
    },
    data () {
      return {
        description: '账单管理页面',
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
            title: '手机号',
            align:"center",
            dataIndex: 'userId'
           },
          {
            title: '昵称',
            align:"center",
            dataIndex: 'createBy'
          },
		   {
            title: '类型',
            align:"center",
            dataIndex: 'billType',
         customRender:function (value) {
           if(value == 0){
             return "佣金增加";
           }else if(value == 1){
             return "充值";
           }else if(value == 2){
             return "保证金解冻";
           } else if(value == 3){
             return "支付";
           }else if(value == 4){
             return "提现";
           }else if(value == 5){
             return "保证金冻结";
           }else if(value == 6){
             return "保证金扣除";
           }else if(value == 7){
             return "订单过期扣除保证金";
           }else if(value == 8){
             return "寄卖所得";
           }else if(value == 9){
             return "新人2元礼";
           }else if(value == 10){
             return "粉丝返佣";
           }else if(value == 11){
             return "团队返佣";
           }else if(value == 12){
             return "平台回购";
           }
         }
           },
		   {
            title: '变化前金额',
            align:"center",
            dataIndex: 'beforeMoney'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'changeMoney'
           },
          {
            title: '时间',
            align:"center",
            dataIndex: 'createTime'
          },
          {
            title: '对应拍品',
            dataIndex: 'goodsId',
            key: 'goodsId'
          }
        ],
		url: {
          list: "/bill/bill/list",
          delete: "/bill/bill/delete",
          deleteBatch: "/bill/bill/deleteBatch",
          exportXlsUrl: "bill/bill/exportXls",
          importExcelUrl: "bill/bill/importExcel",
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