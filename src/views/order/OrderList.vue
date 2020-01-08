<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="订单编号">
              <a-input placeholder="请输入订单编号" v-model="queryParam.orderNum"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="订单状态">
              <a-select placeholder="请选择订单状态" v-model="queryParam.orderStatus">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">流拍</a-select-option>
                <a-select-option value="1">待付款</a-select-option>
                <a-select-option value="2">待发货</a-select-option>
                <a-select-option value="3">待签收</a-select-option>
                <a-select-option value="4">已完成</a-select-option>
                <a-select-option value="5">寄拍已支付</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--<a-col :md="6" :sm="8">
            <a-form-item label="订单来源">
              <a-input placeholder="请输入订单来源" v-model="queryParam.orderFrom"></a-input>
            </a-form-item>
          </a-col>-->
            <a-col :md="6" :sm="8">
              <a-form-item label="买家会员名称">
                <a-input placeholder="请输入买家会员名称" v-model="queryParam.nickname"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="请选择商品类型">
                <a-select v-model="queryParam.orderType" placeholder="请选择商品类型">
                  <a-select-option value="1">竞拍商品</a-select-option>
                  <a-select-option value="2">积分商品</a-select-option>
                </a-select>
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
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
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
            <a @click="handleEdit(record)">详情</a>
          <span v-if="record.orderStatus ==2">
            <a-divider type="vertical" />
            <a v-if="record.orderStatus==1 || record.orderStatus==2" @click="getExpressNo(record)">发货</a>
                      <!--<a v-else-if="record.orderStatus===3 || record.orderStatus===4 || record.orderStatus===5" @click="showLogistics(record.id)">已发货</a>-->
            <a v-else-if="record.orderStatus==3 || record.orderStatus==4 || record.orderStatus==5"><b>已发货</b></a>
            <a v-else-if="record.orderStatus==6 ">已关闭</a>
          </span>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <div style="width: 500px">
      <a-modal
        title="物流公司"
        :visible="visible"
        @ok="SubmitDeliverGoods"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >

        <a-spin :spinning="confirmLoading">
          <a-form :form="form">
            <a-form-item
              label="请输入物流公司">
              <a-input placeholder="请输入快递单号" v-decorator="[ 'expressName', validatorRules.expressName ]" v-model="expressName"></a-input>
            </a-form-item>
            <a-form-item
              label="快递单号">
              <a-input placeholder="请输入快递单号" v-decorator="[ 'expressNum', validatorRules.expressNum ]" v-model="expressNum"></a-input>
            </a-form-item>
          </a-form>
        </a-spin>
      </a-modal>
    </div>

    <!-- 表单区域 -->
    <order-modal ref="modalForm" @ok="modalFormOk"></order-modal>
  </a-card>
</template>

<script>
    import OrderModal from './modules/OrderModal'
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'
    import {deliverGoods} from '@/api/api'

    export default {
        name: "OrderList",
        inject:['reload'],
        mixins: [JeecgListMixin],
        components: {
            OrderModal
        },
        data() {
            return {
                description: '订单管理页面',
                visible:false,
                confirmLoading: false,
                form: this.$form.createForm(this),
                expressName: '',
                expressNum: '',
                validatorRules: {
                    expressName: {rules: [{required: true, message: '请输入物流公司名称!'}]},
                    expressNum: {rules: [{required: true, message: '请输入快递单号!'}]},
                    isNewuserExclusive: {rules: [{required: true, message: '请输入快递单号!'}]},
                },

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
                        title: '订单编号',
                        align: "center",
                        dataIndex: 'orderNum'
                    },
                    {
                        title: '商品名称',
                        align:"center",
                        dataIndex: 'goodsId_dictText'
                    },
                    {
                        title: '买家会员名称',
                        align: "center",
                        dataIndex: 'nickname'
                    },
                    {
                        title: '商品类型',
                        align: "center",
                        dataIndex: 'orderType',
                        customRender:function (value) {
                            if(value == 1){
                                return "竞拍商品";
                            }else {
                                return "积分商品";
                            }
                        }
                    },
                    {
                        title: '订单总价',
                        align: "center",
                        dataIndex: 'orderMoney'
                    },
                    {
                        title: '订单消耗积分',
                        align: "center",
                        dataIndex: 'point',
                        customRender:function (value) {
                            if(value == 0 || value == '' || value == null){
                                return "未使用";
                            }else {
                                return value;
                            }
                        }
                    },
                    {
                        title: '订单余额支付金额',
                        align: "center",
                        dataIndex: 'userMoney'
                    },
                    {
                        title: '订单状态',
                        align: "center",
                        dataIndex: 'orderStatus',
                        customRender: function (t) {
                            if (t == 0) {
                                return "流拍";
                            } else if (t == 1) {
                                return "待付款";
                            } else if (t == 2) {
                                return "待发货"
                            } else if (t == 3) {
                                return "待签收"
                            } else if (t == 4) {
                                return "已完成"
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
                    list: "/order/order/list",
                    delete: "/order/order/delete",
                    deleteBatch: "/order/order/deleteBatch",
                    exportXlsUrl: "order/order/exportXls",
                    importExcelUrl: "order/order/importExcel",
                },
            }
        },
        computed: {
            importExcelUrl: function () {
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
            }
        },
        methods: {
            handleCancel(){
                this.visible=false;
            },
            //点击发货按钮
            getExpressNo(record){
                this.visible = true;
                this.orderId = record.id;
                console.log("订单id："+this.orderId);

            },
            //选择物流公司并填写物流单号后点击确定，修改订单状态，将物流公司和物流单号分别填写到对应表中

            SubmitDeliverGoods(){
                // alert(this.doc.id)
                // if(this.doc.companyName==""||this.doc.companyName==null){
                //     this.$warning({
                //         title:'提示',
                //         content:'请选择物流公司'
                //     })
                //     return;
                // }
                // if(this.expressNumber==""||this.expressNumber==null){
                //     this.$warning({
                //         title:'提示',
                //         content:'请输入快递单号'
                //     })
                //     return;
                // }
                // console.log(this.doc);
                console.log(this.expressName);
                console.log(this.expressNum);
                console.log(this.orderId);
                let arr = [this.orderId,this.expressName,this.expressNum];
                console.log(arr);
                deliverGoods(arr.toString(), null).then((res) => {
                    console.log(res);
                    if (res.code === 1) {
                        this.$message.success(res.msg);

                    } else {
                        this.$message.warning(res.msg);
                    }
                });
                this.visible = false;
                this.reload();
            },
            onDateChange: function (dateString) {
                this.queryParam.startTime=dateString[0].format('YYYY-MM-DD HH:mm:ss');
                this.queryParam.endTime=dateString[1].format('YYYY-MM-DD HH:mm:ss');
            },
        }
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>