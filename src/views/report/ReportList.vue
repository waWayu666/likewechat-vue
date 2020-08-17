<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select placeholder="请选择" v-model="queryParam.is_handle">
                <a-select-option value="1">已处理</a-select-option>
                <a-select-option value="0">待处理</a-select-option>
              </a-select>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleLook(record)">查看</a>

          <a-divider type="vertical"/>

          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>

          <template v-if="record.isHandle===0">
             <br/>
             <a @click="handle(record,record.isHandle)">处理意见</a>
          </template>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <Report-modal ref="modalForm" @ok="modalFormOk"></Report-modal>
  </a-card>
</template>

<script>
import ReportModal from './modules/ReportModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import hasPermission from '@/utils/hasPermission'

export default {
  name: "ReportList",
  mixins: [JeecgListMixin],
  components: {
    ReportModal
  },
  data() {
    return {
      description: '知识产权投诉表管理页面',
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '投诉时间',
          align: "center",
          dataIndex: 'createTime'
        },
        {
          title: '投诉人',
          align: "center",
          dataIndex: 'nickname'
        },
        {
          title: '人/群类型',
          align: "center",
          dataIndex: 'targetType',
          customRender: function (t, r, index) {
            switch (t) {
              case 1:
                return "人";
              case 2:
                return "群";
            }
          }
        },
        {
          title: '人/群名称',
          align: "center",
          dataIndex: 'targetName'
        },
        {
          title: '举报类型',
          align: "center",
          dataIndex: 'reportType'
        },
        {
          //处理状态
          title: '处理状态',
          align: "center",
          dataIndex: 'isHandle',
          customRender: function (t, r, index) {
            switch (t) {
              case 0:
                return "待处理";
              case 1:
                return "已处理";
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
        list: "/report/report/list",
        delete: "/report/report/delete",
      },
    }
  },
  computed: {},
  methods: {
    handleLook(record) {
      this.$refs.modalForm.edit(record, 0);
      this.$refs.modalForm.title = "查看";
    },
    handle(record, type) {
      this.$refs.modalForm.edit(record, type);
      this.$refs.modalForm.title = "处理";
    },
    checkFilterGlobalPermission(e) {
      return hasPermission.checkFilterGlobalPermission(e);
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>