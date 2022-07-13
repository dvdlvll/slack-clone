// react libraries //
import React from "react";
import styled from "styled-components";

// styled components //
const Container = styled.div;

function Header() {
  return (
    <Container>
      <SearchbarContainer></SearchbarContainer>
      {/* <UserContainer></UserContainer> */}
    </Container>
  );
}

export default Header;
