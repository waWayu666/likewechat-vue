<template>
  <div class="page-header-index-wide">
    <!--头部-->
    <a-row :gutter="24">
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card
          class="project-list"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="平台数据">
          <div class="user-data-div">
            <a-col class="project-card-grid" :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }" :key="i"
                   v-for="(item, i) in userData">
              <a-card :body-style="{ padding: '10px' }" style="margin: 10px;padding: -10px;">
                <div class="chart-card-header">
                  <div class="meta">
                    <span class="chart-card-title">{{ item.sign }}</span>
                  </div>
                  <div style="padding: 10% 0 10% 10%">
                    <span class="total-left"> {{ item.money }}</span>
                    <div style="clear: both;"></div>
                  </div>
                </div>
              </a-card>
            </a-col>
          </div>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
    import ChartCard from '@/components/ChartCard'
    import ACol from "ant-design-vue/es/grid/Col"
    import ATooltip from "ant-design-vue/es/tooltip/Tooltip"
    import {getAction} from '@/api/manage'


    export default {
        name: "Analysis",
        components: {
            ATooltip,
            ACol,
            ChartCard,
        },
        data() {
            return {
                loading: true,
                startTime: "",
                endTime: "",
                form: this.$form.createForm(this),
                shopId: "",
                saleTime: [],
                saleMoney: [],
                sales: "",
                orderTime: [],
                dayOrderCount: [],
                orderCount: "",
                evaluateTime: [],
                dayEvaluateCount: [],
                evaluateCount: "",
                shopCount: "",
                userData: [],
                appUseData: [],
                url: {
                    userData: "/api/v1/goods/testFirst",
                },
            }
        },
        created() {
            this.getUserData();
        },
        mounted() {
        },
        methods: {
            //获取用户数据
            getUserData() {
                const that = this;
                getAction(this.url.userData).then((res) => {
                    console.log(res.data);
                    console.log(res);
                    if (res.code == 1) {
                        that.userData = res.data;
                        console.log(that.userData);
                    }
                });
            },

        }
    }
</script>

<style lang="scss" scoped>
  .circle-cust {
    position: relative;
    top: 28px;
    left: -100%;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }

    p {
      line-height: 42px;
      margin: 0;

      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }

  .chart-card-header {
    position: relative;
    overflow: hidden;
    width: 100%;

    .meta {
      position: relative;
      overflow: hidden;
      width: 100%;
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
      line-height: 22px;
    }
  }

  .total-left {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: #000;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
    float: left;
  }

  .total-right {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: #000;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 20px;
    line-height: 38px;
    height: 38px;
    float: right;
    margin-right: 40%;
  }

  .chart-card-action {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>