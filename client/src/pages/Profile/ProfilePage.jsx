/* eslint-disable react/prop-types */

import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
// import StudentProfile from './StudentProfile';
// import InstructorProfile from './InstructorProfile';
// import AdminProfile from './AdminProfile';
import UpdateProfileForm from './UpdateProfileForm';

const ProfilePage = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const { role, name, bio, profilePicture } = currentUser;
  console.log(currentUser);
  const handleProfileUpdate = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
    console.log('Updated Profile Data:', updatedData);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader
          name={name}
          role={role}
          bio={bio}
          profilePicture={profilePicture}
        />
{/* 
        {role === 'student' && <StudentProfile courses={currentUser.courses} />}
        {role === 'instructor' && (
          <InstructorProfile createdCourses={currentUser.createdCourses} />
        )}
        {role === 'admin' && <AdminProfile stats={currentUser.stats} />} */}

        <UpdateProfileForm user={currentUser} onUpdate={handleProfileUpdate} />
      </div>
    </div>
  );
};

export default ProfilePage;
