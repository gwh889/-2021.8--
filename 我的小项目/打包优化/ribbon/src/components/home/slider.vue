<template>
  <div id="slider">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      active-text-color="#1E90FF"
      router
    >
      <template v-for="item in sliderData">
        <template v-if="item.menu">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item-group v-for="i in item.menu" :key="i.index">
              <el-menu-item v-if="i.index==='10-1'"><a target="blank" href="http://fzxd.dtsum.com/resource/IoT开发者文档.pdf">{{ i.title }}</a></el-menu-item>
              <el-menu-item v-else :index="i.index">{{ i.title }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
            <a href="http://monitortest.dtsum.com/?orgId=1" target="blank"  v-if="item.id ===3&&user.duType === 1" :key="item.index"><el-menu-item> <span slot="title">{{ item.title }}</span></el-menu-item></a>
          <el-tooltip
            :offset="10"
            content="研发中，敬请期待"
            placement="bottom-end"
            popper-class="atooltip"
            :key="item.index"
            v-if="
              (item.index === '7' || item.index === '8' || item.index === '9')&&item.index !== '3'
            "
          >
            <el-menu-item :index="item.index" :key="item.index" disabled>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-tooltip>
          <el-menu-item v-if="item.index !== '7' && item.index !== '8' && item.index !== '9'&&item.index !== '3'" :index="item.index" :key="item.index">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      user: {},
      sliderData:[]
      // sliderData: [
      //   {
      //     id: 1,
      //     index: "1",
      //     title: "行业驾驶舱",
      //   },
      //   {
      //     id: 2,
      //     index: "2",
      //     title: "企业驾驶舱",
      //   },
      //   {
      //     id: 3,
      //     index: "/industryApp",
      //     title: "纺织线带工业APP",
      //   },
      //   {
      //     id: 4,
      //     index: "4",
      //     title: "云应用",
      //     menu: [
      //       {
      //         index: "4-1",
      //         title: "云MES",
      //       },
      //       {
      //         index: "4-2",
      //         title: "云ERP",
      //       },
      //       {
      //         index: "4-3",
      //         title: "云WMS",
      //       },
      //     ],
      //   },
      //   {
      //     id: 5,
      //     index: "5",
      //     title: "IOT",
      //     menu: [
      //       {
      //         index: "5-1",
      //         title: "产品",
      //       },
      //       {
      //         index: "5-2",
      //         title: "设备",
      //       },
      //       {
      //         index: "5-3",
      //         title: "规则引擎",
      //       },
      //     ],
      //   },
      //   {
      //     id: 6,
      //     index: "/businessManage",
      //     title: "企业管理",
      //   },
      //   {
      //     id: 7,
      //     index: "7",
      //     title: "采购管理",
      //   },
      //   {
      //     id: 8,
      //     index: "8",
      //     title: "电商管理",
      //   },
      //   {
      //     id: 9,
      //     index: "9",
      //     title: "共享制造",
      //   },
      //   {
      //     id: 10,
      //     index: "10",
      //     title: "开发者中心",
      //     menu: [
      //       {
      //         index: "10-1",
      //         title: "开发者文档",
      //       },
      //       {
      //         index: "10-2",
      //         title: "移动端配置平台",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  created() {
    this.getUserMessage();
  },
  methods: {
    getUserMessage() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.user.duType === 1) {
        this.sliderData = [
          {
            id: 1,
            index: "/manage/manageCockpit",
            title: "行业驾驶舱",
          },
          {
            id: 3,
            index: "3",
            title: "资源池监控",
          },
          // {
          //   id: 5,
          //   index: "5",
          //   title: "IOT",
          //   menu: [
          //     {
          //       index: "/product",
          //       title: "产品",
          //     },
          //     {
          //       index: "/device",
          //       title: "设备",
          //     },
          //     // {
          //     //   index: "/group",
          //     //   title: "规则引擎",
          //     // },
          //   ],
          // },
          {
            id: 6,
            index: "/manage/businessManage",
            title: "企业管理",
          },
          // {
          //   id: 7,
          //   index: "7",
          //   title: "采购管理",
          // },
          // {
          //   id: 8,
          //   index: "8",
          //   title: "电商管理",
          // },
          // {
          //   id: 9,
          //   index: "9",
          //   title: "共享制造",
          // },
          {
            id: 10,
            index: "10",
            title: "开发者中心",
            menu: [
              {
                index: "10-1",
                title: "开发者文档",
              },
              // {
              //   index: "10-2",
              //   title: "移动端配置平台",
              // },
            ],
          },
        ];
      } else {
        this.sliderData = [
          {
            id: 2,
            index: "/business/businessCockpit",
            title: "企业驾驶舱",
          },
          {
            id: 3,
            index: "/business/industryApp",
            title: "纺织线带工业APP",
          },
          {
            id: 4,
            index: "4",
            title: "应用中心",
            menu: [
              {
                index: "/cloudMes",
                title: "云MES",
              },
              {
                index: "4-2",
                title: "云ERP",
              },
              {
                index: "/cloudSCM",
                title: "云WMS",
              },
            ],
          },
          // {
          //   id: 5,
          //   index: "5",
          //   title: "IOT",
          //   menu: [
          //     {
          //       index: "/product",
          //       title: "产品",
          //     },
          //     {
          //       index: "/device",
          //       title: "设备",
          //     },
          //     // {
          //     //   index: "/group",
          //     //   title: "规则引擎",
          //     // },
          //   ],
          // },
          // {
          //   id: 7,
          //   index: "7",
          //   title: "采购管理",
          // },
          // {
          //   id: 8,
          //   index: "8",
          //   title: "电商管理",
          // },
          // {
          //   id: 9,
          //   index: "9",
          //   title: "共享制造",
          // }
        ];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#slider {
  width: 201px;
  .el-menu {
    min-height: 89vh;
  }
  .el-menu-item {
    font-size: 14px;
    text-align: left;
    padding-left: 30px !important;
    height: 50px;
  }
}
</style>
<style lang="scss">
#slider {
  margin-top: 8px;
  .el-menu-item.is-active {
    background: #f3fbff;
    border-right: 3px solid #1e90ff;
  }
  .el-menu-item:hover {
    background: #f3fbff;
  }
  .el-submenu__title:hover {
    background-color: #f3fbff;
  }
  .el-submenu {
    text-align: left;
    .el-submenu__title {
      font-size: 14px;
      padding-left: 30px !important;
      height: 50px;
    }
    .el-menu-item {
      font-size: 14px;
    }
  }
  .el-menu-item.is-disabled {
    opacity: 1;
    color: #999999;
  }
  .el-menu-item-group__title{
        display:none;
  }
}
</style>
