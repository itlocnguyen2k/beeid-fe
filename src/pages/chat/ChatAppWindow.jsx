import { useEffect, useRef } from "react";
import { AtSign, Image, Menu, MoreVertical, PhoneCall, Search, Send, Smile, Trash2, Video } from "react-feather";
import { Button, Card, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, Media, Row, UncontrolledDropdown } from "reactstrap";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import Avatar from "../../components/avatar/Avatar";
import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import { completeFilePath, completePhotoPath, formatDateToMonthShort, isObjEmpty } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { ckEditorConfig } from "../../configs/ckeditor/CkEditorConfig";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import { useAuth } from "../../hook/useAuth";
import ModalMention from "./ModalMention";
import { Fragment } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import ModalChatMember from "./ModalChatMember";
import ModalFile from "./ModalFile";

const ChatAppWindow = () => {
  const chatArea = useRef(null);
  const chatContext = useContext(ChatContext);
  const { auth } = useAuth();
  const { messageList, roomSelected, createMessage, updateMessage, getInputProps, getRootProps, files, onDelete, onDownload } = chatContext;
  const ChatWrapper = !isObjEmpty(roomSelected) ? PerfectScrollbar : "div";

  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showModalMention, setShowModalMention] = useState(false);
  const [showModalMember, setShowModalMember] = useState(false);
  const [showModalFile, setShowModalFile] = useState(false);
  const [isUpdateMessage, setUpdateMessage] = useState(false);
  const [message, setMessage] = useState({});
  const [messageReply, setMessageReply] = useState({});
  const [isReplyMessage, setReplyMessage] = useState(false);

  const toggleShowEmoji = useCallback(() => {
    setShowEmoji(!showEmoji);
  }, [showEmoji]);

  const toggleShowModalMember = useCallback(() => {
    setShowModalMember(!showModalMember);
  }, [showModalMember]);

  const toggleShowModalFile = useCallback(() => {
    setShowModalFile(!showModalFile);
  }, [showModalFile]);

  const toggleShowModalMention = useCallback(() => {
    setShowModalMention(!showModalMention);
  }, [showModalMention]);

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current);
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setContent(content + emoji);
  };

  const selectMention = (mention) => {
    setContent(content + "@" + mention);
  };

  useEffect(() => {
    if (!isObjEmpty(roomSelected)) {
      scrollToBottom();
    }
  }, [roomSelected]);

  const onEditMessage = useCallback((message) => {
    setContent(message.content);
    setMessage(message);
    setUpdateMessage(true);
    setReplyMessage(false);
  }, []);

  const onReplyMessage = useCallback((message) => {
    setMessageReply(message);
    setReplyMessage(true);
    setUpdateMessage(false);
  }, []);

  useEffect(() => {
    if (showEmoji) {
      setShowModalMention(false);
    }
  }, [showEmoji]);

  useEffect(() => {
    if (showModalMention) {
      setShowEmoji(false);
    }
  }, [showModalMention]);

  const funCallback = useCallback(() => {
    setContent("");
    setShowEmoji(false);
    setShowModalMention(false);
    setUpdateMessage(false);
    setReplyMessage(false);
    setMessageReply({});
  }, []);

  const renderChats = useMemo(() => {
    return messageList.map((message) => {
      const isMessageOfMe = message?.senders?._id === auth.account._id;
      return (
        <div
          key={message._id}
          className={classnames("chat", {
            "chat-left": !isMessageOfMe,
          })}
        >
          <div className="chat-avatar">
            {message?.senders?.avatar ? (
              <Avatar
                img={completePhotoPath(message?.senders?.avatar)}
                status={t(`account_status_mapping.${message?.senders?.status}`, { defaultValue: "" })}
              />
            ) : (
              <Avatar
                content={message?.senders?.fullName || "G"}
                initials
                status={t(`account_status_mapping.${message?.senders?.status}`, { defaultValue: "" })}
              />
            )}
          </div>

          <div className="chat-body">
            <div className="chat-content" style={{ padding: "0.3rem 1rem" }}>
              {message?.replies?.content && (
                <blockquote className="blockquote pl-1 border-left-primary border-left-3">
                  <footer className="blockquote-footer d-flex">
                    <cite
                      style={{ color: "#ffffff", paddingLeft: "5px" }}
                      dangerouslySetInnerHTML={{ __html: message?.replies?.content }}
                    />
                  </footer>
                </blockquote>
              )}
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
              {message.files.length > 0 ? (
                <Row className="mt-1">
                  {message.files.map((file) => (
                    <Col lg="12" className="mb-1" key={file._id}>
                      <Media className="d-flex align-items-center cursor-pointer file-item" onClick={() => onDownload(file)}>
                        <img
                          className="me-1"
                          src={window.location.origin + `/app-assets/images/file/${completeFilePath(file.fileName)}.svg`}
                          alt="pdf"
                          height="23"
                        />
                        <Media body>
                          {file.fileName} - {file.fileSize / 1000}kb
                        </Media>
                      </Media>
                    </Col>
                  ))}
                </Row>
              ) : null}
              {message.flagEdit === 1 && <small style={{ fontSize: "10px" }}>( đã chỉnh sửa )</small>}
            </div>
            <div className="chat-meta text-nowrap">
              <small className={`${isMessageOfMe ? "float-end" : "float-start"} mb-25 mt-50 px-1 chat-time`}>
                {formatDateToMonthShort(message.updatedAt)}
              </small>
            </div>
          </div>
          {isMessageOfMe && (
            <div className="float-end chat-action">
              <UncontrolledDropdown>
                <DropdownToggle tag="span" className="btn-icon" color="transparent" size="sm">
                  <MoreVertical size="18" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="div" onClick={() => onEditMessage(message)}>
                    Chỉnh sửa
                  </DropdownItem>
                  <DropdownItem tag="div" onClick={() => onReplyMessage(message)}>
                    Trả lời
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
        </div>
      );
    });
  }, [auth, messageList, t, onDownload, onEditMessage, onReplyMessage]);

  const renderFiles = useMemo(() => {
    return (
      <Row>
        {files.map((file) => (
          <Col lg="12" className="my-1 mx-1" key={file.lastModified}>
            <Media className="d-flex align-items-center">
              <img
                className="me-1"
                src={window.location.origin + `/app-assets/images/file/${completeFilePath(file.name)}.svg`}
                alt="pdf"
                height="23"
              />
              <Media body>
                {file.name} - {file.size / 1000}kb
              </Media>
              <Media body>
                <Trash2 size={14} className="mx-2" onClick={() => onDelete(file)} />
              </Media>
            </Media>
          </Col>
        ))}
      </Row>
    );
  }, [files, onDelete]);

  return (
    <section className="chat-app-window" style={{ height: "88vh", overflow: "hidden !important" }}>
      <div className="active-chat">
        <div className="chat-navbar">
          <header className="chat-header">
            <div className="d-flex align-items-center">
              <div className="sidebar-toggle d-block d-lg-none me-1">
                <Menu size={21} />
              </div>
              <AvatarGroup data={roomSelected.members || []} />
              <h6 className="mb-0 mx-1">{roomSelected.roomName}</h6>
            </div>
            <div className="d-flex align-items-center">
              <PhoneCall size={18} className="cursor-pointer d-sm-block d-none me-1" />
              <Video size={18} className="cursor-pointer d-sm-block d-none me-1" />
              <Search size={18} className="cursor-pointer d-sm-block d-none" />
              <UncontrolledDropdown>
                <DropdownToggle className="btn-icon" color="transparent" size="sm">
                  <MoreVertical size="18" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="div" onClick={toggleShowModalMember}>
                    Thêm thành viên
                  </DropdownItem>
                  <DropdownItem tag="div" onClick={toggleShowModalFile}>
                    Tài liệu
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </header>
        </div>
        <ChatWrapper ref={chatArea} className="user-chats" style={{ maxHeight: "57.5vh" }} options={{ wheelPropagation: false }}>
          {!isObjEmpty(roomSelected) ? <div className="chats">{renderChats}</div> : null}
        </ChatWrapper>
        <Form
          className="chat-app-form"
          onSubmit={
            isUpdateMessage
              ? handleSubmit(() => updateMessage({ messageId: message._id, content: content }, funCallback))
              : handleSubmit(() => createMessage({ content: content, replies: messageReply._id }, funCallback))
          }
        >
          <Controller
            render={({ field }) => (
              <CKEditor
                {...field}
                config={ckEditorConfig}
                data={content}
                editor={Editor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                onFocus={() => {
                  setShowEmoji(false);
                  setShowModalMention(false);
                }}
              />
            )}
            name="content"
            control={control}
            type="text"
          />
          {!isObjEmpty(messageReply) && (
            <div className="image-picker">
              <Card>
                <Row>
                  <Col sm="12" className="mx-1 mt-1">
                    <blockquote className="blockquote pl-1 border-left-primary border-left-3">
                      <footer className="blockquote-footer d-flex">
                        <cite style={{ color: "#ffffff", paddingLeft: "5px" }} dangerouslySetInnerHTML={{ __html: messageReply.content }} />
                      </footer>
                    </blockquote>
                  </Col>
                </Row>
              </Card>
            </div>
          )}
          {showEmoji && (
            <span className="emoji-picker">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </span>
          )}
          {showModalMention && (
            <span className="mention-picker">
              <ModalMention selectMention={selectMention} />
            </span>
          )}
          <div className="image-picker">
            <Card>{renderFiles}</Card>
          </div>
          <span className="emoji-symbol cursor-pointer" onClick={toggleShowEmoji}>
            <Smile size={20} />
          </span>
          <span className="assign-symbol cursor-pointer" onClick={toggleShowModalMention}>
            <AtSign size={20} />
          </span>
          <span className="image-symbol cursor-pointer" {...getRootProps()}>
            <input type="file" id="attach-doc" hidden {...getInputProps()} />
            <Image size={20} />
          </span>
          {isUpdateMessage && (
            <Fragment>
              <Button type="submit" className="edit mx-1" color="primary">
                <Send size={14} className="d-lg-none" />
                <span className="d-none d-lg-block">Cập nhật</span>
              </Button>
              <Button type="button" className="btn-cancel-edit mx-1" color="secondary" onClick={funCallback}>
                <Send size={14} className="d-lg-none" />
                <span className="d-none d-lg-block">Hủy</span>
              </Button>
            </Fragment>
          )}
          {isReplyMessage && (
            <Fragment>
              <Button type="submit" className="reply mx-1" color="primary">
                <Send size={14} className="d-lg-none" />
                <span className="d-none d-lg-block">Trả lời</span>
              </Button>
              <Button type="button" className="btn-cancel-reply mx-1" color="secondary" onClick={funCallback}>
                <Send size={14} className="d-lg-none" />
                <span className="d-none d-lg-block">Hủy</span>
              </Button>
            </Fragment>
          )}
          {!isUpdateMessage && !isReplyMessage && (
            <Button type="submit" className="send mx-1" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Gửi</span>
            </Button>
          )}
        </Form>
      </div>
      {showModalMember && (
        <ModalComponent modal={showModalMember} toggle={toggleShowModalMember}>
          <ModalChatMember />
        </ModalComponent>
      )}
      {showModalFile && (
        <ModalComponent modal={showModalFile} toggle={toggleShowModalFile} customStyle="custom-modal-file-style">
          <ModalFile />
        </ModalComponent>
      )}
    </section>
  );
};
export default ChatAppWindow;
