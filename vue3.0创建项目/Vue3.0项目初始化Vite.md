# Vue3.0项目初始化

## 创建项目

```
npm init vite
```

![image-20230317092656394](D:\mine\北京数慧-评估区划系统-日常问题\vue3.0创建项目\Vue3.0项目初始化Vite\image-20230317092656394.png)

选择VUE3+TS

创建出来的项⽬中并没有node_modules⽂件夹，所以按照上⾯的指引,进⼊项⽬⽂件夹后，执⾏ npm i

## 更换VUE模板支持工具

以前我们⽤的Vue模板⽀持的VScode扩展是Vetur，使⽤TS+Vue3建议换成更加友好的Volar。

全程为： Vue Language Features (Volar)

## 配置@符号目录

### **vite.config.ts**

```ts
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)
// 引入path时会报错找不到模块，是因为需要支持ts语法，安装类型声明，需要下载@types/node => npm i @types/node

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});
```

### 配置tsconfig.json

```json
// 在compilerOptions中新增
{
    compilerOptions：{
         "baseUrl": ".",
         "paths": {
             "@/*": ["src/*"]
         }
    }
}
```

## 配置router

### 安装vue-router@next

```
npm i vue-router@next -S
```

### **src/router/index.ts**，路由配置⽂件

```ts
import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";
import { App } from "vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export const initRouter = (app: App<Element>) => {
    app.use(router);
};
//或者
// export default router
```

### **src/main.ts**，项⽬引⼊路由配置

```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { initRouter } from "./router";

const app = createApp(App);
initRouter(app);
app.mount("#app");
// 或者
// import router from './router'
// createApp(App).use(router).mount('#app')
```

### src/App.vue

```vue
<template>
     <router-view></router-view>
</template>
```

## 配置API接口请求

### 安装axios

```
npm install axios -g
```

### src/utils/request.ts

```ts
import axios from "axios";

const instance = axios.create({
    baseURL: "",
    timeout: 60000,
});

// 拦截器
instance.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
}
);

instance.interceptors.response.use(result => {
    return result.data
}, err => {
    return Promise.reject(err)
})

export default instance

```

### src/api/home.ts

```ts
import request from "@/utils/request"

interface NavigationResult {
    name: string,
    icon: string,
    iconSelected: string,
    path: string
}
interface HomeResult {
    navigation: NavigationResult[]
}
type HomeParam = {
    file: string
}
export const home = (param: HomeParam): Promise<HomeResult> => {
    return request({
        url: `static/config/${param.file}`,
        method: "get",
        params: param
    })
}
```

## 安装vuex@next

```
npm i vuex@next -S
```

### **src/store/index.ts**

```ts
import { createStore, Store } from "vuex";
import { App } from "vue";

export interface State {}
export const store = createStore<State>({
 state() {
     return {
     }
 },
 mutations: {}
})

export const initStore = (app: App<Element>) => {
  app.use(store);
};
//或者
// export default initStore
```

### src/main.ts

```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { initStore } from "./store";

const app = createApp(App);
initStore(app);
app.mount("#app");
// 或者
// import initStore from './store'
// createApp(App).use(initStore).mount('#app')
```

## 安装element-plus

```
npm install element-plus -S
```

