import { useEffect } from "react";

const CookiesBanner = () => {
    useEffect(() => {
        const btnAcceptCookies = document.getElementById("btn-accept-cookies") as HTMLButtonElement | null;
        const cookiesWrap = document.getElementById("cookies-wrap") as HTMLDivElement | null;
        const backgroundCookiesWrap = document.getElementById("background-cookies-wrap") as HTMLDivElement | null;

        const dataLayer: any[] = (window as any).dataLayer || [];

        if (!localStorage.getItem("accepted-cookies")) {
            cookiesWrap?.classList.add("active");
            backgroundCookiesWrap?.classList.add("active");
        } else {
            dataLayer.push({ event: "accepted-cookies" });
        }

        btnAcceptCookies?.addEventListener("click", () => {
            cookiesWrap?.classList.remove("active");
            backgroundCookiesWrap?.classList.remove("active");

            localStorage.setItem("accepted-cookies", "true");
            dataLayer.push({ event: "accepted-cookies" });
        });
    }, []);

    return (
        <div>
            <div id="cookies-wrap" className="cookies-banner">
                <p>Este sitio web utiliza cookies para mejorar la experiencia.</p>
                <button id="btn-accept-cookies">Aceptar</button>
            </div>
            <div id="background-cookies-wrap" className="cookies-background" />
        </div>
    );
};

export default CookiesBanner;
