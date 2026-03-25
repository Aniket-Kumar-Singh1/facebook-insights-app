import './UserProfile.css';

function UserProfile({ user }) {
  if (!user) return null;

  const picUrl = user.picture?.data?.url;

  return (
    <div className="user-profile">
      {picUrl && <img src={picUrl} alt={user.name} className="user-avatar" />}
      <div>
        <p className="user-name">{user.name}</p>
        <p className="user-id">ID: {user.id}</p>
      </div>
    </div>
  );
}

export default UserProfile;
