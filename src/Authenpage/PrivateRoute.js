import { useSession } from 'react-session';

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useSession();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

function AppRoute() {
  return (
    <SessionProvider session={session}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignInSide />} />
          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/coffee" element={<Coffeepage />} />
          {/* Private routes */}
          <PrivateRoute path="/Cart" element={<CartPage />} />
          <PrivateRoute path="/mocha" element={<Mocha />} />
          <PrivateRoute path="/pay" element={<Pay />} />
          <PrivateRoute path="/typepage" element={<Typepage />} />
          <PrivateRoute path="/Rreceipt" element={<Rreceipt />} />
          <PrivateRoute path="/Dashbords" element={<Dashboardpage />} />
          <PrivateRoute path="/Loginadmin" element={<Loginadmin />} />
          <PrivateRoute path="/RegisterAdmin" element={<RegisterAdmin />} />
          <PrivateRoute path="/Orderdb" element={<Orderdbpage />} />
          <PrivateRoute path="/Userdb" element={<Userdbpage />} />
          <PrivateRoute path="/Accountdb" element={<Accountdbpage />} />
          <PrivateRoute path="/logout" element={<Route element={<Navigate to="/" />} />} />
          <Route element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}