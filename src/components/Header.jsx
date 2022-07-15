// react libraries //
import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// variables //
import UserIcon from "../assets/images/placeholder-icon.png";

// styled components //
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 10;

  background: #350d36;
  box-shadow: 0 1px 0 0 rgb(104 74 104);
  color: white;
`;

const HeaderMain = styled.div`
  display: flex;
  align-items: center;

  margin: 0 10px;
`;

const SearchbarContainer = styled.div`
  min-width: 250px;
  margin: 0 10px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;

  box-shadow: inset 0 0 0 1px rgb(104 74 104);
  border-radius: 6px;

  input {
    width: 100%;
    padding: 2% 4%;

    background-color: transparent;
    color: white;
    border: none;
  }

  input:focus {
    outline: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  right: 0;

  margin: 0 10px;
`;

const Name = styled.div`
  padding-right: 10px;
`;

const UserImage = styled.div`
  width: 45px;
  height: 45px;
  border: 2px solid white;
  border-radius: 3px;

  img {
    width: 100%;
  }
`;

// component //
function Header() {
  return (
    <HeaderContainer>
      <HeaderMain>
        <AccessTimeIcon />
        <SearchbarContainer>
          <Search>
            <input type="text" placeholder="Search..." />
          </Search>
        </SearchbarContainer>
        <HelpOutlineIcon />
      </HeaderMain>

      <UserContainer>
        <Name>Placeholder</Name>
        <UserImage>
          <img src={UserIcon} alt="User Icon" />
        </UserImage>
      </UserContainer>
    </HeaderContainer>
  );
}

export default Header;
