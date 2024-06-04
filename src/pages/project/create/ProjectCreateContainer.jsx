import { useEffect } from "react";
import { useReducer } from "react";
import { lazy, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PROJECTS_CREATE_API } from "../../../constants/api";
import ProjectContext from "../../../context/ProjectContext";
import { useHttp } from "../../../hook/useHttp";
import projectReducer, { initState, setMemberList } from "../../../reducer/ProjectReducer";
import { useStore } from "../../../store/StoreHooks";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";

const ProjectCreate = lazy(() => import("./ProjectCreate"));

const ProjectCreateContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
    defaultValues: {
      category: { value: "1", label: "Outsource" },
      status: { value: "1", label: "Đang hoạt động" },
      mode: { value: "1", label: "Bảo mật" },
    },
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();
  const [storeState] = useStore();
  const [projectState, dispatch] = useReducer(projectReducer, initState);
  const { memberList, memberSelectedList } = projectState;

  const onSubmit = useCallback(
    async (avatar) => {
      const form = new FormData();
      const data = getValues();
      for (const [key, values] of Object.entries(data)) {
        if (values) {
          if (key === "category" || key === "status" || key === "mode") {
            form.append(key, values.value);
          } else {
            form.append(key, values);
          }
        }
      }
      if (avatar) {
        form.append("file", avatar);
      }
      if (memberSelectedList.length > 0) {
        memberSelectedList.forEach((member) => {
          form.append("members[]", member._id);
        });
      }

      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, PROJECTS_CREATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          navigate("/admin/projects");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [getValues, http, navigate, memberSelectedList],
  );

  useEffect(() => {
    dispatch(setMemberList(storeState.memberOrgList));
  }, [dispatch, storeState]);

  return (
    <FormProvider {...methods}>
      <ProjectContext.Provider value={{ onSubmit, memberList, memberSelectedList, dispatch }}>
        <ProjectCreate />
      </ProjectContext.Provider>
    </FormProvider>
  );
};
export default ProjectCreateContainer;
