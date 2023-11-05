import { Container } from 'react-bootstrap'
import HeaderProfileNav from '@layout/AdminLayout/Header/HeaderProfileNav'
import {Typography} from "@mui/material";
import React from "react";

type HeaderProps = {
    toggleSidebar: () => void;
    toggleSidebarMd: () => void;
}

export default function Header(props: HeaderProps) {

    return (
        <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
            <Container fluid className="header-navbar d-flex align-items-center">
                <div>
                    <Typography variant="h5" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        Hostel Management System
                    </Typography>
                </div>
                <div className="header-nav ml-auto" >
                    <HeaderProfileNav />
                </div>
            </Container>
            <div className="header-divider border-top my-2 mx-sm-n2" />
        </header>
    )
}
