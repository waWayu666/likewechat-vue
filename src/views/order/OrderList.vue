<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="订单编号">
              <a-input placeholder="请输入订单编号" v-model="queryParam.orderNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="外部交易号">
              <a-input placeholder="请输入外部交易号" v-model="queryParam.outTradeNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="订单类型">
              <a-input placeholder="请输入订单类型" v-model="queryParam.orderType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="支付类型1余额2支付宝3微信">
              <a-input placeholder="请输入支付类型1余额2支付宝3微信" v-model="queryParam.paymentType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="订单配送方式">
              <a-input placeholder="请输入订单配送方式" v-model="queryParam.shippingType"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
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
    </div>

<!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('订单')">导出</a-button>-->
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
<!--    </div>-->

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
        filterMultiple="filterMultiple"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys,onChange:onSelectChange,type:type}"
        @change="handleTableChange"
         :customRow="clickThenCheck">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <span v-if="record.orderStatus!==0">
            <a-divider type="vertical" />
            <a v-if="record.orderStatus===1 || record.orderStatus===2" @click="getExpressNo(record)">发货</a>
            <!--<a v-else-if="record.orderStatus===3 || record.orderStatus===4 || record.orderStatus===5" @click="showLogistics(record.id)">已发货</a>-->
            <a v-else-if="record.orderStatus===3 || record.orderStatus===4 || record.orderStatus===5"><b>已发货</b></a>
            <a v-else-if="record.orderStatus===6 ">已关闭</a>
          </span>
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

    <div style="width: 500px">
      <a-modal
        title="物流公司"
        :visible="visible"
        @ok="deliverGoods"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
        <a-form-item
          label="请选择物流公司">
          <a-select v-decorator="[ 'expressCompanyId', validatorRules.expressCompanyId ]"
                    placeholder="请选择物流公司" style="width:150px"
                    @change="changeExpressCompany">
            <a-select-option v-for="(expressCompany,index) in expressCompanyList" :key="index.toString()" :value="expressCompany.id">
              {{expressCompany.companyName}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="快递单号">
          <a-input placeholder="请输入快递单号" v-decorator="[ 'expressNumber', validatorRules.expressNumber ]" v-model="expressNumber"></a-input>
        </a-form-item>
      </a-form>
      </a-spin>
      </a-modal>
    </div>


    <!-- table区域-一对多--多的一方 -->
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="订单商品信息" key="1">
        <order-goods-list ref="OrderGoodsList"></order-goods-list>
      </a-tab-pane>
    </a-tabs>

    <!-- 表单区域 -->
    <order-modal ref="modalForm" @ok="modalFormOk"></order-modal>
  </a-card>
</template>

<script>
  import OrderModal from './modules/OrderModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  // import OrderGoodsDetail from './modules/OrderGoodsDetail'
  import {getExpressCompanyList,deliverGoods} from '@/api/api'
  import Self from './../../Self.js'
  import pick from 'lodash.pick'
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import OrderGoodsList from './OrderGoodsList'
  // import LogisticsInfo from './modules/LogisticsInfo'


  export default {
    name: "OrderList",
    inject:['reload'],
    mixins: [JeecgListMixin],
    components: {
      AFormItem,
      OrderModal,
      OrderGoodsList,
      Self,
    },
    data() {
      return {
        description: '订单管理页面',
        visible:false,
        expressNo:'',
        expressCompanyList:[],
        expressCompany:{},
        expressNumber:'',
        type: "radio",
        doc:{
          id:''
        },
        form: this.$form.createForm(this),
        confirmLoading: false,
        validatorRules: {
          expressCompanyId: {rules: [{required: true, message: '请选择物流公司!'}]},
          expressNumber: {rules: [{required: true, message: '请输入快递单号!'}]},
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
            align:"center",
            dataIndex: 'orderNo'
           },
		   {
            title: '外部交易号',
            align:"center",
            dataIndex: 'outTradeNo'
           },
		   {
            title: '订单类型',
            align: "center",
            dataIndex: 'orderType',
            customRender:function (text) {
              if(text==1){
                return "基础订单";
              }else if(text==2){
                return "拼团";
              }else {
                return "秒杀";
              }
            }
          },
          {
            title: '支付类型',
            align: "center",
            dataIndex: 'paymentType',
            customRender:function (text) {
              if(text==1){
                return "余额";
              }else if(text==2){
                return "支付宝";
              }else {
                return "微信";
              }
            }
          },
          {
            title: '订单配送方式',
            align:"center",
            dataIndex: 'shippingType'
           },
		   {
            title: '订单来源',
            align:"center",
            dataIndex: 'orderFrom'
           },
		  /* {
            title: '买家id',
            align:"center",
            dataIndex: 'buyerId'
           },*/
		   {
            title: '买家会员名称',
            align:"center",
            dataIndex: 'userName'
           },
		   /*{
            title: '买家ip',
            align:"center",
            dataIndex: 'buyerIp'
           },*/
		   {
            title: '买家附言',
            align:"center",
            dataIndex: 'buyerMessage'
           },
		   {
            title: '买家发票信息',
            align:"center",
            dataIndex: 'buyerInvoice'
           },
		   {
            title: '发票状态',//0不需要1个人2公司
            align:"center",
            dataIndex: 'invoiceStatus',
           customRender:function (text) {
             if(text==0){
               return "不需要";
             }else if(text==1){
               return "个人";
             }else {
               return "公司";
             }
           }
           },
		  /* {
            title: '发票ID',
            align:"center",
            dataIndex: 'invoiceId'
          },*/
          // {
          //      title: '收货人的手机号码',
          //      align:"center",
          //      dataIndex: 'receiverMobile'
          //     },
          // {
          //      title: '收货人所在省',
          //      align:"center",
          //      dataIndex: 'receiverProvince'
          //     },
          // {
          //      title: '收货人所在省份名称',
          //      align:"center",
          //      dataIndex: 'receiverProvinceName'
          //     },
          // {
          //      title: '收货人所在城市',
          //      align:"center",
          //      dataIndex: 'receiverCity'
          //     },
          // {
          //      title: '收货人所在城市名称',
          //      align:"center",
          //      dataIndex: 'receiverCityName'
          //     },
          // {
          //      title: '收货人所在街道',
          //      align:"center",
          //      dataIndex: 'receiverDistrict'
          //     },
          // {
          //      title: '收货人所在街道名称',
          //      align:"center",
          //      dataIndex: 'receiverDistrictName'
          //     },
          // {
          //      title: '收货人详细地址',
          //      align:"center",
          //      dataIndex: 'receiverAddress'
          //     },
          // {
          //      title: '收货人邮编',
          //      align:"center",
          //      dataIndex: 'receiverZip'
          //     },
          // {
          //      title: '收货人姓名',
          //      align:"center",
          //      dataIndex: 'receiverName'
          //     },
         /* {
            title: '卖家店铺id',
            align:"center",
            dataIndex: 'shopId'
           },*/
		   /*{
            title: '卖家店铺名称',
            align:"center",
            dataIndex: 'shopName'
           },*/
		   /*{
            title: '卖家对订单的标注星标',
            align:"center",
            dataIndex: 'sellerStar'
           },
		   {
            title: '卖家对订单的备注',
            align:"center",
            dataIndex: 'sellerMemo'
           },
		   {
            title: '卖家延迟发货时间',
            align:"center",
            dataIndex: 'consignTimeAdjust'
           },
		   {
            title: '商品总价',
            align:"center",
            dataIndex: 'goodsMoney'
           },
		   {
            title: '订单总价',
            align:"center",
            dataIndex: 'orderMoney'
           },
		   {
            title: '订单消耗积分',
            align:"center",
            dataIndex: 'point'
           },*/
		   /*{
            title: '订单消耗积分抵多少钱',
            align:"center",
            dataIndex: 'pointMoney'
           },
		   {
            title: '订单代金券支付金额',
            align:"center",
            dataIndex: 'couponMoney'
           },
		   {
            title: '订单代金券id',
            align:"center",
            dataIndex: 'couponId'
           },
		   {
            title: '订单余额支付金额',
            align:"center",
            dataIndex: 'userMoney'
           },
		   {
            title: '用户平台余额支付',
            align:"center",
            dataIndex: 'userPlatformMoney'
           },
		   {
            title: '订单优惠活动金额',
            align:"center",
            dataIndex: 'promotionMoney'
           },
		   {
            title: '订单运费',
            align:"center",
            dataIndex: 'shippingMoney'
           },
		   {
            title: '订单实付金额',
            align:"center",
            dataIndex: 'payMoney'
           },
		   {
            title: '订单退款金额',
            align:"center",
            dataIndex: 'refundMoney'
           },
		   {
            title: '购物币金额',
            align:"center",
            dataIndex: 'coinMoney'
           },
		   {
            title: '订单赠送积分',
            align:"center",
            dataIndex: 'givePoint'
           },
		   {
            title: '订单成功之后返购物币',
            align:"center",
            dataIndex: 'giveCoin'
          },*/
          {
            title: '订单状态',
            align: "center",
            dataIndex: 'orderStatus',
            customRender:function (text) {
              if(text==0){
                return "已取消";
              }else if(text==1){
                return "代付款";
              }else if(text==2){
                return "代发货";
              }else if(text==3){
                return "代签收";
              }else if(text==4){
                return "待评价";
              }else if(text==5){
                return "已完成";
              }else if(text==6){
                return "已关闭";
              }else{
                return "退款";
              }
            }
          },
         /* {
            title: '订单付款状态',
            align:"center",
            dataIndex: 'payStatus'
           },
		   {
            title: '订单配送状态',
            align:"center",
            dataIndex: 'shippingStatus'
           },
		   {
            title: '订单评价状态',
            align:"center",
            dataIndex: 'reviewStatus'
           },
		   {
            title: '订单维权状态',
            align:"center",
            dataIndex: 'feedbackStatus'
          },*/
          {
            title: '是否评价',
            align: "center",
            dataIndex: 'isEvaluate',
            customRender: function (text) {
              if (text == 0) {
                return "未评价";
              } else if (text == 1) {
                return "已评价";
              } else {
                return "已追评";
              }
            }
          },
          // {
          //   title: 'taxMoney',
          //   align: "center",
          //   dataIndex: 'taxMoney'
          // },
         /* {
            title: '配送物流公司ID',
            align: "center",
            dataIndex: 'shippingCompanyId'
           },
		   {
            title: '积分返还类型 1 订单完成  2 订单收货 3  支付订单',
            align:"center",
            dataIndex: 'givePointType'
           },
		   {
            title: '订单付款时间',
            align:"center",
            dataIndex: 'payTime'
           },
		   {
            title: '买家要求配送时间',
            align:"center",
            dataIndex: 'shippingTime'
           },
		   {
            title: '买家签收时间',
            align:"center",
            dataIndex: 'signTime'
           },
		   {
            title: '卖家发货时间',
            align:"center",
            dataIndex: 'consignTime'
           },
		   {
            title: '订单完成时间',
            align:"center",
            dataIndex: 'finishTime'
           },
		   {
            title: '订单是否已删除',
            align:"center",
            dataIndex: 'isDeleted'
           },
		   {
            title: '操作人类型  1店铺  2用户',
            align:"center",
            dataIndex: 'operatorType'
           },
		   {
            title: '操作人id',
            align:"center",
            dataIndex: 'operatorId'
           },
		   {
            title: '订单退款余额',
            align:"center",
            dataIndex: 'refundBalanceMoney'
           },
		   {
            title: '获得方式状态 0下单获得 1转赠获得',
            align:"center",
            dataIndex: 'getType'
           },
           */
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
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
    created () {
      this.queryExpressCompanyList();
    },
    methods: {
      clickThenCheck(record) {
        return {
          on: {
            click: () => {
              this.onSelectChange(record.id.split(","), [record]);
            }
          }
        };
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        console.log(selectionRows)
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
        this.$refs.OrderGoodsList.getOrderMain(this.selectedRowKeys[0]);
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.$refs.OrderGoodsList.queryParam.mainId = null;
        this.$refs.OrderGoodsList.loadData();
        this.$refs.OrderGoodsList.selectedRowKeys = [];
        this.$refs.OrderGoodsList.selectionRows = [];
      },
      handleDelete: function (id) {
        var that = this;
        deleteAction(that.url.delete, {id: id}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
            this.$refs.OrderGoodsList.loadData();
            this.$refs.OrderGoodsList.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      searchQuery:function(){
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.$refs.OrderGoodsList.queryParam.mainId = null;
        this.$refs.OrderGoodsList.loadData();
        this.$refs.OrderGoodsList.selectedRowKeys = [];
        this.$refs.OrderGoodsList.selectionRows = [];
        this.loadData();
      },
      changeExpressCompany(e){
        // console.log(e)
         this.doc = this.expressCompanyList.find(item=>item.id==e)
        console.log("================")
        console.log("物流公司id:"+this.doc.id)
        console.log("================")
      },
      queryExpressCompanyList(){
            getExpressCompanyList().then((res)=>{
              console.log(res.result)
              if(res.code==1){
                this.expressCompanyList=res.result;
              }
            })
      },
      getExpressNo(record){
        this.visible = true;
        this.orderId = record.id;
        console.log("订单id："+this.orderId);

      },

      handleCancel(){
        this.visible=false;
      },

       //选择物流公司并填写物流单号后点击确定，修改订单状态，将物流公司和物流单号分别填写到对应表中

      deliverGoods(){
        // alert(this.expressNumber)
        // alert(this.doc.id)
        if(this.doc.companyName==""||this.doc.companyName==null){
          this.$warning({
            title:'提示',
            content:'请选择物流公司'
          })
          return;
        }
        if(this.expressNumber==""||this.expressNumber==null){
          this.$warning({
            title:'提示',
            content:'请输入快递单号'
          })
          return;
        }
          console.log(this.doc);
          console.log(this.orderId);
          let arr = [this.orderId,this.doc.id,this.expressNumber];
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
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>