import { TextField } from "@mui/material";
import { InputNumber, Input, DatePicker } from "antd";
import { format } from "date-fns";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../Api/Axios";
import CustomSelect from "../Module/Select/Select";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [workerData, setWorkerData] = useState([]);
    let location = useLocation();
    const dateFormat = "YYYY/MM/DD";
    const formWorkerData = [
        {
            name: "fio",
            label: "Xodim",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "phoneNumber",
            label: "Xodimning nomeri",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "hourlyWages",
            label: "Soatlik ish haqi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editWorkerData = [
        {
            name: "fio",
            label: "Xodim",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "phoneNumber",
            label: "Xodimning nomeri",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "hourlyWages",
            label: "Soatlik ish haqi",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const workingTimesFormData = [
        {
            name: "workerId",
            label: "Xodim",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                />
            ),
        },
        {
            name: "today",
            label: "Sanasi",
            input: (
                // <TextField
                //     type="date"
                //     format={dateFormat}
                //     value={moment().format()}
                //     InputLabelProps={{
                //     shrink: true,
                //         }}
                //     sx={{
                //         width:'100%',
                //         '& legend': { display: 'none' },
                //         '& fieldset': { top: 0 },
                //     }}
                // />
                <DatePicker style={{ width: "100%" }} value={moment().format()}  />
            )
        },
        {
            name: "hours",
            label: "Soati",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const editWorkingTimesFormData = [
        {
            name: "workerId",
            label: "Xodim",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "today",
            label: "Kuni",
            inputSelect: (defaultId = null) => (
                <TextField
                    format={dateFormat}
                    type="date"
                    defaultValue={moment(defaultId).format()} 
                    InputLabelProps={{
                    shrink: true,
                    }}
                    sx={{
                        width:'100%',
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0 },
                    }}
                    />
                //     <DatePicker
                //         style={{ width: "100%" }}
                //         defaultValue={moment(defaultId).format()}
                //         format={dateFormat}
                // />
            )
        },
        {

            name: "hours",
            label: "Soati",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const salaryFormData = [
        {
            name: "workerId",
            label: "Xodim",
            input: (
                <CustomSelect selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                />
            ),
        },
        {
            name: "month",
            label: "Sana",
            inputSelect: (defaultId = null) => {
                return(
                    <TextField
                        type="date"
                        format={dateFormat}
                        defaultValue={moment(defaultId).format()} 
                        InputLabelProps={{
                        shrink: true,
                        }}
                        sx={{
                            width:'100%',
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                          }}
                    />
                )
            }
        },
        {
            name: "salary",
            label: "Ish haqi",
            input: <Input style={{ width: "100%" }} />,
        }
    ];

    const prepaymentFormData = [
        {
            name: "workerId",
            label: "Xodim",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                />
            ),
        },
        {
            name: "date",
            label: "Sana",
            input: (
                <DatePicker style={{ width: "100%" }} value={moment()}  />
            )
        },
        {
            name: "summa",
            label: "Avans summasi",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const editPrepaymentFormData = [
        {
            name: "workerId",
            label: "Xodim",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "date",
            label: "Sana",
            inputSelect: (defaultId = null) => {
                return(
                    <TextField
                        type="date"
                        format={dateFormat}
                        defaultValue={moment(defaultId).format()} 
                        InputLabelProps={{
                        shrink: true,
                        }}
                        sx={{
                            width:'100%',
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                          }}
                    />
                )
            }
        },
        {
            name: "summa",
            label: "Avans summasi",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const expensesFormData = [
        {
            name: "workerId",
            label: "Xodim",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                />
            ),
        },
        {
            name: "expenseName",
            label: "Xarajat nomi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Sana",
            input: (
                <DatePicker style={{ width: "100%" }} value={moment()}  />
            )
        },
        {
            name: "summa",
            label: "Xarajat summasi",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const editExpensesFormData = [
        {
            name: "workerId",
            label: "Xodim",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Xodimni tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))
                }
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "expenseName",
            label: "Xarajat nomi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Sana",
            inputSelect: (defaultId = null) => {
                return(
                    <TextField
                        type="date"
                        format={dateFormat}
                        defaultValue={moment(defaultId).format()} 
                        InputLabelProps={{
                        shrink: true,
                        }}
                        sx={{
                            width:'100%',
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                          }}
                    />
                )
            }
        },
        {
            name: "summa",
            label: "Xarajat summasi",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const getWorkerData = () => {
        instance
            .get("api/turnstile/worker/getAll")
            .then((data) => {
                setWorkerData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getWorkerData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/": {
            formData = {
                formData: formWorkerData,
                editFormData: editWorkerData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/Ish-vaqtlari": {
            formData = {
                formData: workingTimesFormData,
                editFormData: editWorkingTimesFormData,
                branchData: false,
                timeFilterInfo: false,
                workerFilterInfo: true,
                selectFilter: true,
                workerFilter: true,
                deleteInfo: false,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/Ish-haqilari": {
            formData = {
                formData: salaryFormData,
                editFormData: salaryFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: false,
                createInfo: false,
                editInfo: true,
                timelyInfo: false,
                monthFilter: true,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/Avans": {
            formData = {
                formData: prepaymentFormData,
                editFormData: editPrepaymentFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/Ishchilar-xarajatlari": {
            formData = {
                formData: expensesFormData,
                editFormData: editExpensesFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        getWorkerData,
        workerData
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
