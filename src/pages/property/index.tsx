'use client'
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Typography, Box, TextField, InputAdornment } from '@mui/material';
import Search from '@mui/icons-material/Search';

type Property = {
  id: number;
  prop_id: string;
  prop_name: string;
  status: string;
};

function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProperties() {
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

      const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/property', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      const data: Property[] = await res.json();

      setProperties(data);
      setLoading(false);
    }

    fetchProperties();
  }, []);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredProperties = properties.filter(property => {
    return property.prop_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
      <AdminLayout>
        <Box sx={{ width: '80%', margin: 'auto' }}>
          <Typography variant="h3" gutterBottom style={{padding:"20px 0 20px 0"}}>
            Properties
          </Typography>
          <hr/>
          <TextField
              variant="outlined"
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                ),
              }}
              style={{padding:"20px 0 20px 0"}}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Property ID</b></TableCell>
                  <TableCell><b>Property Name</b></TableCell>
                  <TableCell><b>Property Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                    Array(5).fill(0).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton /></TableCell>
                          <TableCell><Skeleton /></TableCell>
                          <TableCell><Skeleton /></TableCell>
                        </TableRow>
                    ))
                ) : (
                    filteredProperties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>{property.prop_id}</TableCell>
                          <TableCell>{property.prop_name}</TableCell>
                          <TableCell>{property.status}</TableCell>
                        </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AdminLayout>
  );
}

export default PropertyPage;
