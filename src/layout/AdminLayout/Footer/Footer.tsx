import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container fluid className="align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div>
            <span className="text-muted">© 2023 Metatron</span>
        </div>
      </Container>
    </footer>
  )
}
