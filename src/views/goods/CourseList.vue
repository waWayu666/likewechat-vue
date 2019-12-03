<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="商品/课程编号">-->
<!--              <a-input placeholder="请输入商品/课程编号" v-model="queryParam.goodsCode"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="课程名称">
              <a-input placeholder="请输入课程名称" v-model="queryParam.goodsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>、
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('课程')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
    <course-modal ref="modalForm" @ok="modalFormOk"></course-modal>
  </a-card>
</template>

<script>
  import CourseModal from './modules/CourseModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import store from '@/store/'

  export default {
    name: "CourseList",
    mixins: [JeecgListMixin],
    components: {
      CourseModal
    },
    data() {
      return {
        description: '课程管理页面',
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
          // {
          //   title: '商品/课程编号',
          //   align: "center",
          //   dataIndex: 'goodsCode'
          // },
          {
            title: '课程名称',
            align: "center",
            dataIndex: 'goodsName'
          },
          {
            title: '分类名称',
            align: "center",
            dataIndex: 'categoryId'
          },
          {
            title: '市场价',
            align: "center",
            dataIndex: 'marketPrice'
          },
          {
            title: '原价格',
            align: "center",
            dataIndex: 'price'
          },
          {
            title: '点击数量',
            align: "center",
            dataIndex: 'clicks'
          },
          {
            title: '销售数量',
            align: "center",
            dataIndex: 'sales'
          },
          {
            title: '收藏数量',
            align: "center",
            dataIndex: 'collects'
          },
          {
            title: '好评星级',
            align: "center",
            dataIndex: 'star'
          },
          {
            title: '评价数',
            align: "center",
            dataIndex: 'evaluates'
          },
          {
            title: '分享数',
            align: "center",
            dataIndex: 'shares'
          },
          {
            title: '是否试看',
            align: "center",
            dataIndex: 'isTemporary',
            customRender:function (text) {
              if(text==0){
                return "否";
              }else if(text==1){
                return "是";
              }
            }
          },
          {
            title: '是否热销商品',
            align: "center",
            dataIndex: 'isHot',
            customRender:function (text) {
              if(text==0){
                return "是";
              }else if(text==1){
                return "否";
              }
            }
          },
          {
            title: '是否推荐',
            align: "center",
            dataIndex: 'isRecommend',
            customRender:function (text) {
              if(text==0){
                return "是";
              }else if(text==1){
                return "否";
              }
            }
          },
          {
            title: '是否新品',
            align: "center",
            dataIndex: 'isNew',
            customRender:function (text) {
              if(text==0){
                return "是";
              }else if(text==1){
                return "否";
              }
            }
          },
          {
            title: '商品状态',
            align: "center",
            dataIndex: 'state',
            customRender:function (text) {
              if(text==0){
                return "下架";
              }else if(text==1){
                return "上架";
              }
            }
          },
          {
            title: '排序',
            align: "center",
            dataIndex: 'sort'
          },
          {
            title: '销量',
            align: "center",
            dataIndex: 'realSales'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/goods/goods/list",
          delete: "/goods/goods/delete",
          deleteBatch: "/goods/goods/deleteBatch",
          exportXlsUrl: "goods/goods/exportXls",
          importExcelUrl: "goods/goods/importExcel",
        },
        queryParam:{
          goodsType: '2',
        }
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