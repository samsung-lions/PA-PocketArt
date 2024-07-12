import Image from 'next/image';

const ProfileForm = () => {
  const defaultImg = 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/avatars/default_profile.jpg';

  return (
    <div className="bg-[#ffD400] flex flex-col items-center relative w-80 p-8 rounded-3xl text-center shadow-lg">
      <div className="relative mb-6">
        <Image
          src={defaultImg}
          alt="프로필"
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-black shadow-xl"
        />
        <span className="material-symbols-outlined absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-[#ffD400] transition-colors">
          edit
        </span>
      </div>

      <p className="text-white text-xl font-semibold mb-4"> 닉네임</p>

      <div className="w-full bg-black rounded-lg p-4 mb-4">
        <form className="editProfile">
          <label className="text-white cursor-pointer flex items-center justify-center gap-2 hover:text-[#ffD400] transition-colors">
            <span className="material-symbols-outlined">add_a_photo</span>
            사진 선택
            <input type="file" className="hidden" />
          </label>
        </form>
      </div>

      <button
        type="button"
        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:text-[#ffD400] transition-colors"
      >
        저장
      </button>
    </div>
  );
};

export default ProfileForm;
