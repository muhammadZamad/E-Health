import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from 'config/firebase';
const initialState = {
    patientName: "",
    tempature: "",
    heartBeat: "",
    ecgPr: "",
    ecgQrs: "",
    ecgQt: "",
    ecgSt: "",
    bloodSugar: "",
    systolic: "",
    diastolic: "",
}
export default function AddRecord() {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    // const navigate = useNavigate()
    const handleChange = e => {
        const { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let { patientName, tempature, heartBeat, ecgPr, ecgQrs, ecgQt, ecgSt, bloodSugar, systolic, diastolic } = state
        // setIsProcessing(true)
        patientName = patientName.trim();
        if (patientName.length < 3) {
            return window.toastify("Enter your name correctly", "error")
        }
        let formData = {
            patientName, tempature, heartBeat, ecgPr, ecgQrs, ecgQt, ecgSt, bloodSugar, systolic, diastolic,
            id: window.getRandomId(),
            dateCreated: serverTimestamp(),
        }
        // console.log(formData)
        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "patientReport", formData.id), formData);
            // console.log("Document written with ID: ", docRef.id);
            window.toastify("your report has been successfully sent", "success")
            setState(initialState)
        } catch (e) {
            console.error("Error adding document: ", e);
            window.toastify("Something went wrong while sending your report", "error")
        }
        setIsProcessing(false)
    }

    return (
        <>
            <div className="py-5 auth">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card p-4 p-md-5">
                                <h2 className="text-center mb-4">Add Report</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <input type="text" className='form-control' placeholder='Patient Name' name='patientName' value={state.patientName} onChange={handleChange} />
                                        </div>

                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='Tempature (ºF)' name='tempature' value={state.tempature} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='Heart Beat (bpm)' name='heartBeat' value={state.heartBeat} onChange={handleChange} />
                                        </div>

                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='ECG: PR interval(sec)' name='ecgPr' value={state.ecgPr} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='ECG: QRS interval(sec) ' name='ecgQrs' value={state.ecgQrs} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='ECG: QT interval(sec) ' name='ecgQt' value={state.ecgQt} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='ECG: ST interval(sec) ' name='ecgSt' value={state.ecgSt} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='Blood Sugar (mg/dL)' name='bloodSugar' value={state.bloodSugar} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <input type="number" className='form-control' placeholder='Systolic BP (mm Hg)' name='systolic' value={state.systolic} onChange={handleChange} />
                                        </div>
                                        <div className="col-12  mb-3">
                                            <input type="number" className='form-control' placeholder='Diastolic BP (mmHg)' name='diastolic' value={state.diastolic} onChange={handleChange} />
                                        </div>

                                        <div className="col-12 col-md-6 offset-md-3" >
                                            <button className='btn btn-primary w-100' disabled={isProcessing}>
                                                {isProcessing
                                                    ? <div className='spinner spinner-grow spinner-grow-sm'></div>
                                                    : <span><UserAddOutlined />Add Report</span>
                                                }
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
