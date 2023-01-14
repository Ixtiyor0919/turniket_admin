import { useState } from "react";
import instance from "../../Api/Axios";
import { message, notification } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { roleData, getUsersData } = useData();
    const navigate = useNavigate();

    const getUsers = (values) => {
        setLoading(true);
        instance
            .get(`api/socks/factory/user`)
            .then((data) => {
                setUsers(data.data.data);
                getUsersData();
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Foydalanuvchilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Foydalanuvchi nomi",
            dataIndex: "fio",
            key: "fio",
            width: "25%",
            search: true,
            sorter: (a, b) => {
                if (a.fio < b.fio) {
                    return -1;
                }
                if (a.fio > b.fio) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Foydalanuvchi nomeri",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "25%",
            search: false,
            sorter: (a, b) => {
                if (a.phoneNumber < b.phoneNumber) {
                    return -1;
                }
                if (a.phoneNumber > b.phoneNumber) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Role",
            dataIndex: "roleId",
            key: "roleId",
            width: "25%",
            search: false,
            render: (initealValue) => {
                const role = roleData?.filter(
                    (item) => item?.id === initealValue
                );
                return role[0]?.roleName;
            },
            sorter: (a, b) => {
                if (a.roleId < b.roleId) {
                    return -1;
                }
                if (a.roleId > b.roleId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Bloklangan",
            dataIndex: "block",
            key: "block",
            width: "24%",
            search: false,
            render: (record) => {
                return record ? "Ha" : "Yo'q";
            },
            sorter: (a, b) => {
                if (a.block < b.block) {
                    return -1;
                }
                if (a.block > b.block) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/socks/factory/user", {
                ...values,
            })
            .then(function (response) {
                message.success("Foydalanuvchi muvaffaqiyatli qo'shildi");
                getUsers(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(error.response?.data?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/socks/factory/user/editForUsers/${initial.id}`, {
                ...values,
                id: initial.id,
                deleted: false,
            })
            .then((res) => {
                message.success("Foydalanuvchi muvaffaqiyatli taxrirlandi");
                getUsers(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Foydalanuvchini taxrirlashda muammo bo'ldi");
                if (error.response?.status === 405)
                    notification["error"]({
                        message: "Ruxsat berilmagan usul",
                        duration: 5,
                        icon: <FrownOutlined style={{ color: "#f00" }} />,
                    });
            })
            .finally(() => {
                setLoading(false);
            });
        (values.block === "true" || values.block === "false") &&
            instance
                .patch(`api/socks/factory/user/${initial.id}`)
                .then((res) => {
                    message.success("Foydalanuvchi muvaffaqiyatli blocklandi");
                    getUsers(current - 1, pageSize);
                })
                .catch(function (error) {
                    console.error("Error in edit: ", error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Foydalanuvchini blocklashda muammo bo'ldi");
                    if (error.response?.status === 405)
                        notification["error"]({
                            message: "Ruxsat berilmagan usul",
                            duration: 5,
                            icon: <FrownOutlined style={{ color: "#f00" }} />,
                        });
                })
                .finally(() => {
                    setLoading(false);
                });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/user/${item}`)
                .then((data) => {
                    getUsers(current - 1, pageSize);
                    message.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Foydalanuvchini o'chirishda muammo bo'ldi");
                })
                .finally(() => setLoading(false));
            return null;
        });
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getUsers}
                columns={columns}
                tableData={users}
                current={current}
                pageSize={pageSize}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default Users;
