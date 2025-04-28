import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from './AppContext';
import {
  backupDatabase,
  restoreDatabase
} from '../services/database';

const BackupContext = createContext();

export const useBackupContext = () => useContext(BackupContext);

export const BackupProvider = ({ children }) => {
  const { setIsLoading, loadData } = useAppContext();
  const [showBackupDialog, setShowBackupDialog] = useState(false);

  // Função para realizar backup do banco de dados
  const handleBackupDatabase = async () => {
    try {
      setIsLoading(true);
      const backupData = await backupDatabase();
      
      // Criar arquivo de backup para download
      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      // Criar elemento de link para download
      const a = document.createElement('a');
      a.href = url;
      a.download = `estoque_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Limpar
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      setIsLoading(false);
      toast.success('Backup realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar backup:', error);
      setIsLoading(false);
      toast.error(`Erro ao realizar backup: ${error.message}`);
    }
  };

  // Função para restaurar banco de dados a partir de um arquivo
  const handleRestoreDatabase = async (file) => {
    try {
      setIsLoading(true);
      
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        try {
          const backupData = JSON.parse(e.target.result);
          
          // Confirmar antes de restaurar
          const confirmed = window.confirm(
            'Esta operação irá substituir todos os dados atuais. Deseja continuar?'
          );
          
          if (!confirmed) {
            setIsLoading(false);
            return;
          }
          
          await restoreDatabase(backupData);
          await loadData(); // Recarregar dados após restauração
          
          setShowBackupDialog(false);
          setIsLoading(false);
          toast.success('Banco de dados restaurado com sucesso!');
        } catch (parseError) {
          console.error('Erro ao processar arquivo de backup:', parseError);
          setIsLoading(false);
          toast.error(`Arquivo de backup inválido: ${parseError.message}`);
        }
      };
      
      fileReader.onerror = () => {
        setIsLoading(false);
        toast.error('Erro ao ler arquivo de backup');
      };
      
      fileReader.readAsText(file);
    } catch (error) {
      console.error('Erro ao restaurar banco de dados:', error);
      setIsLoading(false);
      toast.error(`Erro ao restaurar banco de dados: ${error.message}`);
    }
  };

  // Valores e funções expostos pelo contexto
  const value = {
    showBackupDialog,
    setShowBackupDialog,
    handleBackupDatabase,
    handleRestoreDatabase
  };

  return <BackupContext.Provider value={value}>{children}</BackupContext.Provider>;
};
