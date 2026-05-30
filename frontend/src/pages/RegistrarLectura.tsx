import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  pozo: any;
  volver: () => void;
}

function RegistrarLectura({ pozo, volver }: Props) {

  const [pozos, setPozos] = useState<any[]>([]);
  const [pozoId, setPozoId] = useState(String(pozo.id));
  
  const [mega1, setMega1] = useState('');
  const [mega2, setMega2] = useState('');
  const [mega3, setMega3] = useState('');

  const [volt1, setVolt1] = useState('');
  const [volt2, setVolt2] = useState('');
  const [volt3, setVolt3] = useState('');

  const [amp1, setAmp1] = useState('');
  const [amp2, setAmp2] = useState('');
  const [amp3, setAmp3] = useState('');

  const [observacion, setObservacion] = useState('');
  
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

  }

};
  
  const guardarLectura = async () => {

    try {

      await axios.post(
        'https://registro-y-monitoreo-el-ctrico-para-pozos.onrender.com/lecturas',
        {

          usuario: {
            id: 1
          },

          pozo: {
          id: Number(pozoId)
          },

          megaohmios_l1: mega1,
          megaohmios_l2: mega2,
          megaohmios_l3: mega3,

          voltaje_l1: volt1,
          voltaje_l2: volt2,
          voltaje_l3: volt3,

          amperaje_l1: amp1,
          amperaje_l2: amp2,
          amperaje_l3: amp3,

          observacion,
        }
      );

      alert('Lectura guardada');

    } catch(error) {

      console.log(error);

      alert('Error guardando lectura');
    }
  };

  return (

    <div
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >

      <select

  value={pozoId}

  onChange={(e) => setPozoId(e.target.value)}

  style={{
    width: '100%',
    padding: 15,
    borderRadius: 10,
  }}
>

  <option value="">
    Seleccione pozo
  </option>

  {pozos.map((pozo) => (

    <option
      key={pozo.id}
      value={pozo.id}
    >

      {pozo.nombre}

    </option>

  ))}

</select>

        <button
  onClick={() => {

    localStorage.removeItem('token');
    localStorage.removeItem('rol');

    window.location.reload();

  }}
          style={{
            padding: 12,
            borderRadius: 10,
            border: 'none',
            backgroundColor: '#d32f2f',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
        Salir
        </button>

          <button
  onClick={volver}
  style={{
    padding: 12,
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  }}
>
  Volver
</button>

      <input
        placeholder="Megaohmios L1"
        value={mega1}
        onChange={(e) => setMega1(e.target.value)}
      />

      <input
        placeholder="Megaohmios L2"
        value={mega2}
        onChange={(e) => setMega2(e.target.value)}
      />

      <input
        placeholder="Megaohmios L3"
        value={mega3}
        onChange={(e) => setMega3(e.target.value)}
      />

      <input
        placeholder="Voltaje L1"
        value={volt1}
        onChange={(e) => setVolt1(e.target.value)}
      />

      <input
        placeholder="Voltaje L2"
        value={volt2}
        onChange={(e) => setVolt2(e.target.value)}
      />

      <input
        placeholder="Voltaje L3"
        value={volt3}
        onChange={(e) => setVolt3(e.target.value)}
      />

      <input
        placeholder="Amperaje L1"
        value={amp1}
        onChange={(e) => setAmp1(e.target.value)}
      />

      <input
        placeholder="Amperaje L2"
        value={amp2}
        onChange={(e) => setAmp2(e.target.value)}
      />

      <input
        placeholder="Amperaje L3"
        value={amp3}
        onChange={(e) => setAmp3(e.target.value)}
      />

      <textarea
      placeholder="Observaciones"
      value={observacion}
      onChange={(e) => setObservacion(e.target.value)}
      style={{
        width: '100%',
        minHeight: 120,
        padding: 15,
        borderRadius: 10,
        border: '1px solid #cbd5e1',
        resize: 'none',
        fontSize: 16,
        boxSizing: 'border-box',
            }}
      />

      <button onClick={guardarLectura}>
        Guardar Lectura
      </button>

    </div>
  );
}

export default RegistrarLectura;
