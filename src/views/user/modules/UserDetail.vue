<template>
    <a-card :bordered="false">
      <detail-list title="用户信息">
        <detail-list-item term="用户昵称">{{userInfoDetail.nickname}}</detail-list-item>
        <detail-list-item term="用户手机号码">{{userInfoDetail.mobile}}</detail-list-item>
        <detail-list-item term="推广人">{{userInfoDetail.extendName}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>

<!--  <div class="title">余额明细</div>-->
      <a-table :columns="balanceColumns" :dataSource="billData" bordered :pagination="{ pageSize: 5 }">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          余额明细
        </template>
      </a-table>

      <a-table :columns="brokerageColumns" :dataSource="brokerageData" bordered :pagination="{ pageSize: 5 }">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          佣金明细
        </template>
      </a-table>

      <a-table :columns="scoreColumns" :dataSource="scoreData" bordered :pagination="{ pageSize: 5 }">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          积分明细
        </template>
      </a-table>

      <a-table :columns="fansColumns" :dataSource="fansData" bordered :pagination="{ pageSize: 5 }">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          团队列表
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
        billData:[],
        brokerageData:[],
        scoreData:[],
        fansData:[],
        auctionrecodData:[],
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
            key: 'billType'
          },
          {
            title: '单价',
            dataIndex: 'changeMoney',
            key: 'changeMoney',
            align: 'right'
          },
          {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'right'
          },
          {
            title: '对应拍品',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right'
          }
        ],
      //    佣金数据
          brokerageColumns: [
              {
                  title: 'id',
                  dataIndex: 'id',
                  width: 150,
                  key: 'id'
              },
              {
                  title: '类型',
                  dataIndex: 'type',
                  key: 'type'
              },
              {
                  title: '佣金',
                  dataIndex: 'changeMoney',
                  key: 'changeMoney',
                  align: 'right'
              },
              {
                  title: '时间',
                  dataIndex: 'createTime',
                  key: 'createTime',
                  align: 'right'
              },
              {
                  title: '对应拍品',
                  dataIndex: 'goodsId',
                  key: 'goodsId',
                  align: 'right'
              }
          ],
          //    积分数据
          scoreColumns: [
              {
                  title: 'id',
                  dataIndex: 'id',
                  width: 150,
                  key: 'id'
              },
              {
                  title: '类型',
                  dataIndex: 'type',
                  key: 'type'
              },
              {
                  title: '积分',
                  dataIndex: 'changeScore',
                  key: 'changeScore',
                  align: 'right'
              },
              {
                  title: '创建时间',
                  dataIndex: 'createTime',
                  key: 'createTime',
                  align: 'right'
              },
              {
                  title: '对应拍品',
                  dataIndex: 'amount',
                  key: 'amount',
                  align: 'right'
              }
          ],
          //    粉丝数据
          fansColumns: [
              {
                  title: 'id',
                  dataIndex: 'fansId',
                  width: 150,
                  key: 'fansId'
              },
              {
                  title: '头像',
                  dataIndex: 'billType',
                  key: 'billType'
              },
              {
                  title: '手机号',
                  dataIndex: 'fansId',
                  key: 'fansId',
                  align: 'right'
              },
              {
                  title: '时间',
                  dataIndex: 'createTime',
                  key: 'createTime',
                  align: 'right'
              }
          ]
      }
    },
      mounted(){
          this.queryUserInfo(this.$route.query.userId);
          this.queryBill(this.$route.query.userId);
          this.queryBrokerage(this.$route.query.userId);
          this.queryScore(this.$route.query.userId);
          this.queryFans(this.$route.query.userId);
      },
    created () {

    },
    computed: {
      title () {
        return this.$route.meta.title
      }
    },
    methods: {
        //用户信息
        queryUserInfo(id){
            queryUserDetail(id,null).then((res)=>{
                this.userInfoDetail = res.result
            });
        },
        //余额明细
        queryBill(id){
            // var params = this.getQueryParams();//查询条件
            // params.userId = this.$route.query.userId;
            // console.log(id)
            getBill().then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.billData = res.result.records
            });
        },
        //佣金明细
        queryBrokerage(id){
            // var params = this.getQueryParams();//查询条件
            // params.userId = this.$route.query.userId;
            // console.log(id)
            getBrokeragePage().then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.brokerageData = res.result.records
            });
        },
        //积分明细
        queryScore(id){
            // var params = this.getQueryParams();//查询条件
            // params.userId = this.$route.query.userId;
            // console.log(id)
            getScore().then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.scoreData = res.result.records
            });
        },
        //粉丝明细
        queryFans(id){
            // var params = this.getQueryParams();//查询条件
            // params.userId = this.$route.query.userId;
            // console.log(id)
            getFans().then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.fansData = res.result.records
            });
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