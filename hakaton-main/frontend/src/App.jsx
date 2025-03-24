import { useEffect, useState } from "react";
import { SlArrowDownCircle } from "react-icons/sl";
import ContactForm from "./ContactForm";
import { radneGrupe } from "./constants";
import QuestionsForm from "./QuestionsForm";

function App() {
  const [contactVisible, setContactVisible] = useState(false);
  const [personalityVisible, setPersonalityVisible] = useState(false);

  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:5000/get_users") // Flask API endpoint
  //     .then(response => {
  //       setUsers(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching users:", error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleContactVisible = () => {
    setContactVisible(!contactVisible);
  }

  const handlePersonalityVisible = () => {
    setPersonalityVisible(!personalityVisible);
  }


  return (
    <div className="flex flex-col items-center ">
      {/* Hero */}
      <div className="text-white ">
        <div className="flex flex-col items-center min-h-screen max-h-screen ">
          <img src='./src/assets/bg1.jpg' alt="bg_image" className="border absolute w-full h-full left-0 top-0 -z-10 blur-lg" />
          <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-32 text-5xl sm:text-7xl md:text-8xl lg:text-[90px] uppercase font-bold underline underline-offset-8 leading-10">
            Radne grupe
          </h1>

          <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-40 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-semibold text-center flex flex-col gap-10 italic">
            <p className="">Da li želite da pomognete studentima u blokadi?</p>
            <p>Da li znate čime se radne grupe studenata u blokadi bave?</p>
            <p>Da li biste voleli da postanete član neke radne grupe?</p>
          </div>

          <SlArrowDownCircle
            onClick={() => handleScroll("redar_div")}
            size={50}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white mt-36 cursor-pointer animate-bounce"
          />
        </div>
      </div>

      {/* White background */}
      <div className="border border-t-white border-t-2 bg-[#b1fd85] text-[#282828] flex flex-col items-center">
        {/* Personality Section */}
        <div
          id="redar_div"
          className="mt-40 mb-40 flex flex-col md:flex-row bg-gray-300 shadow-md w-5/6 md:max-h-[600px] rounded-xl"
        >
          <div className="w-full md:w-1/2">
            <img
              src="./src/assets/redar.jpg"
              className="w-full h-full object-cover rounded-none rounded-t-none sm:rounded-t-xl md:rounded-l-xl "
              alt="Redar"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 text-center md:text-lg xl:text-2xl">
            <p className="text-center">
              Želiš da postaneš deo radne grupe? Nisi siguran čime se grupe bave?
              Ne znaš koja je prava grupa za tebe?
            </p>
            <p className="text-center font-bold italic mt-4">
              Isprobaj naš test ličnosti i dobij preporuku.
            </p>
            <button onClick={handlePersonalityVisible} className="btn btn-outline btn-neutral mt-10 text-lg">
              Test ličnosti
            </button>
          </div>
        </div>

        {/* Working Groups */}
        <h2 className="text-[#282828] text-2xl sm:text-4xl xl:text-[55px] leading-[80px] uppercase font-semibold tracking-wide text-center">Informacije o radnim grupama</h2>

        {radneGrupe.map((group, index) => (
          <div
            key={group.id}
            id={group.id}
            className={`flex flex-col md:flex-row bg-blue-100 shadow-md w-5/6 md:text-lg xl:text-xl h-auto md:max-h-[600px] rounded-xl mt-20 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={group.img}
                className={`w-full h-full object-cover sm:rounded-t-xl md:rounded-none  ${index % 2 === 0 ? "md:rounded-l-xl" : "md:rounded-r-xl"
                  }`}
              />
            </div>

            {/* Content Centered */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 text-center">
              <p className="font-bold text-2xl">{group.title}</p>
              <p className="mt-5">{group.text}</p>
              <button onClick={handleContactVisible} className="btn btn-outline btn-neutral mt-6 ">
                Priključi se
              </button>
            </div>
          </div>
        ))}

        {/* Extra Space */}
        <div className="h-[60px]"></div>


        <div className="flex justify-center items-center w-full">
          <ContactForm
            visible={contactVisible}
            setVisible={handleContactVisible}
          />
        </div>

        <div className="flex justify-center items-center w-full">
          <QuestionsForm
            visible={personalityVisible}
            setVisible={handlePersonalityVisible}
            setContactVisible={handleContactVisible}
          />
        </div>
      </div >
    </div>
  );
}

export default App;