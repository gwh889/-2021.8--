<template>
  <div>
    <div class="detail-search">
      <div>
        <span class="detail-title">功能定义</span>
        <Button
          type="primary"
          @click="showdefinmodal"
        >+ 新增</Button>
        <Button
          class="white-btn"
        >物模型</Button>
      </div>
    </div>
    <div class="infor-table">
      <Table
        :columns="columns1"
        :data="data1"
      ></Table>
    </div>
    <div class="main-page">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        :page-size="pageSize"
        :current="pageNum"
        @on-page-size-change="pagesizechange"
        @on-change="pagenumberchange"
      />
    </div>

    <!-- 创建新增功能弹窗 -->
    <Modal
      v-model="definmodal"
      :title="formItem.edit == 2 ? '添加功能' : '编辑功能'"
      :loading="true"
      width="634"
      :mask-closable="false"
    >
      <Form
        :model="formItem"
        :rules="ruleValidate"
        :label-width="130"
        ref="addfunfrom"
      >
        <FormItem
          label="功能类型"
          prop="type"
        >
          <RadioGroup
            type="button"
            v-model="formItem.type"
            v-if="formItem.edit == 2"
          >
            <Radio :label="1">属性</Radio>
            <Radio :label="2">服务</Radio>
            <Radio :label="3">事件</Radio>
          </RadioGroup>
          <RadioGroup
            type="button"
            v-model="formItem.type"
            v-if="formItem.edit == 1"
          >
            <Radio
              :label="1"
              disabled
            >属性</Radio>
            <Radio
              :label="2"
              disabled
            >服务</Radio>
            <Radio
              :label="3"
              disabled
            >事件</Radio>
          </RadioGroup>
          <Poptip
            trigger="hover"
            content="属性一般是设备的运行状态，如当前温度等;服务是设备可被调用的方法，支持定义参数，如执行某项任务; .事件则是设备。上报的通知，如告警，需要被及时处理。"
          >
            <img
              src="../../../../assets/images/tip.png"
              class="modal-tip"
              style="top: 0"
            >
          </Poptip>
        </FormItem>
        <FormItem
          label="功能名称"
          prop="name"
        >
          <Input
            v-model="formItem.name"
            placeholder="请输入功能名称"
            style="width: 280px;"
          />
          <Poptip
            trigger="hover"
            content="必填，支持中文、大小写字母、数字、短划线和下划线，不超过30个字符。"
          >
            <img
              src="../../../../assets/images/tip.png"
              class="modal-tip"
              style="top: 0"
            >
          </Poptip>
        </FormItem>
        <FormItem
          label="标识符"
          prop="fuctionTag"
        >
          <Input
            v-model="formItem.fuctionTag"
            placeholder="请输入标识符"
            style="width: 280px;"
          />
          <Poptip
            trigger="hover"
            content="数字、大小写字母、下划线，必填，不超过50字"
          >
            <img
              src="../../../../assets/images/tip.png"
              class="modal-tip"
              style="top: 0"
            >
          </Poptip>
        </FormItem>
        <FormItem
          label="数据类型"
          prop="dataformat"
          v-if="formItem.type == 1"
        >
          <Select
            v-model="formItem.dataformat"
            style="width: 280px;"
          >
            <Option :value="1">int32(整数型)</Option>
            <Option :value="2">float(单精度浮点型)</Option>
            <Option :value="3">double(双精度浮点型)</Option>
            <!-- <Option :value="4">enum(枚举型)</Option>
            <Option :value="5">bool(布尔型)</Option>
            <Option :value="6">text(字符串)</Option>
            <Option :value="7">date(时间型)</Option>
            <Option :value="8">struct(结构体)</Option>
            <Option :value="9">array(数组)</Option> -->
          </Select>
        </FormItem>

        <!-- dataformat为int32, float, double显示部分 -->
        <div style="display:flex;">
          <FormItem
            label="取值范围"
            prop="min"
            v-if="formItem.type == 1"
            style="margin-bottom:36px;"
          >
            <Input
              v-model="formItem.min"
              placeholder="最小值"
              style="width: 115px;"
              type="number"
              number
              @keyup.native="inputNumMM"
            />
            <span class="minfenge">-</span>
          </FormItem>
          <FormItem
            prop="max"
            v-if="formItem.type == 1"
            style="margin:0;"
            class="maxformitem"
          >
            <Input
              v-model="formItem.max"
              placeholder="最大值"
              style="width: 115px;"
              type="number"
              number
              @keyup.native="inputNumMM"
            />
          </FormItem>
        </div>
        <FormItem
          label="分辨率"
          prop="step"
          v-if="formItem.type == 1"
        >
          <Input
            v-model="formItem.step"
            placeholder="请输入分辨率"
            style="width: 280px;"
            type="number"
            number
             @keyup.native="inputNumMM"
          />
        </FormItem>
        <FormItem
          label="单位"
          prop="unit"
          v-if="formItem.type == 1"
        >
          <Select
            v-model="formItem.unit"
            style="width: 280px;"
          >
            <Option
              v-for="myunitlist in unitlist"
              :value="myunitlist.id"
              :key="myunitlist.id"
            >{{myunitlist.name}}</Option>
          </Select>
        </FormItem>
        <!-- dataformat为int32, float, double显示部分 -->

        <FormItem
          label="读写类型"
          prop="status"
          v-if="formItem.type == 1"
        >
          <RadioGroup
            v-model="formItem.status"
            style="margin-top:6px;"
          >
            <Radio :label="1">读写</Radio>
            <Radio :label="2">只读</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 服务 -->
        <FormItem
          label="调用方式"
          prop="status"
          v-if="formItem.type == 2"
        >
          <RadioGroup
            v-model="formItem.status"
            style="margin-top:6px;"
          >
            <Radio :label="1">异步</Radio>
            <Radio :label="2">同步</Radio>
          </RadioGroup>
          <Poptip
            trigger="hover"
            content="数字、大小写字母、下划线，必填，不超过50字"
          >
            <img
              src="../../../../assets/images/tip.png"
              class="modal-tip"
              style="top: 0"
            >
          </Poptip>
          <div>
            <div class="parameter-title">输入参数</div>
            <ul class="parameter-ul">
              <li
                class="parameter-li"
                v-for="(rulist,index) in formItem.paramList"
                :key="index"
              >
              <div v-if="rulist.type == 1">
                 <div class="no-wrap">参数名称：{{rulist.name}}</div>
                <Button
                  type="text"
                  class="blue-text-btn"
                  @click="editli(1,index)"
                >编辑</Button>
                <Button
                  type="text"
                  class="blue-text-btn"
                  @click="remove(1,index)"
                >删除</Button>
              </div>
              </li>
            </ul>
            <Button
              type="text"
              class="blue-text-btn"
              @click="showparmodal('minfrom',1)"
            >+ 增加参数</Button>
          </div>
          <div>
            <div class="parameter-title">输出参数</div>
            <ul class="parameter-ul">
              <li
                class="parameter-li"
                v-for="(chulist,index) in formItem.paramList"
                :key="index"
              >
              <div v-if="chulist.type == 2">
                <div class="no-wrap">参数名称：{{chulist.name}}</div>
                <Button
                  type="text"
                  class="blue-text-btn"
                  @click="editli(1,index)"
                >编辑</Button>
                <Button
                  type="text"
                  class="blue-text-btn"
                  @click="remove(1,index)"
                >删除</Button>
              </div>
              </li>
            </ul>
            <Button
              type="text"
              class="blue-text-btn"
              @click="showparmodal('minfrom',2)"
            >+ 增加参数</Button>
          </div>
        </FormItem>
        <!-- 事件 -->
        <FormItem
          label="事件类型"
          prop="status"
          v-if="formItem.type == 3"
        >
          <RadioGroup
            v-model="formItem.status"
            style="margin-top:6px;"
          >
            <Radio :label="1">信息</Radio>
            <Radio :label="2">告警</Radio>
            <Radio :label="3">故障</Radio>
          </RadioGroup>
          <Poptip
            trigger="hover"
            content="“信息”是设备上报的一般性通知,如完成某项任务等。“告警”和“故障”是设备运行过程中主动上报的突发或异常情况,优先级高。不同的事件类型将用于统计分析。"
          >
            <img
              src="../../../../assets/images/tip.png"
              class="modal-tip"
              style="top: 0"
            >
          </Poptip>
          <div>
            <div class="parameter-title">输出参数</div>
            <ul class="parameter-ul">
              <li
                class="parameter-li"
                v-for="(chulist,index) in formItem.paramList1"
                :key="index"
              >
              <div v-if="chulist.type == 2">
                <div>参数名称：{{chulist.name}}</div>
                <Button
                  type="text"
                  class="blue-text-btn"
                  @click="editli(2,index)"
                >编辑</Button>
                <Button
                  type="text"
                  class="blue-text-btn"
                  @click="remove(2,index)"
                >删除</Button>
              </div>
              </li>
            </ul>
            <Button
              type="text"
              class="blue-text-btn"
              @click="showparmodal('minfrom',2)"
            >+ 增加参数</Button>
          </div>
        </FormItem>
        <FormItem
          label="备注"
          prop="remark"
        >
          <Input
            v-model="formItem.remark"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入备注"
            style="width: 280px;"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          @click="closeallmodal"
          class="white-btn"
        >取 消</Button>
        <Button
          type="primary"
          @click="handleSubmit('addfunfrom')"
        >确 定</Button>
      </div>
    </Modal>

    <!-- 创建新增参数弹窗 -->
    <Modal
      v-model="parametermodal"
      title="添加参数"
      :loading="true"
      width="634"
      :mask-closable="false"
    >
      <Form
        :model="minformItem"
        :rules="ruleValidate1"
        :label-width="130"
        ref="minfrom"
      >
        <FormItem
          label="参数名称"
          prop="name"
        >
          <Input
            v-model="minformItem.name"
            placeholder="请输入参数名称"
            style="width: 280px;"
          />
        </FormItem>
        <FormItem
          label="标识符"
          prop="tag"
        >
          <Input
            v-model="minformItem.tag"
            placeholder="请输入标识符"
            style="width: 280px;"
          />
        </FormItem>
        <FormItem
          label="数据类型"
          prop="dataformat"
        >
          <Select
            v-model="minformItem.dataformat"
            style="width: 280px;"
          >
            <Option :value="1">int32</Option>
            <Option :value="2">float</Option>
            <Option :value="3">double</Option>
            <!-- <Option :value="4">enum</Option>
            <Option :value="5">bool</Option>
            <Option :value="6">text</Option>
            <Option :value="7">date</Option>
            <Option :value="8">struct</Option>
            <Option :value="9">array</Option> -->
          </Select>
        </FormItem>
        <div style="display:flex;">
          <FormItem
            label="取值范围"
            prop="min"
            style="margin-bottom:36px;"
          >
            <Input
              v-model="minformItem.min"
              placeholder="最小值"
              style="width: 115px;"
              type="number"
              number
              @keyup.native="inputNumMM"
            />
            <span class="minfenge">-</span>
          </FormItem>
          <FormItem
            prop="max"
            style="margin:0;"
            class="maxformitem"
          >
            <Input
              v-model="minformItem.max"
              placeholder="最大值"
              style="width: 115px;"
              type="number"
              number
              @keyup.native="inputNumMM"
            />
          </FormItem>
        </div>
        <FormItem
          label="分辨率"
          prop="step"
        >
          <Input
            v-model="minformItem.step"
            placeholder="请输入分辨率"
            style="width: 280px;"
            type="number"
            number
            @keyup.native="inputNumMM"
          />
        </FormItem>
        <FormItem
          label="单位"
          prop="unit"
        >
          <Select
            v-model="minformItem.unit"
            style="width: 280px;"
          >
            <Option
              v-for="myunitlist in unitlist"
              :value="myunitlist.id"
              :key="myunitlist.id"
            >{{myunitlist.name}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          @click="closepromodal"
          class="white-btn"
        >取 消</Button>
        <Button
          type="primary"
          @click="minSubmit('minfrom')"
        >确 定</Button>
      </div>
    </Modal>
    <!-- 确认删除弹窗 -->
    <Modal
      v-model="delectmodal"
      title="删除功能"
      width="634"
      :mask-closable="false"
      @on-ok="deletefun"
    >
      <Alert
        type="warning"
        show-icon
      >
        <template slot="desc">
          删除功能将删除与该功能相关的数据，该操作无法撤销。
        </template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'

export default {
  data () {
    const valifunname = function (rule, value, callback) {
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1}[\u4e00-\u9fa5_.a-zA-Z0-9_-]{0,29}$/.test(value)) {
        return callback(new Error('请正确输入功能名称'))
      } else {
        callback()
      }
    }
    const valifuntag = function (rule, value, callback) {
      if (!/^[_a-zA-Z0-9_]{1,50}$/.test(value)) {
        return callback(new Error('请正确输入标识符'))
      } else {
        callback()
      }
    }
    const valicanname = function (rule, value, callback) {
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1}[\u4e00-\u9fa5_.a-zA-Z0-9_-]{0,29}$/.test(value)) {
        return callback(new Error('请正确输入参数名称'))//
      } else {
        callback()
      }
    }
    return {
      ppid: '',
      pfid: '',
      deletepfid: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      definmodal: false,
      parametermodal: false,
      delectmodal: false,
      unitlist: [],
      formItem: {
        name: '',
        type: 1,
        fuctionTag: '',
        dataformat: 1,
        min: '',
        max: '',
        step: '',
        unit: '',
        status: 1,
        remark: '',
        pfpid: '',
        paramList: [],
        paramList1: [],
        edit: 2
      },
      minformItem: {
        name: '',
        tag: '',
        dataformat: 1,
        min: '',
        max: '',
        step: '',
        unit: '',
        type: 1,
        edit: 2,
        index: '',
        pfpid: ''
      },
      ruleValidate: {
        type: [
          {
            required: true,
            message: '请选择功能类型',
            trigger: 'change',
            type: 'number'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入功能名称',
            trigger: 'blur'
          },
          {
            validator: valifunname,
            trigger: 'blur'
          }
        ],
        fuctionTag: [
          {
            required: true,
            message: '请输入标识符',
            trigger: 'blur'
          },
          {
            validator: valifuntag,
            trigger: 'blur'
          }
        ],
        dataformat: [
          {
            required: true,
            message: '请选择数据类型',
            trigger: 'change',
            type: 'number'
          }
        ],
        min: [
          {
            required: true,
            message: '请输入取值范围',
            trigger: 'blur',
            type: 'number'
          },
          {
            type: 'number',
            max: 2147483647,
            message: '数值不能超过2147483647',
            trigger: 'blur'
          },
          {
            type: 'number',
            min: -2147483648,
            message: '数值不能小于-2147483648',
            trigger: 'blur'
          }
        ],
        max: [
          {
            required: true,
            message: '请输入取值范围',
            trigger: 'blur',
            type: 'number'
          },
          {
            type: 'number',
            max: 2147483647,
            message: '数值不能超过2147483647',
            trigger: 'blur'
          },
          {
            type: 'number',
            min: -2147483648,
            message: '数值不能小于-2147483648',
            trigger: 'blur'
          }
        ],
        step: [
          {
            required: true,
            message: '请输入分辨率',
            trigger: 'blur',
            type: 'number'
          },
          {
            message: '分辨率必须为正整数,不大于最大值和最小值得差值',
            trigger: 'blur',
            type: 'number',
            min: 1
          }
        ],
        unit: [
          {
            required: true,
            message: '请选择单位',
            trigger: 'change',
            type: 'number'
          }
        ],
        status: [
          {
            required: true,
            message: '读写类型',
            trigger: 'change',
            type: 'number'
          }
        ],
        remark: [
          {
            type: 'string',
            max: 100,
            message: '备注不能超过100字',
            trigger: 'blur'
          }
        ]
      },
      ruleValidate1: {
        name: [
          {
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          },
          {
            validator: valicanname,
            trigger: 'blur'
          }
        ],
        tag: [
          {
            required: true,
            message: '请输入标识符',
            trigger: 'blur'
          },
          {
            validator: valifuntag,
            trigger: 'blur'
          }
        ],
        dataformat: [
          {
            required: true,
            message: '请选择数据类型',
            trigger: 'change',
            type: 'number'
          }
        ],
        min: [
          {
            required: true,
            message: '请输入取值范围',
            trigger: 'blur',
            type: 'number'
          },
          {
            type: 'number',
            max: 2147483647,
            message: '数值不能超过2147483647',
            trigger: 'blur'
          },
          {
            type: 'number',
            min: -2147483648,
            message: '数值不能小于-2147483648',
            trigger: 'blur'
          }
        ],
        max: [
          {
            required: true,
            message: '请输入取值范围',
            trigger: 'blur',
            type: 'number'
          },
          {
            type: 'number',
            max: 2147483647,
            message: '数值不能超过2147483647',
            trigger: 'blur'
          },
          {
            type: 'number',
            min: -2147483648,
            message: '数值不能小于-2147483648',
            trigger: 'blur'
          }
        ],
        step: [
          {
            required: true,
            message: '请输入分辨率',
            trigger: 'blur',
            type: 'number'
          },
          {
            message: '分辨率必须为正整数',
            trigger: 'blur',
            type: 'number',
            min: 1
          }
        ],
        unit: [
          {
            required: true,
            message: '请选择单位',
            trigger: 'change',
            type: 'number'
          }
        ]
      },
      columns1: [
        {
          title: '功能名称',
          key: 'name',
          tooltip: true
        },
        {
          title: '功能类型',
          key: 'type',
          tooltip: true,
          render: (h, params) => {
            const row = params.row
            const type = row.type
            var text1 
            if (type === 1) {
              text1 = '属性'
            } else if (type == 2) {
              text1 = '服务'
            } else if (type == 3) {
              text1 = '事件'
            }
            return h('div', [h('span', {}, text1)])
          }
        },
        {
          title: '标识符',
          key: 'tag',
          tooltip: true
        },
        {
          title: '数据类型',
          key: 'dataformat',
          tooltip: true,
          render: (h, params) => {
            const row = params.row
            const dataformat = row.dataformat
            var text1
            if (dataformat === 1) {
              text1 = 'int32 (整数型)'
            } else if (dataformat == 2) {
              text1 = 'float (单精度浮点型)'
            } else if (dataformat == 3) {
              text1 = 'double (双精度浮点型)'
            } else if (dataformat == 4) {
              text1 = 'enum (枚举型)'
            } else if (dataformat == 5) {
              text1 = 'bool (布尔型)'
            } else if (dataformat == 6) {
              text1 = 'text (字符串)'
            } else if (dataformat == 7) {
              text1 = 'date (时间型)'
            } else if (dataformat == 8) {
              text1 = 'struct (结构体)'
            } else if (dataformat == 9) {
              text1 = 'array (数组)'
            }
            return h('div', [h('span', {}, text1)])
          }
        },
        {
          title: '数据定义',
          key: 'min',
          tooltip: true,
          render: (h, params) => {
            const row = params.row
            const min = row.min
            const max = row.max
            const text1 = `取值范围：${min} - ${max}`
            return h('div', [h('span', {}, text1)])
          }
        },
        {
          title: '操作',
          key: 'id',
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
                      this.editfunmodal(params.row.pfid)
                    }
                  }
                },
                '编辑'
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
                    padding: '0'
                  },
                  on: {
                    click: () => {
                      this.showdeletefun(params.row.pfid)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data1: []
    }
  },
  methods: {
    // 小数点替换@keyup.native="inputNumMM",=如果输入小数点则转换为整数
    inputNumMM (e) {
      // console.log(e)
      if (e.code == 'Minus') {
        return '-'
      }
      let str1 = parseInt(this.formItem.min)
      let str2 = parseInt(this.formItem.max)
      let str3 = parseInt(this.formItem.step)
      let str4 = parseInt(this.minformItem.min)
      let str5 = parseInt(this.minformItem.max)
      let str6 = parseInt(this.minformItem.step)
      // console.log(str1);
      this.formItem.min = str1
      this.formItem.max = str2
      // 分辨率为最大值减最小值
      this.formItem.step = str3
      if (str3 > str2 - str1) {
        return this.formItem.step = str2 - str1
      }
      this.minformItem.min = str4
      this.minformItem.max = str5
      this.minformItem.step = str6
      if (str6 > str5 - str4) {
        return this.minformItem.step = str5 - str4
      }
    },
    getParams: function () {
      // 取到路由带过来的参数
      var ppid = this.$route.query.ppid
      // 将数据放在当前组件的数据内
      this.ppid = ppid
    },
    // 修改每页条数
    pagesizechange (pagesize) {
      this.pageSize = pagesize
      this.pageNum = 1
      this.getfunlist()
    },
    // 修改页码
    pagenumberchange (pagenum) {
      this.pageNum = pagenum
      this.getfunlist()
    },
    // 获取消息列表
    getfunlist () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/ProductController/fuctionList',
      //     {
      //       ppid: _this.ppid,
      //       pageNum: _this.pageNum,
      //       pageSize: _this.pageSize
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       let result = list.result
      //       if (result.length <= 0) {
      //         _this.data1 = []
      //       } else {
      //         _this.data1 = result
      //       }
      //       _this.total = list.total
      //       _this.pageNum = list.pageNum
      //       _this.pageSize = list.pageSize
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    // 确认添加
    handleSubmit (postdata) {
      const _this = this

      _this.$refs[postdata].validate(valid => {
        if (valid) {
          let map = {}
          map.ppid = _this.ppid
          map.pfid = _this.pfid
          map.type = _this.formItem.type
          map.name = _this.formItem.name
          map.status = _this.formItem.status
          map.fuctionTag = _this.formItem.fuctionTag
          map.remark = _this.formItem.remark
          if (map.type == 1) {
            map.paramList = []
            var minlist = {}
            minlist.dataformat = _this.formItem.dataformat
            minlist.min = _this.formItem.min
            minlist.max = _this.formItem.max
            minlist.step = _this.formItem.step
            minlist.unit = _this.formItem.unit
            minlist.pfpid = _this.formItem.pfpid
            map.paramList.push(minlist)
            if (minlist.min >= minlist.max) {
              _this.$Message.error('最小值不能大于等于最大值')
              return false
            }
          } else if (map.type == 2) {
            map.paramList = _this.formItem.paramList
          } else if (map.type == 3) {
            map.paramList = _this.formItem.paramList1
          }
          if (map.paramList.length == 0) {
            _this.$Message.error('参数不能为空')
          }

          // useaxios
          //   .axios(
          //     this.$api.baseUrl + '/iext/back/ProductController/saveFuction',
          //     JSON.parse(JSON.stringify(map))
          //   )
          //   .then(function (res) {
          //     if (res.data.success === 1) {
          //       _this.$Message.success('创建成功')
          //       _this.pageNum = 1
          //       _this.getfunlist()
          //       _this.closeallmodal()
          //     } else {
          //       _this.$Message.error(res.data.msg)
          //     }
          //   })
          //   .catch(function (error) {
          //     url_api.commonjs.checkError(error)
          //   })
        }
      })
    },
    // 添加参数
    minSubmit (postdata) {
      const _this = this
      _this.$refs[postdata].validate(valid => {
        if (valid) {
          let minlist = {}
          let index = _this.minformItem.index
          minlist.type = _this.minformItem.type
          minlist.name = _this.minformItem.name
          minlist.tag = _this.minformItem.tag
          minlist.dataformat = _this.minformItem.dataformat
          minlist.min = _this.minformItem.min
          minlist.max = _this.minformItem.max
          minlist.step = _this.minformItem.step
          minlist.unit = _this.minformItem.unit
          minlist.pfpid = _this.minformItem.pfpid
          if (minlist.min >= minlist.max) {
            _this.$Message.error('最小值不能大于等于最大值')
            return false
          }
          if (_this.formItem.type == 2) {
            if (_this.minformItem.edit == 2) {
              _this.formItem.paramList.push(minlist)
            } else {
              _this.formItem.paramList[index] = minlist
            }
          } else if (_this.formItem.type == 3) {
            if (_this.minformItem.edit == 2) {
              _this.formItem.paramList1.push(minlist)
            } else {
              _this.formItem.paramList1[index] = minlist
            }
          }
          _this.parametermodal = false
        }
      })
    },
    // 显示删除弹窗
    showdeletefun (pfid) {
      const _this = this
      _this.deletepfid = pfid
      _this.delectmodal = true
    },
    // 确定删除
    deletefun () {
      // const _this = this
      // useaxios
      //   .axios(this.$api.baseUrl + '/iext/back/ProductController/delFuction', {
      //     pfid: _this.deletepfid
      //   })
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       _this.$Message.success('删除成功')
      //       _this.pageNum = 1
      //       _this.getfunlist()
      //       _this.closeallmodal()
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     url_api.commonjs.checkError(error)
      //   })
    },
    // 显示添加弹窗
    showdefinmodal () {
      const _this = this
      _this.formItem.edit = 2
      _this.pfid = ''
      _this.pfpid = ''
      _this.$refs['addfunfrom'].resetFields()
      _this.formItem.paramList = []
      _this.formItem.paramList1 = []
      _this.definmodal = true
    },
    // 显示编辑弹窗
    editfunmodal (pfid) {
      console.log(pfid);
      
      // const _this = this
      // _this.pfid = pfid
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/ProductController/fuctionInfo',
      //     {
      //       pfid: _this.pfid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map
      //       _this.formItem = {
      //         name: map.name,
      //         type: map.type,
      //         fuctionTag: map.tag,
      //         status: map.status,
      //         remark: map.remark
      //       }
      //       if (map.type == 1) {
      //         for (let value of map.parameter) {
      //           _this.formItem.dataformat = value.dataformat
      //           _this.formItem.unit = value.unit
      //           _this.formItem.min = value.min
      //           _this.formItem.max = value.max
      //           _this.formItem.step = value.step
      //           _this.formItem.pfpid = value.pfpid
      //         }
      //       } else if (map.type == 2) {
      //         _this.formItem.paramList = map.parameter
      //       } else if (map.type == 3) {
      //         _this.formItem.paramList1 = map.parameter
      //       }
      //       _this.formItem.edit = 1
      //       _this.definmodal = true
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
      // _this.messagemodal = true
    },
    showparmodal (postdata, type) {
      const _this = this
      _this.$refs[postdata].resetFields()
      _this.minformItem.type = type
      _this.minformItem.max = ''
      this.minformItem.pfpid = ''
      _this.minformItem.edit = 2
      _this.parametermodal = true
    },
    // 取消弹窗
    closeallmodal () {
      const _this = this
      _this.definmodal = false
      _this.parametermodal = false
    },
    // 取消属性弹窗
    closepromodal () {
      this.parametermodal = false
    },
    // 删除小参数
    remove (type, index) {
      let _this = this
      if (type == 1) {
        _this.formItem.paramList.splice(index, 1)
      } else if (type == 2) {
        _this.formItem.paramList1.splice(index, 1)
      }
      _this.$Message.success('删除成功')
    },
    editli (type, index) {
      const _this = this
      _this.minformItem.edit = 1
      _this.minformItem.index = index
      if (type == 1) {
        _this.minformItem.type = _this.formItem.paramList[index].type
        _this.minformItem.name = _this.formItem.paramList[index].name
        _this.minformItem.tag = _this.formItem.paramList[index].tag
        _this.minformItem.dataformat =
          _this.formItem.paramList[index].dataformat
        _this.minformItem.min = _this.formItem.paramList[index].min
        _this.minformItem.max = _this.formItem.paramList[index].max
        _this.minformItem.step = _this.formItem.paramList[index].step
        _this.minformItem.unit = _this.formItem.paramList[index].unit
        _this.minformItem.pfpid = _this.formItem.paramList[index].pfpid
      } else if (type == 2) {
        _this.minformItem.type = _this.formItem.paramList1[index].type
        _this.minformItem.name = _this.formItem.paramList1[index].name
        _this.minformItem.tag = _this.formItem.paramList1[index].tag
        _this.minformItem.dataformat =
          _this.formItem.paramList1[index].dataformat
        _this.minformItem.min = _this.formItem.paramList1[index].min
        _this.minformItem.max = _this.formItem.paramList1[index].max
        _this.minformItem.step = _this.formItem.paramList1[index].step
        _this.minformItem.unit = _this.formItem.paramList1[index].unit
        _this.minformItem.pfpid = _this.formItem.paramList1[index].pfpid
      }
      this.parametermodal = true
    },
    // 获取单位列表
    getunitlist () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/ProductController/unitList',
      //     {},
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.unit
      //       _this.unitlist = list
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    }
  },
  watch: {},
  created () {
    this.getParams()
    this.getunitlist()
  },
  mounted () {
    this.getfunlist()
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

.ivu-form-item {
  overflow: visible;
}
.minfenge {
  padding: 0 16px; /*no*/
}
.blue-text-btn {
  padding: 0 8px; /*no*/
}
.parameter-title {
  margin: 20px 0 8px 0; /*no*/
}
.parameter-ul {
  margin-bottom: 8px; /*no*/
  .parameter-li {
    display: flex;
    margin-bottom: 8px;
    div {
      margin-right: 8px; /*no*/
      width: 280px; /*no*/
      height: $control-height; /*no*/
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(249, 250, 251, 1) 100%
      );
      box-shadow: 0px 1px 0px 0px rgba(22, 29, 37, 0.05); /*no*/
      border-radius: 3px; /*no*/
      border: 1px solid rgba(196, 205, 213, 1); /*no*/
      display: flex;
      align-items: center;
      padding: 0 12px; /*no*/
    }
  }
}
</style>
