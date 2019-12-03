<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="幼儿园名称">
              <a-input placeholder="请输入幼儿园名称" v-model="queryParam.preschoolName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="主账号号码">
              <a-input placeholder="请输入主账号号码" v-model="queryParam.mobile"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
        filterMultiple="filterMultiple"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:type}"
        @change="handleTableChange"
        :customRow="clickThenCheck">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <span v-if="record.status!==0">
            <a-divider type="vertical" />
            <a v-if="record.status==1" @click="checkPreschool(record.id)">审核</a>
            <b v-else-if="record.status==2 ">已通过</b>
            <b v-else="record.orderStatus==3">已拒绝</b>
          </span>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <!-- <a-menu-item>
                <a @click="handleEdit(record)">审核</a>
              </a-menu-item>-->
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
             <a-menu slot="overlay">

            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="合作园成员信息" key="1">
        <preschool-member-list ref="PreschoolMemberList"></preschool-member-list>
      </a-tab-pane>
    </a-tabs>

    <!-- 表单区域 -->
    <preschool-modal ref="modalForm" @ok="modalFormOk"></preschool-modal>

    <check-preschool-modal ref="checkPreschoolModal"></check-preschool-modal>
  </a-card>
</template>

<script>
  import PreschoolModal from './modules/PreschoolModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import PreschoolMemberList from './PreschoolMemberList'
  import PreschoolMemberModal from './modules/PreschoolMemberModal'
  import CheckPreschoolModal from './modules/CheckPreschoolModal'
  import {checkPreschoolApply} from '@/api/api'

  export default {
    name: "PreschoolList",
    mixins: [JeecgListMixin],
    components: {
      PreschoolModal,
      PreschoolMemberList,
      PreschoolMemberModal,
      CheckPreschoolModal,
    },
    data() {
      return {
        description: '合作园表管理页面',

        // 分页参数
        type: "radio",
        /* 分页参数 */
        ipagination:{
          current: 1,
          pageSize: 5,
          pageSizeOptions: ['5', '10', '20'],
          /*showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },*/
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
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
            title: '幼儿园名称',
            align: "center",
            dataIndex: 'preschoolName'
          },
          {
            title: '园长昵称',
            align: "center",
            dataIndex: 'realname'
          },
          {
            title: '主账号号码',
            align: "center",
            dataIndex: 'mobile'
          },
          {
            title: '人数',
            align: "center",
            dataIndex: 'peopleNumber'
          },
          {
            title: '省份名称',
            align: "center",
            dataIndex: 'areapName'
          },
          {
            title: '市区名称',
            align: "center",
            dataIndex: 'areacName'
          },
          {
            title: '县（区）名称',
            align: "center",
            dataIndex: 'areaxName'
          },
          {
            title: '申请时间',
            align: "center",
            dataIndex: 'applyTime'
          },
          /*{
            title: '状态',
            align: "center",
            dataIndex: 'status',
            customRender: function (text) {
              if (text == 1) {
                return "待处理";
              } else if (text == 2) {
                return "通过";
              } else {
                return "拒绝";
              }
            }
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/preschool/preschool/list",
          delete: "/preschool/preschool/delete",
          deleteBatch: "/preschool/preschool/deleteBatch",
          exportXlsUrl: "preschool/preschool/exportXls",
          importExcelUrl: "preschool/preschool/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      clickThenCheck(record) {
        return {
          on: {
            click: () => {
              this.onSelectChange(record.id.split(","), [record]);
            }
          }
        };
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        console.log(selectedRowKeys)
        console.log(selectionRows)
        console.log()
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
        this.$refs.PreschoolMemberList.getOrderMain(this.selectedRowKeys[0],this.queryParam.mobile);
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.$refs.PreschoolMemberList.queryParam.mainId = null;
        this.$refs.PreschoolMemberList.loadData();
        this.$refs.PreschoolMemberList.selectedRowKeys = [];
        this.$refs.PreschoolMemberList.selectionRows = [];
      },
      handleDelete: function (id) {
        var that = this;
        deleteAction(that.url.delete, {id: id}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
            this.$refs.PreschoolMemberList.loadData();
            this.$refs.PreschoolMemberList.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      searchQuery:function(){
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.$refs.PreschoolMemberList.queryParam.mainId = null;
        this.$refs.PreschoolMemberList.loadData();
        this.$refs.PreschoolMemberList.selectedRowKeys = [];
        this.$refs.PreschoolMemberList.selectionRows = [];
        this.loadData();
      },
      /**
       * 审核创建合作园申请
       * @param id
       */
      checkPreschool(id){
        // alert(id)
        console.log(id)
        checkPreschoolApply(id,null).then((res)=>{
          console.log(res.result);
          if(res.success){
            this.$refs.checkPreschoolModal.initial(res.result);
            this.$refs.checkPreschoolModal.show();
          }else {
            this.$message.warning(res.message);
          }
        });

        this.$refs.CheckPreschoolModal.show();
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
  @import '~@assets/less/color.less'
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-btn-danger {
    background-color: #ffffff
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }
</style>