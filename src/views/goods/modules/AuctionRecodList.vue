

<script>
    import {JeecgListMixin} from '@/mixins/JeecgListMixin'

    export default {
        name: "AuctionRecodList",
        mixins: [JeecgListMixin],
        data() {
            return {
                description: '竞拍记录管理页面',
                // 表头
                columns: [
                    {
                        title: '#',
                        dataIndex: '',
                        key: 'rowIndex',
                        width: 60,
                        align: "center",
                        customRender: function (t, r, index) {
                            return parseInt(index) + 1;
                        }
                    },
                    {
                        title: '竞拍价',
                        align: "center",
                        dataIndex: 'auctionPrice'
                    },
                    {
                        title: '竞拍收益记录id',
                        align: "center",
                        dataIndex: 'incomeId'
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align: "center",
                        scopedSlots: {customRender: 'action'},
                    }
                ],
                url: {
                    list: "/auctionrecod/auctionRecod/list",
                    delete: "/auctionrecod/auctionRecod/delete",
                    deleteBatch: "/auctionrecod/auctionRecod/deleteBatch",
                    exportXlsUrl: "auctionrecod/auctionRecod/exportXls",
                    importExcelUrl: "auctionrecod/auctionRecod/importExcel",
                },
            }
        },
        computed: {
            importExcelUrl: function () {
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
            }
        },
        methods: {}
    }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>