import { LikePokemon } from '@/components/LikePokemon/LikePokemon';
import MyContent from '@/components/Mycontent/MyContent';
import ProfileForm from '@/components/MyProfile/MyProfile';
import Page from '@/components/Page';

const MyPage = () => {
  return (
    <Page title="My Page" hasBackButton>
      <div className="flex flex-col w-full gap-y-20 my-8 justify-center">
        <div className="flex justify-center gap-x-8">
          <ProfileForm />
          <LikePokemon />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[#ffD400] text-3xl font-bold mb-6 text-center">Fan Arts</h2>
          <MyContent />
        </div>
      </div>
    </Page>
  );
};

export default MyPage;
