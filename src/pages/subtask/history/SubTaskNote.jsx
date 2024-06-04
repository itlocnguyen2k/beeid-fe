import { Fragment, useCallback, useMemo, useState } from "react";
import { ArrowLeft, Check, MoreHorizontal, Trash2 } from "react-feather";
import { useFormContext } from "react-hook-form";
import { Button, Card, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, Media, Row, UncontrolledDropdown } from "reactstrap";
import Avatar from "../../../components/avatar/Avatar";
import CkEditor from "../../../components/ckeditor/CkEditor";
import { completeFilePath, completePhotoPath, formatDateToMonthShort } from "../../../utils/helpers";

const SubTaskNote = (props) => {
  const { logsList, getInputProps, getRootProps, files, onDelete, onSubmit, onDownload, updateNote } = props;
  const { handleSubmit, getValues, setValue } = useFormContext({
    mode: "all",
    reValidateMode: "all",
  });

  const [isUpdateNote, setUpdateNote] = useState(false);
  const [isReplyNote, setReplyNote] = useState(false);
  const [noteItem, setNoteItem] = useState({});

  const toggleUpdateNote = useCallback(
    (notes) => {
      setValue("note", notes.note);
      setNoteItem(notes);
      setUpdateNote(true);
    },
    [setValue],
  );

  const toggleReplyNote = useCallback(
    (notes) => {
      setValue("note", "");
      setNoteItem(notes);
      setUpdateNote(false);
      setReplyNote(true);
    },
    [setValue],
  );

  const clearEvent = useCallback(() => {
    setUpdateNote(false);
    setReplyNote(false);
    setValue("note", "");
  }, [setValue]);

  const noteData = useMemo(() => {
    if (logsList.length > 0) {
      return logsList.map((log) => {
        if (log.type === 2) {
          return (
            <Fragment>
              {log?.notes?.notes?.note && (
                <Card className="reply-area">
                  <Row>
                    <Col sm="12" className="mx-1 my-1">
                      <blockquote className="blockquote pl-1 border-left-primary border-left-3">
                        <footer className="blockquote-footer d-flex">
                          <cite
                            style={{ color: "#ffffff", paddingLeft: "5px" }}
                            dangerouslySetInnerHTML={{ __html: log?.notes?.notes?.note }}
                          />
                        </footer>
                      </blockquote>
                    </Col>
                  </Row>
                </Card>
              )}
              <li className="timeline-item">
                <span className="timeline-point">
                  <Avatar img={completePhotoPath(log.author.avatar)} />
                </span>
                <div className="timeline-event">
                  <div className="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                    <h6>{log.author.fullName}</h6>
                    <div className="d-flex align-items-center cursor-pointer">
                      <span className="timeline-event-time mx-1">{formatDateToMonthShort(log.createdAt)}</span>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="span" className="btn-icon" color="transparent" size="sm">
                          <MoreHorizontal size="18" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag="div" onClick={() => toggleUpdateNote(log.notes)}>
                            Chỉnh sửa
                          </DropdownItem>
                          <DropdownItem tag="div" onClick={() => toggleReplyNote(log.notes)}>
                            Trả lời
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <div dangerouslySetInnerHTML={{ __html: log.notes.note }} />
                  </div>
                  {log.notes.flagEdit === 1 && <small style={{ fontSize: "10px" }}>( đã chỉnh sửa )</small>}
                  {log.notes.files.length > 0 ? (
                    <Row className="mt-0">
                      {log.notes.files.map((file) => (
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
                </div>
              </li>
            </Fragment>
          );
        } else {
          return null;
        }
      });
    }
  }, [logsList, onDownload, toggleUpdateNote, toggleReplyNote]);

  const renderNoteItem = useMemo(() => {
    return (
      <Card className="reply-area">
        <Row>
          <Col sm="12" className="mx-1 my-1">
            <blockquote className="blockquote pl-1 border-left-primary border-left-3">
              <footer className="blockquote-footer d-flex">
                <cite style={{ color: "#ffffff", paddingLeft: "5px" }} dangerouslySetInnerHTML={{ __html: noteItem.note }} />
              </footer>
            </blockquote>
          </Col>
        </Row>
      </Card>
    );
  }, [noteItem]);

  const renderFiles = useMemo(() => {
    return (
      <Row>
        {files.map((file) => (
          <Col lg="12" className="mb-1" key={file.lastModified}>
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
    <Form
      onSubmit={handleSubmit(() =>
        isUpdateNote
          ? updateNote({ note: getValues("note"), noteId: noteItem._id })
          : onSubmit({ note: getValues("note"), notes: noteItem._id }),
      )}
      className="note-app-form"
    >
      <ul className="timeline">{noteData}</ul>
      <Row className="note-input">
        <Col className="mb-1" md="12">
          <CkEditor name="note" label="Ghi chú :" />
        </Col>
        {isReplyNote && <div className="note-reply">{renderNoteItem}</div>}
        <Col md="12" className="mb-1">
          <div className="dropzone dropzone-area cursor-pointer" id="dpz-multiple-files" {...getRootProps()}>
            <input type="file" id="attach-doc" hidden {...getInputProps()} />
            <div className="dz-message">Drop files here or click to upload.</div>
          </div>
        </Col>
        <Col md="12">
          <div className="mx-2">{renderFiles}</div>
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-2 mb-2">
        {!isUpdateNote && !isReplyNote && (
          <Fragment>
            <Button color="secondary" className="btn-prev" outline>
              <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none mx-2">Hủy</span>
            </Button>
            <Button color="primary" className="btn-next" type="submit">
              <span className="align-middle d-sm-inline-block d-none mx-2">Thêm mới</span>
              <Check size={14} className="align-middle ml-sm-25 ml-0" />
            </Button>
          </Fragment>
        )}
        {isUpdateNote && (
          <Fragment>
            <Button color="secondary" className="btn-prev" type="button" outline onClick={clearEvent}>
              <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none mx-2">Hủy</span>
            </Button>
            <Button color="primary" className="btn-next" type="submit">
              <span className="align-middle d-sm-inline-block d-none mx-2">Cập nhật</span>
              <Check size={14} className="align-middle ml-sm-25 ml-0" />
            </Button>
          </Fragment>
        )}
        {isReplyNote && (
          <Fragment>
            <Button color="secondary" className="btn-prev" type="button" outline onClick={clearEvent}>
              <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none mx-2">Hủy</span>
            </Button>
            <Button color="primary" className="btn-next" type="submit">
              <span className="align-middle d-sm-inline-block d-none mx-2">Trả lời</span>
              <Check size={14} className="align-middle ml-sm-25 ml-0" />
            </Button>
          </Fragment>
        )}
      </div>
    </Form>
  );
};
export default SubTaskNote;
