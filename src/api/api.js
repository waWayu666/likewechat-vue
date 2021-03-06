import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/sys/common/view/";

//
const getGoodspace=(space,params)=>getAction(`/goods/goodsSpec/getGoodspeace/${space}`,params);

//订单管理
const deliverGoods=(orderId,params)=>postAction(`/order/order/deliverGoods/${orderId}`,params);
const getExpressCompanyList = (params)=>getAction("/express/expressCompany/expressCompanylist",params);

//提现
const remittance=(params)=>postAction("/withdraw/withdraw/remittance",params);
const refuse=(params)=>postAction("/withdraw/withdraw/refuse",params);
const queryWithdrawByStatus=(params)=>getAction("/withdraw/withdraw/queryWithdrawByStatus",params);
const refund=(params)=>postAction("/order/order/refund",params);

//角色管理
const addRole = (params)=>postAction("/sys/role/add",params);
const editRole = (params)=>putAction("/sys/role/edit",params);
// const getRoleList = (params)=>getAction("/sys/role/list",params);
// const deleteRole = (params)=>deleteAction("/sys/role/delete",params);
// const deleteRoleList = (params)=>deleteAction("/sys/role/deleteBatch",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);
const queryall = (params)=>getAction("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>postAction("/sys/user/add",params);
const editUser = (params)=>putAction("/sys/user/edit",params);
const queryUserRole = (params)=>getAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getAction("/sys/user/list",params);
// const deleteUser = (params)=>deleteAction("/sys/user/delete",params);
// const deleteUserList = (params)=>deleteAction("/sys/user/deleteBatch",params);
const frozenBatch = (params)=>putAction("/sys/user/frozenBatch",params);
//验证用户是否存在
const checkOnlyUser = (params)=>getAction("/sys/user/checkOnlyUser",params);
//改变密码
const changPassword = (params)=>putAction("/sys/user/changPassword",params);

//权限管理
const addPermission= (params)=>postAction("/sys/permission/add",params);
const editPermission= (params)=>putAction("/sys/permission/edit",params);
const getPermissionList = (params)=>getAction("/sys/permission/list",params);
// const deletePermission = (params)=>deleteAction("/sys/permission/delete",params);
// const deletePermissionList = (params)=>deleteAction("/sys/permission/deleteBatch",params);
const queryTreeList = (params)=>getAction("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/sys/role/queryTreeList",params);
const queryListAsync = (params)=>getAction("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>getAction("/sys/permission/queryRolePermission",params);
const saveRolePermission = (params)=>postAction("/sys/permission/saveRolePermission",params);
//const queryPermissionsByUser = (params)=>getAction("/sys/permission/queryByUser",params);
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
const loadAllRoleIds = (params)=>getAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/sys/permission/queryPermissionRule",params);

//商品管理
const goodsSpecList = (params)=>getAction("/goods/goodsSpec/queryGoodsSpecList",params);
const queryGoodsSkuByGoodsId=(params)=>getAction("/goods/goodsSku/queryByGoodsId",params);
const queryByShopId =(params)=>getAction("/goods/goods/queryByShopId",params);
const joinActivity =(params)=>getAction("/goods/goods/joinActivity",params);
const selectCategoryList=(params)=>getAction("/category/category/selectCategoryList",params);


// 部门管理
const queryDepartTreeList = (params)=>getAction("/sys/sysDepart/queryTreeList",params);
const queryIdTree = (params)=>getAction("/sys/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>getAction("/sys/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/sys/sysDepart/searchBy",params);
const deleteByDepartId   = (params)=>deleteAction("/sys/sysDepart/delete",params);

//日志管理
//const getLogList = (params)=>getAction("/sys/log/list",params);
const deleteLog = (params)=>deleteAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteAction("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postAction("/sys/dict/add",params);
const editDict = (params)=>putAction("/sys/dict/edit",params);
//const getDictList = (params)=>getAction("/sys/dict/list",params);
const treeList = (params)=>getAction("/sys/dict/treeList",params);
// const delDict = (params)=>deleteAction("/sys/dict/delete",params);
//const getDictItemList = (params)=>getAction("/sys/dictItem/list",params);
const addDictItem = (params)=>postAction("/sys/dictItem/add",params);
const editDictItem = (params)=>putAction("/sys/dictItem/edit",params);
//const delDictItem = (params)=>deleteAction("/sys/dictItem/delete",params);
//const delDictItemList = (params)=>deleteAction("/sys/dictItem/deleteBatch",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getAction(`/sys/dict/getDictItems/${code}`,params);

//系统通告
const doReleaseData = (params)=>getAction("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getAction("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getAction("/sys/loginfo",params);
const getVisitInfo = (params)=>getAction("/sys/visitInfo",params);
//数据日志访问
// const getDataLogList = (params)=>getAction("/sys/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/sys/user/queryUserByDepId",params);

// 查询用户角色表里的所有信息
const queryUserRoleMap = (params)=>getAction("/sys/user/queryUserRoleMap",params);
// 重复校验
const duplicateCheck = (params)=>getAction("/sys/duplicate/check",params);

// 获取课程父级目录list id,name
const getCurriculumList = (params) => getAction("/curriculum/curriculumDirectory/getFJCurriculum", params);
// 获取课程list id,goodsName
const getCourseList = (params) => getAction("/goods/goods/queryByCreateBy", params);
// 获取优惠券类型list id,couponName
const getCouponList = (params) => getAction("/coupon/couponType/queryCouponByShopId", params);
// 获取该类型优惠券剩余量
const getCouponNumber = (params) => getAction("/coupon/couponType/getCouponNumber", params);
// 获取用户list id,mobile
const getUList = (params) => getAction("/user/user/getUList", params);
// 小程序用户管理
const frost=(id,params)=> postAction(`/user/user/frost/${id}`,params);
//重置密码
const repet=(id,params)=> postAction(`/user/user/repet/${id}`,params);
//重置密码
const sonson=(id,params)=> postAction(`/user/user/sonson/${id}/${nickname}`,params);
//开通账号
const open=(id,params)=> postAction(`/user/user/open/${id}`,params);
//获取用户信息
const queryUserDetail=(id,params)=> getAction(`/user/user/queryUserDetail/${id}`,params);
// 商品管理
const upOrDown=(id,params)=> postAction(`/goods/goods/upOrDown/${id}`,params);
// 积分商品管理
const upOrDownScoreGoods=(id,params)=> postAction(`/goods/scoreGoods/upOrDownScoreGoods/${id}`,params);
// 余额
const getBill = (str,params) => getAction(`/bill/bill/queryPageList/${str}`, params);
// 佣金
const getBrokeragePage = (str,params) => getAction(`/usercommission/userCommission/brokeragePageList/${str}`, params);

// 粉丝竞拍记录
const getSonPage = (str,params) => getAction(`/order/order/sonPageList/${str}`, params);

// 积分
const getScore = (str,params) => getAction(`/userscore/userScore/scorePageList/${str}`, params);
// 粉丝
const getFans = (str,params) => getAction(`/fnas/fans/fansPageList/${str}`, params);
// 竞拍记录
const getAuctionrecod = (params) => getAction("/auctionrecod/auctionRecod/auctionRecodPageList", params);

export {
  // imgView,
  // doMian,
  deliverGoods,
  getExpressCompanyList,
  remittance,
  refuse,
  queryWithdrawByStatus,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changPassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  goodsSpecList,
  queryGoodsSkuByGoodsId,
  queryByShopId,
  joinActivity,
  selectCategoryList,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  queryUserRoleMap,
  duplicateCheck,
  queryTreeListForRole,
  getGoodspace,
  getCurriculumList,
  getCourseList,
  getCouponList,
  getCouponNumber,
  getUList,
  frost,
  open,
  repet,
  sonson,
  queryUserDetail,
  upOrDown,
  upOrDownScoreGoods,
  getBill,
  getBrokeragePage,
  getSonPage,
  getScore,
  getFans,
  getAuctionrecod
}



