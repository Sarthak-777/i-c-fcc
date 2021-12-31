import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { memo } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const User = ({ username, fullname }) =>
  !username || !fullname ? (
    <Loader
      className="flex justify-center mb-10"
      type="ThreeDots"
      color="#00BFFF"
      height={80}
      width={80}
    />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatar/${username}.jpg`}
          alt=""
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullname}</p>
      </div>
    </Link>
  );

export default memo(User);

User.propTypes = {
  username: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
};
