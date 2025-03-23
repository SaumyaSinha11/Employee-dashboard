import React, { useState } from 'react'
import { useTheme } from '../ThemeContext';
import { Button, OverlayTrigger, Tooltip, Navbar, Container } from 'react-bootstrap';
import { MoonStarsFill, SunFill } from 'react-bootstrap-icons';

export default function Header() {

  const {darkMode, toggleDarkMode} = useTheme()

  return (
    <>
      <Navbar className="bg-body-tertiary"  data-bs-theme ={darkMode ?"light":"dark"}>
        <Container className='container-fluid'>
          <Navbar.Brand>
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            STAR-ALIGN
          </Navbar.Brand>
          <Button
          variant="link"
          onClick={toggleDarkMode}
          className="d-flex align-items-center ms-auto"
          style={{ fontSize: '1.5rem' }}
        >
          {darkMode ? <MoonStarsFill /> : <SunFill />}
        </Button>
        </Container>
      </Navbar>
  </>
  );
}
