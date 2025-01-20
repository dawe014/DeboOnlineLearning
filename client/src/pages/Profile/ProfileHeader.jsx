/* eslint-disable react/prop-types */

const ProfileHeader = ({
  name,
  role,
  bio = 'Anything you can do I can do better',
  profilePicture,
}) => {
  console.log(profilePicture);
  return (
    <div className="flex flex-col items-center bg-slate-800 text-white rounded-lg mt-12 shadow-md p-6 max-w-3xl mx-auto">
      <img
        className="w-24 h-24 rounded-full mb-4"
        src={`http://localhost:3000/api/v1/images/profile_pictures/${profilePicture}`}
        alt="Profile"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-300">{role}</p>
      <p className="text-gray-400 mt-2 text-center">{bio}</p>
    </div>
  );
};

export default ProfileHeader;
