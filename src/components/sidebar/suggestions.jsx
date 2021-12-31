import { useState, useEffect, useContext } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";
import PropTypes from "prop-types";

function suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      getProfiles();
    }
  }, [userId]);
  return !profiles ? (
    <div className="flex justify-center">
      <Loader type="Audio" color="#00BFFF" height={60} width={80} />
    </div>
  ) : (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  );
}

export default suggestions;

suggestions.propTypes = {
  userId: PropTypes.string,
  follwing: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
