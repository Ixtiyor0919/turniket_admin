import { Avatar, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
    DashboardOutlined,
    MenuOutlined,
    // UserOutlined,
    // LogoutOutlined,
    TeamOutlined,
    DollarCircleOutlined,
    ClockCircleOutlined,
    ScheduleOutlined,
    FileAddOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import useToken from "../../Hook/UseToken";
import DrapdownMenu from "../DrapdownMenu/DrapdownMenu";
import turniketLogo from "./turniketLogo.jpeg";

const { Header } = Layout;

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { token } = useToken();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-turnstile-token"))
            sessionStorage.removeItem("socks-turnstile-token", token);
        if (localStorage.getItem("socks-turnstile-token")) {
            localStorage.removeItem("socks-turnstile-token", token);
        }
        window.location.href = "/login";
    };

    const showDrawer = () => {
        setIsVisible(true);
    };

    const onClose = () => {
        setIsVisible(false);
    };

    return (
        <Header
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="logo logo-navbar" style={{ marginRight: "5%" }}>
                    <Link to="/" style={{ display: "block" }}>
                        <img
                            src={turniketLogo}
                            alt="img-logo"
                            width={100}
                            height={64}
                            style={{background: 'transparent'}}
                        />
                    </Link>
                </div>
                <Menu
                    style={{ width: "75%" }}
                    className="inline-navber"
                    theme="dark"
                    defaultSelectedKeys={[location.pathname]}
                    mode="horizontal"
                    items={[
                        {
                            label: "Xodimlar",
                            key: "/",
                            icon: (
                                <Link to="/">
                                    <TeamOutlined style={{ fontSize: "18px" }} />
                                </Link>
                            ),
                        },
                        {
                            label: "Ish vaqti",
                            key: "/Ish-vaqtlari",
                            icon: (
                                <Link to="/Ish-vaqtlari">
                                    <ClockCircleOutlined 
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Ish haqi",
                            key: "/Ish-haqilari",
                            icon: (
                                <Link to="/Ish-haqilari">
                                    <DollarCircleOutlined 
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Avans",
                            key: "/Avans",
                            icon: (
                                <Link to="/Avans">
                                    <ScheduleOutlined 
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Xarjatlar",
                            key: "/Ishchilar-xarajatlari",
                            icon: (
                                <Link to="/Ishchilar-xarajatlari">
                                    <FileAddOutlined 
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                    ]}
                />
                <span
                    className="user"
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
                        <Avatar
                            size="middle"
                            style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                            }}
                        >
                            {"Admin".charAt(0)}
                        </Avatar>
                    {/* </Dropdown> */}
                </span>
                <div className="burger-menu">
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MenuOutlined
                            onClick={showDrawer}
                            rotate={180}
                            style={{ fontSize: "28px", color: "#fff" }}
                        />
                        <DrapdownMenu onClose={onClose} isVisible={isVisible} />
                    </span>
                </div>
            </div>
        </Header>
    );
}

export default Navbar;
