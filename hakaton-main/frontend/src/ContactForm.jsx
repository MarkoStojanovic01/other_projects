import React, { useState } from 'react'
import { faculties, validateEmail, validateFaculty, validateName, validateRg } from './constants';
import { MdClose } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";


const ContactForm = ({ visible, setVisible }) => {
    const initialFormData = {
        name: '',
        faculty: '',
        email: '',
        rg1: false,
        rg2: false,
        rg3: false,
        rg4: false,
        rg5: false,
        rg6: false,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({
        name: '',
        faculty: '',
        email: '',
        rg: ''
    });
    const [formStep, setFormStep] = useState(1);

    const validateFormData = () => {
        const errorName = validateName(formData.name);
        const errorFaculty = validateFaculty(formData.faculty);
        const errorEmail = validateEmail(formData.email);
        const errorRg = validateRg(formData.rg1, formData.rg2, formData.rg3, formData.rg4, formData.rg5, formData.rg6)

        setErrors({ ...errors, ['name']: errorName, ['faculty']: errorFaculty, ['email']: errorEmail, ['rg']: errorRg });
        if (errorName.length === 0 && errorFaculty.length === 0 && errorEmail.length === 0 && errorRg.length === 0) return true;
        return false;
    }

    const onChange = (e, type) => {
        let input = e.target.value;

        if (!type ||
            (type === 'letters' && /^[A-Za-zčćžšđČĆŽŠĐ\u0400-\u04FF\s-]*$/.test(input)))
            setFormData({ ...formData, [e.target.name]: input });
    };

    const submitData = () => {
        console.log(formData.name);
        console.log(formData.faculty);
        console.log(formData.email);
        console.log(formData.rg1);
        console.log(formData.rg2);
        console.log(formData.rg3);
        console.log(formData.rg4);
        console.log(formData.rg5);
        console.log(formData.rg6);

        if (!validateFormData()) {
            console.log("Uneti podaci nisu validni!");
            return;
        }

        setFormStep(2);
        // Todo: send to db 
    }


    return (
        <>
            {visible && <div className='fixed top-[5%] pt-12 pb-14 flex flex-col  bg-white w-2/5 border border-gray-500 text-[#282828]'>
                {/* Close button */}
                <MdClose size={50}
                    className='absolute top-4 left-5 cursor-pointer'
                    onClick={setVisible} />

                {formStep === 1 && <div className='flex flex-col items-center'>
                    {/* Title and description */}
                    <h3 className='text-[48px] font-extrabold'>Kontakt podaci</h3>
                    <p className='pt-5 px-14 text-[20px] leading-[30px] text-center'>
                        Ukoliko želite da se pridružite određenim radnim grupama, ostavite svoje osnovne podatke i predstavnici studenata će Vas kontaktirati u najkraćem roku.
                    </p>

                    {/* Form fields */}
                    <div className='flex flex-col gap-3 mt-16 w-[550px]'>
                        {/* Name */}
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-2xl'>Ime:</p>
                            <input type="text"
                                name="name"
                                placeholder="Ime i prezime"
                                value={formData.name}
                                onChange={(e) => { onChange(e, 'letters'); }}
                                onBlur={(e) => { setErrors({ ...errors, ['name']: validateName(e.target.value) }) }}
                                className={`input text-lg h-12 pl-4 bg-white border ${errors.name ? "border-red-500" : "border-gray-700"} font-semibold min-w-[400px]`} />
                        </div>
                        {errors.name && <p className='text-[#FF2C2C] leading-[20px] text-lg text-end'>
                            {errors.name}
                        </p>}

                        {/* Faculty */}
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-2xl'>Fakultet:</p>
                            <select
                                value={formData.faculty}
                                onChange={(e) => { setFormData({ ...formData, ['faculty']: e.target.value }); setErrors({ ...errors, ['faculty']: "" }); }}
                                className={`select text-lg h-12 bg-white ${formData.faculty === '' ? "text-gray-400" : "text-[#282828]"}  border ${errors.faculty ? "border-red-500" : "border-gray-700"} font-semibold min-w-[400px]`}>
                                <option value="" disabled hidden>
                                    Odaberite Vaš fakultet
                                </option>
                                {faculties.map((faculty, index) => (
                                    <option key={index} value={faculty}>
                                        {faculty}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.faculty && <p className='text-[#FF2C2C] leading-[20px] text-lg text-end'>
                            {errors.faculty}
                        </p>}

                        {/* Email */}
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-2xl'>Mejl:</p>
                            <input
                                type="text"
                                placeholder="Unesite Vaš email"
                                name="email"
                                onChange={(e) => onChange(e)}
                                onBlur={(e) => { setErrors({ ...errors, ['email']: validateEmail(e.target.value) }) }}
                                className={`input text-lg h-12 pl-4 bg-white border ${errors.email ? "border-red-500" : "border-gray-700"} font-semibold min-w-[400px]`} />
                        </div>
                        {errors.email && <p className='text-[#FF2C2C] leading-[20px] text-lg text-end'>
                            {errors.email}
                        </p>}

                        {/* Radne grupe */}
                        <p className='mt-2 font-bold text-2xl'>Radne grupe od interesa:</p>
                        <div className='mt-4 flex justify-center gap-28'>
                            <div className='flex flex-col gap-3'>
                                <label className="fieldset-label text-black">
                                    <input type="checkbox"
                                        value={formData.rg1}
                                        onChange={() => { setFormData({ ...formData, ['rg1']: !formData.rg1 }); setErrors({ ...errors, ['rg']: validateRg(!formData.rg1, formData.rg2, formData.rg3, formData.rg4, formData.rg5, formData.rg6) }); }}
                                        className="checkbox mr-3 text-[#282828] border border-[#282828]" />
                                    Logistika
                                </label>
                                <label className="fieldset-label text-black">
                                    <input type="checkbox"
                                        value={formData.rg2}
                                        onChange={() => { setFormData({ ...formData, ['rg2']: !formData.rg2 }); setErrors({ ...errors, ['rg']: validateRg(formData.rg1, !formData.rg2, formData.rg3, formData.rg4, formData.rg5, formData.rg6) }); }}
                                        className="checkbox mr-3 text-[#282828] border border-[#282828]" />
                                    Motivacija
                                </label>
                                <label className="fieldset-label text-black">
                                    <input type="checkbox"
                                        value={formData.rg3}
                                        onChange={() => { setFormData({ ...formData, ['rg3']: !formData.rg3 }); setErrors({ ...errors, ['rg']: validateRg(formData.rg1, formData.rg2, !formData.rg3, formData.rg4, formData.rg5, formData.rg6) }); }}
                                        className="checkbox mr-3 text-[#282828] border border-[#282828]" />
                                    Bezbednost
                                </label>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className="fieldset-label text-black">
                                    <input type="checkbox"
                                        value={formData.rg4}
                                        onChange={() => { setFormData({ ...formData, ['rg4']: !formData.rg4 }); setErrors({ ...errors, ['rg']: validateRg(formData.rg1, formData.rg2, formData.rg3, !formData.rg4, formData.rg5, formData.rg6) }); }}
                                        className="checkbox mr-3 text-[#282828] border border-[#282828]" />
                                    Strategija
                                </label>
                                <label className="fieldset-label text-black">
                                    <input type="checkbox"
                                        value={formData.rg5}
                                        onChange={() => { setFormData({ ...formData, ['rg5']: !formData.rg5 }); setErrors({ ...errors, ['rg']: validateRg(formData.rg1, formData.rg2, formData.rg3, formData.rg4, !formData.rg5, formData.rg6) }); }}
                                        className="checkbox mr-3 text-[#282828] border border-[#282828]" />
                                    Mediji
                                </label>
                                <label className="fieldset-label text-black">
                                    <input type="checkbox"
                                        value={formData.rg6}
                                        onChange={() => { setFormData({ ...formData, ['rg6']: !formData.rg6 }); setErrors({ ...errors, ['rg']: validateRg(formData.rg1, formData.rg2, formData.rg3, formData.rg4, formData.rg5, !formData.rg6) }); }}
                                        className="checkbox mr-3 text-[#282828] border border-[#282828]" />
                                    Komunikacija
                                </label>
                            </div>
                        </div>
                        {errors.rg && <p className='text-[#FF2C2C] leading-[20px] text-lg text-center'>
                            {errors.rg}
                        </p>}

                        {/* Submit Button */}
                        <div className='mt-10 flex justify-center'>
                            <button onClick={submitData} className="btn btn-outline btn-neutral w-1/2 text-lg">Pošalji</button>
                        </div>
                    </div>
                </div>}


                {/* Thank you message */}
                {formStep === 2 && <div className='mt-16 flex flex-col items-center'>
                    <FaCircleCheck size={100} />
                    <p className='pt-10 px-14 text-[20px] leading-[30px] text-center'>
                        Hvala Vam što ste popunili formu!<br />
                        Studenti iz izabranih radnih grupa će Vam se javiti sa relevantnim informacijama o daljim koracima.
                    </p>
                </div>}

            </div>}
        </>
    )
}

export default ContactForm