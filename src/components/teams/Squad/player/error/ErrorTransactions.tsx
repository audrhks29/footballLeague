import { memo } from "react";

const ErrorTransactions = memo(() => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Player's Transactions</h3>
        <p className="text-[16px] font-semibold text-center p-5">
          There is No Data
        </p>
      </div>
    </div>
  );
});

export default ErrorTransactions;
