<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="商品名称">
              <a-input placeholder="请输入商品名称" v-model="queryParam.goodsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="商品编号">
              <a-input placeholder="请输入商品编号" v-model="queryParam.goodsNum"></a-input>
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

        <template slot="imgurllot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.mianImage"/>
          </div>
        </template>

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
    <scoreGoods-modal ref="modalForm" @ok="modalFormOk"></scoreGoods-modal>
  </a-card>
</template>

<script>
    import ScoreGoodsModal from './modules/ScoreGoodsModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'

    export default {
        name: "ScoreGoodsList",
        mixins: [JeecgListMixin],
        components: {
            ScoreGoodsModal
        },
        data() {
            return {
                description: '积分商品管理页面',
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
                        title: '商品名称',
                        align: "center",
                        dataIndex: 'goodsName'
                    },
                    {
                        title: '商品编号',
                        align: "center",
                        dataIndex: 'goodsNum'
                    },
                    {
                        title: '积分商品市场价',
                        align: "center",
                        dataIndex: 'price'
                    },
                    {
                        title: '现金比例',
                        align: "center",
                        dataIndex: 'moneyRatio'
                    },
                    {
                        title: '积分商品所需积分',
                        align: "center",
                        dataIndex: 'score'
                    },
                    {
                        title: '排序号',
                        align: "center",
                        dataIndex: 'sort'
                    },
                    {
                        title: '商品主图',
                        align: "center",
                        dataIndex: 'mianImage',
                        scopedSlots: {customRender: 'imgurllot'}
                    },
                    {
                        title: '状态',
                        align: "center",
                        dataIndex: 'status',
                        customRender: function (t) {
                            if (t == 0) {
                                return "下架";
                            } else {
                                return "上架";
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
                    list: "/goods/scoreGoods/list",
                    delete: "/goods/scoreGoods/delete",
                    deleteBatch: "/goods/scoreGoods/deleteBatch",
                    exportXlsUrl: "goods/scoreGoods/exportXls",
                    importExcelUrl: "goods/scoreGoods/importExcel",
                    imgerver: window._CONFIG['imgDomainURL'],
                },
            }
        },
        computed: {
            importExcelUrl: function () {
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
            }
        },
        methods: {
            getAvatarView: function (mianImage) {
                return this.url.imgerver + "/" + mianImage;
            }
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>