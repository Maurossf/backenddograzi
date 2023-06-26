import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
// import DetalhesUsuários from "../../components/DetalhesUsuários/index";

import Tr from "../../components/Tr/index";

export default function ConsultaUsuários() {
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [xTotalCount, setXTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1);

  const [query, setQuery] = useState("");
  const [queryButton, setQueryButton] = useState(false);
  const [queryAttribute, setQueryAttribute] = useState("id");

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("id");

  const limparHandle = () => {
    setQuery("");
    setQueryAttribute("id");
    setQueryButton(true);
  };

  useEffect(() => {
    // let url = "/usuarios?cid_nome_like=TU";
    let url = `/usuarios?_page=${page}&_limit=${limit}&_order=${order}&_sort${sort}`;

    if (query) {
      url += `&${queryAttribute}_like=${query}`;
    }

    setQueryButton(false);
    // console.log(url);

    const fetchData = async () => {
      const response = await api(url);
      const xtotal = response.headers.get("x-total-count");
      setXTotalCount(xtotal);
      const pages = Math.ceil(xtotal / limit);
      setPages(pages);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [limit, page, queryButton, order, sort]);

  return (
    <div className="content">
      <div className="contentquery">
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <select
          value={queryAttribute}
          onChange={(e) => setQueryAttribute(e.target.value)}
        >
          <option value="id">Id</option>
          <option value="usu_nome">Cidade</option>
          <option value="usu_estado">Estado</option>
        </select>
        <button onClick={() => setQueryButton(true)}>Pesquisar</button>
        <button onClick={limparHandle}>Limpar</button>
      </div>

      <table align="center" className="tabela">
        <caption>Consulta Usuários</caption>
        <thead>
          <th>Id</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Comandos</th>
        </thead>
        {data.map((element, index) => {
          return (
            <Tr data={element}>
              <td data-cell="id">{element.id}</td>
              <td data-cell="cidade">{element.usu_nome}</td>
              <td data-cell="estado">{element.usu_estado}</td>
              <td data-cell="">
                <button>Alterar</button>
                <button>Excluir</button>
                {/* <DetalhesUsuários data={element} /> */}
              </td>
            </Tr>
          );
        })}
      </table>
      <div>
        <div>
          <span>Página</span>
          <select
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
          >
            {Array.from({ length: pages }, (_, i) => i + 1).map((element) => {
              return <option value={`${element}`}>{element}</option>;
            })}
          </select>
        </div>
        <div>
          <span>Ordenação</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="id">Id</option>
            <option value="usu_nome">Cidade</option>
            <option value="usu_estado">Estado</option>
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">
              <span>️⬆</span>
            </option>
            <option value="desc">
              <span>️⬇️</span>
            </option>
          </select>
        </div>
        <div>
          <span>Itens</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
}
