"use client";
import React from "react";
import { useGetUser } from "@/hooks/useGetUser";

const QnaPage = () => {
  const userLoggedIn = useGetUser().loggedIn;

  return (
    <>
      <div>
        <h2>Q&A Page</h2>
        {userLoggedIn ? <h3>Welcome, user!</h3> : <h3>Nothing to see here!</h3>}
      </div>
    </>
  );
};

export default QnaPage;
