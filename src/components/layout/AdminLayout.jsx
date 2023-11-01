import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Layout, Menu, Button, theme, Modal, Avatar, Badge } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, BookOutlined, ExperimentOutlined, StarOutlined, CodeOutlined, DashboardOutlined, TeamOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { removeAuth } from "../../redux/slices/auth";
import { TOKEN, USER } from "../../constants";
import { useGetUsersQuery } from "../../redux/queries/notClient-user";

import "./adminLayout.css";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { data: { total } = { total: 0 }, isFetching } = useGetUsersQuery();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logout = () => {
        Modal.confirm({
            title: "Do you want to exit",
            onOk: () => {
                navigate("/login");
                dispatch(removeAuth());
                localStorage.removeItem(USER);
                Cookies.remove(TOKEN);
            },
        });
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
                <div className="aside-logo" style={{ color: "white" }}>
                    {collapsed ? "PTP" : "PTP admin"}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    items={[
                        {
                            key: "/dashboard",
                            icon: <DashboardOutlined />,
                            label: <Link to="/dashboard">Dashboard</Link>,
                        },
                        {
                            key: "/education",
                            icon: <BookOutlined />,
                            label: <Link to="/education">Education</Link>,
                        },
                        {
                            key: "/experiences",
                            icon: <ExperimentOutlined />,
                            label: <Link to="/experiences">Experiences</Link>,
                        },
                        {
                            key: "/portfolio",
                            icon: <CodeOutlined />,
                            label: <Link to="/portfolio">Portfolio</Link>,
                        },
                        {
                            key: "/skills",
                            icon: <StarOutlined />,
                            label: <Link to="/skills">Skills</Link>,
                        },
                        {
                            key: "/users",
                            icon: <TeamOutlined />,
                            label: <Link to="/users">Users</Link>,
                        },
                        {
                            key: "4",
                            icon: <LogoutOutlined />,
                            label: "Logout",
                            onClick: logout,
                            className: "logout",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="layout-header"
                    style={{
                        padding: "0px",
                        background: colorBgContainer,
                    }}
                >
                    <div className="header-box">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="tools_box">
                            <Link to="/users/notClientUsers">
                                <Badge count={isFetching ? "..." : total} className="badge">
                                    <Button type="primary" style={{ background: "#8a2be2" }}>
                                        not-Clients
                                    </Button>
                                </Badge>
                            </Link>
                            <Avatar size={"large"} icon={<UserOutlined />} />
                        </div>
                    </div>
                </Header>
                <Content
                    className="admin-main"
                    style={{
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
