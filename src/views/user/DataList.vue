<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="60" :sm="10">
            <a-form-item label="筛选时间ß">
              <a-range-picker
                :showTime="{ format: '00:00:00' }"
                style="width: 320px"
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
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <goods-modal ref="modalForm" @ok="modalFormOk"></goods-modal>
    <!--    抽屉-->
  </a-card>
</template>

<script>
import GoodsModal from './modules/GoodsModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { upOrDown, getAuctionrecod } from '@/api/api'

export default {
  name: 'DataList',
  mixins: [JeecgListMixin],
  components: {
    GoodsModal
  },
  data() {
    return {
      description: '数据统计',
      visible: false, // 是否打开抽屉
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      // 表头
      columns: [
        {
          title: '用户总数',
          width: 60,
          align: 'center',
          dataIndex: 'score',
        },
        {
          title: '顶一手总额',
          width: 60,
          align: 'center',
          dataIndex: 'money',
        }
      ],
      url: {
        list: '/user/user/queryData'
      },
      //    抽屉
      goodsId: ''
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    getAvatarView: function(mainImage) {
      return this.url.imgerver + '/' + mainImage
    },
    //上下架商品
    upOrDownGoods(id) {
      console.log(id)
      upOrDown(id, null).then(res => {
        console.log(res.result)
        if (res.success) {
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
        this.loadData()
      })
    },
    onDateChange: function(dateString) {
      this.queryParam.startTime = dateString[0].format('YYYY-MM-DD')
      this.queryParam.endTime = dateString[1].format('YYYY-MM-DD')
    },
    //    打开抽屉
    showDrawer(info) {
      this.visible = true
      var params = this.getQueryParams() //查询条件
      params.goodsId = info.id
      this.goodsId = info.id
      this.getAuctionrecod(params)
    },
    getAuctionrecod(params) {
      getAuctionrecod(params).then(res => {
        this.jingpaiList = res.result.records
        this.pagination.current=res.result.current,
                this.pagination.total=res.result.total
      })
    },
    handleTableChange1(pagination, filters, sorter) {
      this.pagination = pagination
      var params = this.getQueryParams() //查询条件
      params.goodsId = this.goodsId
      params.pageNo = this.pagination.current
      params.pageSize = 10
    console.log(params)
      this.getAuctionrecod(params)
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>
