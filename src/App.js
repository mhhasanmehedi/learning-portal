import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Route controllers
import AdminPrivateRoute from "./admin/components/AdminPrivateRoute";
import AdminPublicRoute from "./admin/components/AdminPublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// Admin pages
import AdminAssignment from "./admin/pages/assignments/AdminAssignment";
import AddAssignment from "./admin/pages/assignments/AddAssignment";
import EditAssignment from "./admin/pages/assignments/EditAssignment";
import AdminVideos from "./admin/pages/videos/AdminVideos";
import AddVideo from "./admin/pages/videos/AddVideo";
import EditVideo from "./admin/pages/videos/EditVideo";
import AdminAssignmentMark from "./admin/pages/assignmentMark/AdminAssignmentMark";
import AdminQuiz from "./admin/pages/quiz/AdminQuiz";
import AddQuiz from "./admin/pages/quiz/AddQuiz";
import EditQuiz from "./admin/pages/quiz/EditQuiz";
import Dashboard from "./admin/pages/Dashboard";
import AdminLogin from "./admin/pages/AdminLogin";

// Student Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderborad from "./pages/Leaderborad";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";

import useAuthCheck from "./hooks/useAuthCheck";
import { useGetVideosQuery } from "./features/videos/videosApi";

function App() {
  const { data: videos, isSuccess } = useGetVideosQuery();
  const id = isSuccess && videos && videos[0]?.id;

  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking Authentication...</div>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/videos"></Navigate>} />
        {id && (
          <Route
            path="/videos"
            element={<Navigate to={`/videos/${id}`}></Navigate>}
          />
        )}

        {/* Student Private Routes */}
        <Route
          path="/videos/:id"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderborad />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        {/* Student Public Route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Admin Public Route */}
        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />

        {/* Admin Private Route */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <AdminVideos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/add"
          element={
            <AdminPrivateRoute>
              <AddVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/edit/:id"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              <AdminQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/add"
          element={
            <AdminPrivateRoute>
              <AddQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/edit/:id"
          element={
            <AdminPrivateRoute>
              <EditQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignments"
          element={
            <AdminPrivateRoute>
              <AdminAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignments/add"
          element={
            <AdminPrivateRoute>
              <AddAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignments/edit/:id"
          element={
            <AdminPrivateRoute>
              <EditAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment_mark"
          element={
            <AdminPrivateRoute>
              <AdminAssignmentMark />
            </AdminPrivateRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
