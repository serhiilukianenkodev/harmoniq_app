import { NavLink } from "react-router-dom";

const TestEditLink = () => {
  const exampleArticleId = "68498236a100312bea078fea"; 

  return (
    <div style={{ padding: 20 }}>
      <h2>Тестове посилання на редагування статті</h2>
      <NavLink to={`/create/${exampleArticleId}`} style={{ fontSize: 18, color: "blue" }}>
        Редагувати статтю з ID {exampleArticleId}
      </NavLink>
    </div>
  );
};

export default TestEditLink;
