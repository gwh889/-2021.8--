<template>
  <div>
    <div class="detail-search">
      <div>
        <span class="search-title">运行状态</span>
        <Poptip trigger="hover" content="设备数据上报的最新属性值，点击“查看数据”可以查看指定属性的历史数">
          <img src="../../../../assets/images/tip.png" class="modal-tip" style="top: 0">
        </Poptip>
      </div>
      <div>
        <span>实时刷新</span>
        <i-switch v-model="switch1" style="margin:0 32px 0 10px;"/>
        <RadioGroup type="button" v-model="datatype">
          <Radio :label="1">表格</Radio>
          <Radio :label="2">图表</Radio>
        </RadioGroup>
      </div>
    </div>
    <div class="infor-table" v-show="datatype == 1">
      <Table :columns="columns1" :data="data1"></Table>
    </div>
    <div class="infor-chart" v-show="datatype == 2">
      <div class="infor-basic" v-for="(data, index) in data1" :key="index">
        <div class="infor-row">
          <span class="search-title">{{data.pfname}}</span>
          <Button type="text" class="tblue-text-btn" @click="seeDetail(data.tag)">查看数据</Button>
        </div>
        <div class="infor-row">
          <span class="search-title">{{ data.value }}</span>
          <Poptip
            trigger="hover"
            content="属性一般是设备的运行状态，如当前温度等;服务是设备可被调用的方法，支持定义参数，如执行某项任务; .事件则是设备。上报的通知，如告警，需要被及时处理。"
          >
            <img src="/static/images/tip.png" class="modal-tip">
          </Poptip>
        </div>
        <div style="color: #808080">{{ data.createTime }}</div>
      </div>
    </div>
    <div class="main-page" v-show="showPage">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        @on-page-size-change="pagesizechange"
        @on-change="pagenumberchange"
      />
    </div>
    <!-- 查看数据弹窗 -->
    <Modal v-model="detailmodal" title="查看数据" :loading="true" width="720" :mask-closable="false">
      <div class="detail-search">
        <div class="search-body" style="width:auto;">
          <Select v-model="time" style="width:108px" @on-change="changeTime">
            <Option :value="1">1小时</Option>
            <Option :value="2">24小时</Option>
            <Option :value="3">7天</Option>
            <Option :value="4">自定义</Option>
          </Select>
          <el-date-picker
            v-show="time == 4"
            v-model="twotime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="selectDate"
          ></el-date-picker>
        </div>
        <div>
          <RadioGroup type="button" v-model="modaltype">
            <Radio :label="1">表格</Radio>
            <Radio :label="2">图表</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="infor-table" v-show="modaltype == 1">
        <Table :columns="columns2" :data="data2"></Table>
          <!-- <img src="/static/images/testZXT.jpg" alt="" style="width:650px;"> -->
      </div>
      <div class="infor-table" v-show="modaltype == 2">
        <!-- <Table :columns="columns2" :data="data2"></Table> -->
          <img :src="tableImgUrl" alt="" style="width:650px;">
      </div>
      <!-- <div class="infor-chart" v-show="modaltype == 2">
        <div class="infor-basic" v-for="(data, index) in data2" :key="index">
          <div class="infor-row">
            <span class="search-title">{{data.pfname}}</span>
          </div>
          <div class="infor-row">
            <span class="search-title">- -</span>
            <Poptip
              trigger="hover"
              content="属性一般是设备的运行状态，如当前温度等;服务是设备可被调用的方法，支持定义参数，如执行某项任务; .事件则是设备。上报的通知，如告警，需要被及时处理。"
            >
              <img src="/static/images/tip.png" class="modal-tip">
            </Poptip>
          </div>
          <div>- -</div>
        </div>
      </div> -->
    </Modal>
    <!-- 设置弹窗 -->
    <Modal
      v-model="setmodal"
      title="设置"
      :loading="true"
      width="720"
      :mask-closable="false"
      @on-ok="setValue"
    >
      <p slot="header" style="text-align:center;">
        <span style="float: left;">设置</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'int32'">int32(整型)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'float'">float(单精度浮点型)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'double'">double(双精度浮点型)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'enum'">enum(枚举型)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'bool'">bool(布尔型)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'text'">text(字符串)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'date'">date(日期)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'struct'">struct(结构体)</span>
        <span style="color:#FF0000;font-weight:normal" v-if="dataformat == 'array'">array(数组)</span>
      </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="期望值" prop="int32" v-if="dataformat == 'int32'">
          <Input v-model="formValidate.int32" placeholder="输入期望值" style="width: 200px;"></Input>
        </FormItem>
        <FormItem label="期望值" prop="float" v-if="dataformat == 'float'">
          <Input v-model="formValidate.float" placeholder="输入期望值" style="width: 200px;"></Input>
        </FormItem>
        <FormItem label="期望值" prop="double" v-if="dataformat == 'double'">
          <Input v-model="formValidate.double" placeholder="输入期望值" style="width: 200px;"></Input>
        </FormItem>
        <FormItem label="枚举项" prop="enum" v-if="dataformat == 'enum'">
          <RadioGroup v-model="formValidate.enum">
            <Radio label="0">0</Radio>
            <Radio label="1">1</Radio>
            <Radio label="2">2</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="布尔值" prop="bool" v-if="dataformat == 'bool'">
          <RadioGroup v-model="formValidate.bool">
            <Radio label="0">0</Radio>
            <Radio label="1">1</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="text" v-if="dataformat == 'text'">
          <Input
            v-model="formValidate.text"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入字符串"
          ></Input>
        </FormItem>
        <FormItem prop="date" v-if="dataformat == 'date'">
          <Input
            v-model="formValidate.date"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入字符串"
          ></Input>
        </FormItem>
        <FormItem prop="struct" v-if="dataformat == 'struct'">
          <Input
            v-model="formValidate.struct"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入字符串"
          ></Input>
        </FormItem>
        <FormItem prop="array" v-if="dataformat == 'array'">
          <Input
            v-model="formValidate.array"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入字符串"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios.js'
