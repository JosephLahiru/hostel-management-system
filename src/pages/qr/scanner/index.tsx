"use client";
import React from 'react';
import Html5QrcodePlugin, { Html5QrcodePluginProps } from './Html5QrcodePlugin';
import {Grid, Typography} from '@mui/material';

const QRScanner: React.FC<Html5QrcodePluginProps> = (props) => {
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    Property QR Scanner
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Html5QrcodePlugin
                    fps={30}
                    qrbox={{ width: 250, height: 250 }}
                    aspectRatio={1}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </Grid>
        </Grid>
    );
};

export default QRScanner;
