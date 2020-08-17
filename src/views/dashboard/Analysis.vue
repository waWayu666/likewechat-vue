<template>
  <div class="page-header-index-wide">
    <!--头部-->
<!--    <a-row :gutter="24">-->
<!--      &lt;!&ndash;top chart1 总销售额&ndash;&gt;-->
<!--      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">-->
<!--        <a-card  :body-style="{ padding: '20px 24px 8px' }" :bordered="false">-->
<!--          <div>-->
<!--            <div class="chart-card-header">-->
<!--              <div class="meta">-->
<!--                <span class="chart-card-title">总销售额</span>-->
<!--                <span class="chart-card-action">-->
<!--                    <a-tooltip title="平台总销售额" >-->
<!--                      <a-icon type="info-circle-o" />-->
<!--                    </a-tooltip>-->
<!--                </span>-->
<!--              </div>-->
<!--              <div>-->
<!--                <span class="total-left">{{sales}}</span>-->
<!--                <span class="total-right">(元)</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="chart-card-content">-->
<!--              <div id="chartTop1" :style="{width: '100%', height: '50px'}"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </a-card>-->
<!--      </a-col>-->
<!--      &lt;!&ndash;top chart2 总订单量&ndash;&gt;-->
<!--      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">-->
<!--        <a-card  :body-style="{ padding: '20px 24px 8px' }" :bordered="false">-->
<!--          <div>-->
<!--            <div class="chart-card-header">-->
<!--              <div class="meta">-->
<!--                <span class="chart-card-title">总订单量</span>-->
<!--                <span class="chart-card-action">-->
<!--                    <a-tooltip title="指标说明" >-->
<!--                      <a-icon type="info-circle-o" />-->
<!--                    </a-tooltip>-->
<!--                </span>-->
<!--              </div>-->
<!--              <div>-->
<!--                <span class="total-left">{{orderCount}}</span>-->
<!--                <span class="total-right">(单)</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="chart-card-content">-->
<!--              <div id="chartTop2" :style="{width: '100%', height: '50px'}"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </a-card>-->
<!--      </a-col>-->
<!--      &lt;!&ndash;top chart3 总评论数&ndash;&gt;-->
<!--      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">-->
<!--        <a-card  :body-style="{ padding: '20px 24px 8px' }" :bordered="false">-->
<!--          <div>-->
<!--            <div class="chart-card-header">-->
<!--              <div class="meta">-->
<!--                <span class="chart-card-title">总评论数</span>-->
<!--                <span class="chart-card-action">-->
<!--                    <a-tooltip title="指标说明" >-->
<!--                      <a-icon type="info-circle-o" />-->
<!--                    </a-tooltip>-->
<!--                </span>-->
<!--              </div>-->
<!--              <div>-->
<!--                <span class="total-left">{{evaluateCount}}</span>-->
<!--                <span class="total-right">(个)</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="chart-card-content">-->
<!--              <div id="chartTop3" :style="{width: '100%', height: '50px'}"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </a-card>-->
<!--      </a-col>-->
<!--    </a-row>-->

    <a-row :gutter="24" v-if="shopId == ''">
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card
          class="project-list"
          :loading="loading"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="用户数据">
          <div class="user-data-div">
            <a-col class="project-card-grid" :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }" :key="i" v-for="(item, i) in userData">
              <a-card :body-style="{ padding: '10px' }" style="margin: 10px;padding: -10px;">
                <div class="chart-card-header">
                  <div class="meta">
                    <span class="chart-card-title">{{ item.title }}</span>
                  </div>
                  <div style="padding: 10% 0 10% 10%">
                    <span class="total-left"> {{ item.value }}</span>
                    <span class="total-right" style="margin-right: 25%;">(个)</span>
                    <div style="clear: both;"></div>
                  </div>
                </div>
              </a-card>
            </a-col>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!--<a-row :gutter="24" v-if="shopId == ''">-->
    <!--<a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">-->
    <!--<a-card-->
    <!--class="project-list"-->
    <!--:loading="loading"-->
    <!--style="margin-bottom: 24px;"-->
    <!--:bordered="false"-->
    <!--title="APP使用数据">-->
    <!--<div class="user-data-div">-->
    <!--<a-col class="project-card-grid" :sm="24" :md="12" :xl="3" :style="{ marginBottom: '12px' }" :key="i" v-for="(item, i) in appUseData">-->
    <!--<a-card :body-style="{ padding: '10px' }" style="margin: 10px;padding: -10px;">-->
    <!--<div class="chart-card-header">-->
    <!--<div class="meta">-->
    <!--<span class="chart-card-title">{{ item.title }}</span>-->
    <!--</div>-->
    <!--<div style="padding: 10% 0 10% 10%">-->
    <!--<span class="total-left"> {{ item.value }}</span>-->
    <!--<div style="clear: both;"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</a-card>-->
    <!--</a-col>-->
    <!--</div>-->
    <!--</a-card>-->
    <!--</a-col>-->
    <!--</a-row>-->

