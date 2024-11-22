import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import CoursePage from './pages/CoursePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CourseCard from './components/CourseCard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import MyCourse from './pages/StudentDashboard/MyCourse';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import CreateCourse from './components/CreateCourse';
import Statistic from './components/Statistic';
import EnrolledStudents from './pages/InstructorDashboard/EnrolledStudents';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManageCourses from './components/ManageCourses';
import ManageUsers from './pages/AdminDashboard/ManageUsers';
import ManageLessons from './components/ManageLessons';
import ManageContents from './components/ManageContents';
import AddContent from './components/AddContent';
import UpdateUser from './pages/AdminDashboard/UpdateUser';
import EditContent from './components/EditContent';
import EditCourse from './components/EditCourse';
import OpenCourse from './pages/StudentDashboard/OpenCourse';
import DisplayContent from './pages/StudentDashboard/DisplayContent';
// import SignupPage from './pages/SignupPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<StudentDashboard />}>
          <Route path="mycourse" element={<MyCourse />} />
          <Route path="courses" element={<CourseCard />} />
        </Route>
        <Route path="/dashboard/courses/:courseId" element={<OpenCourse />}>
          <Route path="lesson/:id" element={<DisplayContent />} />
          <Route path="courses" element={<CourseCard />} />
        </Route>
        <Route path="/dashboardinst" element={<InstructorDashboard />}>
          <Route index element={<Statistic />} />
          <Route path="my-courses" element={<ManageCourses />} />
          <Route path="course" element={<ManageLessons />} />
          <Route path="course/content" element={<ManageContents />} />
          <Route path="course/content/add-content" element={<AddContent />} />
         

          <Route path="create-course" element={<CreateCourse />} />
          <Route path="enrolled-students" element={<EnrolledStudents />} />
        </Route>
        <Route path="/dashboardadmin" element={<AdminDashboard />}>
          <Route index element={<Statistic />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="manage-courses/edit-course" element={<EditCourse />} />
          <Route path="course/:id" element={<ManageLessons />} />
          <Route
            path="course/lessons/:lessonId/contents"
            element={<ManageContents />}
          >
            <Route path="add-content" element={<AddContent />} />
            <Route path="edit-content/:id" element={<EditContent />} />
          </Route>
          <Route path="course/content/add-content" element={<AddContent />} />
          <Route
            path="contents/edit-content/:contentId"
            element={<EditContent />}
          />

          <Route path="create-course" element={<CreateCourse />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-users/user-id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

  export default AppRoutes;
