<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="目录名称">
              <a-input placeholder="请输入目录名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="课程">
              <a-select v-model="queryParam.curriculumId"
                        placeholder="请选择课程"
                        allowClear
                        @change="handleCurriculumChange">
                <a-select-option v-for="(course,index) in courseList" :key="index.toString()"
                                 :value="course.id">
                  {{course.goodsName}}
                </a-select-option>
              </a-select>
              <!--<a-input placeholder="请选择课程" v-model="queryParam.curriculumId"></a-input>-->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="父级目录">
              <a-select v-model="queryParam.pid"
                        placeholder="请选择父级目录"
                        allowClear>
                <a-select-option v-for="(curriculum,index) in curriculumList" :key="index.toString()"
                                 :value="curriculum.id">
                  {{curriculum.name}}
                </a-select-option>
              </a-select>
              <!--<a-input placeholder="请选择父级目录" v-model="queryParam.pid"></a-input>-->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="目录级别">
              <a-select v-model="queryParam.level" placeholder="请选择目录级别" allowClear>
                <a-select-option value="1">一级目录</a-select-option>
                <a-select-option value="2">二级目录</a-select-option>
              </a-select>
              <!--<a-input placeholder="请输入等级" v-model="queryParam.level"></a-input>-->
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <!--<a-col :md="6" :sm="8">
              <a-form-item label="课程链接">
                <a-input placeholder="请输入课程链接" v-model="queryParam.link"></a-input>
              </a-form-item>
            </a-col>-->
          </template>
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
      <!--<a-button type="primary" icon="download" @click="handleExportXls('课程目录')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
        @change="handleTableChange"
        style="word-break: break-all;">

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
    <curriculumDirectory-modal ref="modalForm" @ok="modalFormOk"></curriculumDirectory-modal>
  </a-card>
</template>

<script>
  import CurriculumDirectoryModal from './modules/CurriculumDirectoryModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {getCurriculumList, getCourseList} from "@/api/api"

  export default {
    name: "CurriculumDirectoryList",
    mixins: [JeecgListMixin],
    components: {
      CurriculumDirectoryModal
    },
    data() {
      return {
        description: '课程目录管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 40,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '目录名称',
            align: "center",
            dataIndex: 'name'
          },
          {
            title: '父级目录',
            align: "center",
            dataIndex: 'pid_dictText'
          },
          {
            title: '课程名称',
            align: "center",
            dataIndex: 'curriculumId_dictText'
          },
          {
            title: '等级',
            align: "center",
            dataIndex: 'level'
          },
          {
            title: '课程链接',
            align: "center",
            width: 400,
            dataIndex: 'link'
          },
          {
            title: '是否试看',
            align: "center",
            dataIndex: 'isTemporary',
            customRender: function (t) {
              if (t == 0) {
                return "否";
              } else if (t == 1) {
                return "是";
              }
            }
          },
          {
            title: '试看链接',
            align: "center",
            width: 400,
            dataIndex: 'temporaryLink'
          },
          {
            title: '排序',
            align: "center",
            dataIndex: 'sort'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        curriculumList: [],
        curriculum: {},
        courseList: [],
        course: {},
        url: {
          list: "/curriculum/curriculumDirectory/list",
          delete: "/curriculum/curriculumDirectory/delete",
          deleteBatch: "/curriculum/curriculumDirectory/deleteBatch",
          exportXlsUrl: "curriculum/curriculumDirectory/exportXls",
          importExcelUrl: "curriculum/curriculumDirectory/importExcel",
        },
      }
    },
    created(){
      //this.queryCurriculumList();
      this.queryCourseList();
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      queryCurriculumList() {
        getCurriculumList().then((res) => {
          console.log(res.result);
          if (res.success) {
            this.curriculumList = res.result;
          }
        })
      },
      queryCourseList() {
        getCourseList().then((res) => {
          console.log(res.result);
          if (res.success) {
            this.courseList = res.result;
          }
        })
      },
      handleCurriculumChange(value){
        getCurriculumList({id : value.toString()}).then((res) => {
          console.log(res.result);
          if (res.success) {
            this.curriculumList = res.result;
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>