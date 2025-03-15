import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ApplicantFrom from "./ApplicantFrom.jsx";
import DocumentName from "./DocumentName.jsx";

function Document() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const [applicants, setApplicants] = useState([]);
  const [documents, setDocuments] = useState({});


  const addApplicant = (name) => {
    if (name && !applicants.includes(name)) {
      setApplicants([...applicants, name]);
      setDocuments({ ...documents, [name]: [] });
    }
  };


  const deleteApplicant = (name) => {
    setApplicants(applicants.filter((applicant) => applicant !== name));
    const updatedDocuments = { ...documents };
    delete updatedDocuments[name];
    setDocuments(updatedDocuments);
    setSelectedApplicant(null);
    setSelectedDocument(null);
  };


  const addDocument = (docName) => {
    if (selectedApplicant && docName) {
      setDocuments({
        ...documents,
        [selectedApplicant]: [...documents[selectedApplicant], docName],
      });
      setIsDocumentOpen(false);
    }
  };

  const handleApplicantClick = (name) => {
    setSelectedApplicant(name);
    setSelectedDocument(null);
    setFileInfo(null);
  };


  const handleNext = () => {
    if (!selectedApplicant && applicants.length > 0) {
      setSelectedApplicant(applicants[0]);
      return;
    }

    const currentIndex = applicants.indexOf(selectedApplicant);
    if (currentIndex < applicants.length - 1) {
      setSelectedApplicant(applicants[currentIndex + 1]);
      setSelectedDocument(null);
    }
  };

 
  const handleBack = () => {
    if (!selectedApplicant && applicants.length > 0) {
      setSelectedApplicant(applicants[0]);
      return;
    }

    const currentIndex = applicants.indexOf(selectedApplicant);
    if (currentIndex > 0) {
      setSelectedApplicant(applicants[currentIndex - 1]);
      setSelectedDocument(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSize = (file.size / 1024).toFixed(2) + " KB"; 
      const fileURL = URL.createObjectURL(file);
      const fileType = file.type.startsWith("image/") ? "image" : "file";

      setFileInfo({
        name: file.name,
        size: fileSize,
        preview: fileType === "image" ? fileURL : null,
        status: "pending", 
      });
    }
  };

  // Handle file upload success
  const handleUpload = () => {
    setFileInfo((prev) => ({
      ...prev,
      status: "uploaded", 
    }));
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between mt-10 p-6   rounded-lg">
        <h1 className="text-3xl font-semibold">Document Upload</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Applicant
        </button>
      </div>
      <hr className="border-gray-300 mx-6 mt-5" />

      {/* Main Content */}
      <div className="flex gap-6 mx-6 mt-5">
        {/* Applicant List */}
        <div className="w-1/3 bg-white p-5 rounded-lg shadow-md">
          {applicants.map((name) => (
            <div key={name} className="mb-5">
              <div className="flex justify-baseline items-center">
                <h2
                  className="px-5 py-3 rounded-lg shadow-mg cursor-pointer text-blue-600"
                  onClick={() => handleApplicantClick(name)}
                >
                  {name}
                </h2>
                <button
                  className="bg-blue-600 text-white p-3 rounded-md hover:bg-red-600"
                  onClick={() => deleteApplicant(name)}
                >
                  <RiDeleteBinLine />
                </button>
              </div>

              {selectedApplicant === name && documents[name]?.length > 0 && (
                <div className="mt-2 w-1/3 space-y-2 ">
                  {documents[name].map((doc, index) => (
                    <p
                      key={index}
                      className="cursor-pointer text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200"
                      onClick={() => {
                        setSelectedDocument(doc);
                        setFileInfo(null);
                      }}
                    >
                      {doc}
                    </p>
                  ))}
                </div>
              )}

              {selectedApplicant === name && (
                <button
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() => setIsDocumentOpen(true)}
                >
                  + Add Document
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Document Upload Section */}
        {selectedDocument && (
          <div className="w-2/3 p-5 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-3">{selectedDocument}</h3>

            {/* File Upload */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 mr-3"
              onClick={() => document.getElementById("fileInput").click()}
            >
              + Choose File
            </button>

            {/* Display Selected File */}
            {fileInfo && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                <p
                  className={`text-gray-800 font-medium ${
                    fileInfo.status === "uploaded" ? "text-green-600" : ""
                  }`}
                >
                  {fileInfo.name}
                </p>
                <p className="text-gray-600 text-sm">{fileInfo.size}</p>
                {fileInfo.preview && (
                  <img
                    src={fileInfo.preview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded-md shadow"
                  />
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 space-x-3">
              <button
                className={`px-4 py-2 rounded-lg shadow ${
                  fileInfo?.status === "uploaded"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                onClick={handleUpload}
                disabled={fileInfo?.status === "uploaded"}
              >
                ⬆ Upload
              </button>
              <button
                className={`px-4 py-2 rounded-lg shadow ${
                  fileInfo?.status === "uploaded"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                onClick={() => setSelectedDocument(null)}
                disabled={fileInfo?.status === "uploaded"}
              >
                ✖ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-10 px-6">
        <button
          className="px-5 py-3 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleBack}
          disabled={
            applicants.length === 0 || selectedApplicant === applicants[0]
          }
        >
          &larr; Back
        </button>
        <button
          className="px-5 py-3 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleNext}
          disabled={
            applicants.length === 0 ||
            selectedApplicant === applicants[applicants.length - 1]
          }
        >
          &rarr; Next
        </button>
      </div>

      {/* Modals */}
      <ApplicantFrom
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addApplicant={addApplicant}
      />
      <DocumentName
        isOpen={isDocumentOpen}
        onClose={() => setIsDocumentOpen(false)}
        addDocument={addDocument}
      />
    </>
  );
}

export default Document;
