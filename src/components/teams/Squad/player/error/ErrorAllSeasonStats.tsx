import { memo } from "react";

const ErrorAllSeasonStats = memo(() => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">All Season Stats</h3>
        <p className="text-[16px] font-semibold text-center p-5">
          There is No Data
        </p>
      </div>
    </div>
  );
});

export default ErrorAllSeasonStats;
