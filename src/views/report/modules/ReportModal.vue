<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :footer="null"
    cancelText="关闭">
    <a-form :form="form">
      <a-card size="small" title="投诉人信息" :bordered="false" :headStyle="headStyle" style="margin-bottom: 20px;">

        <a-row class="contentRow">
          <a-col :span="12">
            姓名:<span class="content">{{model.nickname}}</span>
          </a-col>
          <a-col :span="12">
            手机号:<span class="content">{{model.mobile}}</span>
          </a-col>
        </a-row>
        <a-row class="contentRow">
          <a-col :span="12">
            举报类型:<span class="content">{{model.reportType}}</span>
          </a-col>
          <a-col :span="12">
            举报内容:<span class="content">{{model.reportContent}}</span>
          </a-col>
        </a-row>

        <a-row class="contentRow">
          <a-col :span="12">
            人/群:<span class="content">{{model.targetType | sexFilter}}</span>
          </a-col>
          <a-col :span="12">
            名称:<span class="content">{{model.targetName}}</span>
          </a-col>
        </a-row>


        <a-row class="contentRow">
          <a-col :span="12">
            举报图片
            <img style="width: 48px;height: 48px;margin-top: 5px;margin-right: 5px;" v-if="model.reportImage"
                 v-for="(img,imgIndex) in model.reportImage.split(',')"
                 :src="img"
                 preview="举报图片" />
          </a-col>
        </a-row>

        <!--下放违规点击后弹出选择店铺的弹框-->
<!--        <a-button v-has="'compliant:acceptance'" v-if="model.status==1&&type!=0" @click="openShopSelect">受理同时下放违规</a-button>-->

      </a-card>

<!--      <a-card v-has="'compliant:shopUp'" v-if="model.status==2&&type!=0" size="small" title="商家上传的凭证" :bordered="false" :headStyle="headStyle"-->
<!--              style="margin-bottom: 20px;">-->
<!--        &lt;!&ndash;商家上传凭证&ndash;&gt;-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label=" ">-->
<!--          <a-upload-->
<!--            v-decorator="['shopVoucher', validatorRules.shopVoucher]"-->
<!--            listType="picture-card"-->
<!--            :multiple="true"-->
<!--            :beforeUpload="beforeUpload"-->
<!--            :customRequest="upShopVoucherImg"-->
<!--            :fileList="shopVoucherArr"-->
<!--            @change="handleShopVoucherArrChange"-->
<!--            @preview="handlePreview"-->
<!--          >-->
<!--            <div v-if="shopVoucherArr.length<3">-->
<!--              <a-icon type="plus"/>-->
<!--              <div class="ant-upload-text">上传凭证</div>-->
<!--            </div>-->
<!--          </a-upload>-->

<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label=" ">-->
<!--          <a-textarea :rows="5" maxlength="255" placeholder="请输入备注信息.." v-decorator="['shopMsg', {}]"/>-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash;商家上传凭证&ndash;&gt;-->
<!--        <a-button @click="upShopVoucher">保存</a-button>-->
<!--      </a-card>-->

      <!--商家上传凭证的展示-->
      <a-card v-if="model.status>2" size="small" title="商家上传的凭证" :bordered="false" :headStyle="headStyle"
              style="margin-bottom: 20px;">
        <a-row class="contentRow">
          商家凭证
        </a-row>

        <a-row class="contentRow">
          <img style="margin-top: 5px;margin-right: 5px;" class="contentImg"
               v-for="(img,imgIndex) in model.shopVoucher.split(',')"
               :src="url.imgerver+'/'+img"
               preview="商家凭证"
          />
        </a-row>

        <a-row class="contentRow">
          备注信息:
          <span class="content">{{model.shopMsg||'-'}}</span>
        </a-row>
      </a-card>

      <!--平台反馈-->
      <a-card v-if="model.isHandle==0" size="small" title="处理意见" :bordered="false" :headStyle="headStyle"
              style="margin-bottom: 20px;">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label=" ">
          <a-textarea :rows="5" maxlength="255" placeholder="请输入反馈结果.."
                      v-decorator="['handleResult', validatorRules.platformDisposeMsg]"/>
        </a-form-item>

        <!--保存平台反馈结果-->
        <a-button @click="upPlatformDispose">保存</a-button>

      </a-card>

      <!--平台结果的展示-->
      <a-card v-if="model.isHandle == 1" size="small" title="处理意见" :bordered="false" :headStyle="headStyle"
              style="margin-bottom: 20px;">

        <a-row class="contentRow">
          {{model.handleResult}}
        </a-row>

