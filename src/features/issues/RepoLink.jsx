import { useSelector } from "react-redux";
import { selectAllIssues } from "./issuesSlice";

function RepoLink() {
  const issues = useSelector(selectAllIssues);
  if (issues && issues.length > 0) {
    //REPOSITORY URL
    const repoUrl = issues[0]?.repository_url
      .replace("api.", "")
      .replace("/repos", "");
    const lastIndex = repoUrl.lastIndexOf("/");
    const dispRepoUrl = repoUrl.substring(lastIndex + 1);

    //ACCOUNT URL
    const accountUrl = repoUrl.substring(0, lastIndex);
    const dispAccUrl = accountUrl.split(".com/")[1];
    return (
      <div>
        <span>
          <a href={accountUrl} target="_blank" rel="noreferrer">
            {dispAccUrl}
          </a>
        </span>
        <span> &gt; </span>
        <span>
          <a href={repoUrl} target="_blank" rel="noreferrer">
            {dispRepoUrl}
          </a>
        </span>
      </div>
    );
  }
}

export default RepoLink;
