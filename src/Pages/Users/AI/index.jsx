import React from "react";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { InsightPieCard, InfoCard, HeaderBreadCrumb } from "../../../Component";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { useNavigate } from "react-router-dom";

const UserAIPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box>
        <HeaderBreadCrumb
          desc={
            "View your generated AI services here, create more AI services and export your documents, subscribe to premium."
          }
        />

        <Box>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems={"flex-start"}
            mb={4}
          >
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.gridView}
                    title="Videos Generated"
                    value="0"
                    actionLabel="Generate Video"
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/generate-images")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.tips}
                    title="Generated Audio"
                    value="0"
                    actionLabel="Generate Audio"
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/generate-images")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.creditCard}
                    actionLabel="Generate Website"
                    title="Built Websites"
                    value="0"
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/generate-images")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.creditCard}
                    actionLabel="Generate Images"
                    title="Generated Images"
                    value="0"
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/generate-images")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.creditCard}
                    actionLabel="Generate Business Strategy"
                    title="Strategies Generated"
                    value="0"
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/generate-images")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <InsightPieCard
                title="Services Useage Overview"
                chartData={[
                  { name: "Videos", value: 0, color: "#4CAF50" },
                  { name: "Images", value: 0, color: "#FF9800" },
                  { name: "Editor", value: 0, color: "#F44336" },
                  { name: "Strategy", value: 0, color: "#F1592A" },
                  { name: "Websites", value: 0, color: "#13ABBC" },
                  { name: "Speech", value: 0, color: "#0A62C7" },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default UserAIPage;
