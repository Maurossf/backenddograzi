import { useState } from "react";
import DetalhesUsuários from "../DetalhesUsuários";

export default function Tr({ children, data }) {
  const [show, setShow] = useState(false);

  const showDetalhes = () => {
    setShow(true);
  };

  const hideDetalhes = () => {
    setShow(false);
  };

  return (
    <>
      <tr onClick={showDetalhes}>{children}</tr>
      {show && (
        <DetalhesUsuários
          title="Detalhes Usuários"
          hideDetalhes={hideDetalhes}
          data={data}
        />
      )}
    </>
  );
}
