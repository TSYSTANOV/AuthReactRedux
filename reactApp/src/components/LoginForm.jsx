import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/AuthSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { isLoading, error } = useSelector((state) => state.authorisation);
  const [user, setUser] = useState({ username: "", password: "" });
  const submit = () => {
    dispatch(fetchUsers(user));
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={submit}
    >
      {error && (
        <div
          style={{
            backgroundColor: "red",
            padding: "5px 10px",
            borderRadius: "15px",
            margin: "5px",
          }}
        >
          {error}
        </div>
      )}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          value={user.username}
          onChange={(e) => {
            setUser((prev) => {
              return { ...prev, username: e.target.value };
            });
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              onClick={() => {
                setVisiblePassword(!visiblePassword);
              }}
            />
          }
          type={visiblePassword ? "text" : "password"}
          placeholder="Password"
          value={user.password}
          onChange={(e) => {
            setUser((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={isLoading}
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
}
export { LoginForm };
