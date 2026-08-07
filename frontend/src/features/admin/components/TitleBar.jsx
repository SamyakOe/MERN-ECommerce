
import Profile from "../../../components/Profile";

function TitleBar({ title }) {
  
  return (
    <div className="sticky z-10 top-0 flex items-center justify-between bg-white border-b border-neutral-200 w-full py-5 px-5 font-medium shadow-lg shadow-neutral-50">
      {title}
      <div className="flex gap-4">
        <Profile/>
      </div>
    </div>
  );
}

export default TitleBar;
