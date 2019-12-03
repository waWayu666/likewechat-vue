<template>
  <a-modal
    title="选择规格"
    :width="800"
    :visible="visible"
    :bodyStyle="bodyStyle"
    style="top: 0px;"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">

 <!--     <a-row :gutter="12">
        <a-col :xl="22" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :bordered="false" title="选择规格" :style="{ marginTop: '24px',marginLeft:'24px',backgroundColor:'#EEEEEE'}">

            <a-form :form="form">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="商品规格">
                <a-select placeholder="请选择商品规格" @change="showSpecValue">
                  <a-select-option v-for="(goodsSpec,index) in specList" :key="index" :value="goodsSpec.id" >
                    {{ goodsSpec.specName }}
                  </a-select-option>
                </a-select>
                &lt;!&ndash;<div>&ndash;&gt;
                  &lt;!&ndash;<button v-for="(l,i) in specList" :key="i" @click="choiceSkuType(l.id)">&ndash;&gt;
                    &lt;!&ndash;{{l.specName}}&ndash;&gt;
                  &lt;!&ndash;</button>&ndash;&gt;
                &lt;!&ndash;</div>&ndash;&gt;
              </a-form-item>

            </a-form>

          </a-card>
        </a-col>

      </a-row>-->


      <a-row :gutter="12">
        <a-col :xl="22" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :bordered="false" title="选择规格" :style="{ marginTop: '24px',marginLeft:'24px',backgroundColor:'#EEEEEE' }">
           <!-- <div :style="{ borderBottom: '1px solid #E9E9E9' }">
              <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
                全选
              </a-checkbox>
            </div>-->
            <div>
              <!-- <div :style="{ borderBottom: '1px solid #E9E9E9' }">

                 <a-checkbox
                   :indeterminate="indeterminate"
                   @change="onCheckAllChange"
                   :checked="checkAll">
                   全选
                 </a-checkbox>
               </div>-->
              <br />
              <a-checkbox-group  :options="plainOptions"  v-model="checkedList" @change="onChange" >
              </a-checkbox-group>
            </div>

          </a-card>
        </a-col>

      </a-row>

    </a-spin>
  </a-modal>
</template>

<script>

  //import Self from '@/Self'
  import Self from '../../../Self.js'

  import {goodsSpecList,getValueBySpecId} from '@/api/api'
  import {getGoodspace} from '@/api/api'
  import { actionToObject } from '@/utils/permissions'

  export default {
    name: "EditGoodsSpecPage",
    components:{
      Self
    },


    data () {
      return {


        visible: false,
        destroyOnClose:false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),

        bodyStyle:{
          padding: "0",
          height:(window.innerHeight-150)+"px"
        },
        modalWidth:500,

        specList:[],
        loading: true,
        center: null,

        checkedList: "",
        indeterminate: false,
        checkAll: false,
        plainOptions:[],// 规格的数据源

        specValueList:[],
        // specDefautValueList:[] , // 选中的规格的id  用于发送请求 和进行规格的数据回显

        skuValue :[],
        skuValues :[],
        goodsSpecFormat :[],
        attrValueItemsList :[],
        attrValueItemsFormatList :[],




      }
    },
    created () {
      this.specDefautValueList = [];
      this.skuValue = [];
      this.attrValueItemsList = [];
      this.attrValueItemsFormatList =[];
      this.modalWidth = window.innerWidth-0;
      this.initialGoodsSpecList();
    },
    methods: {
      onChange (checkedList) {
        this.skuValue = [];
        if (checkedList.length <= 3) {
          this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
          this.checkAll = checkedList.length === this.plainOptions.length;
        }else {
          alert("最多选定三个规格！");
          checkedList.splice(3,1)
        }
        this.skuValues = checkedList;
      },
     /* onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? this.plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      },*/
      show () {
        this.visible = true;
      },

      close () {
        this.$emit('close');
        this.visible = false;
        this.destroyOnClose = true;
      },

      handleOk(){
        let sku = this.skuValues.toString();
        getGoodspace(sku,null).then(res=>{
          console.log(res);
          if (res.code === 1) {
            this.skuValues = res.data.spaceList;
            this.goodsSpecFormat = res.data.goodsSpecFormat;
            console.log(this.skuValues);
            console.log(this.goodsSpecFormat);
            Self.$emit('skuValue',this.skuValues);
            Self.$emit('goodsSpecFormat',this.goodsSpecFormat);
          }
        });
   /*     console.log(this.specValueList)

        this.specList.map(aa=>{
          this.specValueList.map(item=>{
            this.specDefautValueList.map(items=>{
              if(item.id === items && aa.id === item.specId){
                this.skuValue.push({
                  skuName : item.specValueName,
                  skuItem : item.specId + ':' + item.id
                });

              }
            })
          });

        });*/

/*        this.skuValue = this.skuValues;

        console.log("************")
        console.log(this.skuValue)
        console.log("************")

        this.specDefautValueList = []*/
        this.skuValue = [];
        this.attrValueItemsList = [];
        this.attrValueItemsFormatList = [];
        this.close();


      },
      handleCancel () {
        this.visible = false;
      },

      initialGoodsSpecList: function () {
        goodsSpecList().then((res) => {
          if (res.code === 1) {
            this.specList = res.data;
            // this.specValueList = res.data;
            console.log(this.specValueList);
            let i = 0;
            this.specList.map(item => {
           /*   item.value = item.id
              console.log("你你你你你您ininininininin你")
              console.log(this.specList)
              item.label = item.specName*/
              this.specValueList[i] = item.specName;
              i++;
            });
            this.plainOptions = this.specValueList;
          } else {
            console.log(res.message);
          }
        });
      },




      //选择商品规格 切换规格属性值
      /*showSpecValue(val){
        this.specDefautValueList = []
        this.skuValue = []
        getValueBySpecId(val,null).then((res)=>{
          console.log(res.data);
          if(res.code === 1){
            this.specValueList= res.data;
            console.log(this.specValueList)
            this.specValueList.map(item=>{
              item.value = item.id
              console.log("你你你你你您ininininininin你")
              console.log(this.specList)
              item.label = item.specValueName
            })

          }else {
            console.log(res.message);
          }
        });
      },*/


    }
  }
</script>

<style scoped>
</style>

