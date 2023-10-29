'use client'
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Typography, Box, TextField, InputAdornment } from '@mui/material';
import Search from '@mui/icons-material/Search';

type Property = {
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
      const res = await fetch('https://hms.mtron.biz/api/property', {
        headers: {
          'Authorization': 'Basic ' + btoa(process.env.NEXT_PUBLIC_USERNAME + ':' + process.env.NEXT_PUBLIC_PASSWORD)
        }
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
              Array(5).fill().map((_, i) => (
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
  );
}

export default PropertyPage;
