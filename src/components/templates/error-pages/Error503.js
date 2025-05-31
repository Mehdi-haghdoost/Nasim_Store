"use client";
import { useEffect } from 'react';
import styles from './Error503.module.css';

const Error503 = () => {
    useEffect(() => {
        // Script functionality - animated typing effect
        const writeCode = (text, i, fnCallback) => {
            if (i < text.length) {
                document.querySelector("#code").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
                setTimeout(() => {
                    writeCode(text, i + 1, fnCallback);
                }, 100);
            } else if (typeof fnCallback === 'function') {
                setTimeout(fnCallback, 700);
            }
        };

        const startTextAnimation = (i) => {
            if (typeof texts[i] === 'undefined') {
                setTimeout(() => {
                    startTextAnimation(0);
                }, 20000);
            } else if (i < texts.length) {
                writeCode(texts[i], 0, () => {
                    startTextAnimation(i + 1);
                });
            }
        };

        // Error codes to display
        const texts = [
            'HTTP/1.1 503 Service Unavailable',
            'Server: nginx/1.18.0',
            'Date: ' + new Date().toUTCString(),
            'Content-Type: text/html',
            'Content-Length: 1024',
            'Connection: close',
            'Retry-After: 3600'
        ];

        // Start animation
        startTextAnimation(0);

        // Cleanup function
        return () => {
            // Clear any timeouts if component unmounts
        };
    }, []);

    return (
        <div className={`container ${styles.page503}`}>
            <div className={styles.error}>
                <h1>503</h1>
                <h2>خطای سرور</h2>
                <p>
                    به نظر میاد مشکلی پیش اومده لطفا چند لحظه دیگه دوباره امتحان کن!
                </p>
                <p className={styles.subtitle}>ERR_INTERNAL_SERVER_ERROR</p>
            </div>

            <div className={styles.stackContainer}>
                {[125, 100, 75, 50, 25, 0].map((spread, index) => (
                    <div key={index} className={styles.cardContainer}>
                        <div
                            className={styles.perspec}
                            style={{
                                '--spreaddist': `${spread}px`,
                                '--scaledist': 0.75 + (index * 0.05),
                                '--vertdist': `${-25 + (index * 5)}px`
                            }}
                        >
                            <div className={styles.card}>
                                <div className={styles.writing}>
                                    <div className={styles.topbar}>
                                        <div className={styles.red}></div>
                                        <div className={styles.yellow}></div>
                                        <div className={styles.green}></div>
                                    </div>
                                    <div className={styles.code}>
                                        <ul id={index === 5 ? "code" : undefined}>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className={styles.footer}>
                <p className={styles.copyright}>©2025 Mehdi Haghdoost</p>
            </footer>
        </div>
    );
};

export default Error503;