// import { url_api } from '@/assets/js/common'
// import { format_time } from '@/assets/js/common.js'

export default {
  data () {
    return {
      expectValue: '',
      detailmodal: false, // 详情弹窗
      setmodal: false, // 设置弹窗
      switch1: false,
      switch2: true,
      time: 1,
      color: 1,
      modaltype: 1,
      tableImgUrl: '',
      columns1: [
        {
          title: '属性名称',
          key: 'pfname',
          tooltip: true
        },
        {
          title: '数据类型',
          key: 'dataformat',
          tooltip: true,
          render: (h, params) => {
            const format = params.row.dataformat
            var text1
            if (format === 1) {
              text1 = 'int32'
            } else if (format === 2) {
              text1 = 'float'
            } else if (format === 3) {
              text1 = 'double'
            } else if (format === 4) {
              text1 = 'enum'
            } else if (format === 5) {
              text1 = 'bool'
            } else if (format === 6) {
              text1 = 'text'
            } else if (format === 7) {
              text1 = 'date'
            } else if (format === 8) {
              text1 = 'struct'
            } else if (format === 9) {
              text1 = 'array'
            }
            return h('div', [h('span', {}, text1)])
          }
        },
        {
          title: '更新时间',
          key: 'createTime',
          tooltip: true
        },
        {
          title: '最新值',
          key: 'value',
          tooltip: true
        },
        {
          title: '期望值',
          key: 'expect',
          tooltip: true
        },
        {
          title: '操作',
          key: 'id',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  class: 'clickable',
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#2980B9',
                    padding: '0',
                    margin: '0 24px 0 0'
                  },
                  on: {
                    click: () => {
                      this.pfpid = params.row.pfpid
                      var fm = params.row.dataformat
                      switch (fm) {
                        case 1:
                          this.dataformat = 'int32'
                          break
                        case 2:
                          this.dataformat = 'float'
                          break
                        case 3:
                          this.dataformat = 'double'
                          break
                        case 4:
                          this.dataformat = 'enum'
                          break
                        case 5:
                          this.dataformat = 'bool'
                          break
                        case 6:
                          this.dataformat = 'text'
                          break
                        case 7:
                          this.dataformat = 'date'
                          break
                        case 8:
                          this.dataformat = 'struct'
                          break
                        case 9:
                          this.dataformat = 'array'
                          break
                      }
                      this.setmodal = true
                    }
                  }
                },
                '设置'
              ),
              h(
                'Button',
                {
                  class: 'clickable',
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#2980B9',
                    padding: '0',
                    margin: '0 24px 0 0'
                  },
                  on: {
                    click: () => {
                      this.pfpid = params.row.pfpid
                      this.seeDetail(params.row.tag)
                    }
                  }
                },
                '查看数据'
              )
            ])
          }
        }
      ],
      data1: [
        /* {
          pfname: "复杂属性1",
          dataformat: "struct",
          createTime: "2017-1-12",
          pmin: 1,
          pmax: 1,
          id: 1
        } */
      ],
      columns2: [
        /* {
          title: "时间",
          key: "time",
          tooltip: true
        },
        {
          title: "原始值",
          key: "initValue",
          tooltip: true
        } */
      ],
      data2: [
        {
          pfname: '复杂属性1',
          time: '2019-04-23 00:00:00',
          initValue: '123'
        },
        {
          pfname: '复杂属性2',
          time: '2019-04-23 00:00:00',
          initValue: '123'
        }
      ],
      twotime: '',
      showPage: false,
      pdid: null,
      pfpid: null,
      // 运行状态列表表现形式
      datatype: 1,
      type: null,
      minTime: null,
      maxTime: null,
      dataformat: '',
      formValidate: {
        int32: '',
        float: '',
        double: '',
        enum: '',
        bool: '',
        date: '',
        struct: '',
        text: '',
        array: ''
      },
      ruleValidate: {
        int32: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        float: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        double: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        enum: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        bool: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        struct: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ],
        array: [
          {
            required: true,
            message: 'The value cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      total: null,
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    getParams: function () {
      var pdid = this.$route.query.pdid
      this.pdid = pdid
    },
    changeTime (val) {
      if (val != 4) {
        this.type = val
        this.checkData()
      }
    },
    // 自定义时间
    selectDate () {
      this.type = 4
      this.minTime = this.twotime[0]
      this.maxTime = this.twotime[1]
      this.checkData()
    },
    // 设置期望值
    setValue () {
      // this.setmodal = false
      // let fm = this.dataformat
      // switch (fm) {
      //   case 'int32':
      //     this.expectValue = this.formValidate.int32
      //     break
      //   case 'float':
      //     this.expectValue = this.formValidate.float
      //     break
      //   case 'double':
      //     this.expectValue = this.formValidate.double
      //     break
      //   case 'enum':
      //     this.expectValue = this.formValidate.enum
      //     break
      //   case 'bool':
      //     this.expectValue = this.formValidate.bool
      //     break
      //   case 'text':
      //     this.expectValue = this.formValidate.text
      //     break
      //   case 'date':
      //     this.expectValue = this.formValidate.date
      //     break
      //   case 'struct':
      //     this.expectValue = this.formValidate.struct
      //     break
      //   case 'array':
      //     this.expectValue = this.formValidate.array
      //     break
      // }
      // console.log(this.expectValue)
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/DeviceController/setExpect',
      //     {
      //       pdid: this.pdid,
      //       pfpid: this.pfpid,
      //       value: this.expectValue
      //     },
      //     'get'
      //   )
      //   .then(res => {
      //     if (res.data.success == 1) {
      //       this.$Message.success('设置成功')
      //     }
      //   })
    },
    // 获取列表
    getStatuslist () {
      // var params = {
      //   pdid: this.pdid,
      //   functionType: 1,
      //   pageNum: this.pageNum,
      //   pageSize: this.pageSize
      // }
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/DeviceController/functionList',
      //     params,
      //     'get'
      //   )
      //   .then(res => {
      //     console.log(JSON.stringify(res))
      //     if (res.data.success == 1) {
      //       var list = res.data.body.list
      //       this.total = list.total
      //       this.pageNum = list.pageNum
      //       this.pageSize = list.pageSize
      //       var result = list.result
      //       if (result.length > 0) {
      //         this.showPage = true
      //         this.data1 = result.map(item => {
      //           if (item.createTime) {
      //             var time = format_time(item.createTime, 'time')
      //             item.createTime = time
      //           } else {
      //             // 返参无更新时间显示短线
      //             item.createTime = '--'
      //           }
      //           return item
      //         })
      //       } else {
      //         this.data1 = []
      //         this.showPage = false
      //       }
      //     }
      //   })
    },
    // 查看数据
    checkData () {
      // var params = {
      //   pdid: this.pdid,
      //   pfpid: this.pfpid,
      //   type: this.type,
      //   minTime: this.minTime,
      //   maxTime: this.maxTime
      // }
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/DeviceController/showHistory',
      //     params,
      //     'get'
      //   )
      //   .then(res => {
      //     if (res.data.success == 1) {
      //       let list = res.data.body.list
      //       if (list.length > 0) {
      //         this.data2 = list.map(item => {
      //           var time = format_time(item.time, 'time')
      //           item.time = time
      //         })
      //       } else {
      //         this.data2 = []
      //       }
      //     }
      //   })
    },
    // 修改每页条数
    pagesizechange (pagesize) {
      this.pageSize = pagesize
      this.pageNum = 1
      this.getStatuslist()
    },
    // 修改页码
    pagenumberchange (pagenum) {
      this.pageNum = pagenum
      this.getStatuslist()
    },
    // 查看详情
    seeDetail (tag) {
      this.detailmodal = true
      if (tag == 'switch') {
        this.tableImgUrl = '/static/images/kaiguanji.png'
      } else if (tag == 'output') {
        this.tableImgUrl = '/static/images/shichanliang.png'
      } else if (tag == 'output_speed') {
        this.tableImgUrl = '/static/images/shengchansulv.png'
      } else if (tag == 'velocity') {
        this.tableImgUrl = '/static/images/songxiansudu.png'
      } else if (tag == 'power') {
        this.tableImgUrl = '/static/images/gonglv.png'
      } else {
        // 如果都不是临时放一个图片
        this.tableImgUrl = '/static/images/shichanliang.png'
      }
    }
  },
  watch: {
    pfpid () {
      this.checkData()
    }
  },
  created () {
    this.getParams()
  },
  mounted () {
    this.getStatuslist()
  }
}
</script>

