import { Fragment } from "react";
import { Card } from "reactstrap";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import ChatAppWindow from "./ChatAppWindow";

const Chat = () => {
  return (
    <Fragment>
      <Card className="chat-application" style={{ marginBottom: "0px" }}>
        <div className="content-area-wrapper p-0">
          <SidebarLeft />
          <div className="content-right">
            <div className="content-wrapper container-xxl p-0">
              <div className="content-header row"></div>
              <div className="content-body">
                <div className="body-content-overlay" />
                <ChatAppWindow />
                <SidebarRight />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};
export default Chat;
