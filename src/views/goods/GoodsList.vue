<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="请选择竞价状态">
              <a-select v-model="queryParam.finishFlag" placeholder="请选择竞价状态">
                <a-select-option value="0">竞拍未开始</a-select-option>
                <a-select-option value="1">进行中</a-select-option>
                <a-select-option value="2">竞拍已完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
            <img :src="record.mainImage"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>

          <a-popconfirm title="确定上下架吗?" @confirm="() => upOrDownGoods(record.id)">
            <a v-if="record.status == 0">上架</a>
            <a v-else-if="record.status == 1">下架</a>
          </a-popconfirm>
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <goods-modal ref="modalForm" @ok="modalFormOk"></goods-modal>
  </a-card>
</template>

<script>
    import GoodsModal from './modules/GoodsModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'
    import { upOrDown } from '@/api/api'

    export default {
        name: "GoodsList",
        mixins: [JeecgListMixin],
        components: {
            GoodsModal
        },
        data() {
            return {
                description: '商品表管理页面',
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
                        title: '竞价状态',
                        align: "center",
                        dataIndex: 'finishFlag',
                        customRender: function (t) {
                            if (t == 0) {
                                return "竞拍未开始";
                            } else if (t == 1) {
                                return "进行中";
                            } else {
                                return "竞拍已完成";
                            }
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
                        title: '起拍价',
                        align: "center",
                        dataIndex: 'startPrice'
                    },
                    {
                        title: '预估价',
                        align: "center",
                        dataIndex: 'evaluatePrice'
                    },
                  {
                    title: '限价',
                    align: "center",
                    dataIndex: 'minPrice'
                  },
                    {
                        title: '最高价',
                        align: "center",
                        dataIndex: 'maxPrice'
                    },
                    {
                        title: '顶一手价格',
                        align: "center",
                        dataIndex: 'addPrice'
                    },
                    {
                        title: '佣金',
                        align: "center",
                        dataIndex: 'commissionPrice'
                    },
                    {
                        title: '分类',
                        align: "center",
                        dataIndex: 'categoryId_dictText',
                    },
                    {
                        title: '排序号',
                        align: "center",
                        dataIndex: 'sort'
                    },
                    {
                        title: '商品主图',
                        align: "center",
                        dataIndex: 'mainImage',
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
                        title: '成交价格',
                        align: "center",
                        dataIndex: 'dealPrice'
                    },
                    {
                        title: '拍卖次数',
                        align: "center",
                        dataIndex: 'auctionCount'
                    },
                    {
                        title: '开拍时间',
                        align: "center",
                        dataIndex: 'startTime'
                    },
                    {
                        title: '结束时间',
                        align: "center",
                        dataIndex: 'endTime'
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
            getAvatarView: function (mainImage) {
                return this.url.imgerver + "/" + mainImage;
            },
            //上下架商品
            upOrDownGoods(id){
                console.log(id)
                upOrDown(id,null).then((res)=>{
                    console.log(res.result);
                    if(res.success){
                        this.$message.success(res.message);
                    }else {
                        this.$message.warning(res.message);
                    }
                    this.loadData();
                });
            },
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>