import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../Api/Axios";
import { message } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import "./CategoryVsMeasurment.css";

const CategoryVsMeasurement = () => {
    const [category, setCategory] = useState([]);
    const [measurement, setMeasurment] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentCategory, setCurrentCategory] = useState(1);
    const [pageSizeCategory, setPageSizeCategory] = useState(10);
    const { getCategoryData } = useData();
    const navigate = useNavigate();

    const getCategory = () => {
        setLoadingCategory(true);
        instance
            .get(`api/socks/factory/category/getAll`)
            .then((data) => {
                getCategoryData();
                setCategory(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyalarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoadingCategory(false));
    };

    const onCreateCategory = (values) => {
        setLoadingCategory(true);
        instance
            .post(`api/socks/factory/category/add?name=${values.name}`)
            .then(function (response) {
                getCategory();

                message.success("Kategoriya muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyani qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoadingCategory(false);
            });
    };

    const onEditCategory = (values, initial) => {
        setLoadingCategory(true);
        instance
            .put(
                `api/socks/factory/category/update${initial.id}?name=${values.name}`
            )
            .then(function (response) {
                getCategory();

                message.success("Kategoriya muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyani qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoadingCategory(false);
            });
    };

    const handleDeleteCategory = (arr) => {
        setLoadingCategory(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/category/delete${item}`)
                .then((data) => {
                    getCategory();
                    message.success("Kategoriya muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Kategoriyani o'chirishda muammo bo'ldi");
                });
            return null;
        });
        setLoadingCategory(false);
    };

    const columnsCategory = [
        {
            title: "Kategoriya nomi",
            dataIndex: "name",
            key: "name",
            width: "100%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const getMeasurment = () => {
        setLoading(true);
        instance
            .get("api/socks/factory/measurement/getAll")
            .then((data) => {
                getMeasurment();
                setMeasurment(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("O'lchov birligilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const onCreate = (values) => {
        message.error("O'lchov birligi malumotlarini o'zgartirib bo'lmaydi!");
    };

    const onEdit = (values, initial) => {
        message.error("O'lchov birligi malumotlarini o'zgartirib bo'lmaydi!");
    };

    const handleDelete = (arr) => {
        message.error("O'lchov birligi malumotlarini o'zgartirib bo'lmaydi!");
    };

    const columns = [
        {
            title: "O'lchov nomi",
            dataIndex: "name",
            key: "name",
            width: "100%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <div className="category">
            <div className="others">
                <div>
                    <h3>Kategoriya</h3>
                    <CustomTable
                        current={currentCategory}
                        pageSize={pageSizeCategory}
                        pageSizeOptions={[10, 20]}
                        setCurrent={setCurrentCategory}
                        setPageSize={setPageSizeCategory}
                        onEdit={onEditCategory}
                        onCreate={onCreateCategory}
                        getData={getCategory}
                        onDelete={handleDeleteCategory}
                        columns={columnsCategory}
                        tableData={category}
                        loading={loadingCategory}
                        setLoading={setLoadingCategory}
                    />
                </div>
                <div>
                    <h3>O'lchov birligi</h3>
                    <CustomTable
                        current={current}
                        pageSize={pageSize}
                        pageSizeOptions={[10, 20]}
                        setCurrent={setCurrent}
                        setPageSize={setPageSize}
                        onEdit={onEdit}
                        onCreate={onCreate}
                        getData={getMeasurment}
                        onDelete={handleDelete}
                        columns={columns}
                        tableData={measurement}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryVsMeasurement;
