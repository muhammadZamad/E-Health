import React, { useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { firestore } from 'config/firebase'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import dayjs from 'dayjs';
import { FloatButton } from 'antd';
export default function Record() {
  const [report, setReport] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [documents, setDocuments] = useState([])
  const handleChange = e => {
    const { name, value } = e.target
    setReport(s => ({ ...s, [name]: value }))
  }
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const readDocuments = async () => {
    setIsLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "patientReport"));
    let array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setDocuments(array)
    setIsLoading(false)
  }
  useEffect(() => {
    readDocuments()
  }, [])

  const handleUpdate = async () => {
    // formData.dateModified = serverTimestamp()
    // console.log(report)
    // return;
    setIsProcessing(true)
    try {
      await updateDoc(doc(firestore, "patientReport", report.id), report);
      // console.log("Document written with ID: ", docRef.id); 
      window.toastify("your report has been successfully updated", "success")
      let newDocuments = documents.map((doc) => {
        if (doc.id === report.id)
          return report
        return doc
      })
      setDocuments(newDocuments)
    } catch (e) {
      console.error("Error adding document: ", e);
      window.toastify("Something went wrong while updating your report", "error")
    }
    setIsProcessing(false)
    // console.log(formData)
  }

  const handleDelete = async (patientReport) => {
    setIsProcessingDelete(true)
    try {
      await deleteDoc(doc(firestore, "patientReport", patientReport.id));
      // console.log("Document written with ID: ", docRef.id);
      window.toastify("your report has been successfully deleted", "success")
      let newReport = documents.filter((doc) => {
        return doc.id !== patientReport.id
      })
      setDocuments(newReport)
    } catch (e) {
      console.error("Error adding document: ", e);
      window.toastify("Something went wrong while deleting your report", "error")

    }
    setIsProcessingDelete(false)
  }

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Report</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mt-5">
            {!isLoading
              ? <Table>
                <Thead>
                  <Tr>
                    <Th>S.No</Th>
                    <Th>Patient Name</Th>
                    <Th>Tempature (ºF)</Th>
                    <Th>Heart Beat (bpm)</Th>
                    <Th>ECG:PR interval(sec)</Th>
                    <Th>ECG:QRS interval(sec)</Th>
                    <Th>ECG:QT interval(sec)</Th>
                    <Th>ECG:ST interval(sec)</Th>
                    <Th>Blood Sugar (mg/dL)</Th>
                    <Th>Systolic BP (mm Hg)</Th>
                    <Th>Diastolic BP (mmHg)</Th>
                    <Th>Date/Time</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((doc, i) => {
                    return <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{doc.patientName}</Td>
                      <Td>{doc.tempature}</Td>
                      <Td>{doc.heartBeat}</Td>
                      <Td>{doc.ecgPr}</Td>
                      <Td>{doc.ecgQrs}</Td>
                      <Td>{doc.ecgQt}</Td>
                      <Td>{doc.ecgSt}</Td>
                      <Td>{doc.bloodSugar}</Td>
                      <Td>{doc.systolic}</Td>
                      <Td>{doc.diastolic}</Td>
                      <Td>{dayjs(doc.dateCreated?.seconds * 1000).format("DD-MM-YYYY, hh:mm:ss A")}</Td>
                      <Td>
                        <button className='btn btn-sm btn-info rounded-5' data-bs-toggle="modal" onClick={() => { setReport(doc) }} data-bs-target="#editModal" ><EditOutlined />
                          {!isProcessing
                            ? ""
                            : <div className='spinner-boder spinner-border-sm'></div>
                          }
                        </button>

                        <button className='btn btn-sm btn-danger rounded-5' disabled={isProcessingDelete} onClick={() => { handleDelete(doc) }}><DeleteOutlined />
                          {!isProcessingDelete
                            ? ""
                            : <div className='spinner-boder spinner-border-sm'></div>
                          }
                        </button>
                      </Td>
                    </Tr>
                  })}
                </Tbody>
              </Table>
              : <div className="text-center"><div className="spinner-grow"></div></div>
            }
          </div>
        </div>
        <FloatButton.BackTop />
      </div>

      <div className="modal fade" id="editModal" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" >Update Report</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-12 mb-3">
                  <input type="text" className='form-control' placeholder='Patient Name' name='patientName' value={report.patientName} onChange={handleChange} />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='Tempature (ºF)' name='tempature' value={report.tempature} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='Heart Beat (bpm)' name='heartBeat' value={report.heartBeat} onChange={handleChange} />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='ECG: PR interval(sec)' name='ecgPr' value={report.ecgPr} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='ECG: QRS interval(sec) ' name='ecgQrs' value={report.ecgQrs} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='ECG: QT interval(sec) ' name='ecgQt' value={report.ecgQt} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='ECG: ST interval(sec) ' name='ecgSt' value={report.ecgSt} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='Blood Sugar (mg/dL)' name='bloodSugar' value={report.bloodSugar} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="number" className='form-control' placeholder='Systolic BP (mm Hg)' name='systolic' value={report.systolic} onChange={handleChange} />
                </div>
                <div className="col-12  mb-3">
                  <input type="number" className='form-control' placeholder='Diastolic BP (mmHg)' name='diastolic' value={report.diastolic} onChange={handleChange} />
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleUpdate(doc) }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
