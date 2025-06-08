import { Mail, User } from "lucide-react";

import { useEffect, useState } from "react";
import { getUser } from "../../store/thunks/authThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const ProfileContainer = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    } else {
      setProfile({
        username: user.username,
        email: user.email,
      });
    }
  }, [dispatch, user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Профиль жөндөөлөрү</h1>
      <div className="flex gap-4 mb-8 border-b">
        <button
          className={`pb-4 px-4 ${
            activeTab === "profile"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Жеке маалымат
        </button>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Толук аты-жөнү
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                defaultValue={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Электрондук почта
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end"></div>
      </form>
    </div>
  );
};
export default ProfileContainer;
