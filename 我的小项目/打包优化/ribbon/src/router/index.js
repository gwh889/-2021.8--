import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import home from "../views/home.vue";
import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index", // 重定向到登录页面
  },
  {
    path: "/index",
    name: "index",
    component: index,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
   // 平台介绍
   {
    path: "/platformTroduce",
    name: "platformTroduce",
    component: (resolve) =>
      require(["../views/introduce/platformTroduce.vue"], resolve),
  },
  {
    path: "/home",
    name: "home",
    component: home,
    children: [
      // 企业端
      //app页面
      {
        path: "/business/industryApp",
        name: "industryApp",
        component: (resolve) =>
          require(["../views/business/industryApp.vue"], resolve),
      },
      // app跳转后
      {
        path: "/business/app",
        name: "app",
        component: (resolve) =>
          require(["../components/home/app.vue"], resolve),
      },
      // 企业驾驶舱
      {
        path: "/business/businessCockpit",
        name: "businessCockpit",
        component: (resolve) =>
          require(["../components/home/businessCockpit.vue"], resolve),
      },
      //管理员驾驶舱
      {
        path: '/manage/manageCockpit',
        name: 'manageCockpit',
        component: (resolve) =>
          require(["../views/manage/manageCockpit.vue"],resolve),
      },

      // 云MES
      {
        path: "/cloudMes",
        name: "cloudMes",
        component: (resolve) =>
          require(["../components/home/cloud/cloudMes.vue"], resolve),
      },
      // 云SCM
      {
        path: "/cloudSCM",
        name: "cloudSCM",
        component: (resolve) =>
          require(["../components/home/cloud/cloudSCM.vue"], resolve),
      },
      // 管理员端
      // 资源监控池
      {
        path: "/manage/monitoringPool",
        name: "monitoringPool",
        component: (resolve) =>
          require(["../views/manage/monitoringPool.vue"], resolve),
      },
      // 企业管理
      {
        path: "/manage/businessManage",
        name: "businessManage",
        component: (resolve) =>
          require(["../views/manage/businessManage.vue"], resolve),
      },
       // 企业编辑
       {
        path: "/manage/businessEdit",
        name: "businessEdit",
        component: (resolve) =>
          require(["../views/manage/businessEdit.vue"], resolve),
      },
      // 企业详情
      {
        path: "/manage/businessDetail",
        name: "businessDetail",
        component: (resolve) =>
          require(["../views/manage/businessDetail.vue"], resolve),
      },
      // 公共端
      // IOT中的产品
      {
        path: "/product",
        name: "product",
        component: (resolve) => require(["../views/IOT/product.vue"], resolve),
      },
      {
        path: "/product/prodetail", // 产品详情
        name: "prodetail",
        component: (resolve) =>
          require(["../components/home/IOT/product/prodetail"], resolve),
        children: [
          {
            path: "/product/proinfor", // 产品信息
            name: "proinfor",
            component: (resolve) =>
              require(["../components/home/IOT/product/proinfor"], resolve),
          },
          {
            path: "/product/promessage", // 消息通讯
            name: "promessage",
            component: (resolve) =>
              require(["../components/home/IOT/product/promessage"], resolve),
          },
          {
            path: "/product/fundefin", // 功能定义
            name: "profundefin",
            component: (resolve) =>
              require(["../components/home/IOT/product/fundefin"], resolve),
          },
        ],
      },
      // IOT中的设备
      {
        path: "/device", // 设备列表
        name: "device",
        component: (resolve) => require(["../views/IOT/device.vue"], resolve),
        redirect: "/device/single", 
        children: [
          {
            path: "/device/single", // 单个设备列表
            name: "single",
            component: (resolve) =>
              require(["../components/home/IOT/device/single"], resolve),
          },
          {
            path: "/device/batch", // 批次设备列表
            name: "batch",
            component: (resolve) =>
              require(["../components/home/IOT/device/batch"], resolve),
          },
        ],
      },
      // 设备详情
      {
        path: "/device/devicedetail", // 设备详情
        name: "equdetail",
        component: (resolve) =>
          require(["../components/home/IOT/device/equdetail"], resolve),
        children: [
          {
            path: "/device/equinfor", // 设备详情
            name: "equinfor",
            component: (resolve) =>
              require(["../components/home/IOT/device/equinfor"], resolve),
          },
          {
            path: "/device/topiclist", // topiclist列表
            name: "topiclist",
            component: (resolve) =>
              require(["../components/home/IOT/device/topiclist"], resolve),
          },
          {
            path: "/device/equstatus", // topiclist列表
            name: "equstatus",
            component: (resolve) =>
              require(["../components/home/IOT/device/equstatus"], resolve),
          },
          {
            path: "/device/eventlist", // 事件管理
            name: "eventlist",
            component: (resolve) =>
              require(["../components/home/IOT/device/eventlist"], resolve),
          },
          {
            path: "/device/equservice", // 服务调用
            name: "equservice",
            component: (resolve) =>
              require(["../components/home/IOT/device/equservice"], resolve),
          },
          {
            path: "/device/equchild", // 子设备管理
            name: "equchild",
            component: (resolve) =>
              require(["../components/home/IOT/device/equchild"], resolve),
          },
        ],
      },
      // IOT中的规则引擎
      {
        path: "/group", // 设备分组
        name: "group",
        component: (resolve) => require(["../views/IOT/group.vue"], resolve),
      },
      {
        path: "/group/equipGroupTab", // tab 容器
        name: "equipGroupTab",
        component: (resolve) =>
          require(["../components/home/IOT/group/equipGroupTab"], resolve),
        children: [
          {
            path: "/group/equipDetail", // 设备详情
            name: "equipDetail",
            component: (resolve) =>
              require(["../components/home/IOT/group/equipDetail"], resolve),
          },
          {
            path: "/group/equipmentList", // 设备列表
            name: "equipmentList",
            component: (resolve) =>
              require(["../components/home/IOT/group/equipmentList"], resolve),
          },
          {
            path: "/group/childGroupList", // 子分组列表
            name: "childGroupList",
            component: (resolve) =>
              require(["../components/home/IOT/group/childGroupList"], resolve),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
