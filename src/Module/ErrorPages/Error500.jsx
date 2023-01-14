import { Button } from "antd";
import { Link } from "react-router-dom";
import rasm from "./500Image.webp";
import "./error404.css";

const Error500 = () => {
    return (
        <section className="page-not-found">
            <img className="error500" src={rasm} alt="404 page" />
            <h1>Serverda muammo bo'ldi</h1>
            <p>
                Kechirasiz serverda muammo topildi!{" "}
                <a href="https://t.me/zukhriddin_08">Bizga murojaat</a>{" "}
                qilishingizni so'raymiz.
            </p>
            <Button className="btn-home">
                <Link to="/">
                    <a>Bosh Sahifaga Qaytish</a>
                </Link>
            </Button>
        </section>
    );
};

export default Error500;
