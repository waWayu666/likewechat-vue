<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="课程id">
              <a-input placeholder="请输入课程id" v-model="queryParam.curriculumId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="试题类型1:单选2:多选">
              <a-input placeholder="请输入试题类型1:单选2:多选" v-model="queryParam.type"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
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
    <curriculumQuestion-modal ref="modalForm" @ok="modalFormOk"></curriculumQuestion-modal>
  </a-card>
</template>

<script>
  import CurriculumQuestionModal from './modules/CurriculumQuestionModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'

  export default {
    name: "CurriculumQuestionList",
    mixins: [JeecgListMixin],
    components: {
      CurriculumQuestionModal
    },
    data() {
      return {
        description: '试题管理页面',
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
            title: '课程id',
            align: "center",
            dataIndex: 'curriculumId'
          },
          // {
          //   title: '目录ID',
          //   align: "center",
          //   dataIndex: 'directoryId'
          // },
          {
            title: '试题类型',
            align: "center",
            dataIndex: 'type',
            customRender:function (text) {
                if(text==1){
                    return "单选";
                }else if(text==1){
                    return "多选";
                }
            }
          },
          {
            title: '试题内容',
            align: "center",
            dataIndex: 'content'
          },
          {
            title: '选项A',
            align: "center",
            dataIndex: 'optionsA'
          },
          {
            title: '选项B',
            align: "center",
            dataIndex: 'optionsB'
          },
          {
            title: '选项C',
            align: "center",
            dataIndex: 'optionsC'
          },
          {
            title: '选项D',
            align: "center",
            dataIndex: 'optionsD'
          },
          {
            title: '答案',
            align: "center",
            dataIndex: 'answer'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/curriculum/curriculumQuestion/list",
          delete: "/curriculum/curriculumQuestion/delete",
          deleteBatch: "/curriculum/curriculumQuestion/deleteBatch",
          exportXlsUrl: "curriculum/curriculumQuestion/exportXls",
          importExcelUrl: "curriculum/curriculumQuestion/importExcel",
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