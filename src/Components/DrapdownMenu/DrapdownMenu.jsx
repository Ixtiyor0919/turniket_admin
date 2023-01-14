import { Drawer, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    TeamOutlined,
    ClockCircleOutlined,
    ScheduleOutlined,
    DollarCircleOutlined,
    FileAddOutlined,
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
import turniketLogo from "./turniketLogo.jpeg";

function DrapdownMenu({ onClose, isVisible }) {
    const { token } = useToken();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-token"))
            sessionStorage.removeItem("socks-token", token);
        if (localStorage.getItem("socks-token")) {
            localStorage.removeItem("socks-token", token);
        }
        window.location.href = "/login";
    };
    return (
        <Drawer
            placement="left"
            closable={false}
            size="200px"
            onClose={onClose}
            visible={isVisible}
            onKeyDown={onClose}
        >
            <div
                className="logo"
                style={{
                    marginRight: "5%",
                    background: "rgb(0 21 41)",
                    padding: "15px 0 10px 15px",
                }}
            >
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={turniketLogo}
                        alt="img-logo"
                        width={70}
                        height={40}
                        style={{ marginRight: "10%", borderRadius: '5px' }}
                    />
                    <h2 style={{ color: "#fff", margin: 0 }}>
                        Turniket Admin
                    </h2>
                </Link>
            </div>
            <Menu
                style={{
                    height: "120%",
                }}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={["others"]}
                mode="inline"
                theme="dark"
                onMouseDown={onClose}
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
                                <FileAddOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                ]}
            />
        </Drawer>
    );
}

export default DrapdownMenu;
// import PropTypes from 'prop-types';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Box, Drawer, useMediaQuery } from '@mui/material';

// // third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { BrowserView, MobileView } from 'react-device-detect';

// // project imports
// import MenuList from './MenuList';
// import LogoSection from '../LogoSection';
// import MenuCard from './MenuCard';
// import { drawerWidth } from 'store/constant';

// // ==============================|| SIDEBAR DRAWER ||============================== //

// const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
//     const theme = useTheme();
//     const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

//     const drawer = (
//         <>
//             <Box sx={{ display: { xs: 'block', md: 'none' } }}>
//                 <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
//                     <LogoSection />
//                 </Box>
//             </Box>
//             <BrowserView>
//                 <PerfectScrollbar
//                     component="div"
//                     style={{
//                         height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
//                         paddingLeft: '16px',
//                         paddingRight: '16px'
//                     }}
//                 >
//                     <MenuList />
//                     <MenuCard />
//                 </PerfectScrollbar>
//             </BrowserView>
//             <MobileView>
//                 <Box sx={{ px: 2 }}>
//                     <MenuList />
//                     <MenuCard />
//                 </Box>
//             </MobileView>
//         </>
//     );

//     const container = window !== undefined ? () => window.document.body : undefined;

//     return (
//         <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
//             <Drawer
//                 container={container}
//                 variant={matchUpMd ? 'persistent' : 'temporary'}
//                 anchor="left"
//                 open={drawerOpen}
//                 onClose={drawerToggle}
//                 sx={{
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         background: theme.palette.background.default,
//                         color: theme.palette.text.primary,
//                         borderRight: 'none',
//                         [theme.breakpoints.up('md')]: {
//                             top: '88px'
//                         }
//                     }
//                 }}
//                 ModalProps={{ keepMounted: true }}
//                 color="inherit"
//             >
//                 {drawer}
//             </Drawer>
//         </Box>
//     );
// };

// Sidebar.propTypes = {
//     drawerOpen: PropTypes.bool,
//     drawerToggle: PropTypes.func,
//     window: PropTypes.object
// };

// export default Sidebar;