<!--    <a-row :gutter="24">-->
<!--      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }" v-if="shopId == ''">-->
<!--        <a-card-->
<!--          class="project-list"-->
<!--          style="margin-bottom: 24px;"-->
<!--          :bordered="false"-->
<!--          title="订单数据">-->
<!--          <div class="user-data-div">-->
<!--            <a-card :body-style="{ padding: '10px' }" style="margin: 10px;padding: -10px;">-->
<!--              <div class="chart-card-header">-->
<!--                <div id="center1" :style="{width: '100%', height: '250px'}"></div>-->
<!--              </div>-->
<!--            </a-card>-->
<!--          </div>-->
<!--        </a-card>-->
<!--      </a-col>-->

<!--      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">-->
<!--        <a-card-->
<!--          class="project-list"-->
<!--          style="margin-bottom: 24px;"-->
<!--          :bordered="false"-->
<!--          title="订单数据">-->
<!--          <div class="user-data-div">-->
<!--            <a-card :body-style="{ padding: '10px' }" style="margin: 10px;padding: -10px;">-->
<!--              <div class="chart-card-header">-->
<!--                <div id="center2" :style="{width: '100%', height: '250px'}"></div>-->
<!--              </div>-->
<!--            </a-card>-->
<!--          </div>-->
<!--        </a-card>-->
<!--      </a-col>-->
<!--    </a-row>-->



<!--    <a-card class="project-list" style="margin-bottom: 24px;" :bordered="false" title="提现趋势图" v-if="shopId == ''">-->
<!--      <div class="extra-wrapper" slot="extra">-->
<!--        <a-form :form="form">-->
<!--          <div class="extra-item">-->
<!--            <a @click="changeDate(1)">本周</a>-->
<!--            <a @click="changeDate(2)">本月</a>-->
<!--            <a @click="changeDate(3)">本年</a>-->
<!--          </div>-->
<!--          <a-range-picker @change="timeChange" v-decorator="[ 'time', {}]" :style="{width: '256px'}" :value="[startTime,endTime]" />-->
<!--        </a-form>-->
<!--      </div>-->
<!--      <div id="bottom1" :style="{width: '100%', height: '400px'}"></div>-->
<!--    </a-card>-->
  </div>
</template>

