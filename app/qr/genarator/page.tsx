// generate.tsx
"use client";
import React, { useEffect, useState, ChangeEvent } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    Typography
} from '@mui/material';
import QRCode from 'react-qr-code';
import Container from "@mui/material/Container";

interface PropertyData {
    id: number;
    prop_id: string;
    prop_name: string;
    status: string;
}

const Generate: React.FC = () => {
    const [data, setData] = useState<PropertyData[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    useEffect(() => {
        const fetchProperties = async () => {
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

            const res = await fetch('https://hms.mtron.biz/api/property', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            const propertyData: PropertyData[] = await res.json();
            setData(propertyData);
        };

        fetchProperties();
    }, []);

    const filteredData = data.filter((row) =>
        row.prop_name.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search) ||
        row.prop_id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                Item QR Generator
            </Typography>
            <TextField
                label="Search Properties"
                variant="outlined"
                value={search}
                onChange={handleSearch}
                style={{ marginBottom: '1rem'} }
                sx={{ marginLeft: 'auto' }}
            />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Property ID</TableCell>
                            <TableCell>Property Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>QR Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.prop_id}</TableCell>
                                <TableCell>{row.prop_name}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <QRCode value={`${process.env.NEXT_PUBLIC_URL}/complaint/new?itemcode=${row.prop_id}`} size={100}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Container>
    );
}
export default Generate;
