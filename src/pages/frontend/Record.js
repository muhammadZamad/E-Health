import React, { useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { firestore } from 'config/firebase'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, docRef, updateDoc } from 'firebase/firestore'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

export default function Record() {
  // const [state, setState] = useState(initialState)
  const [report, setReport] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
   const [documents, setDocuments] = useState([])
   const handleChange = e => {
    const {name, value } = e.target
    setReport(s =>({ ...s, [name]: value}))
}
   const [isProcessingDelete, setIsProcessingDelete] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const readDocuments = async() => {
    setIsLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "patientReport"));
    let array = []
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  let data = doc.data()
  array.push(data)
});
setDocuments(array)
setIsLoading(false)
   }
   useEffect(()=> {
    readDocuments()
   }, [])
   
   const handleUpdate = async (formData) =>{
    // let patientReport = { report }
    // formData.dateModified = serverTimestamp()
   
    setIsProcessing(true)
    try {
      const docRef = await updateDoc(doc(firestore, "patientReport", formData.id), formData = {...report} );
      // console.log("Document written with ID: ", docRef.id); 
      window.toastify("your report has been successfully updated", "success")
      const updateTimestamp = await updateDoc(docRef, {
        timestamp: serverTimestamp()
    });
      let newDocuments = documents.map((doc)=>{
        if(doc.id === report.id)
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
 
   const handleDelete = async(patientReport) =>{
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
    ?<Table>
      <Thead>
        <Tr>
          <Th>S.No</Th>
          <Th>Patient Name</Th>
          <Th>Temp</Th>
          <Th>Heart Beat</Th>
          <Th>ECG</Th>
          <Th>Fall Detect</Th>
          <Th>Diabetes</Th>
          <Th>Dialysis</Th>
          <Th>Date/Time</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
      {documents.map((doc, i) => {
        return<Tr key={i}>
          <Td>{i + 1}</Td>
          <Td>{doc.patientName}</Td>
          <Td>{doc.tempature}</Td>
          <Td>{doc.heartBeat}</Td>
          <Td>{doc.ecg}</Td>
          <Td>{doc.fallDetect}</Td>
          <Td>{doc.diabetes}</Td>
          <Td>{doc.dialysis}</Td>
          <Td>{doc.updateTimestamp}</Td>
          {/* <Td></Td> */}
          <Td>
          <button className='btn btn-sm btn-info rounded-5' data-bs-toggle="modal" data-bs-target="#editModal" ><EditOutlined />
          {!isProcessing
        ? ""
        : <div className='spinner-boder spinner-border-sm'></div>
        }
          </button>
        <button className='btn btn-sm btn-danger rounded-5' disabled={isProcessingDelete} onClick={()=>{handleDelete(doc)}}><DeleteOutlined />
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
                        <input type="text" className='form-control' placeholder='Patient Name' name='patientName' value={report.patientName} onChange={handleChange}  />
                        </div>
                    
                        <div className="col-12 col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='Fall Detect' name='fallDetect' value={report.fallDetect} onChange={handleChange}  />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='Tempature' name='tempature' value={report.tempature} onChange={handleChange}  />
                        </div>
                    
                        <div className="col-12 col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='ECG ' name='ecg' value={report.ecg} onChange={handleChange}  />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='Heart Beat' name='heartBeat' value={report.heartBeat} onChange={handleChange}  />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='Diabetes' name='diabetes' value={report.diabetes} onChange={handleChange}  />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                        <input type="number" className='form-control' placeholder='Dialysis' name='dialysis' value={report.dialysis} onChange={handleChange}  />
                        </div>           
                    </div>
            
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{handleUpdate(doc)}}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
