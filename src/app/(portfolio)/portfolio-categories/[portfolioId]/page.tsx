import React from "react";

const DndCampaignDetails = ({ params }: { params: { portfolioId: string } }) => {
  return <h2>Current Portfolio ID: {params.portfolioId} </h2>;
};

export default DndCampaignDetails;
