"use client";

import { FC } from "react";

type SuccessMessageProps = {
  successMessage: string | null;
};

const SuccessMessage: FC<SuccessMessageProps> = ({ successMessage }) => {
  if (!successMessage) {
    return <></>;
  }
  return (
    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
      <p className="text-sm text-green-600 dark:text-green-400">
        {successMessage}
      </p>
    </div>
  );
};

export default SuccessMessage;
