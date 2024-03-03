import { alpha, styled } from "@mui/material/styles";

/**
 * styled component search
 * Dùng để hiển thị chat bar
 */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor:"#fff",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  
}));

export default Search;