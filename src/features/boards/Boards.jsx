import ToDo from "./ToDo";
import InProgress from "./InProgress";
import Done from "./Done";
import RepoLink from "../issues/RepoLink";

function Boards() {
  return (
    <>
      <RepoLink />
      <ToDo />
      <InProgress />
      <Done />
    </>
  );
}

export default Boards;
