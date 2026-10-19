import "./data-table.css";

/** Capacity / spec table in the site's thin-rule style; scrolls sideways on phones. */
export default function DataTable({
  title,
  text,
  columns,
  rows,
}: {
  title: string;
  text?: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <section className="data-table">
      <div className="contenedor">
        <div className="line-title">
          <span className="line-title__line" aria-hidden />
          <h2 className="line-title__text title-L">
            <em>{title}</em>
          </h2>
        </div>
        {text && <p className="data-table__text">{text}</p>}
        <div className="data-table__scroll" data-reveal="fade-up">
          <table>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r[0])}>
                  {r.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
