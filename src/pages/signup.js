import React, { useState, useContext, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import styled from "styled-components";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (e) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(e.message);
      }
    } else {
      setError("That username is already taken. Please try another way. ");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone Image" />
      </div>
      <div className="flex flex-col w-2/5">
        <LoginContainer>
          <ImageContainer>
            <Image src="/images/logo.png" />
          </ImageContainer>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounder h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </LoginContainer>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">Have an account? </p>
          <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  --tw-border-opacity: 1;
  border-radius: 0.25rem;
  margin-bottom: 20px;
  border-width: 1px;
  background-color: white;
`;

const ImageContainer = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Image = styled.img`
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  width: 50%;
  /* font-size: 0.75rem;
line-height: 1rem; */
`;
