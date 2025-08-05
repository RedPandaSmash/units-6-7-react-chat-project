// Dashboard corresponds to the default "/" home page, but only displays if the user is logged in with a valid token. This page is not a room you can view and post messages in, but will contain the navigation component that has buttons which link to pages corresponding to existing rooms. If user is not logged in, "/" should redirect to "/register"
// This component is the equivalent of the Rooms Component in the readme
import React from "react";
import ExistingRoomsNavigation from "../components/ExistingRoomsNavigation";

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <ExistingRoomsNavigation />
    </div>
  );
}
