// import React, { useState } from "react";
// import Header from "../../../../components/Layout/Header";
// import {
//   Stack,
//   Typography,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import "../style.css";
// import SideBar3 from "../../../../components/Layout/SideBar3";
// import { Link, useNavigate } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import dropedown from "../../../../assets/Company images/drop-down.png";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import { toast } from "react-toastify";

// const AddAudience = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [anchorEl1, setAnchorEl1] = useState(null);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedAge, setSelectedAge] = useState(null);
//   const [oprOne, setOprOne] = useState("or");
//   const [oprTwo, setOprTwo] = useState("or");
//   const [open, setOpen] = useState(false);
//   const [relationArray, setRelationArray] = useState([]);

//   const handleDateChange = (newDate) => {
//     const dateObject = new Date(newDate);
//     if (!isNaN(dateObject.getTime())) {
//       setSelectedDate(dateObject);
//       const today = new Date();
//       let age = today.getFullYear() - dateObject.getFullYear();
//       const hasBirthdayOccurred =
//         today.getMonth() > dateObject.getMonth() ||
//         (today.getMonth() === dateObject.getMonth() &&
//           today.getDate() >= dateObject.getDate());
//       if (!hasBirthdayOccurred) {
//         age--;
//       }
//       if (age < 16) {
//         return toast.info("Age should be greater than 16", {
//           theme: "colored",
//         });
//       }
//       setRelationArray((relation) => [...relation, { age: "ageExist" }]);
//       setSelectedAge(age);
//     } else {
//       return toast.info("Invalid date", {
//         theme: "colored",
//       });
//     }
//   };
//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuClick1 = (event) => {
//     setAnchorEl1(event.currentTarget);
//   };
//   const handleClose1 = () => {
//     setAnchorEl1(null);
//   };

//   const handleGenderSelect = (value) => {
//     setRelationArray((relation) => [...relation, { gender: "genderExist" }]);
//     setSelectedGender(value);
//     handleClose();
//   };

//   const handleCountrySelect = (value) => {
//     setRelationArray((relation) => [...relation, { gender: "countryExist" }]);
//     setSelectedCountry(value);
//     handleClose1();
//   };

//   const handleOpenCalendar = () => {
//     setOpen(true);
//   };

//   return (
//     <div>
//       <div style={{ display: "flex" }}>
//         <SideBar3 />
//         <Stack sx={{ width: "100%", padding: "0px", background: "#FAFAFA" }}>
//           <Header setCollapsed={setCollapsed} collapsed={collapsed} />
//           <Stack sx={{ padding: "0px 30px" }}>
//             <div className="ptl-main-div">
//               <Stack
//                 sx={{
//                   marginTop: "20px",
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Stack
//                   gap={2}
//                   style={{ display: "flex", flexDirection: "row" }}
//                 >
//                   <div
//                     className="ptl-title-design"
//                     style={{ marginTop: "0px", marginLeft: "0px" }}
//                   ></div>
//                   <Typography
//                     sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
//                   >
//                     Add Audience
//                   </Typography>
//                 </Stack>
//               </Stack>
//               <Link to="">
//                 <Button
//                   startIcon={<AddIcon />}
//                   sx={{
//                     padding: "8px 16px",
//                     height: "40px",
//                     background: "#FF5833",
//                     color: "#FFFFFF",
//                     borderRadius: "12px",
//                     textTransform: "none",
//                     marginTop: "30px",
//                     "&:hover": {
//                       background: "#FF5833",
//                     },
//                   }}
//                 >
//                   Add Audience Filter
//                 </Button>
//               </Link>

//               <Stack sx={{ marginTop: "10px" }}>
//                 <Stack
//                   gap={2}
//                   sx={{
//                     height: "66px",
//                     border: "1px solid #6F767E",
//                     borderRadius: "12px",
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Box
//                     onClick={handleMenuClick}
//                     sx={{
//                       marginLeft: "20px",
//                       width: "86px",
//                       height: "26px",
//                       borderRadius: "100px",
//                       background: "#F6F6F4",
//                       padding: "12px 10px",
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "space-around",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Typography sx={{ fontSize: "14px", color: "#6F767E" }}>
//                       Gender
//                     </Typography>
//                     <img src={dropedown} alt="" width="8px" height="5px" />
//                   </Box>
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                   >
//                     <MenuItem onClick={() => handleGenderSelect("M")}>
//                       Male
//                     </MenuItem>
//                     <MenuItem onClick={() => handleGenderSelect("F")}>
//                       Female
//                     </MenuItem>
//                     <MenuItem onClick={() => handleGenderSelect("U")}>
//                       Other
//                     </MenuItem>
//                   </Menu>

