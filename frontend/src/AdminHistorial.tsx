  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  import { saveAs } from 'file-saver';

  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

  function AdminHistorial() {

    const [lecturas, setLecturas] = useState<any[]>([]);
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [tipoGrafico, setTipoGrafico] = useState('voltaje');
    const [pozoFiltro, setPozoFiltro] = useState('');

    useEffect(() => {

      obtenerLecturas();

    }, []);

    const obtenerLecturas = async () => {

      try {

        const response = await axios.get(
          'http://192.168.21.185:3000/lecturas'
        );

        setLecturas(response.data);

      } catch(error) {

        console.log(error);

        alert('Error obteniendo lecturas');
      }
    };

    const exportarExcel = () => {

    const datos = lecturasFiltradas.map((lectura) => ({

      POZO: lectura.pozo?.nombre,

      USUARIO: lectura.usuario?.nombre,

      FECHA: new Date(
        lectura.fecha
      ).toLocaleString(),

      VOLTAJE_L1: lectura.voltaje_l1,
      VOLTAJE_L2: lectura.voltaje_l2,
      VOLTAJE_L3: lectura.voltaje_l3,

      CORRIENTE_L1: lectura.amperaje_l1,
      CORRIENTE_L2: lectura.amperaje_l2,
      CORRIENTE_L3: lectura.amperaje_l3,

      MEGA_L1: lectura.megaohmios_l1,
      MEGA_L2: lectura.megaohmios_l2,
      MEGA_L3: lectura.megaohmios_l3,

      OBSERVACION: lectura.observacion,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(datos);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Lecturas'
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

    const data = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      }
    );

    saveAs(
      data,
      'historial_lecturas.xlsx'
    );
  };

    const lecturasFiltradas = lecturas.filter((lectura) => {

    const cumplePozo = pozoFiltro
      ? lectura.pozo?.nombre === pozoFiltro
      : true;

    const fechaLectura = new Date(lectura.fecha)
      .toISOString()
      .split('T')[0];

    const cumpleFecha = fechaFiltro
      ? fechaLectura === fechaFiltro
      : true;

    return cumplePozo && cumpleFecha;
  });

        const datosGrafico = lecturasFiltradas.map(
          
    (lectura) => ({

      fecha: new Date(
        lectura.fecha
      ).toLocaleDateString(),

      VL1: Number(lectura.voltaje_l1),
      VL2: Number(lectura.voltaje_l2),
      VL3: Number(lectura.voltaje_l3),

      AL1: Number(lectura.amperaje_l1),
      AL2: Number(lectura.amperaje_l2),
      AL3: Number(lectura.amperaje_l3),

      ML1: Number(lectura.megaohmios_l1),
      ML2: Number(lectura.megaohmios_l2),
      ML3: Number(lectura.megaohmios_l3),

    })
  );

  console.log(datosGrafico);

    const estiloHeader = {

      border: '1px solid black',
      padding: 10,
      fontWeight: 'bold',

      textAlign: 'center' as const,
    };

    const estiloCelda = {

      border: '1px solid gray',
      padding: 8,

      textAlign: 'center' as const,
    };

    console.log(datosGrafico);  


    const eliminarLectura = async (id: number) => {
  const confirmar = window.confirm(
    '¿Deseas eliminar esta lectura?'
  );

  if (!confirmar) return;

  try {
    await axios.delete(
      `http://localhost:3000/lecturas/${id}`
    );

    obtenerLecturas();

    alert('Lectura eliminada correctamente');
  } catch (error) {
    console.error(error);
    alert('Error al eliminar');
  }
};

    return (

    <div
      style={{
        padding: 20,
      }}
    >

      <h2>Historial de Mediciones</h2>

      <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      marginBottom: 20,
    }}
  >

    <select
      value={pozoFiltro}
      onChange={(e) => setPozoFiltro(e.target.value)}

      style={{
        flex: 1,
        padding: 12,
        borderRadius: 10,
        border: '1px solid #ccc',
      }}
    >

      <option value="">
        Todos los pozos
      </option>

      {
        [...new Set(
          lecturas.map(
            (lectura) => lectura.pozo?.nombre
          )
        )].map((nombrePozo) => (

          <option
            key={nombrePozo}
            value={nombrePozo}
          >
            {nombrePozo}
          </option>
        ))
      }

    </select>

    <input
      type="date"
      value={fechaFiltro}
      onChange={(e) =>
        setFechaFiltro(e.target.value)
      }

      style={{
        flex: 1,
        padding: 12,
        borderRadius: 10,
        border: '1px solid #ccc',
      }}
    />

    <button
      onClick={exportarExcel}

      style={{
        backgroundColor: '#15803d',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      }}
    >
      Exportar Excel
    </button>

      <button
  onClick={() => {

    localStorage.removeItem('token');
    localStorage.removeItem('rol');

    window.location.reload();

  }}

  style={{
    padding: '12px 20px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 10,
  }}
>
  Cerrar sesión
</button>


  </div>

      

      <select
    value={tipoGrafico}
    onChange={(e) =>
      setTipoGrafico(e.target.value)
    }

    style={{
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
      border: '1px solid #ccc',
      width: 250,
    }}
  >

    <option value="voltaje">
      Voltajes
    </option>

    <option value="amperaje">
      Amperajes
    </option>

    <option value="mega">
      Megaohmios
    </option>

  </select>

      
      <div
        style={{
          width: '100%',
          height: 400,
          marginBottom: 30,
          border: '1px solid lightgray',
          borderRadius: 10,
          padding: 20,
          backgroundColor: 'white',
        }}
      >

        <h3>
        {
          tipoGrafico === 'voltaje'
            ? 'Tendencia de Voltajes'
            : tipoGrafico === 'amperaje'
            ? 'Tendencia de Amperajes'
            : 'Tendencia de Megaohmios'
        }
    
  </h3>
      
  <ResponsiveContainer
    width="100%"
    height={350}
  >

    <LineChart
    key={JSON.stringify(datosGrafico)}
    data={datosGrafico}
  >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="fecha" />

      <YAxis
        domain={['auto', 'auto']}
      />

      <Tooltip />

      {
  tipoGrafico === 'voltaje' && (
    <Line
      type="monotone"
      dataKey="VL1"
      stroke="#1976d2"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'voltaje' && (
    <Line
      type="monotone"
      dataKey="VL2"
      stroke="#16a34a"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'voltaje' && (
    <Line
      type="monotone"
      dataKey="VL3"
      stroke="#dc2626"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'amperaje' && (
    <Line
      type="monotone"
      dataKey="AL1"
      stroke="#7c3aed"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'amperaje' && (
    <Line
      type="monotone"
      dataKey="AL2"
      stroke="#ea580c"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'amperaje' && (
    <Line
      type="monotone"
      dataKey="AL3"
      stroke="#0891b2"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'mega' && (
    <Line
      type="monotone"
      dataKey="ML1"
      stroke="#0f172a"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'mega' && (
    <Line
      type="monotone"
      dataKey="ML2"
      stroke="#15803d"
      strokeWidth={3}
    />
  )
}

{
  tipoGrafico === 'mega' && (
    <Line
      type="monotone"
      dataKey="ML3"
      stroke="#b91c1c"
      strokeWidth={3}
    />
  )
}

    </LineChart>

  </ResponsiveContainer>

      </div>

        <div
    style={{
      overflowX: 'auto',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
    }}
  >

    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: 1200,
        fontFamily: 'Arial',
      }}
    >

      <thead>

        <tr
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
          }}
        >

          <th style={estiloHeader}>POZO</th>
          <th style={estiloHeader}>USUARIO</th>
          <th style={estiloHeader}>FECHA Y HORA</th>

          <th style={estiloHeader}>V L1</th>
          <th style={estiloHeader}>V L2</th>
          <th style={estiloHeader}>V L3</th>

          <th style={estiloHeader}>A L1</th>
          <th style={estiloHeader}>A L2</th>
          <th style={estiloHeader}>A L3</th>

          <th style={estiloHeader}>MΩ L1</th>
          <th style={estiloHeader}>MΩ L2</th>
          <th style={estiloHeader}>MΩ L3</th>

          <th style={estiloHeader}>ESTADO</th>
          <th style={estiloHeader}>ACCIONES</th>

        </tr>

      </thead>

      <tbody>

        { lecturasFiltradas.map((lectura, index) => (
            <tr key={lectura.id}

              style={{
                backgroundColor:
                  index % 2 === 0
                    ? '#f8fafc'
                    : 'white',

                transition: '0.2s',
              }}
            >

              <td>{lectura.pozo?.nombre}</td>
              <td>{lectura.usuario?.nombre}</td>

              <td style={estiloCelda}>
                {
                  new Date(lectura.fecha)
                  .toLocaleString()
                }
              </td>

              <td style={estiloCelda}>
                {lectura.voltaje_l1}
              </td>

              <td style={estiloCelda}>
                {lectura.voltaje_l2}
              </td>

              <td style={estiloCelda}>
                {lectura.voltaje_l3}
              </td>

              <td style={estiloCelda}>
                {lectura.amperaje_l1}
              </td>

              <td style={estiloCelda}>
                {lectura.amperaje_l2}
              </td>

              <td style={estiloCelda}>
                {lectura.amperaje_l3}
              </td>

              <td style={estiloCelda}>
                {lectura.megaohmios_l1}
              </td>

              <td style={estiloCelda}>
                {lectura.megaohmios_l2}
              </td>

              <td style={estiloCelda}>
                {lectura.megaohmios_l3}
              </td>

              <td
                style={{
                  ...estiloCelda,

                  fontWeight: 'bold',

                  color:
                    lectura.observacion
                      .toLowerCase()
                      .includes('bajo')
                      ? 'red'
                      : lectura.observacion
                          .toLowerCase()
                          .includes('excelente')
                      ? 'green'
                      : '#0f172a',
                }}
              >
                {lectura.observacion}
              </td>

              <td>
  {localStorage.getItem('rol') === 'ADMIN' && (

  <button
    onClick={() => eliminarLectura(lectura.id)}
    style={{
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: 8,
      cursor: 'pointer',
    }}
  >
    Eliminar
  </button>

)}
</td>

            </tr>

          ))
        }

      </tbody>

    </table>

  </div>

      </div>
    );
  }

  export default AdminHistorial;