<!--        <a-row class="contentRow">-->
<!--          <img style="margin-top: 5px;margin-right: 5px;" class="contentImg"-->
<!--               v-for="(img,imgIndex) in model.platformDisposeImg.split(',')"-->
<!--               :src="url.imgerver+'/'+img"-->
<!--               preview="平台反馈结果"-->
<!--          />-->
<!--        </a-row>-->

      </a-card>

      <!--选择店铺模态框-->
      <a-modal
        title="选择店铺"
        :visible="visibleShop"
        @ok="handleOkShop"
        @cancel="handleCancelShop"
      >
        <a-select
          show-search
          style="width: 120px"
          placeholder="选择店铺"
          :filter-option="filterOption"
          @change="selectHandleShop"
          :value="selectShopId"
        >
          <a-select-option v-for="(item,index) in shopList" :key="item.id">
            {{ item.shopName }}
          </a-select-option>
        </a-select>

      </a-modal>

      <!--图片预览模态框-->
      <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </a-form>

  </a-modal>
</template>

<script>
    import {httpAction, getAction, postAction2} from '@/api/manage'
    import pick from 'lodash.pick'
    import moment from "moment"
    import ossUpload from '@/utils/ossUpload.js'

    export default {
        name: "ReportModal",
        data() {
            return {
                title: "操作",
                visible: false,
                model: {},
                previewImage: '',
                previewVisible: false,
                labelCol: {
                    xs: {span: 0},
                    sm: {span: 0},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
                type: 0,
                confirmLoading: false,
                form: this.$form.createForm(this),
                validatorRules: {
                    shopVoucher: {rules: [{required: true, message: '请输入上传凭证'}]},
                    platformDisposeMsg: {rules: [{required: true, message: '请输入处理意见'}]},
                },
                headStyle: {
                    "font-weight": "bold",
                    "font-size": "16px",
                    "border-bottom": "0"
                },
                url: {
                    add: "/compliant/iPRCompliant/add",
                    edit: "/compliant/iPRCompliant/edit",
                    imgerver: window._CONFIG['fileURL'],
                },
                uploadLoading1: false,
                visibleShop: false,
                selectShopId: undefined,
                shopList: [],//带下放店铺列表
                shopVoucherArr: [],//商家凭证列表
                platformDisposeImgArr: []//平台反馈结果
            }
        },
        created() {

        },
      filters: {
        sexFilter (status) {
          const statusMap = {
            1: '人',
            2: '群'
          }
          return statusMap[status]
        },
        statusFilter (status) {
          const statusMap = {
            1: '正常',
            2: '冻结'
          }
          return statusMap[status]
        },
        rzStatusFilter (status) {
          const statusMap = {
            1: '未认证',
            2: '已认证',
            3: '审核中',
            4: '审核失败'
          }
          return statusMap[status]
        },
        userTypeFilter (status) {
          const statusMap = {
            1: '总代',
            2: '战略',
            3: '董事',
            4: '奔驰董事',
            5: '总代加持'
          }
          return statusMap[status]
        },
        carAwardFilter (status) {
          const statusMap = {
            0: '未完成',
            2: '已完成',
            3: '已领取'
          }
          return statusMap[status]
        },
        housingFilter (status) {
          const statusMap = {
            0: '未完成',
            2: '已完成',
            3: '已领取'
          }
          return statusMap[status]
        }
      },
        methods: {
            /**
             *
             * @param record
             * @param type 0:查看
             */
            edit(record, type) {
                this.form.resetFields();
                this.shopVoucherArr = [];
                this.platformDisposeImgArr = [];

                this.type = type;
                this.model = Object.assign({}, record);
                this.visible = true;
            },
            close() {
                this.$emit('close');
                this.visible = false;
            },
            handleOk() {
                const that = this;
                // 触发表单验证
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.confirmLoading = true;
                        let httpurl = '';
                        let method = '';
                        if (!this.model.id) {
                            httpurl += this.url.add;
                            method = 'post';
                        } else {
                            httpurl += this.url.edit;
                            method = 'put';
                        }
                        let formData = Object.assign(this.model, values);
                        //时间格式化
                        formData.submitTime = formData.submitTime ? formData.submitTime.format() : null;
                        formData.compliantTime = formData.compliantTime ? formData.compliantTime.format() : null;
                        formData.upShopVoucherTime = formData.upShopVoucherTime ? formData.upShopVoucherTime.format() : null;
                        formData.checkTime = formData.checkTime ? formData.checkTime.format() : null;

                        httpAction(httpurl, formData, method).then((res) => {
                            if (res.success) {
                                that.$message.success(res.message);
                                that.$emit('ok');
                            } else {
                                that.$message.warning(res.message);
                            }
                        }).finally(() => {
                            that.confirmLoading = false;
                            that.close();
                        })
                    }
                })
            },
            handleCancel() {
                this.close()
            },
            openShopSelect() {
                this.visibleShop = true;
            },
            beforeUpload: function (file) {
                var fileType = file.type;
                if (fileType.indexOf('image') < 0) {
                    this.$message.warning('请上传图片');
                    return false;
                }
            },
            //店铺上传凭证
            upShopVoucherImg(file) { //上传主图(一张图)
                var that = this;
                ossUpload.ossUpload(file.file, function (fileName) {
                    that.shopVoucherArr.forEach(e => {
                        if (e.uid == file.file.uid) {
                            e['url'] = that.url.imgerver + '/' + fileName;
                            e['response'] = {
                                success: true,
                                message: fileName
                            };
                            e['status'] = 'done';
                        }
                    });
                    that.handleShopVoucherArrChange({fileList: that.shopVoucherArr})
                })
            },
            //店铺上传凭证Change 处理方法
            handleShopVoucherArrChange({fileList}) {
                this.shopVoucherArr = fileList;
                fileList = fileList.filter((file) => {
                    if (file.response) {
                        return file.response.success;
                    }
                    return false;
                });

                if (fileList.length == 0) {
                    this.model.imgIdArray = '';
                }
                var imgIdArrays = '';
                fileList.map(file => {
                    imgIdArrays += file.response.message + ",";
                });
                if (imgIdArrays.length > 0) {
                    imgIdArrays = imgIdArrays.substring(0, imgIdArrays.length - 1);
                }
                this.model.shopVoucher = imgIdArrays;
            },

            //平台反馈结果上传
            upPlatformDisposeImg(file) { //上传主图(一张图)
                var that = this;
                ossUpload.ossUpload(file.file, function (fileName) {
                    that.platformDisposeImgArr.forEach(e => {
                        if (e.uid == file.file.uid) {
                            e['url'] = that.url.imgerver + '/' + fileName;
                            e['response'] = {
                                success: true,
                                message: fileName
                            };
                            e['status'] = 'done';
                        }
                    });
                    that.handlePlatformDisposeImgArrChange({fileList: that.platformDisposeImgArr})
                })
            },
            //平台反馈结果上传Change 处理方法
            handlePlatformDisposeImgArrChange({fileList}) {
                this.platformDisposeImgArr = fileList;
                fileList = fileList.filter((file) => {
                    if (file.response) {
                        return file.response.success;
                    }
                    return false;
                });

                if (fileList.length == 0) {
                    this.model.imgIdArray = '';
                }
                var imgIdArrays = '';
                fileList.map(file => {
                    imgIdArrays += file.response.message + ",";
                });
                if (imgIdArrays.length > 0) {
                    imgIdArrays = imgIdArrays.substring(0, imgIdArrays.length - 1);
                }
                this.model.platformDisposeImg = imgIdArrays;
            },

            selectHandleShop(v) {
                this.selectShopId = v;
            },
            //下放违规至指定店铺
            handleOkShop() {
                if (!this.selectShopId) {
                    this.$message.warning("请选择店铺");
                }
                var that = this;
                var url = "/compliant/iPRCompliant/acceptance/" + this.model.id + "/" + this.selectShopId;
                httpAction(url, {}, "post").then((res) => {
                    if (res.success) {
                        that.$emit('ok');
                        that.selectShopId = undefined;
                        that.visibleShop = false;
                        that.visible = false;
                        that.$message.success(res.message);
                    } else {
                        that.$message.warning(res.message);
                    }
                });
            },
            //关闭下放违规的弹框
            handleCancelShop() {
                this.selectShopId = undefined;
                this.visibleShop = false;
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
            //商家上传凭证
            upShopVoucher() {
                const that = this;
                // 触发表单验证
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.confirmLoading = true;
                        let formData = {};
                        formData['id'] = that.model.id;
                        formData['shopVoucher'] = that.model.shopVoucher;
                        formData['shopMsg'] = values.shopMsg;
                        postAction2("/compliant/iPRCompliant/shopUp", formData).then((res) => {
                            if (res.success) {
                                that.$message.success(res.message);
                                that.$emit('ok');
                            } else {
                                that.$message.warning(res.message);
                            }
                        }).finally(() => {
                            that.confirmLoading = false;
                            that.close();
                        })
                    }
                })
            },
            //预览轮播图
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImage = file.url || file.preview;
                this.previewVisible = true;
            },
            //保存平台反馈结果
            upPlatformDispose() {
                const that = this;
                // 触发表单验证
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.confirmLoading = true;
                        let formData = {};
                        formData['id'] = that.model.id;
                        // formData['platformDisposeImg'] = that.model.platformDisposeImg;
                        formData['handleResult'] = values.handleResult;
                        postAction2("/report/report/platformUp", formData).then((res) => {
                            if (res.success) {
                                that.$message.success(res.message);
                                that.$emit('ok');
                            } else {
                                that.$message.warning(res.message);
                            }
                        }).finally(() => {
                            that.confirmLoading = false;
                            that.close();
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
  .content {
    margin-left: 5px;
  }

  .contentImg {
    width: 100px;
    height: 100px;
    margin-left: 5px;
  }

  .contentRow {
    margin-bottom: 20px;
  }


</style>