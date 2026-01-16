import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { History, Delete, Download, Close, Send } from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { speechTabs } from "../data";
import TextToAudioInput from "./text-to-audio";

const UserGenerateAudio = () => {
  const [activeTab, setActiveTab] = useState(0);

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          borderBottom: "1px solid #eaeaea",
          px: 3,
          py: 3,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {EMOJI_ICONS.generatedSpeeches}
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Speech Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generate powerful, ready-to-use speeches with AI
            </Typography>
          </Box>
        </Stack>
      </Box>

      <CustomTab
        tabs={speechTabs}
        activeTab={activeTab}
        updateActiveTab={updateActiveTab}
      />

      <DashboardTab tabKey={0} activeTab={activeTab}>
        <TextToAudioInput />
      </DashboardTab>

      <DashboardTab tabKey={1} activeTab={activeTab}>
        <TextToAudioInput />
      </DashboardTab>
    </Box>
  );
};

export default UserGenerateAudio;
