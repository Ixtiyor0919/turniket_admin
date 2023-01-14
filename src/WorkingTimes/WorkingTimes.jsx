import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import moment from "moment";

const WorkingTimes = () => {
    const [outcomeSocks, setOutcomeSocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { workerData } = useData();
    const navigate = useNavigate();

    const getOutcomeSocks = (current, pageSize) => {
        setLoading(true);
        console.log('current:', current,  'pageSize:', pageSize);
        instance
            .get(
                `api/turnstile/workingTimes/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const apiData = data.data?.data?.allWorkers.map((item) => {
                    return {
                        ...item,
                        today: moment(item.today).format("YYYY-MM-DD"),
                    };
                });
                setOutcomeSocks(apiData);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish vaqtlarini yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const dateFilter = (date, current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/turnstile/workingTimes/workers?startDate=${moment(
                    date[0]
                ).format("YYYY-MM-DD HH:MM:SS")}&endDate=${moment(
                    date[1]
                ).format("YYYY-MM-DD HH:MM:SS")}${current}&size=${pageSize}`
            )
            .then((data) => {
                const responseData = data.data?.data?.workingTimesPage.map(
                    (item) => {
                        return {
                            ...item,
                            today: moment(item?.today).format("YYYY-MM-DD"),
                        };
                    }
                );
                console.log(responseData);
                setOutcomeSocks(responseData);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 500) navigate("/server-error");
                message.error("Kelgan quruq mevalarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const getDataFilter = (value, date, current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/turnstile/workingTimes/byWorker?workerId=${value}&startDate=${moment(
                    date[0]
                ).format("YYYY-MM-DD HH:MM:SS")}&endDate=${moment(
                    date[1]
                ).format("YYYY-MM-DD HH:MM:SS")}&page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const responseData = data.data?.data?.workingTimesPage.map(
                    (item) => {
                        return {
                            ...item,
                            today: moment(item?.today).format("YYYY-MM-DD"),
                        };
                    }
                );
                    setOutcomeSocks(responseData);
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
            title: "Sanasi",
            dataIndex: "today",
            key: "today",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.today < b.today) {
                    return -1;
                }
                if (a.today > b.today) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Soat",
            dataIndex: "hours",
            key: "hours",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.hours < b.hours) {
                    return -1;
                }
                if (a.hours > b.hours) {
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
            today: moment(values.today, "YYYY-MM-DD").toISOString(),
        };
        instance
            .post("api/turnstile/workingTimes/add", { ...value })
            .then(function (response) {
                message.success("Ish vaqti muvaffaqiyatli qo'shildi");
                getOutcomeSocks(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish vaqtini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/turnstile/workingTimes/update/${initial.id}`, {
                ...values,
            })
            .then((res) => {
                message.success("Ish vaqti muvaffaqiyatli taxrirlandi");
                getOutcomeSocks(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish vaqtini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);
    };

    const filterSelect = [
        { label: "Sana bo'yicha", value: "date" },
        { label: "Ishchi va sana bo'yicha", value: "workerDate" }
    ];

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                getData={getOutcomeSocks}
                columns={columns}
                tableData={outcomeSocks}
                dateFilter={dateFilter}
                getDataFilter={getDataFilter}
                filterSelect={filterSelect}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default WorkingTimes;
