// react libraries //
import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// styled components //
const SidebarContainer = styled.div`
  background: #3f0e40;
`;

const WorkspaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
  height: 55px;

  color: white;
  border-bottom: 1px solid #532753;
`;

const WorkspaceName = styled.div``;

const NewMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 35px;
  height: 35px;

  background-color: white;
  border-radius: 50%;
  color: #3f0e40;
  fill: #3f0e40;

  cursor: pointer;
`;

// component //
function Sidebar() {
  return (
    <SidebarContainer>
      <WorkspaceContainer>
        <WorkspaceName>Workspace Name</WorkspaceName>
        <NewMessage>
          <AddCircleOutlineIcon />
        </NewMessage>
      </WorkspaceContainer>
    </SidebarContainer>
  );
}

export default Sidebar;
