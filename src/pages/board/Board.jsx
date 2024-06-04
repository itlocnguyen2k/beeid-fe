import { Fragment, useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Bookmark, Edit, MoreVertical, Paperclip, Plus, Trash, Trash2 } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  CardBody,
  CardFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { progressColorMapping, toggleSweetConfirm } from "../../utils/helpers";
import PerfectScrollbar from "react-perfect-scrollbar";
import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import BackButton from "../../components/link/BackButton";
import { useAuth } from "../../hook/useAuth";
import { useTranslation } from "react-i18next";

const Board = (props) => {
  const { state } = useLocation();
  const { auth } = useAuth();
  const { t } = useTranslation();
  const { createColumnBoard, boardList, updateColumnBoard, onDelete } = props;

  const navigate = useNavigate();

  const renderBoards = useMemo(() => {
    return boardList.map((board) => (
      <Droppable droppableId={board._id} key={board._id}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="board-wrapper mx-1" style={{ minWidth: "300px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center board-header mb-1">
                <h5 className="text-uppercase fw-bolder">{board.boardTitle}</h5>
              </div>
              <UncontrolledDropdown>
                <DropdownToggle tag="span" className="btn-icon cursor-pointer" color="transparent" size="sm">
                  <MoreVertical size={16} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag="div"
                    className="d-flex align-items-center"
                    onClick={() =>
                      toggleSweetConfirm(
                        "Đổi tên cột",
                        "Đổi tên",
                        updateColumnBoard,
                        true,
                        "Vui lòng nhập tên cột thay thế",
                        board.boardTitle,
                        board._id,
                      )
                    }
                  >
                    <Edit size={16} className="me-1" />
                    <span>Đổi tên</span>
                  </DropdownItem>
                  <DropdownItem tag="div" className="d-flex align-items-center">
                    <Trash size={16} className="me-1" />
                    <span>Xóa</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="wrapper-overflow" style={{ maxHeight: "63.3vh" }}>
              <div className="tasks-wrapper board-todo">
                {board.tasks.map((task, idx) => (
                  <Draggable draggableId={task._id} key={task._id} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        className="card task cursor-pointer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardBody
                          className="py-1 board-item"
                          onClick={() => navigate("/admin/tasks/update", { state: { taskId: task._id, sprintId: state?.sprintId } })}
                        >
                          <span className="task-title fw-bolder">{task.taskTitle}</span>
                          <div dangerouslySetInnerHTML={{ __html: task.about }} className="mb-1 task-about" />
                          <div className="design-group mb-1">
                            <div className="d-flex justify-content-between">
                              <small style={{ marginLeft: "5px" }}>{task.progress || 0}%</small>
                              <small>{task.estimate || 0}h</small>
                            </div>
                            <Progress className="progress-sm" value={task.progress || 0} color={progressColorMapping(task.progress)} />
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <small>Phân công :</small>
                            {task.members && <AvatarGroup data={task.members} />}
                          </div>
                        </CardBody>
                        <CardFooter className="py-1">
                          <div className="d-flex align-items-center justify-content-between cursor-pointer">
                            <div className="design-group">
                              <div className="badge board-tag" style={{ backgroundColor: task.categories.color }}>
                                {task.categories.categoryName}
                              </div>
                              <span className="badge board-tag" style={{ backgroundColor: task.labels.color }}>
                                {task.labels.labelName}
                              </span>
                              <span className="badge board-tag" style={{ backgroundColor: task.priorities.color }}>
                                {task.priorities.priorityName}
                              </span>
                            </div>
                            <div>
                              <Bookmark size={14} className="me-25" id="task" />
                              <UncontrolledTooltip placement="top" target="task">
                                Số lượng công việc
                              </UncontrolledTooltip>
                              <span style={{ paddingRight: "5px" }}>{task.subtasks.length}</span>
                              <Paperclip size={14} className="me-25" id="file" />
                              <UncontrolledTooltip placement="top" target="file">
                                Số lượng File
                              </UncontrolledTooltip>
                              <span style={{ paddingRight: "5px" }}>{task.files.length}</span>
                              <Trash2
                                size={14}
                                className="me-25"
                                onClick={() =>
                                  toggleSweetConfirm(
                                    `Bạn có muốn xóa ${t(`category_delete_mapping.task`, { defaultValue: "" })} này`,
                                    "Đồng ý",
                                    () => onDelete(task),
                                    false,
                                  )
                                }
                                id="delete"
                              />
                              <UncontrolledTooltip placement="top" target="delete">
                                Xóa
                              </UncontrolledTooltip>
                            </div>
                          </div>
                        </CardFooter>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
            {auth.account.permission.taskCreate && (
              <Link to="/admin/tasks/create" state={{ boardId: board._id, sprintId: state?.sprintId }} className="btn-sm btn-link mt-1">
                <Plus size={12} />
                <span className="align-middle ms-25">Thêm mới</span>
              </Link>
            )}
          </div>
        )}
      </Droppable>
    ));
  }, [boardList, state, navigate, auth, updateColumnBoard, onDelete, t]);
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Danh sách công việc" breadCrumbParent="công việc" breadCrumbActive="Danh sách công việc">
        <BackButton />
      </Breadcrumbs>
      <PerfectScrollbar>
        <div className="kanban-application">
          <div className="app-kanban-wrapper" style={{ minHeight: "82vh", maxHeight: "82vh" }}>
            {renderBoards}
            <div className="ms-1" style={{ minWidth: 150 }}>
              <Button
                type="button"
                color="flat-secondary"
                className="btn-sm"
                onClick={() => toggleSweetConfirm("Vui lòng nhập tên cột", "Thêm mới", createColumnBoard, true)}
              >
                <Plus size={12} />
                <span className="align-middle ms-25">Thêm mới cột</span>
              </Button>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    </Fragment>
  );
};
export default Board;
