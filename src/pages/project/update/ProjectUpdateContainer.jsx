import _ from "lodash";
import { useReducer } from "react";
import { lazy, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PROJECTS_DETAIL_API, PROJECTS_UPDATE_API } from "../../../constants/api";
import ProjectContext from "../../../context/ProjectContext";
import { useHttp } from "../../../hook/useHttp";
import projectReducer, { initState, setMemberListExceptDataExist, setMemberSelectedList } from "../../../reducer/ProjectReducer";
import { useStore } from "../../../store/StoreHooks";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const ProjectUpdate = lazy(() => import("./ProjectUpdate"));

const ProjectUpdateContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const http = useHttp();
  const navigate = useNavigate();

  const [project, setProject] = useState({});
  const [storeState] = useStore();
  const [projectState, dispatch] = useReducer(projectReducer, initState);
  const { memberList, memberSelectedList } = projectState;

  const getDetailProject = useCallback(async () => {
    const parameters = {
      projectId: state?.projectId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, PROJECTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setProject(response.data.project);
        dispatch(setMemberSelectedList(response.data.project.members));
        dispatch(setMemberListExceptDataExist(storeState.memberOrgList, response.data.project.members));
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state, dispatch, storeState]);

  const onSubmit = useCallback(
    async (data, avatar) => {
      const form = new FormData();
      for (const [key, values] of Object.entries(_.omit(data, "sprints", "members"))) {
        if (values) {
          if (key === "category" || key === "status" || key === "mode") {
            form.append(key, values.value);
          } else {
            form.append(key, values);
          }
        }
      }
      if (memberSelectedList.length > 0) {
        memberSelectedList.forEach((member) => {
          form.append("members[]", member._id);
        });
      }
      form.append("projectId", state?.projectId);
      if (avatar) {
        form.append("file", avatar);
      }
      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, PROJECTS_UPDATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          navigate("/admin/projects");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, navigate, state, memberSelectedList],
  );

  useEffect(() => {
    getDetailProject();
  }, [getDetailProject]);

  return (
    <FormProvider {...methods}>
      <ProjectContext.Provider value={{ onSubmit, project, memberList, memberSelectedList, dispatch }}>
        <ProjectUpdate />
      </ProjectContext.Provider>
    </FormProvider>
  );
};
export default ProjectUpdateContainer;
