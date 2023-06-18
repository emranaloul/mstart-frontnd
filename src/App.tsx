
import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import SignIn from './pages/Sign-in';
import Toast from './components/Toast';
import Dialog from './components/Dialog';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import Home from './pages/Home';
import { load } from 'react-cookies';
import { getMyProfile, resetSession } from './store/auth';
import { Spinner } from 'react-bootstrap';
type PropTypes = {
  getMyProfile: () => void
}

function App({ getMyProfile }: PropTypes) {
  const { loggedIn, user, expired_session } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const token = load('token')
    if (user?.id && !loggedIn) {
      navigate('/signin')
    }
    else if (expired_session) {
      navigate('/signin')
      dispatch(resetSession())
    }
    else if (!user?.id && !loggedIn && !token) {
      navigate('/signin')
    }
    else if (user?.id && loggedIn && ['/signin', '/signup'].includes(location.pathname)) {
      navigate('/')
    }
    else if (token) {
      getMyProfile()
    } else if (!user.id && !loggedIn) {
      navigate('/signin')
    }
    setLoading(false)
  }, [loggedIn, user?.id, expired_session])
  return (
    <div className="App">
      {loading ? <Spinner /> :
        <>
          <Toast />
          <Dialog />
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </>
      }
    </div>
  );
}


export default connect(null, { getMyProfile })(App);
