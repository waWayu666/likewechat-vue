<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺ID申请成功之前为0">
          <a-input placeholder="请输入店铺ID申请成功之前为0" v-decorator="['shopId', validatorRules.shopId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请类型1.个人2.公司">
          <a-input placeholder="请输入申请类型1.个人2.公司" v-decorator="['applyType', validatorRules.applyType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户编号">
          <a-input placeholder="请输入用户编号" v-decorator="['userId', validatorRules.userId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司名称">
          <a-input placeholder="请输入公司名称" v-decorator="['companyName', validatorRules.companyName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店主用户名">
          <a-input placeholder="请输入店主用户名" v-decorator="['userName', validatorRules.userName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店主密码">
          <a-input placeholder="请输入店主密码" v-decorator="['password', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司所在地省ID">
          <a-input placeholder="请输入公司所在地省ID" v-decorator="['companyProvinceId', validatorRules.companyProvinceId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司所在地省名称">
          <a-input placeholder="请输入公司所在地省名称" v-decorator="['companyProvinceName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司所在地市ID">
          <a-input placeholder="请输入公司所在地市ID" v-decorator="['companyCityId', validatorRules.companyCityId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司所在地市名称">
          <a-input placeholder="请输入公司所在地市名称" v-decorator="['companyCityName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司所在地区ID">
          <a-input placeholder="请输入公司所在地区ID" v-decorator="['companyDistrictId', validatorRules.companyDistrictId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司所在地区名称">
          <a-input placeholder="请输入公司所在地区名称" v-decorator="['companyDistrictName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司详细地址">
          <a-input placeholder="请输入公司详细地址" v-decorator="['companyAddressDetail', validatorRules.companyAddressDetail ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司电话">
          <a-input placeholder="请输入公司电话" v-decorator="['companyPhone', validatorRules.companyPhone ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="私企.个体.外企.中外合资">
          <a-input placeholder="请输入私企.个体.外企.中外合资" v-decorator="['companyType', validatorRules.companyType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工总数">
          <a-input-number v-decorator="[ 'companyEmployeeCount', validatorRules.companyEmployeeCount ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资金">
          <a-input-number v-decorator="[ 'companyRegisteredCapital', validatorRules.companyRegisteredCapital ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统一社会信用代码">
          <a-input placeholder="请输入统一社会信用代码" v-decorator="['socialUnityCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人姓名">
          <a-input placeholder="请输入法人姓名" v-decorator="['legalpersonName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人手机号">
          <a-input placeholder="请输入法人手机号" v-decorator="['legalpersonMobile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人身份证号">
          <a-input placeholder="请输入法人身份证号" v-decorator="['legalpersonCardNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人身份证正面">
          <a-input placeholder="请输入法人身份证正面" v-decorator="['legalpersonIdcardFront', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人身份证背面">
          <a-input placeholder="请输入法人身份证背面" v-decorator="['legalpersonIdcardBack', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人姓名">
          <a-input placeholder="请输入联系人姓名" v-decorator="['contactsName', validatorRules.contactsName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人电话">
          <a-input placeholder="请输入联系人电话" v-decorator="['contactsPhone', validatorRules.contactsPhone ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人邮箱">
          <a-input placeholder="请输入联系人邮箱" v-decorator="['contactsEmail', validatorRules.contactsEmail ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人身份证号">
          <a-input placeholder="请输入申请人身份证号" v-decorator="['contactsCardNo', validatorRules.contactsCardNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人手持身份证电子版">
          <a-input placeholder="请输入申请人手持身份证电子版" v-decorator="['contactsCardElectronic1', validatorRules.contactsCardElectronic1 ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人身份证正面">
          <a-input placeholder="请输入申请人身份证正面" v-decorator="['contactsCardElectronic2', validatorRules.contactsCardElectronic2 ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人身份证反面">
          <a-input placeholder="请输入申请人身份证反面" v-decorator="['contactsCardElectronic3', validatorRules.contactsCardElectronic3 ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人所在地省ID">
          <a-input placeholder="请输入申请人所在地省ID" v-decorator="['contactsProvinceId', validatorRules.contactsProvinceId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人所在地省名称">
          <a-input placeholder="请输入申请人所在地省名称" v-decorator="['contactsProvinceName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人所在地市ID">
          <a-input placeholder="请输入申请人所在地市ID" v-decorator="['contactsCityId', validatorRules.contactsCityId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人所在地市名称">
          <a-input placeholder="请输入申请人所在地市名称" v-decorator="['contactsCityName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人所在地区ID">
          <a-input placeholder="请输入申请人所在地区ID" v-decorator="['contactsDistrictId', validatorRules.contactsDistrictId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人所在地区名称">
          <a-input placeholder="请输入申请人所在地区名称" v-decorator="['contactsDistrictName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人详细地址">
          <a-input placeholder="请输入申请人详细地址" v-decorator="['contactsAddressDetail', validatorRules.contactsAddressDetail ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业执照号">
          <a-input placeholder="请输入营业执照号" v-decorator="['businessLicenceNumber', validatorRules.businessLicenceNumber ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定经营范围">
          <a-input placeholder="请输入法定经营范围" v-decorator="['businessSphere', validatorRules.businessSphere ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业执照电子版">
          <a-input placeholder="请输入营业执照电子版" v-decorator="['businessLicenceNumberElectronic', validatorRules.businessLicenceNumberElectronic ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织机构代码">
          <a-input placeholder="请输入组织机构代码" v-decorator="['organizationCode', validatorRules.organizationCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织机构代码电子版">
          <a-input placeholder="请输入组织机构代码电子版" v-decorator="['organizationCodeElectronic', validatorRules.organizationCodeElectronic ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一般纳税人证明">
          <a-input placeholder="请输入一般纳税人证明" v-decorator="['generalTaxpayer', validatorRules.generalTaxpayer ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行开户名">
          <a-input placeholder="请输入银行开户名" v-decorator="['bankAccountName', validatorRules.bankAccountName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司银行账号">
          <a-input placeholder="请输入公司银行账号" v-decorator="['bankAccountNumber', validatorRules.bankAccountNumber ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户银行支行名称">
          <a-input placeholder="请输入开户银行支行名称" v-decorator="['bankName', validatorRules.bankName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行联行号">
          <a-input placeholder="请输入支行联行号" v-decorator="['bankCode', validatorRules.bankCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户银行所在地">
          <a-input placeholder="请输入开户银行所在地" v-decorator="['bankAddress', validatorRules.bankAddress ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户银行许可证电子版">
          <a-input placeholder="请输入开户银行许可证电子版" v-decorator="['bankLicenceElectronic', validatorRules.bankLicenceElectronic ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户行账号是否为结算账号 1-开户行就是结算账号 2-独立的计算账号">
          <a-input placeholder="请输入开户行账号是否为结算账号 1-开户行就是结算账号 2-独立的计算账号" v-decorator="['isSettlementAccount', validatorRules.isSettlementAccount ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算银行开户名">
          <a-input placeholder="请输入结算银行开户名" v-decorator="['settlementBankAccountName', validatorRules.settlementBankAccountName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算公司银行账号">
          <a-input placeholder="请输入结算公司银行账号" v-decorator="['settlementBankAccountNumber', validatorRules.settlementBankAccountNumber ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算开户银行支行名称">
          <a-input placeholder="请输入结算开户银行支行名称" v-decorator="['settlementBankName', validatorRules.settlementBankName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算支行联行号">
          <a-input placeholder="请输入结算支行联行号" v-decorator="['settlementBankCode', validatorRules.settlementBankCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算开户银行所在地">
          <a-input placeholder="请输入结算开户银行所在地" v-decorator="['settlementBankAddress', validatorRules.settlementBankAddress ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税务登记证号">
          <a-input placeholder="请输入税务登记证号" v-decorator="['taxRegistrationCertificate', validatorRules.taxRegistrationCertificate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税务登记证号电子版">
          <a-input placeholder="请输入税务登记证号电子版" v-decorator="['taxRegistrationCertificateElectronic', validatorRules.taxRegistrationCertificateElectronic ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="纳税人识别号">
          <a-input placeholder="请输入纳税人识别号" v-decorator="['taxpayerId', validatorRules.taxpayerId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺名称">
          <a-input placeholder="请输入店铺名称" v-decorator="['shopName', validatorRules.shopName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺logo">
          <a-input placeholder="请输入店铺logo" v-decorator="['shopLogo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请状态 1-已提交申请 -1-审核失败 2-审核通过开店">
          <a-input placeholder="请输入申请状态 1-已提交申请 -1-审核失败 2-审核通过开店" v-decorator="['applyState', validatorRules.applyState ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理员审核信息">
          <a-input placeholder="请输入管理员审核信息" v-decorator="['applyMessage', validatorRules.applyMessage ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开店时长(年)">
          <a-input placeholder="请输入开店时长(年)" v-decorator="['applyYear', validatorRules.applyYear ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺等级名称">
          <a-input placeholder="请输入店铺等级名称" v-decorator="['shopTypeName', validatorRules.shopTypeName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺等级id">
          <a-input placeholder="请输入店铺等级id" v-decorator="['shopTypeId', validatorRules.shopTypeId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺类型名称">
          <a-input placeholder="请输入店铺类型名称" v-decorator="['shopGroupName', validatorRules.shopGroupName ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="店铺类型ID">
          <a-input placeholder="请输入店铺类型ID" v-decorator="['shopGroupId', validatorRules.shopGroupId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款凭证">
          <a-input placeholder="请输入付款凭证" v-decorator="['payingMoneyCertificate', validatorRules.payingMoneyCertificate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款凭证说明">
          <a-input placeholder="请输入付款凭证说明" v-decorator="['payingMoneyCertificateExplain', validatorRules.payingMoneyCertificateExplain ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款金额">
          <a-input-number v-decorator="[ 'payingAmount', validatorRules.payingAmount ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推荐招商员用户id">
          <a-input placeholder="请输入推荐招商员用户id" v-decorator="['recommendUid', validatorRules.recommendUid ]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "ShopApplyModal",
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
        shopId:{rules: [{ required: true, message: '请输入店铺ID申请成功之前为0!' }]},
        applyType:{rules: [{ required: true, message: '请输入申请类型1.个人2.公司!' }]},
        userId:{rules: [{ required: true, message: '请输入用户编号!' }]},
        companyName:{rules: [{ required: true, message: '请输入公司名称!' }]},
        userName:{rules: [{ required: true, message: '请输入店主用户名!' }]},
        companyProvinceId:{rules: [{ required: true, message: '请输入公司所在地省ID!' }]},
        companyCityId:{rules: [{ required: true, message: '请输入公司所在地市ID!' }]},
        companyDistrictId:{rules: [{ required: true, message: '请输入公司所在地区ID!' }]},
        companyAddressDetail:{rules: [{ required: true, message: '请输入公司详细地址!' }]},
        companyPhone:{rules: [{ required: true, message: '请输入公司电话!' }]},
        companyType:{rules: [{ required: true, message: '请输入私企.个体.外企.中外合资!' }]},
        companyEmployeeCount:{rules: [{ required: true, message: '请输入员工总数!' }]},
        companyRegisteredCapital:{rules: [{ required: true, message: '请输入注册资金!' }]},
        contactsName:{rules: [{ required: true, message: '请输入联系人姓名!' }]},
        contactsPhone:{rules: [{ required: true, message: '请输入联系人电话!' }]},
        contactsEmail:{rules: [{ required: true, message: '请输入联系人邮箱!' }]},
        contactsCardNo:{rules: [{ required: true, message: '请输入申请人身份证号!' }]},
        contactsCardElectronic1:{rules: [{ required: true, message: '请输入申请人手持身份证电子版!' }]},
        contactsCardElectronic2:{rules: [{ required: true, message: '请输入申请人身份证正面!' }]},
        contactsCardElectronic3:{rules: [{ required: true, message: '请输入申请人身份证反面!' }]},
        contactsProvinceId:{rules: [{ required: true, message: '请输入申请人所在地省ID!' }]},
        contactsCityId:{rules: [{ required: true, message: '请输入申请人所在地市ID!' }]},
        contactsDistrictId:{rules: [{ required: true, message: '请输入申请人所在地区ID!' }]},
        contactsAddressDetail:{rules: [{ required: true, message: '请输入申请人详细地址!' }]},
        businessLicenceNumber:{rules: [{ required: true, message: '请输入营业执照号!' }]},
        businessSphere:{rules: [{ required: true, message: '请输入法定经营范围!' }]},
        businessLicenceNumberElectronic:{rules: [{ required: true, message: '请输入营业执照电子版!' }]},
        organizationCode:{rules: [{ required: true, message: '请输入组织机构代码!' }]},
        organizationCodeElectronic:{rules: [{ required: true, message: '请输入组织机构代码电子版!' }]},
        generalTaxpayer:{rules: [{ required: true, message: '请输入一般纳税人证明!' }]},
        bankAccountName:{rules: [{ required: true, message: '请输入银行开户名!' }]},
        bankAccountNumber:{rules: [{ required: true, message: '请输入公司银行账号!' }]},
        bankName:{rules: [{ required: true, message: '请输入开户银行支行名称!' }]},
        bankCode:{rules: [{ required: true, message: '请输入支行联行号!' }]},
        bankAddress:{rules: [{ required: true, message: '请输入开户银行所在地!' }]},
        bankLicenceElectronic:{rules: [{ required: true, message: '请输入开户银行许可证电子版!' }]},
        isSettlementAccount:{rules: [{ required: true, message: '请输入开户行账号是否为结算账号 1-开户行就是结算账号 2-独立的计算账号!' }]},
        settlementBankAccountName:{rules: [{ required: true, message: '请输入结算银行开户名!' }]},
        settlementBankAccountNumber:{rules: [{ required: true, message: '请输入结算公司银行账号!' }]},
        settlementBankName:{rules: [{ required: true, message: '请输入结算开户银行支行名称!' }]},
        settlementBankCode:{rules: [{ required: true, message: '请输入结算支行联行号!' }]},
        settlementBankAddress:{rules: [{ required: true, message: '请输入结算开户银行所在地!' }]},
        taxRegistrationCertificate:{rules: [{ required: true, message: '请输入税务登记证号!' }]},
        taxRegistrationCertificateElectronic:{rules: [{ required: true, message: '请输入税务登记证号电子版!' }]},
        taxpayerId:{rules: [{ required: true, message: '请输入纳税人识别号!' }]},
        shopName:{rules: [{ required: true, message: '请输入店铺名称!' }]},
        applyState:{rules: [{ required: true, message: '请输入申请状态 1-已提交申请 -1-审核失败 2-审核通过开店!' }]},
        applyMessage:{rules: [{ required: true, message: '请输入管理员审核信息!' }]},
        applyYear:{rules: [{ required: true, message: '请输入开店时长(年)!' }]},
        shopTypeName:{rules: [{ required: true, message: '请输入店铺等级名称!' }]},
        shopTypeId:{rules: [{ required: true, message: '请输入店铺等级id!' }]},
        shopGroupName:{rules: [{ required: true, message: '请输入店铺类型名称!' }]},
        shopGroupId:{rules: [{ required: true, message: '请输入店铺类型ID!' }]},
        payingMoneyCertificate:{rules: [{ required: true, message: '请输入付款凭证!' }]},
        payingMoneyCertificateExplain:{rules: [{ required: true, message: '请输入付款凭证说明!' }]},
        payingAmount:{rules: [{ required: true, message: '请输入付款金额!' }]},
        recommendUid:{rules: [{ required: true, message: '请输入推荐招商员用户id!' }]},
        },
        url: {
          add: "/shop/shopApply/add",
          edit: "/shop/shopApply/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'shopId','applyType','userId','companyName','userName','password','companyProvinceId','companyProvinceName','companyCityId','companyCityName','companyDistrictId','companyDistrictName','companyAddressDetail','companyPhone','companyType','companyEmployeeCount','companyRegisteredCapital','socialUnityCode','legalpersonName','legalpersonMobile','legalpersonCardNo','legalpersonIdcardFront','legalpersonIdcardBack','contactsName','contactsPhone','contactsEmail','contactsCardNo','contactsCardElectronic1','contactsCardElectronic2','contactsCardElectronic3','contactsProvinceId','contactsProvinceName','contactsCityId','contactsCityName','contactsDistrictId','contactsDistrictName','contactsAddressDetail','businessLicenceNumber','businessSphere','businessLicenceNumberElectronic','organizationCode','organizationCodeElectronic','generalTaxpayer','bankAccountName','bankAccountNumber','bankName','bankCode','bankAddress','bankLicenceElectronic','isSettlementAccount','settlementBankAccountName','settlementBankAccountNumber','settlementBankName','settlementBankCode','settlementBankAddress','taxRegistrationCertificate','taxRegistrationCertificateElectronic','taxpayerId','shopName','shopLogo','applyState','applyMessage','applyYear','shopTypeName','shopTypeId','shopGroupName','shopGroupId','payingMoneyCertificate','payingMoneyCertificateExplain','payingAmount','recommendUid'))
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
            
            console.log(formData)
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


    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>