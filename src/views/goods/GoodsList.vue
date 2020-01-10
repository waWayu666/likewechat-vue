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

            <a-form-item label="请选择商品属性">
              <a-select v-model="queryParam.abc" placeholder="请选择商品属性">
                <a-select-option value="0">普通商品</a-select-option>
                <a-select-option value="1">寄拍商品</a-select-option>
              </a-select>
            </a-form-item>


          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="商品名称">
              <a-input placeholder="请输入商品名称" v-model="queryParam.goodsName"></a-input>
            </a-form-item>
            <a-form-item label="寄拍人">
              <a-input placeholder="请输入寄拍人名称" v-model="queryParam.nickname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="商品编号">
              <a-input placeholder="请输入商品编号" v-model="queryParam.goodsNum"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="10">
            <a-form-item label="注册时间">
              <a-range-picker
                style="width: 210px"
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="onDateChange"
              />
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
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

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

          <a-divider type="vertical"/>
<!--           <a-button type="primary" @click="showDrawer">竞拍记</a-button>-->
           <a @click="showDrawer(record)">竞拍记录</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <goods-modal ref="modalForm" @ok="modalFormOk"></goods-modal>
<!--    抽屉-->
    <a-drawer
      title="竞拍记录"
      placement="right"
      :maskClosable="true"
      @close="onClose"
      width="960"
      :visible="visible"
    >
      <div>
        <a-table :columns="dateColumns" :dataSource="jingpaiList" bordered>
          <template slot="title" slot-scope="currentPageData">
            竞拍记录
          </template>
        </a-table>
      </div>
    </a-drawer>
  </a-card>
</template>

<script>
    import GoodsModal from './modules/GoodsModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'
    import { upOrDown,getAuctionrecod } from '@/api/api'

    export default {
        name: "GoodsList",
        mixins: [JeecgListMixin],
        components: {
            GoodsModal
        },
        data() {
            return {
                description: '商品表管理页面',
                visible:false, // 是否打开抽屉
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
                    title: '寄拍人',
                    align: "center",
                    dataIndex: 'nickname'
                  },

                    {
                        title: '起拍价',
                        align: "center",
                        dataIndex: 'startPrice'
                    },
                  {
                    title: '限低价',
                    align: "center",
                    dataIndex: 'minPrice'
                  },
                  {
                    title: '限高价',
                    align: "center",
                    dataIndex: 'evaluatePrice'
                  },
                  {
                    title: '预估价',
                    align: "center",
                    dataIndex: 'budgetPrice'
                  },
                  {
                    title: '成交价',
                    align: "center",
                    dataIndex: 'maxPrice'
                  },
                  {
                    title: '返还积分比例',
                    align: "center",
                    dataIndex: 'returnRatio'
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
                    /*{
                        title: '排序号',
                        align: "center",
                        dataIndex: 'sort'
                    },*/
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
            //    抽屉
                dateColumns:[{
                    title: 'id',
                    dataIndex: 'id',
                    width: 150,
                    key: 'id'
                },{
                    title: '竞拍人',
                    dataIndex: 'nickname',
                    width: 150,
                    key: 'nickname'
                },{
                    title: '出价',
                    dataIndex: 'auctionPrice',
                    width: 150,
                    key: 'auctionPrice'
                },{
                    title: '创建时间',
                    dataIndex: 'createTime',
                    width: 150,
                    key: 'createTime'
                }
                ],
                jingpaiList:[]
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
            onDateChange: function (dateString) {
                this.queryParam.startAuctionTime=dateString[0].format('YYYY-MM-DD HH:mm:ss');
                this.queryParam.endAuctionTime=dateString[1].format('YYYY-MM-DD HH:mm:ss');
            },
        //    打开抽屉
            showDrawer(info){
                console.log(info)
              this.visible = true;
                var params = this.getQueryParams();//查询条件
                params.goodsId = info.id;
                getAuctionrecod(params).then((res)=>{
                  this.jingpaiList = res.result.records;

              });

            },
            onClose(){
                this.visible = false
            }
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>