"use client";
import React, { useState } from 'react';
import {Button, TextField, Container, Box, Grid, Typography} from '@mui/material';

const ComplaintForm = () => {
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [stuNo, setStuNo] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        const authRes = await fetch('https://hms.mtron.biz/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: process.env.NEXT_PUBLIC_USERNAME,
                password: process.env.NEXT_PUBLIC_PASSWORD,
            }),
        });

        const authData = await authRes.json();

        const token = authData.jwt;

        event.preventDefault();

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
            console.log('complaint submitted successfully');
        } else {
            console.error('Failed to submit complaint');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                Complaint Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText="Please enter the description"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText="Please enter the Image URL"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Item Code"
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText="Please enter the Item Code"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Room No"
                            value={roomNo}
                            onChange={(e) => setRoomNo(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText="Please enter the Room Number"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Student No"
                            value={stuNo}
                            onChange={(e) => setStuNo(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText="Please enter the Student Number"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default ComplaintForm;
