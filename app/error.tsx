"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong! Perhaps API is disabled on this profile!</h2>
      <a href="/">Click here to return to the home page!</a>
    </div>
  );
}
