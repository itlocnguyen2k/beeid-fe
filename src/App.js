import { useState } from "react";
import { lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { socket, SocketContext } from "./context/SocketContext";
import { AuthContext } from "./hook/useAuth";
import AdminLayoutContainer from "./layouts/admin/AdminLayoutContainer";
import DefaultLayout from "./layouts/default/DefaultLayout";
import StoreProvider from "./store/StoreProvider";
import { getAccountInfo } from "./utils/sessionStorageHelper";

const LoginContainer = lazy(() => import("./pages/login/LoginContainer"));
const VerifyLoginCodeContainer = lazy(() => import("./pages/code/login/VerifyLoginCodeContainer"));
const VerifyPasswordCodeContainer = lazy(() => import("./pages/code/password/VerifyPasswordCodeContainer"));
const ResetPasswordContainer = lazy(() => import("./pages/password/reset/ResetPasswordContainer"));
const ChangPasswordFirstTimeContainer = lazy(() => import("./pages/password/change/ChangePasswordFirstTimeContainer"));
const HomeContainer = lazy(() => import("./pages/home/HomeContainer"));
const AccountListContainer = lazy(() => import("./pages/account/list/AccountListContainer"));
const AccountCreateContainer = lazy(() => import("./pages/account/create/AccountCreateContainer"));
const AccountUpdateContainer = lazy(() => import("./pages/account/update/AccountUpdateContainer"));
const ChatContainer = lazy(() => import("./pages/chat/ChatContainer"));
const MeetingSettingContainer = lazy(() => import("./pages/meeting/setting/MeetingSettingContainer"));
const SprintListContainer = lazy(() => import("./pages/sprint/list/SprintListContainer"));
const SprintCreateContainer = lazy(() => import("./pages/sprint/create/SprintCreateContainer"));
const SprintUpdateContainer = lazy(() => import("./pages/sprint/update/SprintUpdateContainer"));
const SprintProgressContainer = lazy(() => import("./pages/sprint/progress/SprintProgressContainer"));
const CalendarContainer = lazy(() => import("./pages/calendar/CalendarAppContainer"));
const SettingContainer = lazy(() => import("./pages/setting/SettingContainer"));
const BoardContainer = lazy(() => import("./pages/board/BoardContainer"));
const TaskCreateContainer = lazy(() => import("./pages/task/create/TaskCreateContainer"));
const TaskUpdateContainer = lazy(() => import("./pages/task/update/TaskUpdateContainer"));
const ProjectListContainer = lazy(() => import("./pages/project/list/ProjectListContainer"));
const ProjectCreateContainer = lazy(() => import("./pages/project/create/ProjectCreateContainer"));
const ProjectUpdateContainer = lazy(() => import("./pages/project/update/ProjectUpdateContainer"));
const SubTaskListContainer = lazy(() => import("./pages/subtask/list/SubTaskListContainer"));
const SubTaskCreateContainer = lazy(() => import("./pages/subtask/create/SubTaskCreateContainer"));
const SubTaskUpdateContainer = lazy(() => import("./pages/subtask/update/SubTaskUpdateContainer"));
const TrashListContainer = lazy(() => import("./pages/trash/TrashListContainer"));
const ReportListContainer = lazy(() => import("./pages/report/ReportListContainer"));

function App() {
  const account = getAccountInfo();

  const [auth, setAuth] = useState({ account, isAuthenticated: !!account });
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      <SocketContext.Provider value={socket}>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="login" element={<LoginContainer />} />
              <Route path="verify-login-code" element={<VerifyLoginCodeContainer />} />
              <Route path="change-password-first-time" element={<ChangPasswordFirstTimeContainer />} />
              <Route path="reset-password" element={<ResetPasswordContainer />} />
              <Route path="verify-password-code" element={<VerifyPasswordCodeContainer />} />
            </Route>
            <Route path="/admin" element={<AdminLayoutContainer />}>
              <Route index element={<HomeContainer />} />
              <Route path="accounts" element={<Outlet />}>
                <Route index element={<AccountListContainer />} />
                <Route path="create" element={<AccountCreateContainer />} />
                <Route path="update" element={<AccountUpdateContainer />} />
              </Route>
              <Route path="chat" element={<Outlet />}>
                <Route index element={<ChatContainer />} />
              </Route>
              <Route path="meeting" element={<Outlet />}>
                <Route index element={<MeetingSettingContainer />} />
              </Route>
              <Route path="trash" element={<Outlet />}>
                <Route index element={<TrashListContainer />} />
              </Route>
              <Route path="report" element={<Outlet />}>
                <Route index element={<ReportListContainer />} />
              </Route>
              <Route path="projects" element={<Outlet />}>
                <Route index element={<ProjectListContainer />} />
                <Route path="create" element={<ProjectCreateContainer />} />
                <Route path="update" element={<ProjectUpdateContainer />} />
              </Route>
              <Route path="sprints" element={<Outlet />}>
                <Route index element={<SprintListContainer />} />
                <Route path="create" element={<SprintCreateContainer />} />
                <Route path="update" element={<SprintUpdateContainer />} />
                <Route path="progress" element={<SprintProgressContainer />} />
              </Route>
              <Route path="calendars" element={<Outlet />}>
                <Route index element={<CalendarContainer />} />
              </Route>
              <Route path="settings" element={<Outlet />}>
                <Route index element={<SettingContainer />} />
              </Route>
              <Route path="boards" element={<Outlet />}>
                <Route index element={<BoardContainer />} />
              </Route>
              <Route path="tasks" element={<Outlet />}>
                <Route path="create" element={<TaskCreateContainer />} />
                <Route path="update" element={<TaskUpdateContainer />} />
              </Route>
              <Route path="sub-tasks" element={<Outlet />}>
                <Route index element={<SubTaskListContainer />} />
                <Route path="create" element={<SubTaskCreateContainer />} />
                <Route path="update" element={<SubTaskUpdateContainer />} />
              </Route>
            </Route>
          </Routes>
        </StoreProvider>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
