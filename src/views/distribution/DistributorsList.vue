<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="真实姓名">
              <a-input placeholder="请输入真实姓名" v-model="queryParam.realname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="用户昵称">
              <a-input placeholder="请输入用户昵称" v-model="queryParam.nickname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
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
<!--      <a-button type="primary" icon="download" @click="handleExportXls('普通用户')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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
    <distributors-modal ref="modalForm" @ok="modalFormOk"></distributors-modal>
  </a-card>
</template>

<script>
  import DistributorsModal from './modules/DistributorsModal__Style#Drawer'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DistributorsList",
    mixins:[JeecgListMixin],
    components: {
      DistributorsModal,
      UserModal
    },
    data () {
      return {
        description: '普通用户管理页面',
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
            title: '真实姓名',
            align:"center",
            dataIndex: 'realname'
           },
		   {
            title: '用户昵称',
            align:"center",
            dataIndex: 'nickname'
           },
		   {
            title: '邮箱',
            align:"center",
            dataIndex: 'email'
           },
		   {
            title: '手机号',
            align:"center",
            dataIndex: 'mobile'
           },
		   {
            title: '头像',
            align:"center",
            dataIndex: 'avatar'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'sex',
           customRender:function (text) {
             if(text==0){
               return "男";
             }else if(text==1){
               return "女";
             }else {
               return "未知";
             }
           }
           },
		   {
            title: '生日',
            align:"center",
            dataIndex: 'birthday'
           },
		   {
            title: '积分',
            align:"center",
            dataIndex: 'score'
           },
		   {
            title: '角色名称',
            align:"center",
            dataIndex: 'roleName'
           },
		   {
            title: 'VIP',
            align:"center",
            dataIndex: 'isVip',
             customRender:function (text) {
               if(text==0){
                 return "否";
               }else if(text==1){
                 return "是";
               }
             }
           },
		   {
            title: '分销商',
            align:"center",
            dataIndex: 'isDistribut',
             customRender:function (text) {
               if(text==0){
                 return "否";
               }else if(text==1){
                 return "是";
               }
             }
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'organization'
           },
/*
		   {
            title: '状态(1：正常  2：冻结 ）',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '删除状态  0/已删除1/正常',
            align:"center",
            dataIndex: 'delFlag'
           },
*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/user/user/list",
          delete: "/user/user/delete",
          deleteBatch: "/user/user/deleteBatch",
          exportXlsUrl: "user/user/exportXls",
          importExcelUrl: "user/user/importExcel",
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