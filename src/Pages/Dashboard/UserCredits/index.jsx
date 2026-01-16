/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState } from "react";
import { Box } from "@mui/material";
import { DashboardTab, CustomTab } from "../../../Component";
import { tabs } from "./data";
import ContentPricePage from "./ContentPrice";
import ContentQualitySection from "./ContentQualities";
import ContentTypeSection from "./ContentTypes";
import CreditPackageSection from "./CreditPackages";

const UserCreditsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <CustomTab
        tabs={tabs}
        activeTab={activeTab}
        updateActiveTab={setActiveTab}
      />

      <DashboardTab tabKey={0} activeTab={activeTab}>
        <CreditPackageSection />
      </DashboardTab>

      <DashboardTab tabKey={1} activeTab={activeTab}>
        <ContentPricePage />
      </DashboardTab>

      <DashboardTab tabKey={2} activeTab={activeTab}>
        <ContentQualitySection />
      </DashboardTab>

      <DashboardTab tabKey={3} activeTab={activeTab}>
        <ContentTypeSection />
      </DashboardTab>
    </Box>
  );
};

export default UserCreditsPage;
