import { useState } from 'react';

import Login from './pages/Login';
import AdminHistorial from './AdminHistorial';
import RegistrarLectura from './pages/RegistrarLectura';

function App() {

  const [logueado, setLogueado] = useState(
    !!localStorage.getItem('token')
  );

  const rol = localStorage.getItem('rol');

  console.log('ROL:', rol);

  if (!logueado) {

    return (
      <Login iniciar={() => setLogueado(true)} />
    );

  }

  if (rol === 'ADMIN' || rol === 'SUPERVISOR') {

  return <AdminHistorial />;

}

if (rol === 'ELECTRICISTA') {

  return <RegistrarLectura />;

}

  return <h1>Sin acceso</h1>;

}

export default App;
