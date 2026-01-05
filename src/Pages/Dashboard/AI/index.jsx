import React from "react";
import { MoreVertOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  InsightPieCard,
  InfoCard,
  CustomTable,
  StatusChip,
  PagesHeader
} from "../../../Component";
import { headers, data } from "../../../Config/data";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { useNavigate } from "react-router-dom";

const ArtificialIntelligencePage = () => {
  const [search, setSearch] = React.useState();
  const navigate = useNavigate();

  return (
    <div>
      <Box>
        <PagesHeader
          label="Manage AI Services"
          desc={
            "View your generated AI services here, create more AI services and export your documents, subscribe to premium."
          }
          enableSearch
          placeholder={"Search services..."}
          searchValue={search}
          onSearchChange={setSearch}
          actions={[
            {
              label: "Generated Strategies",
              icon: <VisibilityOutlined />,
              onClick: () =>
                navigate("/dashboard/admin/artificial-intelligience/strategies")
            },
            {
              label: "Generated Images",
              icon: <VisibilityOutlined />,
              onClick: () =>
                navigate("/dashboard/admin/artificial-intelligience/images")
            }
          ]}
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
                    icon={EMOJI_ICONS.generateVideo}
                    title="Videos Generated"
                    value="30"
                    actionLabel="Generate Video"
                    color="#61B5FF"
                    onAction={() => console.log("View Users")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.editedVideo}
                    title="Edited Videos"
                    value="8"
                    actionLabel="Edit Video"
                    color="#61B5FF"
                    onAction={() => console.log("View Users")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.generatedSpeeches}
                    title="Generated Speeches"
                    value="20"
                    actionLabel="Generate Speech"
                    color="#61B5FF"
                    onAction={() => console.log("View Users")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.generatedWebsites}
                    actionLabel="Generate Website"
                    title="Built Websites"
                    value="18"
                    color="#61B5FF"
                    onAction={() => console.log("View Users")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.generatedImages}
                    actionLabel="Generate Images"
                    title="Generated Images"
                    value="18"
                    color="#61B5FF"
                    onAction={() => console.log("View Users")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={EMOJI_ICONS.generateBusinessStrategy}
                    actionLabel="Generate Business Strategy"
                    title="Strategies Generated"
                    value="18"
                    color="#61B5FF"
                    onAction={() => console.log("View Users")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <InsightPieCard
                title="Services Useage"
                chartData={[
                  { name: "Videos", value: 30, color: "#4CAF50" },
                  { name: "Images", value: 15, color: "#FF9800" },
                  { name: "Editor", value: 8, color: "#F44336" },
                  { name: "Strategy", value: 12, color: "#F1592A" },
                  { name: "Websites", value: 5, color: "#13ABBC" },
                  { name: "Speech", value: 10, color: "#0A62C7" }
                ]}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={3} mb={3}>
          <CustomTable title="Recent AI Services" headers={headers}>
            {data.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.expert}</TableCell>

                <TableCell>
                  <StatusChip status={row.status} label={row.status} />
                </TableCell>

                <TableCell>
                  <IconButton size="small">
                    <MoreVertOutlined fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </CustomTable>
        </Box>
      </Box>
    </div>
  );
};

export default ArtificialIntelligencePage;
