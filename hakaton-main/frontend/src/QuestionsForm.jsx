import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaCircleCheck } from 'react-icons/fa6';
import { AgCharts } from "ag-charts-react";


const QuestionsForm = ({ visible, setVisible, setContactVisible }) => {
    const questions = [
        "1. Koliko ste dobri u planiranju?",
        "2. Da li pokazujete svoju kreativnost u svakodnevnom životu?",
        "3. Spremni za rad na terenu?",
        "4. Koliko Vas interesuju politički aspekti blokada?",
        "5. Šta mislite za sebe, koliko ste društvena osoba?",
        "6. Koliko ste obazrivi na detalje?",
        "7. Da li koristite društvene mreže?",
        "8. Imate li tremu od javnih nastupa?",
    ];
    const radnaGrupaMap = [
        "Motivacija", "Logistika", "Strategija", "Bezbednost", "Mediji", "Komunikacija"
    ]


    const initialAnswers = {
        "ans1": -1, "ans2": -1, "ans3": -1, "ans4": -1, "ans5": -1, "ans6": -1, "ans7": -1, "ans8": -1
    };
    const [answers, setAnswers] = useState(initialAnswers);
    const [formStep, setFormStep] = useState(1);
    const [error, setError] = useState("");
    const [res1Str, setRes1Str] = useState("");
    const [res1Val, setRes1Val] = useState(0);
    const [res2Str, setRes2Str] = useState("");
    const [res2Val, setRes2Val] = useState(0);
    const [res3Str, setRes3Str] = useState("");
    const [res3Val, setRes3Val] = useState(0);

    const submitForm = async () => {
        if (answers.ans1 === -1 || answers.ans2 === -1 || answers.ans3 === -1 || answers.ans4 === -1 || answers.ans5 === -1 ||
            answers.ans6 === -1 || answers.ans7 === -1 || answers.ans8 === -1) {
            setError("Niste odgovorili na sva pitanja!");
            return;
        }
        setError("");
        setFormStep(4);

        const data = {
            "ans1": answers.ans1,
            "ans2": answers.ans2,
            "ans3": answers.ans3,
            "ans4": answers.ans4,
            "ans5": answers.ans5,
            "ans6": answers.ans6,
            "ans7": answers.ans7,
            "ans8": answers.ans8,
        }

        // Slanje na bekend
        const response = await fetch(`http://localhost:5000/predict_personality`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let arr = await response.json();
        let pairs = arr.map((value, index) => [value, index]);
        pairs.sort((a, b) => b[0] - a[0]);
        console.log(pairs);

        let res = [];
        for (let i = 0; i < 3; i++) {
            res.push(pairs[i][0] = parseFloat(pairs[i][0].toFixed(2)));
            console.log(`Radna grupa: ${radnaGrupaMap[pairs[i][1]]}   ${pairs[i][0]}%`);
        }

        setRes1Str(radnaGrupaMap[pairs[0][1]]);
        setRes1Val(parseFloat(pairs[0][0].toFixed(2)));
        setRes2Str(radnaGrupaMap[pairs[1][1]]);
        setRes2Val(parseFloat(pairs[1][0].toFixed(2)));
        setRes3Str(radnaGrupaMap[pairs[2][1]]);
        setRes3Val(parseFloat(pairs[2][0].toFixed(2)));
    }



    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            console.log("Chart is rendering inside the div:", chartRef.current);
        }
    }, []);

    const chartData = [
        { grupa: res1Str, procenat: res1Val },
        { grupa: res2Str, procenat: res2Val },
        { grupa: res3Str, procenat: res3Val },
    ];
    const colors = ["red", "blue", "purple"];
    const chartOptions = {
        data: chartData,
        series: [
            {
                type: "bar",
                xKey: "grupa", // ✅ X-axis should be numeric (values)
                yKey: "procenat", // ✅ Y-axis should be categorical (labels)
                direction: "horizontal", // ✅ Keep horizontal orientation
                // fill: "green",
                fills: colors,
            },
        ],
        axes: [
            {
                type: "category",
                position: "left",
                label: {
                    fontWeight: "bold", // ✅ Make Y-axis labels bold
                    fontSize: 16, // ✅ Make Y-axis labels bigger
                    color: "black", // Optional: Adjust label color
                },
                line: { width: 0 }, // ✅ Hides axis line
                gridStyle: [{ stroke: "transparent" }],
            },
            {
                type: "number",
                position: "bottom",
                label: { enabled: false }, // ✅ Hides numbers
                line: { width: 0 }, // ✅ Hides axis line
                gridStyle: [{ stroke: "transparent" }], // ✅ Hides grid lines
            },
        ],
    };

    const handleSubmit = () => {
        setVisible();
        setFormStep(1);
        setAnswers(initialAnswers);
        setContactVisible();
    }

    const handleClose = () => {
        setVisible();
        setFormStep(1);
        setAnswers(initialAnswers);
    }

    const topAnswer = chartData[0]?.grupa; // Safe access to avoid errors
    console.log(topAnswer);
    const getImageSrc = () => {
        switch (topAnswer) {
            case "Strategija":
                return "./src/assets/strategija_icon.png";
            case "Logistika":
                return "./src/assets/logistika_icon.png";
            case "Mediji":
                return "./src/assets/mediji_icon.png";
            case "Komunikacije":
                return "./src/assets/komunikacije_icon.png";
            case "Bezbednost":
                return "./src/assets/bezbednost_icon.png";
            default:
                return "./src/assets/motivacija_icon.png"; // Default image if no match
        }
    };



    return (
        <>
            {visible && <div className='fixed top-[5%] pt-12 pb-10 flex flex-col  bg-white w-3/5 border border-gray-500 text-[#282828]'>
                {/* Close button */}
                <MdClose size={50}
                    className='absolute top-4 left-5 cursor-pointer'
                    onClick={handleClose} />

                {formStep === 1 && <div className='flex flex-col items-center mx-10'>
                    {/* Question 1 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[0]}</h3>
                    <div className='mt-5 flex gap-10'>
                        <button onClick={() => { setAnswers({ ...answers, ['ans1']: 1 }) }} className={`btn btn-outline ${answers.ans1 === 1 && "bg-[#282828] text-white"}`}>1</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans1']: 2 }) }} className={`btn btn-outline ${answers.ans1 === 2 && "bg-[#282828] text-white"}`}>2</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans1']: 3 }) }} className={`btn btn-outline ${answers.ans1 === 3 && "bg-[#282828] text-white"}`}>3</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans1']: 4 }) }} className={`btn btn-outline ${answers.ans1 === 4 && "bg-[#282828] text-white"}`}>4</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans1']: 5 }) }} className={`btn btn-outline ${answers.ans1 === 5 && "bg-[#282828] text-white"}`}>5</button>
                    </div>
                    {/* Question 2 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[1]}</h3>
                    <div className='mt-5 mr-5 flex gap-10 items-center'>
                        <p className='text-[#358ec1] -mr-3 text-lg'>Šta je to kreativnost...</p>
                        <button onClick={() => { setAnswers({ ...answers, ['ans2']: 1 }) }} className={`btn btn-outline ${answers.ans2 === 1 && "bg-[#282828] text-white"}`}>1</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans2']: 2 }) }} className={`btn btn-outline ${answers.ans2 === 2 && "bg-[#282828] text-white"}`}>2</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans2']: 3 }) }} className={`btn btn-outline ${answers.ans2 === 3 && "bg-[#282828] text-white"}`}>3</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans2']: 4 }) }} className={`btn btn-outline ${answers.ans2 === 4 && "bg-[#282828] text-white"}`}>4</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans2']: 5 }) }} className={`btn btn-outline ${answers.ans2 === 5 && "bg-[#282828] text-white"}`}>5</button>
                        <p className='text-[#358ec1] -ml-3 text-lg'>Od jutra do mraka!</p>
                    </div>
                    {/* Question 3 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[2]}</h3>
                    <div className='-mt-4 ml-8 flex gap-10 items-center justify-center'>
                        <img src="./src/assets/office.jpg" alt="" className='w-[11%]' />
                        <button onClick={() => { setAnswers({ ...answers, ['ans3']: 1 }) }} className={`btn btn-outline ${answers.ans3 === 1 && "bg-[#282828] text-white"}`}>1</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans3']: 2 }) }} className={`btn btn-outline ${answers.ans3 === 2 && "bg-[#282828] text-white"}`}>2</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans3']: 3 }) }} className={`btn btn-outline ${answers.ans3 === 3 && "bg-[#282828] text-white"}`}>3</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans3']: 4 }) }} className={`btn btn-outline ${answers.ans3 === 4 && "bg-[#282828] text-white"}`}>4</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans3']: 5 }) }} className={`btn btn-outline ${answers.ans3 === 5 && "bg-[#282828] text-white"}`}>5</button>
                        <img src="./src/assets/construction.jpg" alt="" className='w-[15%]' />
                    </div>

                    <div className="join mt-14 flex">
                        <div className='flex items-center justify-center'>
                            <FiArrowLeftCircle
                                size={35}
                                className="stroke-[1] cursor-pointer text-gray-500" />
                            <p className='mx-10'>{formStep} / 3</p>
                            <FiArrowRightCircle
                                onClick={() => { setFormStep(2) }}
                                size={35}
                                className="stroke-[1] cursor-pointer ${formStep === 3" />
                        </div>
                    </div>
                </div>}

                {formStep === 2 && <div className='flex flex-col items-center mx-10'>
                    {/* Question 4 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[3]}</h3>
                    <div className='mt-5 flex gap-10'>
                        <button onClick={() => { setAnswers({ ...answers, ['ans4']: 1 }) }} className={`btn btn-outline ${answers.ans4 === 1 && "bg-[#282828] text-white"}`}>1</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans4']: 2 }) }} className={`btn btn-outline ${answers.ans4 === 2 && "bg-[#282828] text-white"}`}>2</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans4']: 3 }) }} className={`btn btn-outline ${answers.ans4 === 3 && "bg-[#282828] text-white"}`}>3</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans4']: 4 }) }} className={`btn btn-outline ${answers.ans4 === 4 && "bg-[#282828] text-white"}`}>4</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans4']: 5 }) }} className={`btn btn-outline ${answers.ans4 === 5 && "bg-[#282828] text-white"}`}>5</button>
                    </div>
                    {/* Question 5 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[4]}</h3>
                    <div className='mt-5 flex gap-10'>
                        <button onClick={() => { setAnswers({ ...answers, ['ans5']: 1 }) }} className={`uppercase btn btn-outline ${answers.ans5 === 1 && "bg-[#282828] text-white"}`}>Vuk samotnjak</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans5']: 2 }) }} className={`uppercase btn btn-outline ${answers.ans5 === 2 && "bg-[#282828] text-white"}`}>Prija mi samoća</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans5']: 3 }) }} className={`uppercase btn btn-outline ${answers.ans5 === 3 && "bg-[#282828] text-white"}`}>ni vamo ni tamo</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans5']: 4 }) }} className={`uppercase btn btn-outline ${answers.ans5 === 4 && "bg-[#282828] text-white"}`}>gde ćemo na kafu</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans5']: 5 }) }} className={`uppercase btn btn-outline ${answers.ans5 === 5 && "bg-[#282828] text-white"}`}>Živim za žurke</button>
                    </div>
                    {/* Question 6 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[5]}</h3>
                    <div className='mt-5 flex gap-10'>
                        <button onClick={() => { setAnswers({ ...answers, ['ans6']: 1 }) }} className={`btn btn-outline ${answers.ans6 === 1 && "bg-[#282828] text-white"}`}>1</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans6']: 2 }) }} className={`btn btn-outline ${answers.ans6 === 2 && "bg-[#282828] text-white"}`}>2</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans6']: 3 }) }} className={`btn btn-outline ${answers.ans6 === 3 && "bg-[#282828] text-white"}`}>3</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans6']: 4 }) }} className={`btn btn-outline ${answers.ans6 === 4 && "bg-[#282828] text-white"}`}>4</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans6']: 5 }) }} className={`btn btn-outline ${answers.ans6 === 5 && "bg-[#282828] text-white"}`}>5</button>
                    </div>

                    <div className="join mt-14 flex">
                        <div className='flex items-center justify-center'>
                            <FiArrowLeftCircle
                                onClick={() => { setFormStep(1) }}
                                size={35}
                                className="stroke-[1] cursor-pointer" />
                            <p className='mx-10'>{formStep} / 3</p>
                            <FiArrowRightCircle
                                onClick={() => { setFormStep(3) }}
                                size={35}
                                className="stroke-[1] cursor-pointer" />
                        </div>
                    </div>
                </div>}

                {formStep === 3 && <div className='flex flex-col items-center mx-10'>
                    {/* Question 7 */}
                    <h3 className='text-lg font-semibold mt-10'>{questions[6]}</h3>
                    <div className='-mt-10 ml-12 flex items-center justify-center gap-10'>
                        <img src="./src/assets/cellular.png" alt="" className='w-[12%]' />
                        <button onClick={() => { setAnswers({ ...answers, ['ans7']: 1 }) }} className={`btn btn-outline ${answers.ans7 === 1 && "bg-[#282828] text-white"}`}>1</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans7']: 2 }) }} className={`btn btn-outline ${answers.ans7 === 2 && "bg-[#282828] text-white"}`}>2</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans7']: 3 }) }} className={`btn btn-outline ${answers.ans7 === 3 && "bg-[#282828] text-white"}`}>3</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans7']: 4 }) }} className={`btn btn-outline ${answers.ans7 === 4 && "bg-[#282828] text-white"}`}>4</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans7']: 5 }) }} className={`btn btn-outline ${answers.ans7 === 5 && "bg-[#282828] text-white"}`}>5</button>
                        <img src="./src/assets/adict.png" alt="" className='w-[18%]' />
                    </div>
                    {/* Question 8 */}
                    <h3 className='text-lg font-semibold mt-2'>{questions[7]}</h3>
                    <div className='mt-5 flex gap-10'>
                        <button onClick={() => { setAnswers({ ...answers, ['ans8']: 1 }) }} className={`uppercase btn btn-outline ${answers.ans8 === 1 && "bg-[#282828] text-white"}`}>Drhtim kao prut</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans8']: 2 }) }} className={`uppercase btn btn-outline ${answers.ans8 === 2 && "bg-[#282828] text-white"}`}>Izbegavam ih</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans8']: 3 }) }} className={`uppercase btn btn-outline ${answers.ans8 === 3 && "bg-[#282828] text-white"}`}>Zavisi od okolnosti</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans8']: 4 }) }} className={`uppercase btn btn-outline ${answers.ans8 === 4 && "bg-[#282828] text-white"}`}>Dobro se nosim</button>
                        <button onClick={() => { setAnswers({ ...answers, ['ans8']: 5 }) }} className={`uppercase btn btn-outline ${answers.ans8 === 5 && "bg-[#282828] text-white"}`}>rođeni govornik</button>
                    </div>

                    {/* Submit Button */}
                    <div className='mt-16 flex justify-center'>
                        <button onClick={submitForm} className="bg-[#358ec1] text-white hover:text-green-100 btn btn-outline btn-neutral text-lg">Pošalji odgovore</button>
                    </div>
                    {error && <p className='mt-5 text-[#FF2C2C] leading-[20px] text-lg text-center'>
                        {error}
                    </p>}

                    <div className="join mt-8 flex">
                        <div className='flex items-center justify-center'>
                            <FiArrowLeftCircle
                                onClick={() => { setFormStep(2) }}
                                size={35}
                                className="stroke-[1] cursor-pointer" />
                            <p className='mx-10'>{formStep} / 3</p>
                            <FiArrowRightCircle
                                size={35}
                                className="stroke-[1] cursor-pointer text-gray-500" />
                        </div>
                    </div>
                </div>}

                {/* Thank you message */}
                {formStep === 4 && <div className='mt-4 flex flex-col items-center'>
                    <h3 className='mb-10 text-3xl font-semibold mt-0'>Rezultat Vašeg testa:</h3>
                    <p className='text-[34px] leading-[40px] font-bold text-green-500'>{res1Str} {res1Val * 100}%</p>
                    <p className='mt-2 text-[28px] font-bold text-[#282828]'>{res2Str} {res2Val * 100}%</p>
                    <p className='mt-2 text-xl font-bold text-[#282828]'>{res3Str}   {res3Val * 100}%</p>

                    <div
                        id="test"
                        ref={chartRef}
                        className="flex flex-col items-center h-4/5"
                    >
                        <div className='mt-5 flex justify-center items-center w-full'>
                            <div className="w-3/5 h-full">
                                <AgCharts options={chartOptions} />
                            </div>

                            {/* Image Container */}
                            <img src={getImageSrc()} className="w-1/4 h- object-contain" />
                        </div>

                        <p className="text-center text-xl max-w-[75%] mt-6">
                            Da li želite da ostavite Vaše podatke i prijavite se za neku od radnih
                            grupa?
                        </p>
                        <button onClick={handleSubmit} className="btn btn-outline btn-neutral mt-6">Prijavi se</button>
                        {/* <button onClick={handleClose} className="btn btn-outline btn-neutral mt-6">Izađi</button> */}
                    </div>
                </div>}

            </div>}
        </>
    )
}

export default QuestionsForm