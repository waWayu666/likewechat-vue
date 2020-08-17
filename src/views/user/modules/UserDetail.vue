<template>
  <a-card :bordered="false">
    <detail-list title="用户信息">
      <detail-list-item term="用户昵称">{{userInfoDetail.nickname}}</detail-list-item>
      <detail-list-item term="用户手机号码">{{userInfoDetail.mobile}}</detail-list-item>
      <detail-list-item term="账号">{{userInfoDetail.wechatId}}</detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px"/>

    <!--  <div class="title">余额明细</div>-->
    <a-table :columns="balanceColumns" :dataSource="billData" @change="handleTableChange1" bordered :pagination="billpagination">
      <template slot="name" slot-scope="text">
        <a href="javascript:;">发发发</a>
      </template>
      <template slot="title" slot-scope="currentPageData">

        <div style="display: flex;justify-content: space-between;align-items: center;">
          <div>余额明细</div>

          <div>剩余余额：{{userInfoDetail.money}}</div>
        </div>
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <div>余额类型</div>
          <a-select style="width: 100px;margin-left: 20px;margin-right: 20px;" placeholder="请选择类型" v-model="balanceType">
            <a-select-option value="1">发红包</a-select-option>
            <a-select-option value="2">收红包</a-select-option>
            <a-select-option value="3">红包过期退回</a-select-option>
            <a-select-option value="4">充值</a-select-option>
            <a-select-option value="5">提现</a-select-option>
          </a-select>
          <a-button type="primary" @click="searchBtnBalance">搜索</a-button>
        </div>

      </template>
    </a-table>

  </a-card>
</template>

<script>
  import PageLayout from '@/components/page/PageLayout'
  import DetailList from '@/components/tools/DetailList'
  import ABadge from "ant-design-vue/es/badge/Badge"
  import {queryUserDetail,getBill,getBrokeragePage,getScore,getFans} from '@/api/api'

  const DetailListItem = DetailList.Item

  export default {
    components: {
      PageLayout,
      ABadge,
      DetailList,
      DetailListItem
    },
    data () {
      return {
        userInfoDetail:{},
        // 余额明细
        billData:[],
        // 余额分页
        billpagination:{
          pageSize:5,
          current:1,
          total:0
        },
        // 佣金明细
        brokerageData:[],
        commissionpagination:{
          pageSize:5,
          current:1,
          total:0
        },
        scoreData:[],
        scorepagination:{
          pageSize:5,
          current:1,
          total:0
        },
        fansData:[],
        fanspagination:{
          pageSize:5,
          current:1,
          total:0
        },
        auctionrecodData:[],
        url: {
          imgerver: window._CONFIG['imgDomainURL'],
        },

        //余额明细的类型
        balanceType: "",
        //  余额数据
        balanceColumns: [
          {
            title: 'id',
            dataIndex: 'id',
            width: 150,
            key: 'id'
          },
          {
            title: '类型',
            dataIndex: 'billType',
            key: 'billType',
            customRender:function (value) {
              if(value == 1){
                return "发红包";
              }else if(value == 2){
                return "收红包";
              } else if(value == 3){
                return "红包过期退回";
              }else if(value == 4){
                return "充值";
              }else if(value == 5){
                return "提现";
              }
            },
            align: 'center'
          },
          {
            title: '变化前金额',
            dataIndex: 'beforeMoney',
            key: 'beforeMoney',
            align: 'center'
          },
          {
            title: '金额',
            dataIndex: 'changeMoney',
            key: 'changeMoney',
            align: 'center'
          },
          {
            title: '金额',
            dataIndex: 'afterMoney',
            key: 'afterMoney',
            align: 'center'
          },
          {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '描述',
            dataIndex: 'operateDesc',
            key: 'goodsId',
            align: 'center'
          }
        ],
      }
    },
    mounted(){
      this.queryUserInfo(this.$route.query.userId);
      this.queryBill(this.$route.query.userId);
    },
    created () {

    },
    computed: {
      title () {
        return this.$route.meta.title
      },
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getAvatarView: function (imgUrl) {
        return this.url.imgerver + "/" + avatar;
      },
      //用户信息
      queryUserInfo(id){
        queryUserDetail(id,null).then((res)=>{
          this.userInfoDetail = res.result
        });
      },
      searchBtnBalance(){
        this.queryBill(this.$route.query.userId)
      },
      //余额明细
      queryBill(id){
        let str=[id,this.billpagination.current,5, this.balanceType];
        getBill(str.toString(),null).then((res)=>{
          // this.billData = res.result;
          this.billData = res.result.records
          this.billpagination.current=res.result.current,
            this.billpagination.total=res.result.total
        });
      },
      // 切换余额明细分页  	(分页、排序、筛选变化时触发)
      handleTableChange1(pagination, filters, sorter){
        this.billpagination =pagination
        this.queryBill(this.$route.query.userId)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>