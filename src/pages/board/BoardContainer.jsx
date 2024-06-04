import { lazy, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BOARDS_CHANGE_API, BOARDS_CREATE_API, BOARDS_UPDATE_API, SPRINTS_DETAIL_API, TASKS_DELETE_API } from "../../constants/api";
import { useHttp } from "../../hook/useHttp";
import { createParametersRequest } from "../../utils/sessionStorageHelper";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";
import { DragDropContext } from "react-beautiful-dnd";

const Board = lazy(() => import("./Board"));

const BoardContainer = () => {
  const { state } = useLocation();
  const http = useHttp();

  const [boardList, setBoardList] = useState([]);

  const getDetailSprint = useCallback(async () => {
    const parameters = {
      sprintId: state?.sprintId,
    };

    try {
      const response = await getResponseFromServerWithParameters(http, SPRINTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setBoardList(response.data.sprint.boards);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  const createColumnBoard = useCallback(
    async (boardTitle) => {
      const parameters = {
        id: state?.sprintId,
        boardTitle: boardTitle,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, BOARDS_CREATE_API, createParametersRequest(parameters));
        if (response.data) {
          await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
          getDetailSprint();
        } else {
          toggleSweetAlert("Thông báo", response.message, "error");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [state, http, getDetailSprint],
  );

  const updateColumnBoard = useCallback(
    async (boardId, boardTitle) => {
      const parameters = {
        boardId: boardId,
        boardTitle: boardTitle,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, BOARDS_UPDATE_API, createParametersRequest(parameters));
        if (response.data) {
          await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
          getDetailSprint();
        } else {
          toggleSweetAlert("Thông báo", response.message, "error");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, getDetailSprint],
  );

  const onDelete = useCallback(
    async (task) => {
      const parameters = {
        taskId: task._id,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, TASKS_DELETE_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const changeBoard = useCallback(
    async (sId, dId, taskId) => {
      const parameters = {
        sId: sId,
        dId: dId,
        taskId: taskId,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, BOARDS_CHANGE_API, createParametersRequest(parameters));
        if (response) {
          getDetailSprint();
        } else {
          toggleSweetAlert("Thông báo", response.message, "error");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [getDetailSprint, http],
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    if (!destination || sInd === dInd) {
      return;
    }
    const taskId = boardList.find((item) => item._id === source.droppableId).tasks[source.index]._id;
    changeBoard(sInd, dInd, taskId);
  };

  useEffect(() => {
    getDetailSprint();
  }, [getDetailSprint]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board createColumnBoard={createColumnBoard} boardList={boardList} updateColumnBoard={updateColumnBoard} onDelete={onDelete} />
    </DragDropContext>
  );
};
export default BoardContainer;
