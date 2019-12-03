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
          label="课程">
          <a-select v-decorator="['curriculumId', {rules:[{required: true, message: '请选择课程..'}]}]"
                    placeholder="请选择课程"
                    allowClear
                    @change="handleCurriculumChange">
            <a-select-option v-for="(course,index) in courseList" :key="index.toString()"
                             :value="course.id">
              {{course.goodsName}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="目录等级">
          <a-select v-decorator="['level', {rules:[{required: true, message: '请选择目录等级..'}]}]"
                    placeholder="请选择目录级别"
                    allowClear
                    @change="handleLevelChange">
            <a-select-option :value="1">一级目录</a-select-option>
            <a-select-option :value="2">二级目录</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="父级目录"
          v-if="isShow">
          <a-select v-decorator="['pid', {rules:[{required: true, message: '请选择父级目录..'}]} ]"
                    allowClear
                    placeholder="请选择父级目录">
            <a-select-option v-for="(curriculum,index) in curriculumList" :key="index.toString()"
                             :value="curriculum.id">
              {{curriculum.name}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="目录名称">
          <a-input placeholder="请输入目录名称" v-decorator="['name', {rules:[{required: true, message: '请输入目录名称..'}]}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="课程链接"
          v-if="isShow">
          <a-input placeholder="请输入课程链接" v-decorator="['link', {rules:[{required: true, message: '请输入课程链接..'}]}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否试看"
          v-if="isShow">
          <a-select v-decorator="[ 'isTemporary', {rules:[{required: true, message: '请选择是否试看..'}]}]"
                    placeholder="请选择是否试看"
                    allowClear
                    @change="handleIsTemporaryChange">
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">是</a-select-option>
          </a-select>
          <!--<a-input placeholder="请输入是否试看0:否1:是" v-decorator="['isTemporary', {}]" />-->
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="试看链接"
          v-if="isShow1">
          <a-input placeholder="请输入试看链接" v-decorator="['temporaryLink', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input placeholder="请输入排序" v-decorator="['sort', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import {getCurriculumList, getCourseList} from "@/api/api"

  export default {
    name: "CurriculumDirectoryModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
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
        validatorRules:{

        },
        curriculumList: [],
        curriculum: {},
        courseList: [],
        course: {},
        isShow: true,
        isShow1 : true,
        url: {
          add: "/curriculum/curriculumDirectory/add",
          edit: "/curriculum/curriculumDirectory/edit",
        },
      }
    },
    created () {
      //this.queryCurriculumList();
      this.queryCourseList();
    },
    methods: {
      add () {
        this.isShow = true;
        this.isShow1 = true;
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log(record);
        if (record.level == "1") {
          this.isShow = false;
          this.isShow1 = false;
        }else {
          this.isShow = true;
          if(record.isTemporary == "0") {
            this.isShow1 = false;
          }else {
            this.isShow1 = true;
          }
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pid','curriculumId','level','name','link','isTemporary','temporaryLink','sort'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
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
            
            console.log(formData);
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },
      queryCurriculumList() {
        getCurriculumList().then((res) => {
          console.log(res.result);
          if (res.success) {
            this.curriculumList = res.result;
          }
        })
      },
      queryCourseList() {
        getCourseList().then((res) => {
          console.log(res.result);
          if (res.success) {
            this.courseList = res.result;
          }
        })
      },
      handleLevelChange(value){
        if (value == "1") {
          this.isShow = false;
          this.isShow1 = false;
          this.model.pid = '0';
          this.model.link = "";
          this.model.isTemporary = "0";
          this.model.temporaryLink = "";
        }else {
          this.isShow = true;
          this.isShow1 = true;
        }
      },
      handleIsTemporaryChange(value){
        if (value == "0") {
          this.isShow1 = false;
        }else {
          this.isShow1 = true;
        }
      },
      handleCurriculumChange(value){
        getCurriculumList({id : value.toString()}).then((res) => {
          console.log(res.result);
          if (res.success) {
            this.curriculumList = res.result;
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>