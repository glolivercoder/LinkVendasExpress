import React, { useRef } from 'react';
import { useBackupContext } from '../../contexts/BackupContext';

const BackupDialog = () => {
  const { 
    showBackupDialog, 
    setShowBackupDialog, 
    handleBackupDatabase, 
    handleRestoreDatabase 
  } = useBackupContext();
  
  const fileInputRef = useRef(null);

  if (!showBackupDialog) {
    return null;
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      handleRestoreDatabase(file);
    } else {
      alert('Por favor, selecione um arquivo de backup vu00e1lido (.json)');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Backup e Restaurau00e7u00e3o</h2>
          <button 
            onClick={() => setShowBackupDialog(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Realize backup do banco de dados para salvar todos os seus dados ou restaure a partir de um arquivo de backup.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Backup</h3>
              <p className="text-sm text-gray-500 mb-2">
                Crie um arquivo de backup contendo todos os seus dados.
              </p>
              <button
                onClick={handleBackupDatabase}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Realizar Backup
              </button>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Restaurau00e7u00e3o</h3>
              <p className="text-sm text-gray-500 mb-2">
                Restaure seus dados a partir de um arquivo de backup.
                <span className="text-red-500 font-medium">
                  {' '}Atenu00e7u00e3o: Isso substituiru00e1 todos os dados atuais.
                </span>
              </p>
              <button
                onClick={triggerFileInput}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Selecionar Arquivo de Backup
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".json"
                className="hidden"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowBackupDialog(false)}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupDialog;
