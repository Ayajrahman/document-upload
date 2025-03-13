import React, { useState } from "react";

function DocumentName({ isOpen, onClose, addDocument }) {
  const [docName, setDocName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Document</h2>
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Enter document name"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              addDocument(docName);
              setDocName("");
              onClose();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentName;
