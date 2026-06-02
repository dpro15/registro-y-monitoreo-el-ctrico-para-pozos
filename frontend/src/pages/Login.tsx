import { useState } from 'react';
import axios from 'axios';

function Login({ iniciar }: any) {

  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');

  const iniciarSesion = async () => {

    try {

      const response = await axios.post(
        'https://registro-y-monitoreo-el-ctrico-para-pozos.onrender.com/usuarios/login',
        {
          nombre,
          contrasena,
        }
      );

      if(response.data) {

  localStorage.setItem( 'token', response.data.token);

  localStorage.setItem( 'rol', response.data.usuario.rol);

  localStorage.setItem( 'usuarioId', response.data.usuario.id.toString());

  iniciar();

} else {
      alert('Usuario incorrecto');
    }

    } catch(error) {

      console.log(error);

      alert('Error servidor');
    }
  };

  return (

  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0f172a',
      padding: 20,
    }}
  >

    <div
      style={{
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        width: '100%',
        maxWidth: 350,
        boxShadow: '0px 5px 20px rgba(0,0,0,0.3)',
      }}
    >

      <h1
        style={{
          textAlign: 'center',
          marginBottom: 30,
          color: '#1e293b',
        }}
      >
        ⚡ Registro Mediciones Eléctricas
      </h1>

      <input
        type="text"
        placeholder="Usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}

        style={{
          width: '100%',
          padding: 15,
          marginBottom: 15,
          borderRadius: 10,
          border: '1px solid #cbd5e1',
          fontSize: 16,
          boxSizing: 'border-box',
        }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}

        style={{
          width: '100%',
          padding: 15,
          marginBottom: 20,
          borderRadius: 10,
          border: '1px solid #cbd5e1',
          fontSize: 16,
          boxSizing: 'border-box',
        }}
      />

      <button
        onClick={iniciarSesion}

        style={{
          width: '100%',
          padding: 15,
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        Ingresar
      </button>

    </div>

  </div>
);
}

export default Login;
