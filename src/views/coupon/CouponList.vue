<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="优惠券类型">
              <a-select v-model="queryParam.couponTypeId"
                        placeholder="请选择优惠券类型"
                        allowClear>
                <a-select-option v-for="(coupon,index) in couponList" :key="index.toString()"
                                 :value="coupon.id">
                  {{coupon.couponName}}
                </a-select-option>
              </a-select>
              <!--<a-input placeholder="请输入优惠券类型ID" v-model="queryParam.couponTypeId"></a-input>-->
            </a-form-item>
          </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="优惠券编码">
                <a-input placeholder="请输入优惠券编码" v-model="queryParam.couponCode"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="领用人">
                <a-input placeholder="请输入领用人" v-model="queryParam.username"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="优惠券使用订单ID">
                <a-input placeholder="请输入优惠券使用订单ID" v-model="queryParam.useOrderId"></a-input>
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

        <span slot="action" slot-scope="text, record">
          <a @click="handleInfo(record)">详情</a>

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
    <coupon-modal ref="modalForm" @ok="modalFormOk"></coupon-modal>
  </a-card>
</template>

<script>
  import CouponModal from './modules/CouponModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {getCouponList} from '@/api/api'

  export default {
    name: "CouponList",
    mixins: [JeecgListMixin],
    components: {
      CouponModal
    },
    data() {
      return {
        description: '优惠券管理页面',
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
            title: '优惠券类型',
            align: "center",
            dataIndex: 'couponTypeId_dictText'
          },
          {
            title: '店铺',
            align: "center",
            dataIndex: 'shopId_dictText'
          },
          {
            title: '优惠券编码',
            align: "center",
            dataIndex: 'couponCode'
          },
          {
            title: '兑换人',
            align: "center",
            dataIndex: 'userId_dictText'
          },

          {
            title: '面额',
            align: "center",
            dataIndex: 'money'
          },
          {
            title: '领取时间',
            align: "center",
            dataIndex: 'fetchTime'
          },
          {
            title: '使用时间',
            align: "center",
            dataIndex: 'useTime'
          },
          {
            title: '优惠券状态',
            align: "center",
            dataIndex: 'state',
            customRender: function (text) {
              if (text == 0) {
                return "未领取";
              } else if (text == 1) {
                return "未使用";
              } else if (text == 2) {
                return "已使用";
              } else {
                return "已过期";
              }
            }
          },
          {
            title: '有效期开始时间',
            align: "center",
            dataIndex: 'startTime'
          },
          {
            title: '有效期结束时间',
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
        couponList: [],
        queryParam : {
            type: "2"
        },
        url: {
          list: "/coupon/coupon/list",
          delete: "/coupon/coupon/delete",
          deleteBatch: "/coupon/coupon/deleteBatch",
          exportXlsUrl: "coupon/coupon/exportXls",
          importExcelUrl: "coupon/coupon/importExcel",
        },
      }
    },
    created() {
      this.queryCouponList();
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      queryCouponList(){
        getCouponList({type : "index"}).then((res) => {
          console.log(res.result);
          if (res.success) {
            this.couponList = res.result;
          }
        })
      },
      handleInfo: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>