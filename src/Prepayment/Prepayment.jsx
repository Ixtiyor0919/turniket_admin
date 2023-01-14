import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import moment from "moment";

const Prepayment = () => {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { workerData } = useData();
    const navigate = useNavigate();

    const getResponseFunc = (current, pageSize) => {
        setLoading(true);
        console.log('current:', current,  'pageSize:', pageSize);
        instance
            .get(`api/turnstile/prepayment/page?page=${current}&size=${pageSize}`)
            .then((data) => {
                const apiData = data.data?.data?.prepayments.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("YYYY-MM-DD"),
                    };
                });
                setResponseData(apiData);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Avanslarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Xodim",
            dataIndex: "workerId",
            key: "workerId",
            width: "33%",
            search: false,
            render: (record) => {
                const data = workerData?.filter((item) => item.id === record);
                return data[0]?.fio;
            },
            sorter: (a, b) => {
                if (a.workerId < b.workerId) {
                    return -1;
                }
                if (a.workerId > b.workerId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Sana",
            dataIndex: "date",
            key: "date",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Avans summasi",
            dataIndex: "summa",
            key: "summa",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.summa < b.summa) {
                    return -1;
                }
                if (a.summa > b.summa) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        const value = {
            ...values,
            date: moment(values.date, "YYYY-MM-DD").toISOString(),
        }
        instance
            .post("api/turnstile/prepayment/add", { ...value })
            .then(function (response) {
                message.success("Avans muvaffaqiyatli qo'shildi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Avansni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        const time = moment(values.date, "YYYY-MM-DD").toISOString()
        instance
            .put(`api/turnstile/prepayment/update/${initial.id}`, {
                ...values,
                id: initial.id,
                date: time,
            })
            .then((res) => {
                message.success("Avans muvaffaqiyatli taxrirlandi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Avansni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/turnstile/prepayment/delete/${item}`)
                .then((data) => {
                    getResponseFunc(current - 1, pageSize);
                    message.success("Avans muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Avansni o'chirishda muammo bo'ldi");
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
                getData={getResponseFunc}
                columns={columns}
                tableData={responseData}
                current={current}
                pageSize={pageSize}
                loading={loading}
                totalItems={totalItems}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default Prepayment;
