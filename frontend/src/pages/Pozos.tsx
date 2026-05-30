import { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrarLectura from './RegistrarLectura';

function Pozos({ cerrarSesion }: any) {

  const [pozos, setPozos] = useState<any[]>([]);

  const [pozoSeleccionado, setPozoSeleccionado] = useState<any>(null);

  useEffect(() => {

    obtenerPozos();

  }, []);

  const obtenerPozos = async () => {

    try {

      const response = await axios.get(
        'https://registro-y-monitoreo-el-ctrico-para-pozos.onrender.com/pozos'
      );

      setPozos(response.data);

    } catch(error) {

      console.log(error);

      alert('Error obteniendo pozos');
    }
  };

    if(pozoSeleccionado) {
        return (
    <RegistrarLectura
    pozo={pozoSeleccionado}
    volver={() => setPozoSeleccionado(null)}
    />
    );
    }

  return (

  <div
  style={{
    minHeight: '100vh',
    padding: 20,
    overflowY: 'auto',
    paddingBottom: 100,
    backgroundColor: '#f5f5f5',
  }}
>

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >

      <h2>Pozos</h2>

      <button
  onClick={cerrarSesion}

  style={{
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '12px 20px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  }}
>
  Cerrar Sesion
</button>

    </div>

    {
      pozos.map((pozo) => (

        <div
          key={pozo.id}
          onClick={() => setPozoSeleccionado(pozo)}

          style={{
            border: '1px solid gray',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >

          <h3>{pozo.nombre}</h3>

          <p>{pozo.codigo}</p>

        </div>
      ))
    }

  </div>
);

}

export default Pozos;
