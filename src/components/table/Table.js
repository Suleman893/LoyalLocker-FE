import React from "react";
import "./table.css";
import { DataGrid } from "@mui/x-data-grid";

const Table = () => {
  return (
    <div>
      <DataGrid
        hideHeader={true}
        className="data-grid"
        sx={{
          "& .MuiDataGrid-cell": {
            color: "black",
            paddingLeft: "40px",
          },
          "& .MuiDataGrid-row": {
            marginBottom: "5px",
            backgroundColor: "white",
            borderRadius: "5px",
          },
          "& .MuiDataGrid-main": {
            backgroundColor: "#FAFAFA",
            height: "657px",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#FAFAFA",
            color: "#1F074F",
            fontFamily: "Roboto",
            fontWeight: "700",
          },
          height: "800px",
          width: "1480px",
          background: "white",
          margin: "20px 30px",
          borderRadius: "10px",
          border: "none",
          color: "#1F074F",
          textAlign: "center",
          overflowX: "none",
        }}
        // rows={rows}
        // columns={columns}
        classes={{
          root: "custom-data-grid-root",
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        disableRowSelectionOnClick
        rowHeight={55}
        rowStyle={{
          paddingBottom: "50px",
        }}
      />
    </div>
  );
};

export default Table;
