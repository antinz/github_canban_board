import SearchIssues from "./features/issues/SearchIssues";
import Boards from "./features/boards/Boards";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import RepoLink from "./features/issues/RepoLink";
import "./App.css";
import { getIssuesStatus } from "./features/issues/issuesSlice";
import LoadingOverlay from "./ui/OverlayLoader";
import { useSelector } from "react-redux";

function App() {
  const issuesStatus = useSelector(getIssuesStatus);
  return (
    <Layout className="layout">
      <Content className="content">
        {issuesStatus === "loading" && <LoadingOverlay />}
        <SearchIssues />
        <RepoLink />
        <Boards />
      </Content>
    </Layout>
  );
}

export default App;
