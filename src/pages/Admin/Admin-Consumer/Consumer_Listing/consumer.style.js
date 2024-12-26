import styled from "styled-components";

import Switch from "@mui/material/Switch";

export const CustomSwitch = styled(Switch)`
  margin-right: 150px;
  margin-top: 6px;
  /* & .css-1yjjitx-MuiSwitch-track {
    background: none !important;
    border: 1.5px solid rgba(11, 121, 116, 1)!important;
  }
  & .css-1ju1kxc{ background: none !important;
    border: 1.5px solid rgba(111, 118, 126, 1) !important; }
    & .css-1i8lvs-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
    background: none !important;
    border: 1.5px solid rgba(111, 118, 126, 1) !important;
  } */
  /* & .gpSjBm .MuiSwitch-thumb {
      background: rgba(111, 118, 126, 1) !important;
    } */
  /* & .css-1uf4bbi.Mui-checked + .MuiSwitch-track {
  background: none !important;
    border: 1.5px solid rgba(11, 121, 116, 1) !important;
}
 
  & .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
    background: none !important;
    border: 1.5px solid rgba(11, 121, 116, 1) !important;
  } */

  /* & .MuiSwitch-thumb {
    background: rgba(11, 121, 116, 1) !important;
  } */
`;

// import { Switch } from '@mui/material';
function MySwitch({ isActive }) {
  const activeStyles = {
    "& .MuiSwitch-switchBase": {
      color: "otherColor",
    },
    "& .css-1yjjitx-MuiSwitch-track": {
      backgroundColor: "otherBackgroundColor",
    },
  };

  const defaultStyles = {
    "& .MuiSwitch-switchBase": {
      color: "defaultColor",
    },
    "& .css-1yjjitx-MuiSwitch-track": {
      backgroundColor: "defaultBackgroundColor",
    },
  };

  // Determine which styles to apply based on the isActive prop
  const stylesToApply = isActive ? activeStyles : defaultStyles;

  return (
    <Switch
      sx={{
        // Merge the selected styles using the spread operator
        ...stylesToApply,
      }}
    />
  );
}

export default MySwitch;
