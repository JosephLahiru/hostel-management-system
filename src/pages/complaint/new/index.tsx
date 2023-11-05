"use client";
import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Container,
    Grid,
    Typography,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {useRouter} from "next/router";


interface Student {
    regNumber: string;
    roomNumber: string;
}

const ComplaintForm = () => {
    const router = useRouter();
    const { itemcode } = router.query;
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [stuNo, setStuNo] = useState('');
    const [studentRegNo, setStudentRegNo] = useState([] as string[]);

    useEffect(() => {
        if (itemcode) {
            setItemCode(itemcode as string);
            fetchStudentData(itemcode as string);
        }
    }, [itemcode]);

    const fetchStudentData = async (itemCode: string) => {
        try {
            const authRes = await fetch(process.env.NEXT_PUBLIC_API + '/auth/login', {
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

            const res = await fetch(process.env.NEXT_PUBLIC_API + `/api/studentRoom/${itemCode}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            const studentData = await res.json();
            if (studentData && studentData.length > 0) {
                const regNumbers = studentData.map((item: Student) => item.regNumber);
                setStudentRegNo(regNumbers);
                setRoomNo(studentData[0].roomNumber);
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!itemCode || !description || !roomNo || !stuNo) {
            console.log('Please fill all the fields');
            return;
        }

        try {
            const authRes = await fetch(process.env.NEXT_PUBLIC_API + '/auth/login', {
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
                image_url: imageUrl,
            };

            const response = await fetch(process.env.NEXT_PUBLIC_API + '/api/complaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Complaint submitted successfully');
                router.push('/complaint');
            } else {
                console.error('Failed to submit complaint');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
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
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                helperText="Please enter the Room Number"
                                required
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth margin="normal" required>
                                <InputLabel id="studentNo-label">Student No</InputLabel>
                                <Select
                                    labelId="studentNo-label"
                                    id="studentNo"
                                    value={stuNo}
                                    onChange={(e) => setStuNo(e.target.value)}
                                    label="Student No"
                                >
                                    {studentRegNo.map((studentReg, index) => (
                                        <MenuItem key={index} value={studentReg}>
                                            {studentReg}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
};

export default ComplaintForm;