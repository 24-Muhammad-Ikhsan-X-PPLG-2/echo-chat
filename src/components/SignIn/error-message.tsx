"use client";

import { FC } from "react";

type ErrorMessageProps = {
  errorMessage: string | null;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  if (!errorMessage) {
    return <></>;
  }
  return (
    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
      <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
