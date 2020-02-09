<template>
    <a-card :bordered="false">
      <detail-list title="用户信息">
        <detail-list-item term="用户昵称">{{userInfoDetail.nickname}}</detail-list-item>
        <detail-list-item term="用户手机号码">{{userInfoDetail.mobile}}</detail-list-item>
        <detail-list-item term="推广人">{{userInfoDetail.extendName}}</detail-list-item>
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
        </template>
      </a-table>

      <a-table :columns="brokerageColumns" :dataSource="brokerageData" bordered @change="handleTableChange2" :pagination="commissionpagination">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div>佣金明细</div>
            <div>佣金余额：{{userInfoDetail.commissionMoney}}</div>
          </div>
        </template>
      </a-table>

      <a-table :columns="scoreColumns" :dataSource="scoreData" bordered @change="handleTableChange3" :pagination="scorepagination">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div>积分明细</div>
            <div>积分余额：{{userInfoDetail.score}}</div>
          </div>
        </template>
      </a-table>

      <a-table :columns="fansColumns" :dataSource="fansData" bordered @change="handleTableChange4" :pagination="fanspagination">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">发发发</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div>团队列表</div>
            <div>团队个数：{{userInfoDetail.fansNumber}}</div>
          </div>
        </template>
        <template slot="imgurllot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.fansAvatar"/>
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
              if(value == 0){
                return "佣金增加";
              }else if(value == 1){
                return "充值余额";
              }else if(value == 2){
                return "保证金解冻";
              } else if(value == 3){
                return "支付";
              }else if(value == 4){
                return "提现";
              }else if(value == 5){
                return "保证金冻结";
              }else if(value == 6){
                return "保证金扣除";
              }else if(value == 7){
                return "订单过期扣除保证金";
              }else if(value == 8){
                return "寄卖所得";
              }
            }
          },
          {
            title: '金额',
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
                customRender:function (value) {
                  if(value == 0){
                    return "上级返佣";
                  }else if(value == 1){
                    return "竞拍佣金";
                  }else if(value == 2){
                    return "佣金提现";
                  } else if(value == 8){
                    return "寄拍佣金";
                  }
                }
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
                  dataIndex: 'goodsId_dictText',
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
                customRender:function (value) {
                  if(value == 1){
                    return "支出";
                  }else{
                    return "返还";
                  }
                }
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
                  dataIndex: 'fansName',
                  width: 150,
                  key: 'fansName'
              },
              {
                  title: '头像',
                  dataIndex: 'fansAvatar',
                  key: 'fansAvatar',
                  scopedSlots: {customRender: 'imgurllot'}
              },
              {
                  title: '手机号',
                  dataIndex: 'fansMobile',
                  key: 'fansMobile',
                  align: 'right'
              },
              {
                  title: '时间',
                  dataIndex: 'time',
                  key: 'time',
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
        //余额明细
        queryBill(id){
            let str=[id,this.billpagination.current,5];
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
        // 佣金分页
        handleTableChange2(pagination, filters, sorter){
          this.commissionpagination =pagination
          this.queryBrokerage(this.$route.query.userId)
        },
        // 积分分页
        handleTableChange3(pagination, filters, sorter){
          this.scorepagination =pagination
          this.queryScore(this.$route.query.userId)
        },
        // 粉丝分页
        handleTableChange4(pagination, filters, sorter){
          this.fanspagination =pagination
          this.queryFans(this.$route.query.userId)
        },
        //佣金明细
        queryBrokerage(id){
            let str=[id,this.commissionpagination.current,5];
            getBrokeragePage(str.toString(),null).then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.brokerageData = res.result.records
                this.commissionpagination.current=res.result.current,
                this.commissionpagination.total=res.result.total
            });
        },
        //积分明细
        queryScore(id){
            let str=[id,this.scorepagination.current,5];
            getScore(str.toString(),null).then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.scoreData = res.result.records
                this.scorepagination.current=res.result.current,
                this.scorepagination.total=res.result.total
            });
        },
        //粉丝明细
        queryFans(id){
            let str=[id,this.fanspagination.current,5];
            getFans(str.toString(),null).then((res)=>{
                console.log(res.result);
                // this.billData = res.result;
                this.fansData = res.result.records
                this.fanspagination.current=res.result.current,
                this.fanspagination.total=res.result.total
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