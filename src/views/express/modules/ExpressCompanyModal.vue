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
          label="物流公司名称">
          <a-input placeholder="请输入物流公司名称" v-decorator="['companyName', validatorRules.companyName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="物流编号">
          <a-input placeholder="请输入物流编号" v-decorator="['expressNo', validatorRules.expressNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用状态">
          <a-select style="width: 100%" placeholder="请选择使用状态" v-decorator="['isEnabled', validatorRules.isEnabled]">
            <a-select-option value="0">未使用</a-select-option>
            <a-select-option value="1">已使用</a-select-option>
          </a-select>
          <!--<a-input-number v-decorator="[ 'isEnabled', validatorRules.isEnabled ]" />-->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['phone', validatorRules.phone ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司logo">
          <a-input placeholder="请输入公司logo" v-decorator="['expressLogo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否设置为默认">
          <a-select style="width: 100%" placeholder="请选择是否默认" v-decorator="['isDefault', validatorRules.isDefault]">
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">默认</a-select-option>
          </a-select>
          <!--<a-input-number v-decorator="[ 'isDefault', validatorRules.isDefault ]" />-->
        </a-form-item>
        <!-- 子表单区域 -->
        <a-tabs v-model="activeKey">
          <a-tab-pane tab="运费模板" :key="refKeys[0]" :forceRender="true">
            <j-editable-table
              :ref="refKeys[0]"
              :loading="orderShippingFeeTable.loading"
              :columns="orderShippingFeeTable.columns"
              :dataSource="orderShippingFeeTable.dataSource"
              :maxHeight="500"
              :rowNumber="true"
              :rowSelection="true"
              :actionButton="true"/>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { FormTypes,VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import JEditableTable from '@/components/jeecg/JEditableTable'

  export default {
    name: "ExpressCompanyModal",
    components: {
    JEditableTable
  },
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
        shopId:{rules: [{ required: true, message: '请输入商铺id!' }]},
        companyName:{rules: [{ required: true, message: '请输入物流公司名称!' }]},
        expressNo:{rules: [{ required: true, message: '请输入物流编号!' }]},
        isEnabled:{rules: [{ required: true, message: '请输入使用状态!' }]},
        phone:{rules: [{ required: true, message: '请输入联系电话!' }]},
        isDefault:{rules: [{ required: true, message: '请输入是否设置为默认 0未设置 1 默认!' }]},
        },
        // 新增时子表默认添加几行空数据
        refKeys: ['orderShippingFee' ],
        activeKey: 'orderShippingFee',
        orderShippingFeeTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '是否默认',
              key: 'isDefault',
              type: FormTypes.select,
              options: [ // 下拉选项
                { title: '否', value: '0' },
                { title: '默认', value: '1' },
              ],
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按件数/首件(件)',
              key: 'bynumSnum',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按件数/首件运费(元)',
              key: 'bynumSprice',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按件数/续件(件)',
              key: 'bynumXnum',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按件数/续件运费(元)',
              key: 'bynumXprice',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '是否启用计件方式运费',
              key: 'bynumIsUse',
              type: FormTypes.select,
              options: [ // 下拉选项
                { title: '否', value: '0' },
                { title: '默认', value: '1' },
              ],
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按重量/首重(kg)',
              key: 'weightSnum',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按重量/首重运费(元)',
              key: 'weightSprice',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按重量/续重(kg)',
              key: 'weightXnum',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按重量/续重运费(元)',
              key: 'weightXprice',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '是否启用重量方式运费',
              key: 'weightIsUse',
              type: FormTypes.select,
              options: [ // 下拉选项
                { title: '否', value: '0' },
                { title: '默认', value: '1' },
              ],
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按体积/首体积量(m³)',
              key: 'volumeSnum',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按体积/首体积运费(元)',
              key: 'volumeSprice',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按体积/续体积量(m³)',
              key: 'volumeXnum',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '按体积/续体积运费(元)',
              key: 'volumeXprice',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '是否启用体积计算运费',
              key: 'volumeIsUse',
              type: FormTypes.select,
              options: [ // 下拉选项
                { title: '否', value: '0' },
                { title: '默认', value: '1' },
              ],
              defaultValue: '',
              placeholder: '请输入${title}',
            }
          ]
        },
        url: {
          add: "/express/expressCompany/add",
          edit: "/express/expressCompany/edit",
          orderShippingFee: {
            list: '/order/orderShippingFee/queryByExpressCompanyId'
          }
        }
      }
    },
    created () {
    },
    methods: {
      // 获取所有的editableTable实例
      getAllTable() {
        return Promise.all([
          getRefPromise(this, 'orderShippingFee')
        ])
      },
      add () {
        // 默认新增一条数据
        this.getAllTable().then(editableTables => {
          editableTables[0].add()
        })
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'shopId','companyName','expressNo','isEnabled','image','phone','expressLogo','isDefault'))
		  //时间格式化
        });
        // 加载子数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestTableData(this.url.orderShippingFee.list, params, this.orderShippingFeeTable)
        }
      },
      /** 查询某个tab的数据 */
      requestTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
          tab.dataSource = res.result || []
        }).finally(() => {
          tab.loading = false
        })
      },
      close () {
        this.visible = false
        this.getAllTable().then(editableTables => {
          editableTables[0].initialize()
        })
        this.$emit('close');
      },
      handleOk () {
        this.validateFields()
      },
      handleCancel () {
        this.close()
      },
      /** 触发表单验证 */
      validateFields() {
        this.getAllTable().then(tables => {
          /** 一次性验证主表和所有的次表 */
          return validateFormAndTables(this.form, tables)
        }).then(allValues => {
          let formData = this.classifyIntoFormData(allValues)
          // 发起请求
          return this.requestAddOrEdit(formData)
        }).catch(e => {
          if (e.error === VALIDATE_NO_PASSED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeKey = e.index == null ? this.activeKey : (e.index + 1).toString()
          } else {
            console.error(e)
          }
        })
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let orderMain = Object.assign(this.model, allValues.formValue)
        //时间格式化
        return {
          ...orderMain, // 展开
          orderShippingFeeList: allValues.tablesValue[0].values
        }
      },
      /** 发起新增或修改的请求 */
      requestAddOrEdit(formData) {
        let url = this.url.add, method = 'post'
        if (this.model.id) {
          url = this.url.edit
          method = 'put'
        }
        this.confirmLoading = true
        httpAction(url, formData, method).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.close()
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      }

    }
  }
</script>

<style lang="less" scoped>

</style>