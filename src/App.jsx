import SearchIssues from "./features/issues/SearchIssues";
import Container from "./ui/Container";
import Boards from "./features/boards/Boards";
import { useSelector } from "react-redux";
import { selectAllIssues } from "./features/issues/issuesSlice";
import "./styles/dashboard.css";

function App() {
  const issues = useSelector(selectAllIssues);
  return (
    <Container>
      <SearchIssues />
      {issues && issues.length > 0 && <Boards />}
    </Container>
  );
}

export default App;
