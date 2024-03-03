import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
/**
 * Custom InputBase
 * Dùng để nhập liệu
 */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: "100%",
  },
}));

export default StyledInputBase;
