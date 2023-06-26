import "./styles.css";

export default function DetalhesUsuários({
  title = "Mensagem",
  data,
  hideDetalhes
}) {
  return (
    <div className="detalhesusuarios">
      <div>
        <section>
          <header>{title}</header>
          <main>
            <span>Id</span>
            <span>{data.id}</span>
            <span>Cidade</span>
            <span>{data.usu_nome}</span>
            <span>Estado</span>
            <span>{data.usu_estado}</span>
          </main>
          <footer>
            <button onClick={hideDetalhes}>Fechar</button>
          </footer>
        </section>
      </div>
    </div>
  );
}
