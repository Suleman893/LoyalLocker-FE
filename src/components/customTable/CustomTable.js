import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import "./tableStyle.css"
import OutlinedPagination from "@mui/material/Pagination";
// import Prev from "assets/client/Prev.png";
// import Next from "assets/client/Next.png";
import { PaginationButton } from "./Table.Style";
import { Box, CircularProgress } from "@mui/material";
import Pagination from "../Pagination/Pagination";

const CustomOutlinedPagination = styled(OutlinedPagination)(({}) => ({
  "& .Mui-selected": {
    backgroundColor: "rgba(255, 88, 51, 1) !important",
    color: "#fff !important",
  },
  "& .MuiPaginationItem-root": {
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(255, 88, 51, 1)",
      color: "#fff",
    },
  },
}));

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

const CustomLoadingOverlay = () => {
  return <CircularProgress />;
};

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100px !important"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Data Found</Box>
    </StyledGridOverlay>
  );
};

const CustomTable = ({
  rows,
  columns,
  page,
  totalPages,
  changePage,
  totalCount = 0,
  loading = false,
  enableRowSelection,
  handleActionClick,
  pageName,
  pinnedLeftColumns = [],
  pinnedRightColumns = ["action"],
}) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const rowsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const startingRow = (currentPage - 1) * rowsPerPage + 1;
  // const endingRow = Math.min(currentPage * rowsPerPage, rows?.length);
  // const handlePageChange = (_, page) => {
  //   setCurrentPage(page);
  // };
  // const handleNextClick = () => {
  //   setCurrentPage((prevPage) =>
  //     Math.min(prevPage + 1, Math.ceil(rows?.length / rowsPerPage))
  //   );
  // };
  // const handlePreviousClick = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allRowIds = rows.map((row) => row.id);
      setSelectionModel(allRowIds);
    } else {
      setSelectionModel([]);
    }
  };

  return (
    <div className="consumer-main-table">
      <DataGrid
        initialState={{
          pinnedColumns: { left: pinnedLeftColumns, right: pinnedRightColumns },
        }}
        getRowId={(row) => row._id || row.id}
        checkboxSelection={false}
        disableRowSelectionOnClick
        className="data-grid-2"
        sx={{
          "& .MuiDataGrid-row": {
            "&:nth-child(even)": {
              backgroundColor: "rgba(245, 247, 250, 1)",
            },
          },
          "& .MuiDataGrid-columnHeader": {
            color: "#1F074F",
            // fontFamily: 'Roboto',
            fontWeight: "700",
            background: "#FAFAFA",
            color: "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderRadius: "30px",
          },

          "& .MuiTablePagination-toolbar": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderDraggableContainer": {
            fontWeight: "bold",
          },
          "& .css-de9k3v-MuiDataGrid-selectedRowCount": {
            visibility: "hidden",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .css-9ffb5l": {
            minHeight: "0px",
          },
          // minHeight:'500px',
          //  height: "auto",
          width: "auto",
          background: "white",
          borderRadius: "10px",
          border: "none",
          color: "black",
          textAlign: "center",
          marginTop: "10px",
          overflowX: "none",
          "--DataGrid-overlayHeight": "300px !important",
        }}
        slots={{
          noRowsOverlay: loading ? CustomLoadingOverlay : CustomNoRowsOverlay,
        }}
        handleActionClick={handleActionClick}
        rows={rows}
        columns={
          enableRowSelection
            ? [
                {
                  field: "selection",
                  headerName: (
                    <Checkbox
                      indeterminate={
                        selectionModel.length > 0 &&
                        selectionModel.length < rows.length
                      }
                      checked={selectionModel.length === rows.length}
                      onChange={handleSelectAllClick}
                    />
                  ),
                  width: 80,
                  sortable: false,
                  headerAlign: "left",
                  renderCell: (params) => (
                    <Checkbox
                      checked={selectionModel.includes(params.row.id)}
                      onChange={(event) => {
                        const selectedRows = new Set(selectionModel);
                        if (event.target.checked) {
                          selectedRows.add(params.row.id);
                        } else {
                          selectedRows.delete(params.row.id);
                        }
                        setSelectionModel(Array.from(selectedRows));
                      }}
                    />
                  ),
                },
                ...columns,
              ]
            : columns
        }
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection.selectionModel);
        }}
        autoHeight
        selectionModel={selectionModel}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        pagination
        loading={loading}
      />

      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="pagination"
      >
        <span
          style={{ fontSize: "16px", fontWeight: 400, paddingLeft: "18px" }}
        >
          Showing {rows?.length} from {totalCount} {pageName}
        </span>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <PaginationButton onClick={handlePreviousClick}>
            {" "}
            <img src="./images/Vectoria.png" alt=""/>
          </PaginationButton>
          <CustomOutlinedPagination
            shape="rounded"
            variant="filled"
            count={Math.ceil(rows?.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            hideNextButton
            hidePrevButton
          />
          <PaginationButton onClick={handleNextClick}>
            {" "}
            <img src="./images/Vectori.png" alt=""/>
          </PaginationButton> */}
          {rows?.length ? (
            <Pagination
              page={page}
              pages={totalPages}
              changePage={changePage}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
