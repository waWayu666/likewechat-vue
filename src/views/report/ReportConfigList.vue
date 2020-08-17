<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="筛选">-->
<!--              <a-input placeholder="请选择" v-model="queryParam.configName"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-col :md="6" :sm="8">
            <a-form-item label="人/群">
              <a-select placeholder="人/群" v-model="queryParam.configName">
                <a-select-option value="1">人</a-select-option>
                <a-select-option value="2">群</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="分组">-->
<!--              <a-input placeholder="请输入分组" v-model="queryParam.configGroup"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="变量标题">-->
<!--              <a-input placeholder="请输入变量标题" v-model="queryParam.title"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <!--<template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="变量标题">
                <a-input placeholder="请输入变量标题" v-model="queryParam.title"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="描述">
                <a-input placeholder="请输入描述" v-model="queryParam.description"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="类型:string,text,int,bool,array,datetime,date,file">
                <a-input placeholder="请输入类型:string,text,int,bool,array,datetime,date,file"
                         v-model="queryParam.configType"></a-input>
              </a-form-item>
            </a-col>
          </template>-->
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
<!--      <a-button type="primary" icon="download" @click="handleExportXls('系统配置')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
      </a-dropdown>
    </div>

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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ReportConfig-modal ref="modalForm" @ok="modalFormOk"></ReportConfig-modal>
  </a-card>
</template>

<script>
  import ReportConfigModal from './modules/ReportConfigModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    name: "SystemConfigList",
    mixins: [JeecgListMixin],
    components: {
      ReportConfigModal
    },
    data() {
      return {
        description: '举报类型管理页面',
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
            title: '人/群',
            align: "center",
            dataIndex: 'configName',
            customRender: function (text) {
              if (text == 1) {
                return '人';
              } else {
                return "群";
              }
            }
          },
          // {
          //   title: '分组',
          //   align: "center",
          //   dataIndex: 'configGroup'
          // },
          // {
          //   title: '变量标题',
          //   align: "center",
          //   dataIndex: 'title'
          // },
          // {
          //   title: '描述',
          //   align: "center",
          //   dataIndex: 'description'
          // },
          /*{
            title: '类型:string,text,int,bool,array,datetime,date,file',
            align: "center",
            dataIndex: 'configType'
          },*/
          {
            title: '举报类型',
            align: "center",
            dataIndex: 'configValue'
          },
          /*{
            title: '变量字典数据',
            align: "center",
            dataIndex: 'content'
          },
          {
            title: '验证规则',
            align: "center",
            dataIndex: 'rule'
          },
          {
            title: '拓展属性',
            align: "center",
            dataIndex: 'extend'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/systemconfig/systemConfig/list",
          delete: "/systemconfig/systemConfig/delete",
          deleteBatch: "/systemconfig/systemConfig/deleteBatch",
          exportXlsUrl: "systemconfig/systemConfig/exportXls",
          importExcelUrl: "systemconfig/systemConfig/importExcel",
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