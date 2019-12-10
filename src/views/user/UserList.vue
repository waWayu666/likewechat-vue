<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="昵称">
              <a-input placeholder="请输入昵称" v-model="queryParam.nickname"></a-input>
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
<!--      <a-button type="primary" icon="download" @click="handleExportXls('用户')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
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

        <template slot="imgurllot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.avatar"/>
          </div>
        </template>

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
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
  </a-card>
</template>

<script>
  import UserModal from './modules/UserModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "UserList",
    mixins:[JeecgListMixin],
    components: {
      UserModal
    },
    data () {
      return {
        description: '用户管理页面',
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
            title: '昵称',
            align:"center",
            dataIndex: 'nickname'
          },
          {
            title: '真实姓名',
            align:"center",
            dataIndex: 'realname'
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'age'
          },
          {
            title: '手机号',
            align:"center",
            dataIndex: 'mobile'
          },
          {
            title: '头像',
            align:"center",
            dataIndex: 'avatar',
            scopedSlots: {customRender: 'imgurllot'}
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'sex_dictText'
          },
          {
            title: '余额',
            align:"center",
            dataIndex: 'money'
          },
          {
            title: '冻结金额',
            align:"center",
            dataIndex: 'freezeMoney'
          },
          {
            title: '佣金',
            align:"center",
            dataIndex: 'commissionMoney'
          },
          {
            title: '积分',
            align:"center",
            dataIndex: 'score'
          },
          {
            title: '状态',
            align:"center",
            dataIndex: 'status',
            customRender: function (t) {
                if (t == 1) {
                    return "正常";
                } else if (t == 2) {
                    return "冻结";
                }
            }
          },
          {
            title: '推广人',
            align:"center",
            dataIndex: 'extendId_dictText'
          },
          {
            title: '邀请码',
            align:"center",
            dataIndex: 'inviterNum'
          },
          {
            title: '已经邀请人数',
            align:"center",
            dataIndex: 'inviterCount'
          },
          {
            title: '注册时间',
            align:"center",
            dataIndex: 'registerTime'
          },
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
          imgerver: window._CONFIG['imgDomainURL'],
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
        getAvatarView: function (imgUrl) {
            return this.url.imgerver + "/" + avatar;
        }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>