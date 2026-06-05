import { Box, Grid, Typography } from "@mui/material";

const FileInputGrid = ({ onChangeFile }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography sx={{ fontSize: "14px", color: "#B0AFAF" }}>
        Attachment Copy
        <Typography component={"span"} sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <Box
        className="input-File1"
        sx={{
          width: "100%",
          input: {
            height: "55px",
            mt: "5px",
            width: "100%",
          },
        }}
      >
        <input
          required
          style={{
            borderRadius: "4px",
            backgroundColor: "var(--p1)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            padding: "14px 10px",
            boxSizing: "border-box",
          }}
          onChange={onChangeFile}
          type="file"
          title="Choose an Image (png or jpg)"
          accept="image/*"
        />
      </Box>
    </Grid>
  );
};

export default FileInputGrid;
