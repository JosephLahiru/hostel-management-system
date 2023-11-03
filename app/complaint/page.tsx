"use client";
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, TableFooter, TablePagination, Grid} from '@mui/material';
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ComplaintData {
    id: number;
    item_code: string;
    description: string;
    room_no: number;
    stu_no: string;
    image_url: string | null;
    status: string | null;
    created_at: string | null;
}

const ShowComplaints: React.FC = () => {
    const [data, setData] = useState<ComplaintData[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
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

        const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/complaint', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        const complaintData: ComplaintData[] = await res.json();
        setData(complaintData);
    };
    const markAsResolved = async (id: number) => {
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

        await fetch(process.env.NEXT_PUBLIC_API + `/api/complaint/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        // Refresh the complaints data
        fetchComplaints();
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    Complaints
                </Typography>
            </Grid>
            <Grid container xs={10} spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <Button type="submit" variant="outlined" color="success" fullWidth href={`${process.env.NEXT_PUBLIC_URL}/qr/scanner`} endIcon={<AddCircleIcon />}>
                        Add Complaint
                    </Button>
                </Grid>
                <Grid item sm={6} xs={2}>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={handleSearch}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <TableContainer component={Paper}>
                    <Table aria-label="complaint table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Room No</TableCell>
                                <TableCell>Student No</TableCell>
                                <TableCell>Image URL</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .filter((row) => {
                                    if (search === '') {
                                        return row;
                                    } else if (
                                        row.item_code.toLowerCase().includes(search.toLowerCase()) ||
                                        row.description.toLowerCase().includes(search.toLowerCase()) ||
                                        row.room_no.toString().includes(search.toLowerCase()) ||
                                        row.stu_no.toLowerCase().includes(search.toLowerCase())
                                    ) {
                                        return row;
                                    }
                                })
                                .map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.item_code}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.room_no}</TableCell>
                                        <TableCell>{row.stu_no}</TableCell>
                                        <TableCell>{row.image_url}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.created_at ? new Date(row.created_at).toLocaleDateString('en-GB') : ''}</TableCell>
                                        <TableCell>
                                            {row.status === "resolved" ? (
                                                <Button variant="outlined" color="secondary" disabled endIcon={<CheckCircleOutlineIcon />}>
                                                    Resolved
                                                </Button>
                                            ) : (
                                                <Button variant="outlined" color="secondary" onClick={() => markAsResolved(row.id)} endIcon={<AddTaskIcon />}>
                                                    Mark as Resolved
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default ShowComplaints