<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品名称">
          <a-input placeholder="请输入商品名称" v-decorator="['goodsName', validatorRules.goodsName ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起拍价">
          <a-input-number v-decorator="[ 'startPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预估价">
          <a-input-number v-decorator="[ 'budgetPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="限高价">
          <a-input-number v-decorator="[ 'evaluatePrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="限低价">
          <a-input-number v-decorator="[ 'minPrice', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高价">
          <a-input-number v-decorator="[ 'maxPrice', validatorRules.maxPrice ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="顶一手价格">
          <a-input-number v-decorator="[ 'addPrice', validatorRules.addPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="佣金">
          <a-input-number v-decorator="[ 'commissionPrice', validatorRules.commissionPrice ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请选择分类">
          <a-select
            showSearch
            style="width: 100%"
            placeholder="请选择分类"
            v-decorator="[ 'categoryId', validatorRules.categoryId]"
            optionFilterProp="children"
          >
            <a-select-option v-for="(category,categoryindex) in goodsCategoryList" :key="categoryindex" :value="category.id" >
              {{category.categoryName}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积分返还比例">
          <a-input-number v-decorator="[ 'returnRatio', validatorRules.returnRatio ]"  />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品主图">

          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrlPic" :src="this.model.mainImage" alt="商品主图" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <!-- 轮播图mainImages -->
        <a-form-item label="轮播图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :action="uploadAction"
            :fileList="fileListLb"
            :multiple="true"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @preview="handlePreview"
            @change="handleChangeLb"
          >
            <div v-if="fileListLb.length < 6">
              <a-icon type="plus"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
            <img alt="example" style="width: 100%" :src="previewImage"/>
          </a-modal>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品详情">
          <j-editor v-model="jeditor.goodsDesc"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开拍时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'startTime', validatorRules.startTime ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endTime', validatorRules.endTime ]" />
        </a-form-item>


       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="测试时间">
          <a-range-picker
            @change="getDateTime"
            :disabledDate="disabledDate"
            :disabledTime="disabledRangeTime"
            :showTime="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>-->

       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品状态">
          <a-select v-decorator="[ 'status', validatorRules.status]" placeholder="请选择商品状态">
            <a-select-option value="1">上架</a-select-option>
            <a-select-option value="0">下架</a-select-option>
          </a-select>
        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import Vue from 'vue'
  import {selectCategoryList} from '@/api/api'
  import JEditor from '@/components/jeecg/JEditor'
  import {ACCESS_TOKEN} from "@/store/mutation-types"

  export default {
    name: "GoodsModal",
    components: {
        JEditor
    },
    data () {
      return {
        title:"操作",
        visible: false,
        previewVisible: false,
        previewImage: '',
        fileListLb: [],
        fileTempLb: [],
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        jeditor: {
            goodsDesc:''
        },
        picUrlPic: "",
        headers: {},
        goodsCategoryList:[],
        uploadLoading: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        finishFlag:{rules: [{ required: true, message: '请输入0竞拍未开始  1进行中  2竞拍已完成!' }]},
        goodsName:{rules: [{ required: true, message: '请输入商品名称!' }]},
        goodsNum:{rules: [{ required: true, message: '请输入商品编号!' }]},
        maxPrice:{rules: [{ required: true, message: '请输入最高价!' }]},
        addPrice:{rules: [{ required: true, message: '请输入顶一手价格!' }]},
        commissionPrice:{rules: [{ required: true, message: '请输入佣金!' }]},
        mainImage:{rules: [{ required: true, message: '请输入商品主图!' }]},
          returnRatio:{rules: [{ required: true, message: '请输入返还积分比例!' }]},
        status:{rules: [{ required: true, message: '请输入0：下架   1：上架中!' }]},
        startTime:{rules: [{ required: true, message: '请输入开拍时间!' }]},
        endTime:{rules: [{ required: true, message: '请输入结束时间!' }]},
        },
        url: {
          add: "/goods/goods/add",
          edit: "/goods/goods/edit",
          fileUpload: window._CONFIG['domianURL'] + "/sys/common/uploadQiNiuYun",
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
        },
      }
    },
    created () {
        const token = Vue.ls.get(ACCESS_TOKEN);
        this.headers = {"TOKEN": token};
        this.getGoodsCategoryValue();//初始化商品分类
    },
    computed: {
        uploadAction: function () {
            return this.url.fileUpload;
        }
    },
    methods: {
      moment,
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },

      disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
      },

      disabledDateTime() {
        return {
          disabledHours: () => this.range(0, 24).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      },

      disabledRangeTime(_, type) {
        if (type === 'start') {
          return {
            disabledHours: () => this.range(0, 60).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => this.range(0, 60).splice(20, 4),
          disabledMinutes: () => this.range(0, 31),
          disabledSeconds: () => [55, 56],
        };
      },




      add () {
        this.edit({});
        this.jeditor.goodsDesc = '';
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.jeditor.goodsDesc = decodeURIComponent(this.model.goodsDesc);
        if (record.hasOwnProperty("id")) { //编辑的时候回显主图
          this.picUrlPic = "Has no pic url yet";
        }

        // 轮播图回显
        this.fileListLb = [];
        this.fileTempLb = [];
        let ss = [];
        if (record.mainImages != undefined && record.mainImages != "") {
          this.fileTempLb = record.mainImages.split(",");
          this.fileTempLb.map((item, num) => {
            ss.push({
              uid: num,
              url: item
            });
          })
        }
        this.fileListLb = ss;

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'finishFlag', 'goodsName', 'goodsNum', 'startPrice', 'evaluatePrice', 'minPrice','maxPrice', 'addPrice', 'commissionPrice', 'price', 'moneyRatio', 'score', 'categoryId', 'returnScore','introduction', 'sort', 'mainImage', 'goodsDesc', 'status', 'goodsType', 'dealPrice', 'auctionCount', 'mainImages'))
          //时间格式化
          this.form.setFieldsValue({startTime: this.model.startTime ? moment(this.model.startTime) : null})
          this.form.setFieldsValue({endTime: this.model.endTime ? moment(this.model.endTime) : null})
        });

      },


      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        let goodsDesc = encodeURIComponent(this.jeditor.goodsDesc);
        this.model.goodsDesc = goodsDesc;

        // 轮播图片地址
        this.model.mainImages = this.fileTempLb.toString();

        console.log(goodsDesc)
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            // that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.startTime = formData.startTime?formData.startTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.endTime = formData.endTime?formData.endTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.confirmLoading = false;
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
                // that.confirmLoading = false;
                // that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },
      //初始化商品分类数据
      getGoodsCategoryValue() {
          selectCategoryList().then((res)=>{
              console.log(res);
              if(res.code == 0){
                  this.goodsCategoryList = res.result;
                  console.log(res.result)
              }else{
                  console.log("23333");
              }
          })
      },
      beforeUpload: function (file) {
          var fileType = file.type;
          if (fileType.indexOf('image') < 0) {
              this.$message.warning('请上传图片');
              return false;
          }
          //TODO 验证文件大小
      },
      handleChange(info) { //上传主图(一张图)
          console.log(info);
          this.picUrlPic = "";
          if (info.file.status === 'uploading') {
              this.uploadLoading = true;
              return
          }
          if (info.file.status === 'done') {
              let response = info.file.response;
              this.uploadLoading = false;
              console.log(response);
              if (response.success) {
                  this.model.mainImage = response.message;
                  console.log(this.model.mainImage);
                  this.picUrlPic = "Has no pic url yet";
              } else {
                  this.$message.warning(response.message);
              }
          }
      },
      getAvatarView() {
          return this.url.imgerver + "/" + this.model.mainImage;
      },
      handleSwitch(info) {
        console.log(info);
        if (info) {
            this.model.status == "1";
        } else {
            this.model.status == "0";
        }
      },
      handleCancelImg() {
          this.previewVisible = false
      },
      handlePreview(file) {
          this.mainImages = file.url || file.thumbUrl;
          this.previewVisible = true
      },
      handleChangeLb({file, fileList}) {
          /*debugger;*/
          if (file.status == "removed") {
              this.fileListLb.map((item, index) => {
                  if (item.uid == file.uid) {
                      this.fileListLb.splice(index, 1);
                      this.fileTempLb.splice(index, 1);
                  }
              });
              if (file.name) {
                  this.fileTempLb.map((item, index) => {
                      if (item == file.response.message) {
                          this.fileTempLb.splice(index, 1);
                      }
                  })
              } else {
                  let removeFileImgUrl = file.url.split('view/')[1];
                  this.fileTempLb.map((item, index) => {
                      if (item == removeFileImgUrl) {
                          this.fileTempLb.splice(index, 1);
                      }
                  })
              }
          } else {
              this.fileListLb = fileList;
              this.fileTempLb.push(file.response.message);
          }
      },

      disabledDate(current) {
          // Can not select days before today and today
          return current && current < moment().endOf('day');
      },

      disabledRangeTime(_, type) {
          if (type === 'start') {
              return {
                  disabledHours: () => this.range(0, 60).splice(4, 20),
                  disabledMinutes: () => this.range(30, 60),
                  disabledSeconds: () => [55, 56],
              };
          }
          return {
              disabledHours: () => this.range(0, 60).splice(20, 4),
              disabledMinutes: () => this.range(0, 31),
              disabledSeconds: () => [55, 56],
          };
      },
      getDateTime(date) {
          console.log(date)
          if(date) {
              this.model.startTime = date[0].format('YYYY-MM-DD HH:mm:ss');
              console.log(this.model.startTime)
              this.model.endTime = date[0].format('YYYY-MM-DD HH:mm:ss');
              console.log(this.model.endTime)
          }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>