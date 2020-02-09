<template>
  <a-card :bordered="false">

    <!-- table区域-begin -->
    <div>

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
          <router-link :to="'/user/modules/UserDetail?userId=' + record.id "> {{record.nickname}}</router-link>
        </template>

        <template slot="imgurllot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <img :src="record.avatar"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">

                    <a @click="handleEdit(record)">修改密码</a>

          <!--          <a-divider type="vertical" />-->
          <!--          <a-dropdown>-->
          <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
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
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
  </a-card>
</template>

<script>
  import UserModal from './modules/MyInfoModal'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { frost } from '@/api/api'
  import { open } from '@/api/api'
  import { repet } from '@/api/api'

  export default {
    name: "UserList",
    mixins:[JeecgListMixin],
    components: {
      UserModal
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
            title: '昵称',
            align:"center",
            dataIndex: 'nickname',
            scopedSlots: {customRender: 'nickname'}
          },
          /* {
             title: '年龄',
             align:"center",
             dataIndex: 'age'
           },*/
          {
            title: '头像',
            align:"center",
            dataIndex: 'avatar',
            scopedSlots: {customRender: 'imgurllot'}
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
            title: '推广人',
            align:"center",
            dataIndex: 'extendName'
          },
          {
            title: '冻结金额',
            align:"center",
            dataIndex: 'freezeMoney'
          },
          /* {
             title: '性别',
             align:"center",
             dataIndex: 'sex_dictText'
           },*/
          {
            title: '余额',
            align:"center",
            dataIndex: 'money',
            sorter: (a, b) => a.money - b.money,
          },
          {
            title: '积分',
            align:"center",
            dataIndex: 'score'
          },
          {
            title: '佣金',
            align:"center",
            dataIndex: 'commissionMoney',
            sorter: (a, b) => a.commissionMoney - b.commissionMoney,
          },

          /*{
            title: '状态',
            align:"center",
            dataIndex: 'status',
            customRender: function (t) {
                if (t == 1) {
                    return "正常";
                } else if (t == 2) {
                    return "冻结";
                }
            }
          },*/

          /* {
             title: '邀请码',
             align:"center",
             dataIndex: 'inviterNum'
           },*/
          /*{
            title: '已经邀请人数',
            align:"center",
            dataIndex: 'inviterCount'
          },*/

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/user/user/tuanzhangList",
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

      repetPassword(id){
        console.log(id)
        repet(id,null).then((res)=>{
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