//                   <Box
//                     onClick={handleMenuClick1}
//                     sx={{
//                       width: "86px",
//                       height: "26px",
//                       borderRadius: "100px",
//                       background: "#F6F6F4",
//                       padding: "12px 10px",
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "space-around",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Typography sx={{ fontSize: "14px", color: "#6F767E" }}>
//                       Country
//                     </Typography>
//                     <img src={dropedown} alt="" width="8px" height="5px" />
//                   </Box>
//                   <Menu
//                     anchorEl={anchorEl1}
//                     open={Boolean(anchorEl1)}
//                     onClose={handleClose1}
//                   >
//                     <MenuItem onClick={() => handleCountrySelect("US")}>
//                       US
//                     </MenuItem>
//                   </Menu>

//                   <Box
//                     sx={{
//                       width: "100px",
//                       height: "26px",
//                       borderRadius: "100px",
//                       background: "#F6F6F4",
//                       padding: "12px 10px",
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "space-around",
//                       alignItems: "center",
//                     }}
//                   >
//                     <LocalizationProvider
//                       dateAdapter={AdapterDayjs}
//                       dateLibInstance={dayjs}
//                     >
//                       <Stack
//                         gap={2}
//                         style={{
//                           display: "flex",
//                           flexDirection: "row",
//                           alignItems: "center",
//                           cursor: "pointer",
//                         }}
//                         onClick={handleOpenCalendar}
//                       >
//                         <Typography sx={{ fontSize: "14px", color: "#6F767E" }}>
//                           Age
//                         </Typography>
//                         <Box>
//                           <DateRangeIcon sx={{ color: "#6F767E" }} />
//                         </Box>
//                       </Stack>

//                       <div
//                         style={{
//                           position: "absolute",
//                           top: "50%",
//                           left: "50%",
//                           transform: "translate(-50%, -50%)",
//                           display: "none",
//                         }}
//                       >
//                         <DatePicker
//                           open={open}
//                           onClose={() => setOpen(false)}
//                           value={selectedDate}
//                           onChange={handleDateChange}
//                           renderInput={(params) => <TextField {...params} />}
//                           style={{ position: "absolute", top: "50%" }}
//                         />
//                       </div>
//                     </LocalizationProvider>
//                   </Box>
//                 </Stack>
//                 {selectedGender && (
//                   <>
//                     <Stack
//                       sx={{
//                         marginTop: "10px",
//                         height: "66px",
//                         border: "1px solid #6F767E",
//                         borderRadius: "12px",
//                         display: "flex",
//                         flexDirection: "row",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           marginLeft: "20px",
//                           width: "86px",
//                           padding: "3px 10px",
//                           height: "26px",
//                           borderRadius: "100px",
//                           background: "#F6F6F4",
//                           padding: "12px 10px",
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-around",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Typography sx={{ fontSize: "14px", color: "#6F767E" }}>
//                           {selectedGender === "M"
//                             ? "Male"
//                             : selectedGender === "F"
//                             ? "Female"
//                             : "Other"}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </>
//                 )}
//                 {relationArray.length >= 2 && (
//                   <Stack sx={{ marginTop: "10px", flexDirection: "row" }}>
//                     <Box sx={{ border: "1px solid #0B7974" }}>
//                       <Button
//                         sx={{
//                           width: "100px",
//                           height: "56px",
//                           borderRadius: "0px",
//                           backgroundColor:
//                             oprOne === "and" ? "#0B7974" : "#FFFFFF",
//                           color: oprOne === "and" ? "#FFFFFF" : "#0B7974",
//                           textTransform: "none",
//                           "&:hover": {
//                             backgroundColor:
//                               oprOne === "and" ? "#0B7974" : "#FFFFFF",
//                             color: oprOne === "and" ? "#FFFFFF" : "#0B7974",
//                           },
//                         }}
//                         onClick={() => setOprOne("and")}
//                       >
//                         And
//                       </Button>
//                       <Button
//                         sx={{
//                           width: "100px",
//                           height: "56px",
//                           border: "0px",
//                           color: oprOne === "or" ? "#FFFFFF" : "#0B7974",
//                           textTransform: "none",
//                           backgroundColor:
//                             oprOne === "or" ? "#0B7974" : "#FFFFFF",
//                           "&:hover": {
//                             backgroundColor:
//                               oprOne === "or" ? "#0B7974" : "#FFFFFF",
//                             color: oprOne === "or" ? "#FFFFFF" : "#0B7974",
//                           },
//                         }}
//                         onClick={() => setOprOne("or")}
//                       >
//                         Or
//                       </Button>
//                     </Box>
//                   </Stack>
//                 )}

