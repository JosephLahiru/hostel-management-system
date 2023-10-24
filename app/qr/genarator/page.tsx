// generate.tsx
"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";

const Generate: React.FC = () => {
    const [qrCodeValue, setQrCodeValue] = useState<string>("");

    return (
        <div>
            <div>Generate QR</div>

            {qrCodeValue !== "" && (
                <QRCode value={qrCodeValue}/>
            )}
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setQrCodeValue(e.target.value);
                }}
            />
        </div>
    );
}

export default Generate;
