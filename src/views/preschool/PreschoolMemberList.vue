<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="合作园id">
              <a-input placeholder="请输入合作园id" v-model="queryParam.preschoolId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="主账号号码">
              <a-input placeholder="请输入主账号号码" v-model="queryParam.userMobile"></a-input>
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
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>-->
          <!--<span v-if="record.status!==0">-->
            <!--<a-divider type="vertical" />-->
            <!--<a v-if="record.status==1" @click="handleEdit(record)">审核</a>
            <b v-else-if="record.status==2 ">已通过</b>
            <b v-else="record.orderStatus==3">已拒绝</b>-->
          <!--</span>-->
          <!--<a-divider type="vertical"/>-->
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
    <preschoolMember-modal ref="modalForm" @ok="modalFormOk"></preschoolMember-modal>
  </a-card>
</template>

<script>
  import PreschoolMemberModal from './modules/PreschoolMemberModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {getAction} from '@/api/manage'

  export default {
    name: "PreschoolMemberList",
    mixins: [JeecgListMixin],
    components: {
      PreschoolMemberModal
    },
    data() {
      return {
        description: '合作园成员表管理页面',
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
            title: '合作园id',
            align: "center",
            dataIndex: 'preschoolId'
          },*/
          {
            title: '主账号号码',
            align: "center",
            dataIndex: 'userMobile'
          },
          {
            title: '成员手机号',
            align: "center",
            dataIndex: 'memberMobile'
          },
          {
            title: '成员昵称',
            align: "center",
            dataIndex: 'memberName'
          },
          {
            title: '头像',
            align: "center",
            dataIndex: 'avatar'
          },
          {
            title: '申请时间',
            align: "center",
            dataIndex: 'applyTime'
          },
          {
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
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          // list: "/preschool/preschoolMember/list",
          list: "/preschool/preschool/listPreschoolMemberByMainId",
          delete: "/preschool/preschoolMember/delete",
          deleteBatch: "/preschool/preschoolMember/deleteBatch",
          exportXlsUrl: "preschool/preschoolMember/exportXls",
          importExcelUrl: "preschool/preschoolMember/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
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
      getOrderMain(preschoolId,userMobile) {
        this.queryParam.mainId = preschoolId;
        this.queryParam.userMobile=userMobile;
        this.loadData(1);
      },
      handleAdd: function () {
        this.$refs.modalForm.add(this.queryParam.mainId,this.queryParam.mobile);
        this.$refs.modalForm.title = "添加成员信息";
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>