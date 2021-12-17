import React, { Component } from "react";
import "./login.less";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import logo from "./images/logo.png";
const Item =Form.Item; 

// 登录组件的路由
export default class Login extends Component {
  handleSubmit=(value)=>{
    console.log(value);
  }
  onFinish=()=>{
    console.log('成功');
  }
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            onSubmit={this.handleSubmit}
            onFinish={this.onFinish}
          >
            <Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

