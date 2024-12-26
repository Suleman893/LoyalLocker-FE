import React, { useEffect, useState } from "react";
import { CircularProgress, FormHelperText, Stack } from "@mui/material";
import SideBar2 from "../../../components/Layout/SideBar2";
import Header from "../../../components/Layout/Header";
import TextFieldComp from "../../../components/InputFields/TextFieldComp";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import "../../../components/dashboard/Dashboard.css";
import CustomTable from "../../../components/customTable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  allReferredFriends,
  inviteFriend,
} from "../../../redux/consumer/consumerThunk";
import { useFormik } from "formik";
import { inviteFriendSchema } from "../../../schema/consumerSchema";
import { format } from "date-fns";
import { FriendListingMobileScree } from "./FriendListingMobileScree";

const CreateModal = ({ setShowCreateModal, showCreateModal }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.consumer);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: inviteFriendSchema,
    onSubmit: (values) => {
      dispatch(inviteFriend({ values, setShowCreateModal }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form className="popup-overlay" onSubmit={formik.handleSubmit}>
      <div className="frnd-popup">
        <div className="frnd-card-header">
          <div style={{ display: "flex",paddingLeft:'10px' }}>
            {" "}
            <div className="frnd-card-title-design"></div>
            <div className="frnd-card-title">Invite your Friend</div>
          </div>
          <button
            className="frnd-btn"
            onClick={() => setShowCreateModal(!showCreateModal)}
          >
            {" "}
            <CloseIcon sx={{ color: "black", cursor: "pointer" }} />
          </button>
        </div>
        <Stack sx={{margin:'5px 20px ' }}>
          <TextFieldComp
            label="Friend Email"
            placeholder="Enter your email "
            width="100%"
            stackStyle={{ marginTop: "20px" }}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik?.touched?.email || formik?.errors?.email ? (
            <FormHelperText error>{formik?.errors?.email}</FormHelperText>
          ) : null}
        </Stack>
        <div style={{ display: "flex",justifyContent:'flex-end',margin:'0px 20px',gap:'8px' }}>
          <button
            className="frnd-cancel-btn"
            onClick={() => setShowCreateModal(!showCreateModal)}
          >
            cancel
          </button>
          <button
            className="frnd-invite-btn"
            onClick={() => dispatch(inviteFriend())}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "#fff" }} />
            ) : (
              "Invite Now"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

const FreindListing = () => {
  const { referredFriends, isAllReferredLoading, isUpdate } = useSelector(
    (state) => state.consumer
  );
  const [duplicateArray, setDuplicateArray] = useState([]);
  const dispatch = useDispatch();
  const [totalCount, setTotalCounts] = useState(null);
  const openSidebar = useSelector((state) => state.consumer.openSidebar);

  useEffect(() => {
    dispatch(allReferredFriends());
  }, [isUpdate]);

  useEffect(() => {
    if (referredFriends?.response?.length) {
      const updatedArray = referredFriends?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);
      setTotalCounts(referredFriends?.totalCount);
    } else setDuplicateArray([]);
  }, [referredFriends?.response]);

  const [collapsed, setCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email ID",
      width: 530,
      editable: true,
    },
    {
      field: "invitedDate",
      headerName: "Invited date",
      width: 550,
      editable: true,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.invitedDate
              ? format(new Date(params?.row?.invitedDate), "d MMMM yyyy")
              : "_"}
          </p>
        );
      },
    },
    {
      field: "pointsEarned",
      headerName: "Points Earned",
      width: 350,
      editable: true,
      renderCell: (params) => {
        return <p>{params?.row?.pointsEarned || 0}</p>;
      },
    },
  ];

  const handleCreateButtonClick = () => {
    setShowCreateModal(!showCreateModal);
  };

  return (
    <>
      <div style={{width:'100%',minHeight:'100vh',display: "flex"}}>
        <SideBar2 />
        <Stack className="main-height">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className={`${openSidebar ? 'consumer-main-div-toggle' : 'consumer-main-div'}`}>
            <div className="dashboard-main-div">
              <div style={{ display: "flex",backgroundColor:'#FAFAFA' }}>
                {" "}
                <div className="frnd-title-design"></div>
                <div className="frnd-title">Invite a Friend</div>
              </div>
              <div className="frnd-header-design">
                <img src="./images/frnd.png" alt="" className="frnd-image" />
                <div className="frnd-text">
                  <span className="frnd-title-01">Invite your friend &</span>
                  <span className="frnd-title-02">EARN POINTS</span>
                </div>
                <button
                  className="invite-btn"
                  onClick={handleCreateButtonClick}
                  style={{ cursor: "pointer" }}
                >
                  Invite Now
                </button>
              </div>
              <div className="frnd-tbl-main">
                <div className="frnd-tbl-header">
                  <div style={{ display: "flex" }}>
                    {" "}
                    <div className="frnd-tbl-title-design"></div>
                    <div className="frnd-tbl-title">List of your friends</div>
                  </div>
                </div>
                <div className="friend-list-table">
                  <CustomTable
                    rows={duplicateArray?.length ? duplicateArray : []}
                    loading={isAllReferredLoading}
                    columns={columns}
                    pinnedLeftColumns={["fname"]}
                    totalCount={totalCount || 0}
                    pageName="Referred Friends"
                  />
                </div>
                <div className="mobile-resposive">
                  <FriendListingMobileScree />
                </div>
              </div>
            </div>
          </Stack>
        </Stack>
      </div>
      {showCreateModal && (
        <CreateModal
          setShowCreateModal={setShowCreateModal}
          showCreateModal={showCreateModal}
        />
      )}
    </>
  );
};

export default FreindListing;