//                 {selectedCountry && (
//                   <>
//                     <Stack
//                       sx={{
//                         marginTop: "10px",
//                         height: "66px",
//                         border: "1px solid #6F767E",
//                         borderRadius: "12px",
//                         display: "flex",
//                         flexDirection: "row",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           marginLeft: "20px",
//                           width: "86px",
//                           padding: "3px 10px",
//                           height: "26px",
//                           borderRadius: "100px",
//                           background: "#F6F6F4",
//                           padding: "12px 10px",
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-around",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Typography sx={{ fontSize: "14px", color: "#6F767E" }}>
//                           {selectedCountry}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </>
//                 )}
//                 {relationArray.length === 3 && (
//                   <Stack sx={{ marginTop: "10px", flexDirection: "row" }}>
//                     <Box sx={{ border: "1px solid #0B7974" }}>
//                       <Button
//                         sx={{
//                           width: "100px",
//                           height: "56px",
//                           borderRadius: "0px",
//                           backgroundColor:
//                             oprTwo === "and" ? "#0B7974" : "#FFFFFF",
//                           color: oprTwo === "and" ? "#FFFFFF" : "#0B7974",
//                           textTransform: "none",
//                           "&:hover": {
//                             backgroundColor:
//                               oprTwo === "and" ? "#0B7974" : "#FFFFFF",
//                             color: oprTwo === "and" ? "#FFFFFF" : "#0B7974",
//                           },
//                         }}
//                         onClick={() => setOprTwo("and")}
//                       >
//                         And
//                       </Button>
//                       <Button
//                         sx={{
//                           width: "100px",
//                           height: "56px",
//                           border: "0px",
//                           textTransform: "none",
//                           color: oprTwo === "or" ? "#FFFFFF" : "#0B7974",
//                           backgroundColor:
//                             oprTwo === "or" ? "#0B7974" : "#FFFFFF",
//                           "&:hover": {
//                             color: oprTwo === "or" ? "#FFFFFF" : "#0B7974",
//                             backgroundColor:
//                               oprTwo === "or" ? "#0B7974" : "#FFFFFF",
//                           },
//                         }}
//                         onClick={() => setOprTwo("or")}
//                       >
//                         Or
//                       </Button>
//                     </Box>
//                   </Stack>
//                 )}
//                 {selectedAge && (
//                   <>
//                     <Stack
//                       sx={{
//                         marginTop: "10px",
//                         height: "66px",
//                         border: "1px solid #6F767E",
//                         borderRadius: "12px",
//                         display: "flex",
//                         flexDirection: "row",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           marginLeft: "20px",
//                           width: "86px",
//                           padding: "3px 10px",
//                           height: "26px",
//                           borderRadius: "100px",
//                           background: "#F6F6F4",
//                           padding: "12px 10px",
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-around",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Typography sx={{ fontSize: "14px", color: "#6F767E" }}>
//                           {selectedAge}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </>
//                 )}

//                 <Stack
//                   gap={2}
//                   sx={{
//                     marginTop: "20px",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <Button
//                     sx={{
//                       color: "#0B7974",
//                       border: "1px solid #0B7974",
//                       borderRadius: "10px",
//                       height: "52px",
//                       width: "240px",
//                       textTransform: "none",
//                       // "&:hover": {
//                       //     cursor: "pointer",
//                       //     background: "#0B7974",
//                       // },
//                     }}
//                   >
//                     Cancel
//                   </Button>

//                   <Button
//                     sx={{
//                       width: "240px",
//                       height: "52px",
//                       borderRadius: "10px",
//                       background: "#0B7974",
//                       color: "white",
//                       textTransform: "none",
//                       "&:hover": {
//                         cursor: "pointer",
//                         background: "#0B7974",
//                       },
//                     }}
//                     onClick={() =>
//                       navigate("/add_audience_name", {
//                         state: {
//                           selectedGender,
//                           selectedCountry,
//                           selectedAge,
//                           oprOne,
//                           oprTwo,
//                         },
//                       })
//                     }
//                   >
//                     Review Segment
//                   </Button>
//                 </Stack>
//               </Stack>
//             </div>
//           </Stack>
//         </Stack>
//       </div>
//     </div>
//   );
// };

// export default AddAudience;
