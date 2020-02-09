<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="昵称">
              <a-input placeholder="请输入" v-model="queryParam.nickname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="10">
            <a-form-item label="注册时间">
              <a-range-picker
                style="width: 210px"
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="onDateChange"
              />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
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
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        @change="handleTableChange"
      >

        <template slot="nickname" slot-scope="text, record, index">
          <router-link :to="'/user/modules/SonDetail?userId=' + record.id "> {{record.nickname}}</router-link>
        </template>

        <template slot="imgurllot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.avatar"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a-popconfirm @confirm="() => sonsonList(record.id,queryParam.nickname)">
            <a>查看下级</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
  </a-card>
</template>

<script>
  import SonDetail from './modules/SonDetail'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { frost } from '@/api/api'
  import { open } from '@/api/api'
  import { sonson } from '@/api/api'

  export default {
    name: "SonList",
    mixins:[JeecgListMixin],
    components: {

    },
    data () {
      return {
        description: '用户管理页面',
        // 表头
        queryParam:{},
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '头像',
            align:"center",
            dataIndex: 'avatar',
            scopedSlots: {customRender: 'imgurllot'}
          },
          {
            title: '昵称',
            align:"center",
            dataIndex: 'nickname',
            scopedSlots: {customRender: 'nickname'}
          },
          {
            title: '手机号',
            align:"center",
            dataIndex: 'mobile'
          },
          {
            title: '注册时间',
            align:"center",
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/user/user/sonList",
          delete: "/user/user/delete",
          deleteBatch: "/user/user/deleteBatch",
          exportXlsUrl: "user/user/exportXls",
          importExcelUrl: "user/user/importExcel",
          imgerver: window._CONFIG['imgDomainURL'],
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
        moment,
        getAvatarView: function (imgUrl) {
            return this.url.imgerver + "/" + avatar;
        },
        //冻结用户
        frostUser(id){
            console.log(id)
            frost(id,null).then((res)=>{
                console.log(res.result);
                if(res.success){
                    this.$message.success(res.message);
                }else {
                    this.$message.warning(res.message);
                }
                this.loadData()
            });
        },

      openAccount(id){
        console.log(id)
        open(id,null).then((res)=>{
          console.log(res.result);
          if(res.success){
            this.$message.success(res.message);
          }else {
            this.$message.warning(res.message);
          }
          this.loadData()
        });
      },

      sonsonList(id){
        console.log(id)
        sonson(id,null).then((res)=>{
          console.log(res.result);
          if(res.success){
            this.$message.success(res.message);
          }else {
            this.$message.warning(res.message);
          }
          this.loadData()
        });
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