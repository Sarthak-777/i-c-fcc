import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();
  return (
    <div className="p-4">
      <User username={username} fullname={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}

export default Sidebar;
