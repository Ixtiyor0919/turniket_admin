import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import moment from "moment";

const Salary = () => {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { workerData } = useData();
    const navigate = useNavigate();

    const getResponseFunc = (current, pageSize) => {
        setLoading(true);
        instance
            .get(`api/turnstile/salary/page?page=${current}&size=${pageSize}`)
            .then((data) => {
                const apiData = data.data?.data?.salaryPage.map((item) => {
                    return {
                        ...item,
                        month: moment(item.month).format("YYYY-MM-DD"),
                    };
                });
                setResponseData(apiData);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Maoshlarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const getDateMonthFilter = (value, current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/turnstile/salary/report?month=${moment(value).format("YYYY-MM-DD HH:MM:SS")}&page=${current}&size=${pageSize}`
            )
            .then((data) => {
                    setResponseData(data.data?.data?.report);
                    setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Sana va ishchi bo'yicha yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Xodim",
            dataIndex: "workerId",
            key: "workerId",
            width: "13%",
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
            dataIndex: "month",
            key: "month",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.month < b.month) {
                    return -1;
                }
                if (a.month > b.month) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xarajatlar",
            dataIndex: "expenses",
            key: "expenses",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.expenses < b.expenses) {
                    return -1;
                }
                if (a.expenses > b.expenses) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Ish haqi",
            dataIndex: "salary",
            key: "salary",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.salary < b.salary) {
                    return -1;
                }
                if (a.salary > b.salary) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Tayinlangan ish haqi",
            dataIndex: "assignedSalary",
            key: "assignedSalary",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.assignedSalary < b.assignedSalary) {
                    return -1;
                }
                if (a.assignedSalary > b.assignedSalary) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Ish haqi o'n foizda",
            dataIndex: "salaryTenPercent",
            key: "salaryTenPercent",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.salaryTenPercent < b.salaryTenPercent) {
                    return -1;
                }
                if (a.salaryTenPercent > b.salaryTenPercent) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Umumiy oldindan to'lov",
            dataIndex: "totalPrePayment",
            key: "totalPrePayment",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.totalPrePayment < b.totalPrePayment) {
                    return -1;
                }
                if (a.totalPrePayment > b.totalPrePayment) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Jami ish kunlari",
            dataIndex: "totalWorkDays",
            key: "totalWorkDays",
            width: "13%",
            search: false,
            sorter: (a, b) => {
                if (a.totalWorkDays < b.totalWorkDays) {
                    return -1;
                }
                if (a.totalWorkDays > b.totalWorkDays) {
                    return 1;
                }
                return 0;
            },
        }
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/turnstile/salary", { ...values })
            .then(function (response) {
                message.success("Ish haqi muvaffaqiyatli qo'shildi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish haqini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/turnstile/salary?salaryId=${initial.id}`, {
                ...values,
                id: initial.id,
                delete: false,
            })
            .then((res) => {
                message.success("Ish haqi muvaffaqiyatli taxrirlandi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish haqini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                getData={getResponseFunc}
                columns={columns}
                getDateMonthFilter={getDateMonthFilter}
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

export default Salary;
