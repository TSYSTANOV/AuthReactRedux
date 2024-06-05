import { Layout, Row, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthSlice";
const { Header, Content, Footer, Sider } = Layout;

function NavBar() {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state.authorisation);
  const items1 = ["Login"].map((item) => ({
    item,
    label: `${item}`,
  }));
  const items2 = [`${user.username}`, "Exit"].map((item) => ({
    onClick:
      item === "Exit"
        ? () => {
            dispatch(logout());
          }
        : null,
    item,
    label: `${item}`,
  }));

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />

        <Menu
          theme="dark"
          mode="horizontal"
          items={auth ? items2 : items1}
          style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
        />
      </Header>
    </Layout>
  );
}
export { NavBar };
