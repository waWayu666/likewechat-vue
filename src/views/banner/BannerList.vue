<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <!--<div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>-->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
<!--      <a-button type="primary" icon="download" @click="handleExportXls('轮播图')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete"/>-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
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
        @change="handleTableChange">

        <template slot="imgurllot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.imgUrl"/>
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
    <banner-modal ref="modalForm" @ok="modalFormOk"></banner-modal>
  </a-card>
</template>

<script>
    import BannerModal from './modules/BannerModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'

    export default {
        name: "BannerList",
        mixins: [JeecgListMixin],
        components: {
            BannerModal
        },
        data() {
            return {
                description: '轮播图管理页面',
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
                        title: '链接',
                        align: "center",
                        dataIndex: 'linkId'
                    },
                    {
                        title: '预览图',
                        align: "center",
                        dataIndex: 'imgUrl',
                        scopedSlots: {customRender: 'imgurllot'}
                    },
                    // {
                    //     title: '链接类型',
                    //     align: "center",
                    //     dataIndex: 'linkType',
                    //     customRender: function (t) {
                    //         if (t == 0) {
                    //             return "无连接";
                    //         } else if (t == 1) {
                    //             return "规则";
                    //         } else {
                    //             return "商品详情";
                    //         }
                    //     }
                    // },
                    // {
                    //     title: '链接地址',
                    //     align: "center",
                    //     dataIndex: 'link'
                    // },
                    /*{
                        title: '是否有用',
                        align: "center",
                        dataIndex: 'useFlag',
                        customRender: function (t) {
                            if (t == 0) {
                                return "不启用";
                            } else {
                                return "启用";
                            }
                        }
                    },*/
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
                    list: "/banner/banner/list",
                    delete: "/banner/banner/delete",
                    deleteBatch: "/banner/banner/deleteBatch",
                    exportXlsUrl: "banner/banner/exportXls",
                    importExcelUrl: "banner/banner/importExcel",
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
            getAvatarView: function (imgUrl) {
                return this.url.imgerver + "/" + imgUrl;
            },
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>