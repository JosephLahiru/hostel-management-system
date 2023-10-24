"use client";
import Html5QrcodePlugin, { Html5QrcodePluginProps } from './Html5QrcodePlugin'; // assuming Html5QrcodePlugin is in the same directory

const App: React.FC<Html5QrcodePluginProps> = (props) => {

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
        <div className="App">
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    );
};

export default App;