<script>
  import ChartCard from '@/components/ChartCard'
  import ACol from "ant-design-vue/es/grid/Col"
  import ATooltip from "ant-design-vue/es/tooltip/Tooltip"
  import moment from 'moment'
  import { getLoginfo,getVisitInfo } from '@/api/api'
  import { getAction } from '@/api/manage'

  moment.locale('zh-cn');

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
        startTime:"",
        endTime:"",
        form: this.$form.createForm(this),
        shopId:"",
        saleTime:[],
        saleMoney:[],
        sales:"",
        orderTime:[],
        dayOrderCount:[],
        orderCount:"",
        evaluateTime:[],
        dayEvaluateCount:[],
        evaluateCount:"",
        shopCount:"",
        userData:[],
        appUseData:[],
        shopOrderData:[],
        orderStatusData:[],
        withdrawTime:[],
        withdrawShop:[],
        withdrawUser:[],
        url: {
          saleDataForWeek: "/index/dataStatistics/saleDataForWeek",
          orderDataForWeek: "/index/dataStatistics/orderDataForWeek",
          evaluateDataForWeek: "/index/dataStatistics/evaluateDataForWeek",
          shopCount: "/index/dataStatistics/shopCount",
          userData: "/index/dataStatistics/userData",
          appUseData:"/index/dataStatistics/appUseData",
          shopOrderData:"/index/dataStatistics/shopOrderData",
          orderStatusData:"/index/dataStatistics/orderStatusData",
          withdrawData:"/index/dataStatistics/withdrawData",
        },
      }
    },
    created() {
      this.getShopInfo();
      setTimeout(() => {
        this.loading = !this.loading
        this.drawLine();
        this.changeDate(1);
      }, 1000);
    },
    mounted(){
      const that=this;
      setTimeout(() => {//解决图表超出容器
        this.$nextTick(() => {
          this.drawLine();
          this.changeDate(1);
        });
      }, 3000);
      window.addEventListener("resize", function() {
        that.chartTop1.resize();
        that.chartTop2.resize();
        that.chartTop3.resize();
        that.center1.resize();
        that.center2.resize();
        that.bottom1.resize();
      });
    },
    methods: {
      drawLine(){
        // 顶部图表
        this.chartTop1 = this.$echarts.init(document.getElementById('chartTop1'));
        this.chartTop2 = this.$echarts.init(document.getElementById('chartTop2'));
        this.chartTop3 = this.$echarts.init(document.getElementById('chartTop3'));

        var option1={
          tooltip : {
            trigger: 'axis',
            formatter:'{a}<br/>{b} : {c}元'
          },
          calculable:false,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              show : false, //设置为true时候显示
              data : this.saleTime/*['2019-12-03','2019-12-04','2019-12-05','2019-12-06','2019-12-07','2019-12-08','2019-12-09']*/
            }
          ],
          yAxis : [
            {
              type : 'value',
              show : false, //设置为true时候显示
            }
          ],
          series : [
            {
              name:'销售额',
              type:'line',
              smooth:true,
              symbol: 'none',  //取消折点圆圈
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default',
                    color:'#975fe4'
                  },
                  lineStyle: {
                    width:0//不显示线条
                  }
                }
              },
              data:this.saleMoney,
            }
          ],
          grid: { // 控制图的大小，调整下面这些值就可以，
            x: 0,
            x2: 0,
            y:0,
            y2: 0// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
        };
        this.chartTop1.setOption(option1);

        var option2={
          tooltip : {
            trigger: 'axis',
            formatter:'{a}<br/>{b} : {c}单'
          },
          calculable:false,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              show : false, //设置为true时候显示
              data : this.orderTime/*['2019-12-03','2019-12-04','2019-12-05','2019-12-06','2019-12-07','2019-12-08','2019-12-09']*/
            }
          ],
          yAxis : [
            {
              type : 'value',
              show : false, //设置为true时候显示
            }
          ],
          series : [
            {
              name:'订单量',
              type:'bar',
              barWidth: 30,//柱图宽度
              itemStyle: {
                normal: {
                  borderRadius: 2,
                  barBorderRadius:2,
                  color:'#59c5f7'
                }
              },
              data:this.dayOrderCount/*[100, 20, 50, 60, 30, 20, 40]*/,
            }
          ],
          grid: { // 控制图的大小，调整下面这些值就可以，
            x: 0,
            x2: 0,
            y:0,
            y2: 0// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
        };
        this.chartTop2.setOption(option2);

        var option3={
          tooltip : {
            trigger: 'axis',
            formatter:'{a}<br/>{b} : {c}个'
          },
          calculable:false,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              show : false, //设置为true时候显示
              data : this.evaluateTime/*['2019-12-03','2019-12-04','2019-12-05','2019-12-06','2019-12-07','2019-12-08','2019-12-09']*/
            }
          ],
          yAxis : [
            {
              type : 'value',
              show : false, //设置为true时候显示
            }
          ],
          series : [
            {
              name:'评论数',
              type:'line',
              smooth:true,
              symbol: 'none',  //取消折点圆圈
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default',
                    color:'#cceafe'
                  },
                  lineStyle: {
                    color:'#26a6f6'
                  }
                }
              },
              data:this.dayEvaluateCount,
            }
          ],
          grid: { // 控制图的大小，调整下面这些值就可以，
            x: 0,
            x2: 0,
            y:0,
            y2: 0// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
        };
        this.chartTop3.setOption(option3);

        // 中部图表

        this.center2= this.$echarts.init(document.getElementById('center2'));

        var optionCenter2 = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            icon:'circle',//圆图表
            align:'left',//使icon在左侧显示
            orient : 'vertical',
            x : 'right',
            y : 'center',
            data:['待付款','待发货','待签收','待评价','已完成','已关闭','已取消'],
            formatter:function (name) {
              // 获取legend显示内容
              let data = optionCenter2.series[0].data;
              let total = 0;
              let tarValue = 0;
              for (let i = 0; i < data.length;i++) {
                total =parseInt(total)+ parseInt(data[i].value);
                if (data[i].name == name) {
                  tarValue = data[i].value;
                }
              }
              let p = (tarValue / total * 100).toFixed(2);
              return name + ' ' + '| ' +tarValue+"单（"+ p + '%）';
            }
          },
          series : [
            {
              name:'订单数据',
              type:'pie',
              radius : ['40%', '66%'],
              center: ['35%', '60%'],
              itemStyle : {
                normal : {
                  label : {
                    show : false   //隐藏标示文字
                  },
                  labelLine : {
                    show : false   //隐藏标示线
                  }
                }
              },
              //data:this.orderStatusData,
              color: ['#996699', '#c280ff','#ec808d','#99d5fd','#FF8800','#E63F00','#5500FF']
            }
          ]
        };
        this.center2.setOption(optionCenter2)
        this.center1 = this.$echarts.init(document.getElementById('center1'));
        var optionCenter1 = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            icon:'circle',//圆图表
            align:'left',//使icon在左侧显示
            orient : 'vertical',
            x : 'right',
            y : 'center',
            //data:['自营商品','店铺商品'],
            data:['待付款','待发货','待签收','待评价','已完成','已关闭','已取消'],
            formatter:function (name) {
              // 获取legend显示内容
              let data = optionCenter2.series[0].data;
              let total = 0;
              let tarValue = 0;
              for (let i = 0; i < data.length;i++) {
                total =parseInt(total)+ parseInt(data[i].value);
                if (data[i].name == name) {
                  tarValue = data[i].value;
                }
              }
              let p = (tarValue / total * 100).toFixed(2);
              return name + ' ' + '| ' +tarValue+"单（"+ p + '%）';
            }
          },
          series : [
            {
              name:'订单数据',
              type:'pie',
              radius : ['40%', '66%'],
              center: ['35%', '60%'],
              itemStyle : {
                normal : {
                  label : {
                    show : false   //隐藏标示文字
                  },
                  labelLine : {
                    show : false   //隐藏标示线
                  }
                }
              },
              //data:this.shopOrderData ,
              //data:this.orderStatusData,
              color: ['#996699', '#c280ff','#ec808d','#99d5fd','#FF8800','#E63F00','#5500FF']
            }
          ]
        };
        this.center1.setOption(optionCenter1);


      },
      timeChange(a,b){
        this.bottomChart(b[0],b[1]);
      },
      bottomChart(startTime,endTime){
        //这块代码放在请求数据成功后里
        this.bottom1 = this.$echarts.init(document.getElementById('bottom1'));
        var optionBottom1 = {
          tooltip : {
            trigger: 'axis'
          },
          grid: { // 控制图的大小，调整下面这些值就可以，
            x: 40,
            x2: 20,
            y:30,
            y2: 75// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
          legend: {
            icon:'circle',//圆图表
            align:'left',//使icon在左侧显示
            orient : 'horizontal',
            x : 'right',
            y : 'top',
            data:['订单趋势']
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              margin:15,
              textStyle: {color:'#333',fontSize:13}
            },
            axisLine:{//坐标轴的样式
              lineStyle:{
                color: '#d9d9d9',//坐标轴的颜色
                width: 1,//坐标轴的宽度
                type: 'solid'////坐标轴线条的样式
              }
            },
            axisTick:{//更改坐标轴的刻度
              lineStyle:{
                width:0//设置为零让坐标轴刻度消失
              }
            },

            data: this.withdrawTime,
            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            axisLine:{//坐标轴的样式
              length:'2',
              lineStyle:{
                color: '#ffff',//坐标轴的颜色
                width: 0,//坐标轴的宽度
                type: 'solid'////坐标轴线条的样式
              }
            },
            splitLine:{//分割线
              show:true,//分割线取消显示
              lineStyle:{
                color: ['#f4f4f4'],
                width: 1,
                type: 'solid'
              }

            },
            axisLabel: {
              interval: 0,
              textStyle: {color:'#333'}
            },
            axisTick:{//坐标轴刻度
              lineStyle:{
                width:1,//设置零刻度尺就会消失
                color: ['#f4f4f4']
              }
            }

          },
          series: [
            {
              name: '订单趋势',
              type: 'line',
              stack: '订单趋势',
              data: this.withdrawUser,
              //data: [820, 932, 901, 934, 1290, 1330, 1320],
              itemStyle:{
                normal: {                   // 系列级个性化，横向渐变填充
                  borderRadius: 2,
                  barBorderRadius:2,
                  color: "#108de9",
                  label : {
                    show : true,
                    position: 'top',
                    textStyle : {
                      fontSize : '15',
                      fontFamily : '微软雅黑',
                      color:"#333333",
                      fontWeight : 'bold'
                    }
                  }
                }

              }
            },

          ]

        };
        this.bottom1.setOption(optionBottom1);
      },
      changeDate(type){
        var startTime;
        var endTime;
        switch (type) {
          case 1:
            startTime=moment().week(moment().week()).startOf('week');
            endTime=moment().week(moment().week()).endOf('week')
            break;
          case 2:
            startTime = moment().month(moment().month()).startOf('month');
            endTime = moment().month(moment().month()).endOf('month');
            break;
          case 3:
            startTime = moment().year(moment().year()).startOf('year');
            endTime = moment().year(moment().year()).endOf('year');
            break;
        }
        this.startTime=startTime;
        this.endTime=endTime;
        this.form.setFieldsValue({'time':[startTime,endTime]});
        this.bottomChart(startTime.format('YYYY-MM-DD'),endTime.format('YYYY-MM-DD'));
        this.getWithdrawData();
      },
      //获取销售额数据
      getsaleData(){
        const that = this;
        getAction(this.url.saleDataForWeek).then((res)=>{
          if(res.success){
            var dataSource = res.result;
            that.sales = dataSource[dataSource.length -1].sales;
            for(var i = 0;i<dataSource.length-1;i++){
              that.saleTime.push(dataSource[i].time);
              that.saleMoney.push(dataSource[i].orderMoney);
            }
          }
        });
      },
      //获取近7天订单数据
      getorderDataForWeek(){
        const that = this;
        getAction(this.url.orderDataForWeek).then((res)=>{
          if(res.success){
            var dataSource = res.result;
            that.orderCount = dataSource[dataSource.length -1].orderCount;
            for(var i = 0;i<dataSource.length-1;i++){
              that.orderTime.push(dataSource[i].time);
              that.dayOrderCount.push(dataSource[i].dayOrderCount);
            }
          }
        });
      },
      //获取近7天评价数据
      getEvaluateDataForWeek(){
        const that = this;
        getAction(this.url.evaluateDataForWeek).then((res)=>{
          if(res.success){
            var dataSource = res.result;
            that.evaluateCount = dataSource[dataSource.length -1].evaluateCount;
            for(var i = 0;i<dataSource.length-1;i++){
              that.evaluateTime.push(dataSource[i].time);
              that.dayEvaluateCount.push(dataSource[i].dayEvaluateCount);
            }
          }
        });
      },
      //获取店铺总数
      getShopCount(){
        const that = this;
        getAction(this.url.shopCount).then((res)=>{
          if(res.success){
            that.shopCount = res.result;
          }
        });
      },
      //获取用户数据
      getUserData(){
        const that = this;
        getAction(this.url.userData).then((res)=>{
          if(res.success){
            that.userData = res.result;
          }
        });
      },
      //获取店铺和自营的订单数据
      getShopOrderData(){
        const that = this;
        getAction(this.url.shopOrderData).then((res)=>{
          if(res.success){
            that.shopOrderData = res.result;
          }
        });
      },
      //按订单状态获取订单数据
      getOrderStatusData(){
        const that = this;
        getAction(this.url.orderStatusData).then((res)=>{

          if(res.success){
            that.orderStatusData = res.result;
          }
        });
      },
      //获取用户提现数据
      getWithdrawData(){
        const that = this;
        if(this.startTime == "" || this.endTime == ''){
          this.changeDate(1);
        }
        this.withdrawUser=[];
        this.withdrawTime=[];
        this.withdrawShop=[];
        getAction(this.url.withdrawData,{"startTime":this.startTime.format('YYYY-MM-DD'),"endTime":this.endTime.format('YYYY-MM-DD')}).then((res)=>{
          if(res.success){
            var withdrawData = res.result;
            for(var i=0;i<withdrawData.length;i++){
              that.withdrawTime.push(withdrawData[i].time);
              that.withdrawShop.push(withdrawData[i].shop);
              that.withdrawUser.push(withdrawData[i].value);
            }
            this.bottomChart();
          }
        });
      },
      getAppUseData(){
        const that = this;
        getAction(this.url.appUseData).then((res)=>{
          if(res.success){
            that.appUseData = res.result;
          }
        });
      },
      //获取店铺信息详情
      getShopInfo(){
        var that = this;
        this.getShopCount();
        this.getUserData();
        this.getAppUseData();

        this.getsaleData();
        this.getorderDataForWeek();
        this.getEvaluateDataForWeek();
        // this.getOrderStatusData();
      },

    }
  }
</script>

<style lang="scss" scoped>
  .circle-cust{
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