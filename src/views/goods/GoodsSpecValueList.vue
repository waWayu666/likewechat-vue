<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="商品属性值名称">
              <a-input placeholder="请输入商品属性值名称" v-model="queryParam.specValueName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">
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
      <!--      <a-button type="primary" icon="download" @click="handleExportXls('商品规格值')">导出</a-button>
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
    <goodsSpecValue-modal ref="modalForm" @ok="modalFormOk"></goodsSpecValue-modal>
  </a-card>
</template>

<script>
  import GoodsSpecValueModal from './modules/GoodsSpecValueModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {goodsSpecList} from '@/api/api'

  var ListGoodsSpec = new Array();
  getAddress();
  function getAddress() {
    goodsSpecList().then((res)=>{
      console.log(res);
      if(res.code == 1) {
        ListGoodsSpec = res.data;
        console.log(ListGoodsSpec);
      } else {
        console.log("ERROR")
      }
    })
  }

  export default {
    name: "GoodsSpecValueList",
    mixins: [JeecgListMixin],
    components: {
      GoodsSpecValueModal
    },
    data() {
      return {
        description: '商品规格值管理页面',
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
            title: '商品规格',
            align: "center",
            dataIndex: 'specId',
            customRender:function (t) {
              for ( var i = 0; i < ListGoodsSpec.length; i++) {
                if (ListGoodsSpec[i].id == t) {
                  return ListGoodsSpec[i].specName;
                }
              }
            }
          },
          {
            title: '商品属性值名称',
            align: "center",
            dataIndex: 'specValueName'
          },
          {
            title: '是否可视',
            align: "center",
            dataIndex: 'isVisible',
            customRender:function (text) {
              if(text==0){
                return "否";
              }else if(text==1){
                return "是";
              }else{
                return text;
              }
            }
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
        url: {
          list: "/goods/goodsSpecValue/list",
          delete: "/goods/goodsSpecValue/delete",
          deleteBatch: "/goods/goodsSpecValue/deleteBatch",
          exportXlsUrl: "goods/goodsSpecValue/exportXls",
          importExcelUrl: "goods/goodsSpecValue/importExcel",
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