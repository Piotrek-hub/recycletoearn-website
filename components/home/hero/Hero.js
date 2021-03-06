import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.scss";
import gsap, { Power4 } from "gsap";
import { handleMetamaskConnection } from "../../../Contracts/web3functions";

import useWindowWidth from "hooks/useWindowWidth";
const Web3 = require("web3");

function Hero() {
    const purpleBox = useRef(null);
    const wrapper = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 1,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tl = gsap.timeline();
                    setTimeout(() => {
                        tl.fromTo(
                            [purpleBox.current],
                            { width: 0 },
                            { width: `250px`, duration: 1, ease: Power4 }
                        );
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        observer.observe(wrapper.current);
    }, []);
    return (
        <div className={styles.wrapper} ref={wrapper} id="home">
            <img src="/logoPurpleSaturated.png" alt="" className={styles.rightImg} />
            <img src="/logoPurpleSaturated.png" alt="" className={styles.topCenterImg} />
            <img src="/logoPurpleSaturated.png" alt="" className={styles.bottomCenterImg} />
            <div className={styles.leftWrapper}>
                <div className={styles.headerBox}>
                    <p className={styles.header}>
                        Recycle,
                        <div ref={purpleBox}></div>
                    </p>
                    <p>earn money!</p>
                </div>
                <p className={styles.description}>{text}</p>
                <div className={styles.buttonsWrapper}>
                    <button
                        className={styles.purpleBtn}
                        onClick={() => {
                            handleMetamaskConnection(window);
                        }}
                    >
                        Connect To Metamask
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hero;

//temponary
const text =
    "Throw things into our machine, make a special card and collect money in the form of our proprietary cryptocurrency.";
