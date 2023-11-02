"use client";
import React, {useEffect, useState} from 'react';
import {Button, TextField, Container, Box, Grid, Typography, Paper} from '@mui/material';
import { useSearchParams } from 'next/navigation';
const ComplaintForm = () => {
    const searchParams = useSearchParams();
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [stuNo, setStuNo] = useState('');

    useEffect(() => {
        if(searchParams.get('itemcode')){
            setItemCode(searchParams.get('itemcode')||'');
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

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

        const data = {
            item_code: itemCode,
            description: description,
            room_no: roomNo,
            stu_no: stuNo,
            image_url: imageUrl
        };

        const response = await fetch('https://hms.mtron.biz/api/complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,

            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('complaint submitted successfully');
        } else {
            console.error('Failed to submit complaint');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h5" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    Complaint Form
                </Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                                disabled
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
                                disabled
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
                </form>
            </Paper>
        </Container>
    );
}

export default ComplaintForm;
