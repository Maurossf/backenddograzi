import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import Tr from "../../components/Tr";

export default function ConsultaProdutos() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(-1);

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("pro_tamanho");

  const [query, setQuery] = useState("");
  const [attribute, setAttribute] = useState("pro_nome");
  const [buttonQuery, setButtonQuery] = useState("false");
  const [operator, setOperator] = useState("_like");

  const limparHandle = () => {
    setQuery("");
    setAttribute("pro_nome");
    setOperator("");
    setButtonQuery(true);
  };

  useEffect(() => {
    // let url = "/produtos?id_gte=3";
    // let url = "/produtos?id=1";
    // let url = "/produtos?_sort=pro_estado&_order=desc&id_gte=3";
    let url =
      "/usuarios?_page=${page}&_limit=${limit}&_sort=${sort}&-order=${}order";

    if (query) {
      url = +"&${attribute}${operator}=${query}";
    }

    setButtonQuery(false);

    const fetchData = async () => {
      try {
        const response = await api(url);
        const xtotal = response.headers.get("x-total-count");
        const totalPages = Math.ceil(xtotal / limit);
        setPages(totalPages);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData([{}]);
      }
    };

    fetchData();
  }, [limit, page, sort, order, buttonQuery]);

  return (
    <div className="tabela_dados">
      <div className="querybar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <select
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
        >
          <option value="id">Id</option>
          <option value="pro_nome">Cidade</option>
          <option value="pro_estado">Estado</option>
        </select>
        <select value={attribute} onChange={(e) => setOperator(e.target.value)}>
          <option value="">=</option>
          <option value="_like">Contem</option>
          <option value="_gte">Maior Igual</option>
          <option value="_lte">Menor Igual</option>
          <option value="_ne">Diferente</option>
        </select>{" "}
        <button className="pesquisar" onClick={() => setButtonQuery(true)}>
          Pesquisar
        </button>{" "}
        <button className="limpar" onClick={limparHandle}>
          Limpar
        </button>
      </div>
      <table align="center">
        <caption>Consulta Produtos</caption>
        <thead>
          <th className="nomes ">Id</th>
          <th className="tamanho ">Tamanho</th>
          <th className="cor ">Cor</th>
          <th className="sexo ">Sexo</th>
          <th className="categoria ">Categoria</th>
          <th className="valor ">Valor</th>
        </thead>
        {data.map((element) => {
          return (
            <Tr data={element}>
              <td data-cell="id">{element.id}</td>
              <td data-cell="cidade">{element.pro_nome}</td>
              <td data-cell="estado">{element.pro_estado}</td>
              <td>
                <button>Alterar</button>
                <button>Excluir</button>
              </td>
            </Tr>
          );
        })}
      </table>
      <div>
        <div>
          <span>Página</span>
          <select vluae={page} onChange={(e) => setPage(e.target.value)}>
            {Array.from({ length: pages }, (_, i) => i + 1).map((element) => {
              return <option value={"${element}"}>{element}</option>;
            })}
          </select>
        </div>
        <div className="controlbar">
          <span>Itens</span>
          <select vluae={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <span>Ordenação</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="id">Id</option>
            <option value="pro_nome">Cidade</option>
            <option value="pro_estado">Estado</option>
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
    </div>
  );
}
