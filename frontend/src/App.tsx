import { useState } from 'react';

import Login from './pages/Login';
import AdminHistorial from './AdminHistorial';
import Pozos from './pages/Pozos';

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

  return (
    <Pozos
      cerrarSesion={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        setLogueado(false);
      }}
    />
  );

}

return <h1>Sin acceso</h1>;

}

export default App;
