import "./prose.css";

export type ProseBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

/** Long-form text (legal pages, articles) on a narrow measure. */
export default function Prose({ blocks, updated }: { blocks: ProseBlock[]; updated?: string }) {
  return (
    <section className="prose-section">
      <div className="contenedor">
        <article className="prose">
          {updated && <p className="prose__updated">Last updated: {updated}</p>}
          {blocks.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "ul")
              return (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.text}</p>;
          })}
        </article>
      </div>
    </section>
  );
}
