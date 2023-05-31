import './App.css';
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
function App() {
  const [ring,setRing]=useState(0)
  const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
  const [cookies, setCookie, removeCookie] = useCookies(['uniqueNo']);
  const [score,setScore]=useState(0);
  const [seconds, setSeconds] = useState(120);
  const [flag,setflag]=useState(false)
  const [records,setRecords]=useState([])



  useEffect(() => {
    if (seconds > 0 && flag===true) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds,flag]);

  
  useEffect(() => {
    const RemoveCookieHandler=()=>{
       removeCookie('uniqueNo');
       window.location.reload();
    }
    const timeout = setTimeout(RemoveCookieHandler, 155000);
    return () => clearTimeout(timeout);
  }, []);

  const scoreHandler=async (e,value)=>{
    e.stopPropagation();
    const {uniqueNo}=cookies;
    setRing(value)
    audio.play()
    const data={score:value,uniqueNo:uniqueNo || ''};
    fetch('http://localhost:8000/score',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Additional headers if needed
      },
      body: JSON.stringify(data),
    })
    .then((data)=>data.json())
    .then((data)=>{
      console.log(data)
      if(data?.uniqueNo){
        setCookie('uniqueNo', data?.uniqueNo, { maxAge: 120 });
        setflag(data?.flag)
        setScore(data?.score)
      }else{
        setScore(data?.score)
        console.log(data?.scores)
        setRecords(data?.scoresRecord)
      }

    })

  }

  return (
    <section className='flex justify-center items-center h-full flex flex-col'>
      <div>
        Score:{score}
        Seconds: {seconds}
      </div>
    
    
      <ul className='border border-blue-200'>
        {records?.length>0 && records.map((data,i)=>{
         return( <li key={i}>id:{i} point:{data?.poin}</li>)
        })}
      </ul>
      <div onClick={(e)=>{scoreHandler(e,1)}} className={`border-4	 border-black bg-blue-50  ${ring===1 && 'bg-green-500'} w-[15vw] h-[30vh] flex justify-center items-center rounded-full cursor-pointer`}>
          <div onClick={(e)=>{scoreHandler(e,2)}} className={`border-4	 border-black bg-blue-50 ${ring===2 && 'bg-green-500'} w-[12vw] h-[25vh] flex justify-center items-center rounded-full cursor-pointer`}>
          <div onClick={(e)=>{scoreHandler(e,3)}} className={`border-4	 border-black bg-blue-50  ${ring===3 && 'bg-green-500'}    w-[9vw] h-[18vh] rounded-full flex justify-center items-center cursor-pointer`}>
            <div onClick={(e)=>{scoreHandler(e,4)}} className={`border-4	 border-black bg-blue-50  ${ring===4 && 'bg-green-500'}    w-[6.8vw] h-[14vh] rounded-full flex justify-center items-center cursor-pointer`}>
              <div onClick={(e)=>{scoreHandler(e,5)}} className={`border-4	 border-black bg-blue-50  ${ring===5 && 'bg-green-500'}   w-[2vw] h-[4vh] rounded-full cursor-pointer flex justify-center items-center`}>
                <div onClick={(e)=>{scoreHandler(e,6)}} className={`  w-[1vw] h-[2vh]  ${ring===6 ? 'bg-green-500' : 'bg-red-800'}  rounded-full cursor-pointer`}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
