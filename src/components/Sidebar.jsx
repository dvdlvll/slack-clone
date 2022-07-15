// react libraries //
import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";

// data //
import { sidebarItems } from "../data/sidebar-data";
import { channelItems } from "../data/channel-data";

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

const MainChannels = styled.div`
  padding: 10px 0;
`;

const MainChannelItem = styled.div`
  display: grid;
  grid-template-columns: 15% auto;
  align-items: center;

  height: 30px;
  padding: 5px 10px;

  color: rgb(188, 171, 188);

  cursor: pointer;

  :hover {
    background: #350d36;
  }

  transition: 0.3s ease;
`;

const ChannelsContainer = styled.div`
  color: rgb(188, 171, 188);
`;

const NewChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 20px;
  padding: 10px 10px;
`;

const ChannelsList = styled.div`
  padding: 10px 0;
`;

const Channel = styled.div`
  display: grid;
  grid-template-columns: 15% auto;
  align-items: center;

  height: 25px;
  padding-left: 10px;

  color: rgb(188, 171, 188);

  cursor: pointer;

  :hover {
    background: #350d36;
  }

  transition: 0.3s ease;
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

      <MainChannels>
        {sidebarItems.map((item) => (
          <MainChannelItem>
            {item.icon}
            {item.text}
          </MainChannelItem>
        ))}
      </MainChannels>

      <ChannelsContainer>
        <NewChannelContainer>
          <div>Channels</div>
          <AddIcon />
        </NewChannelContainer>

        <ChannelsList>
          {channelItems.map((item) => (
            <Channel>
              {item.icon}
              {item.text}
            </Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
    </SidebarContainer>
  );
}

export default Sidebar;
