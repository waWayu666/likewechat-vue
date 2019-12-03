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

        <div v-if="isShow">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="优惠券类型">
            <a-select v-decorator="['couponTypeId', validatorRules.couponTypeId]"
                      placeholder="请选择优惠券类型"
                      @change="handleCouponChange">
              <a-select-option v-for="(coupon,index) in couponList" :key="index.toString()"
                               :value="coupon.id">
                {{coupon.couponName}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="发放数量">
            <a-input-number v-decorator="[ 'count', validatorRules.count ]"/>
            <span>当前优惠券类型剩余发放数量:{{ this.num }}</span>
          </a-form-item>
        </div>

        <div v-if="isShow1">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="优惠券类型">
            {{ this.model.couponTypeId_dictText}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="店铺">
            {{ this.model.shopId_dictText}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="优惠券编码">
            {{ this.model.couponCode}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="兑换人">
            {{ this.model.userId_dictText}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="优惠券使用订单ID">
            {{ this.model.useOrderId}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="创建订单ID">
            {{ this.model.createOrderId}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="面额">
            {{ this.model.money}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="领取时间">
            {{ this.model.fetchTime}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="使用时间">
            {{ this.model.useTime}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="优惠券状态">
            {{ this.model.state | stateFilter}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="有效期开始时间">
            {{ this.model.startTime}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="有效期结束时间">
            {{ this.model.endTime}}
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="获取方式">
            {{ this.model.getType | typeFilter}}
          </a-form-item>
        </div>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import {getCouponList, getCouponNumber} from '@/api/api'

  export default {
    name: "CouponModal",
    data() {
      return {
        title: "操作",
        visible: false,
        model: {},
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
          couponTypeId: {rules: [{required: true, message: '请选择优惠券类型..'}]},
          count: {rules: [{required: true, validator: this.validateCount}]},
        },
        couponList: [],
        num: "0",
        isShow: true,
        isShow1: false,
        url: {
          add: "/coupon/coupon/add",
          edit: "/coupon/coupon/edit",
        },
      }
    },
    created() {
      this.queryCouponList();
    },
    filters: {
      stateFilter(state) {
        const statusMap = {
          0: '未领用',
          1: '已领用（未使用）',
          2: '已使用',
          3: '已过期'
        };
        return statusMap[state]
      },
      typeFilter(state) {
        const statusMap = {
          1: '领取',
          2: '兑换',
          3: '指派'
        };
        return statusMap[state]
      }
    },
    methods: {
      add() {
        this.isShow = true;
        this.isShow1 = false;
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        if (JSON.stringify(record) != "{}") {
          this.isShow = false;
          this.isShow1 = true;
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'couponTypeId', 'shopId', 'couponCode', 'userId', 'useOrderId', 'createOrderId', 'money', 'state', 'getType'));
        });
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
            }
            let formData = Object.assign(this.model, values);
            formData.getType = "2";
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
      queryCouponList() {
        getCouponList().then((res) => {
          console.log(res.result);
          if (res.success) {
            this.couponList = res.result;
          }
        })
      },
      handleCouponChange(value) {
        getCouponNumber({id: value.toString()}).then((res) => {
          console.log(res.result);
          if (res.success) {
            this.num = res.result;
          }
        })
      },
      validateCount(rule, value, callback) {
        if (parseInt(value) < parseInt(this.num)) {
          callback();
        } else {
          callback("请输入发放数量/该类型优惠券发放数量不足..");
        }

      },

    }
  }
</script>

<style lang="less" scoped>

</style>