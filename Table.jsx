const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Barkod</th>
          <th>Emri-Pikes</th>
          <th>Shifra Interne</th>
          <th>Pershkrimi</th>
          <th>Qmimi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.Sifra_OE}>
            <td>{item.Sifra_OE}</td>
            <td>{item.ImeOrg}</td>
            <td>{item.Sifra_Art}</td>
            <td>{item.imeart}</td>
            <td>{item.Cena}€</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
