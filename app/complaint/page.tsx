"use client";
import React, { useState } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import { google } from 'googleapis';
import multer from 'multer';
const ComplaintForm = () => {
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [stuNo, setStuNo] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // @ts-ignore
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setImageFile(file);

        // Set up Google Drive API client
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        );
        oauth2Client.setCredentials({
            access_token: process.env.GOOGLE_ACCESS_TOKEN,
        });

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        });

        // Upload the image to Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimeType,
            },
            media: {
                mimeType: file.mimeType,
                body: file,
            },
        });

        // Get the ID of the uploaded file
        const fileId = response.data.id;

        // Create a shared link for the uploaded file
        // @ts-ignore
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Get the shared link of the uploaded file
        // @ts-ignore
        const fileMetadata = await drive.files.get({
            fileId,
            fields: 'webViewLink',
        });
        // @ts-ignore
        const imageUrl = fileMetadata.data.webViewLink;

        // Update the imageUrl state
        setImageUrl(imageUrl);
    };

    // @ts-ignore
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Call your API here
        const response = await fetch('/api/complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
                imageUrl,
                itemCode,
                roomNo,
                stuNo,
            }),
        });

        if (response.ok) {
            // Handle successful submission here
            console.log('complaint submitted successfully');
        } else {
            // Handle error here
            console.error('Failed to submit complaint');
        }
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <input type="file" onChange={handleImageUpload} />
                <TextField
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Item Code"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Room No"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Student No"
                    value={stuNo}
                    onChange={(e) => setStuNo(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default ComplaintForm;
