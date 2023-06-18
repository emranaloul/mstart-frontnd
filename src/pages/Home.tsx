import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { NavDropdown, Navbar, Nav, Container, Button, Row } from 'react-bootstrap';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { RootState } from '../store';
import Users from './admin/Users';
import Deals from './admin/Deals';
import ClaimedDeals from './admin/ClaimedDeals';
import { getDealsHandler } from '../store/deals';
import Main from './Main';
import ClaimedDealsDetails from './ClaimedDealsDetails';
import MyProfile from './user/MyProfile';
import { logoutHandler } from '../store/auth';

const style: React.CSSProperties = {
  color: 'white'
}

type PropTypes = {
  logoutHandler : ()=> void
}
const Home = ({logoutHandler}:PropTypes) => {
  const { user } = useSelector((state: RootState) => state.auth)
  
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Container >
          <Link to={'/'} className='navbar-brand' style={style}>MStart</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user.role === 'admin' && <Link to={'/deals'} className='nav-link' style={style}>Deals</Link>}
              {user.role === 'admin' && <Link to={'/users'} className='nav-link' style={style}>Users</Link>}
              {user.role === 'admin' && <Link to={'/claimed'} className='nav-link' style={style}>Claimed Deals</Link>}
              <NavDropdown title={`Hello ${user.name}`} id="basic-nav-dropdown">
                <Link className='dropdown-item' to="/me">My Profile</Link>
                <NavDropdown.Divider />
                <Button className='dropdown-item' onClick={logoutHandler}>
                  Logout
                </Button>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/users' element={<Users />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/claimed' element={<ClaimedDeals />} />
        <Route path='/claimed/details' element={<ClaimedDealsDetails />} />
        <Route path='/me' element={<MyProfile />} />
      </Routes>
    </>
  )
}

const mapDispatchToProps = { getDealsHandler,logoutHandler }



export default connect(null, mapDispatchToProps)(Home)