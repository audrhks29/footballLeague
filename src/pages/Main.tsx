import { memo } from 'react';
import { useNavigate } from 'react-router-dom';


const MainText = [
  { id: 1, text: "You Can Check Leagues Rankings By Years", link: "/standings/eng.1/2023" },
  { id: 2, text: "You Can Check Leagues News", link: "/news/eng.1/page=1" },
  { id: 3, text: "You Can Check Teams by League", link: "/teams" },
  { id: 4, text: "You Can Check Match by Teams In TeamInfo > MatchResult", link: "/teams/eng.1/362" },
  { id: 5, text: "You Can Check Player's Simple Data In TeamInfo > Squad", link: "/teams/eng.1/362" },
]
const Main = memo(() => {
  const navigate = useNavigate()

  const goToPage = (link: string) => {
    navigate(link)
  }

  return (
    <div className="bg-[url('images/background/bg.jpg')] h-screen bg-no-repeat bg-cover">

      <div className='inner'>
        <h2 className='text-[60px] text-center'>Check out the simple soccer data!</h2>
        <div className='pt-[30px]'>
          {MainText.map((item, index) => (
            <div
              className='border border-hoverColor p-3 rounded-2xl bg-[#343434] flex items-center mb-[20px] bg-opacity-80 cursor-pointer hover:translate-x-6 transition-all'
              key={index}
              onClick={() => goToPage(item.link)}
            >
              <p className='text-[50px] text-center w-[200px]'>{item.id}</p>
              <p className='text-[30px]'>{item.text}</p>
            </div>
          ))}

        </div>
      </div>
    </div >
  );
});

export default Main;