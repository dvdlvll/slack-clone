// react libraries //
import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// styled components //
const HeaderContainer = styled.div``;

const HeaderMain = styled.div`
  display: flex;
`;

const SearchbarContainer = styled.div``;

const Search = styled.div``;

const UserContainer = styled.div`
  display: flex;
`;

const Name = styled.div``;

const UserImage = styled.div``;

// component //
function Header() {
  return (
    <HeaderContainer>
      <HeaderMain>
        <AccessTimeIcon />
        <SearchbarContainer>
          <Search>
            <input type="text" placeholder="Search" />
          </Search>
        </SearchbarContainer>
        <HelpOutlineIcon />
      </HeaderMain>

      <UserContainer>
        <Name>Piss</Name>
        <UserImage>
          <img src="https://i.imgur.com/6VBx3io.png" />
        </UserImage>
      </UserContainer>
    </HeaderContainer>
  );
}

export default Header;
