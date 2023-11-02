"use client";
import React, { useEffect, useState } from 'react';
import Html5QrcodePlugin, { Html5QrcodePluginProps } from './Html5QrcodePlugin'; // assuming Html5QrcodePlugin is in the same directory

const QRScanner: React.FC<Html5QrcodePluginProps> = (props) => {
    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

        useEffect(() => {
            const handleResize = () => {
                setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return windowDimensions;
    };


    const { width, height } = useWindowDimensions();
    const onNewScanResult = (decodedText: string, decodedResult: any) => {
        // Check if the decoded text is a valid URL
        try {
            new URL(decodedText);
            // If it is a valid URL, redirect to it
            window.location.href = decodedText;
        } catch (_) {
            // If it is not a valid URL, do nothing
            console.log("Scanned QR code does not contain a valid URL.");
        }
    };

    return (
        <div style={{ width, height }}>
            <Html5QrcodePlugin
                fps={30}
                qrbox={{ width: 250, height: 250 }}
                aspectRatio={1}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    );
};

export default QRScanner;
