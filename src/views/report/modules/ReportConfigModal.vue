<template>
  <a-modal
    :title="title"
    :maskClosable=false
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
          label="举报类型">
          <a-input placeholder="请输入.." v-model="jeditor.configValue"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请选择">
          <a-select v-decorator="[ 'configName', validatorRules.musted]" placeholder="请选择">
            <a-select-option value="0">人</a-select-option>
            <a-select-option value="1">群</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
    import {httpAction} from '@/api/manage'
    import pick from 'lodash.pick'
    import Vue from 'vue'
    import JEditor from "../../../components/jeecg/JEditor";

    export default {
        name: "ReportConfigModal",
        components: {JEditor},
        data() {
            return {
                title: "操作",
                visible: false,
                model: {},
                headers: {},
                picUrlPic:"",
                uploadLoading: false,
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 5},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },

                confirmLoading: false,
                form: this.$form.createForm(this),
                validatorRules: {
                  musted: {rules: [{required: true, message: '请选择人或者群!'}]},
                },
                url: {
                    add: "/systemconfig/systemConfig/add",
                    edit: "/systemconfig/systemConfig/edit",
                    fileUpload: window._CONFIG['domianURL'] + "/sys/common/upload",
                    imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
                },
                jeditor: {
                    configValue: '',
                },
                type: 1
            }
        },
        created() {
            const token = Vue.ls.get(ACCESS_TOKEN);
            this.headers = {"TOKEN": token};
        },
        computed: {
            uploadAction: function () {
                return this.url.fileUpload;
            }
        },
        methods: {
            beforeUpload: function (file) {
                var fileType = file.type;
                if (fileType.indexOf('image') < 0) {
                    this.$message.warning('请上传图片');
                    return false;
                }
                //TODO 验证文件大小
            },
            add() {
                this.edit({});
                this.jeditor.configValue = '';
            },
            edit(record) {
                this.type = record.type;
                this.jeditor.configValue = record.configValue;
                this.form.resetFields();
                this.model = Object.assign({}, record);
                this.visible = true;
                this.$nextTick(() => {
                    this.form.setFieldsValue(pick(this.model, 'configName', 'configGroup', 'title', 'description', 'configType', 'configValue', 'content', 'rule', 'extend', 'type'))
                    //时间格式化
                });
            },
            close() {
                this.$emit('close');
                this.visible = false;
            },
            handleOk() {
                const that = this;
                if (this.model.type == 2) {
                    this.model.configValue = this.jeditor.configValue;
                } else {
                    this.model.configValue = this.jeditor.configValue;
                }
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

                        console.log(formData);
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
            handleChange(info) { //上传主图(一张图)
                this.picUrlPic = "";
                if (info.file.status === 'uploading') {
                    this.uploadLoading = true
                    return
                }
                if (info.file.status === 'done') {
                    let response = info.file.response;
                    this.uploadLoading = false;
                    if (response.success) {
                        this.jeditor.configValue = response.message;
                        this.picUrlPic = "Has no pic url yet";
                    } else {
                        this.$message.warning(response.message);
                    }
                }
            },


        }
    }
</script>

<style lang="less" scoped>

</style>