<style lang="scss" scoped>
$main-fam-jian: PingFang-jian;
$main-fam-block: PingFang-block;
$main-fam-bold: PingFang-bold;
$main-back: #f1f4f6; //背景颜色
$main-font-color: #263849; //字体颜色
$main-font-color-block: #333333;
$main-font-size: 14px; //字体大小
$main-font-height: 20px; //字体高度
$menu-width: 200px; //目录宽度
$heard-height: 50px; //头部高度
$bread-color: #9fa9c4; //面包屑字体颜色
$content-header-back: #e4ebf1; //内容头部背景颜色
$content-header-height: 52px; //内容头部背景高度
$content-header-color: #314558; //内容头部颜色
$btn-blue-back: #2980b9; //蓝色按钮背景颜色
$btn-blue-color: #ffffff; //蓝色按钮背景颜色
$btn-blue-hover-color: #236fa1; //蓝色按钮经过背景颜色
$control-height: 36px; //控件高度
$table-header-back: #f7faff; //表格头部背景颜色
$table-tr-height: 56px; //表格tr高度
$table-tr-border: #dfe3e8; //表格tr border
$tip-color: #7a8693;
$infor-blue-text: #2980b9;
$input-disable-back: #f9fafb;

.message-basic {
  margin: 14px 0 24px 0;
  font-weight: 500;
  font-family: $main-fam-block;
  color: $main-font-color-block;
  .message-title {
    margin-right: 16px;
  }
}
.el-range-editor.el-input__inner {
  height: $control-height; /*no*/
}
.search-body {
  display: flex;
  align-items: center;
  width: 100%;
  & > div,
  & > button {
    margin-right: 8px;
  }
}
.search-title {
  font-family: $main-fam-block;
  font-weight: 600;
}
.infor-chart {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
  .infor-basic {
    padding: 16px 24px;
    width: 280px;
    height: 133px;
    box-shadow: 0px 1px 2px 0px rgba(102, 113, 123, 0.21),
      0px 0px 0px 1px rgba(102, 113, 123, 0.25);
    border-radius: 3px;
    border: 1px solid rgba(196, 205, 213, 1);
    margin-bottom: 16px;
    .infor-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .tblue-text-btn {
      color: $btn-blue-back;
      padding: 0;
    }
  }
}
</style>
