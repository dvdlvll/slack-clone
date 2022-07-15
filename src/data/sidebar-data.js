import MessageIcon from "@mui/icons-material/Message";
import InboxIcon from "@mui/icons-material/Inbox";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";

export const sidebarItems = [
  {
    icon: <MessageIcon />,
    text: "Threads",
  },
  {
    icon: <InboxIcon />,
    text: "Direct Messages",
  },
  {
    icon: <AlternateEmailIcon />,
    text: "Mentions & Reactions",
  },
  {
    icon: <BookmarkBorderIcon />,
    text: "Saved Items",
  },
  {
    icon: <PeopleIcon />,
    text: "Peoples & Groups",
  },
  {
    icon: <AppsIcon />,
    text: "More",
  },
];
