import { useState, useRef } from 'react';
import EnhancedBackupConfig from './EnhancedBackupConfig';
import { useToast } from './ui/toast';
import { createEnhancedBackup, saveBackupFile, restoreBackup } from '../services/enhancedBackupService';

const ConfigPopup = ({
  showConfigPopup,
  setShowConfigPopup,
  backupLocation,
  setBackupLocation,
  autoBackup,
  setAutoBackup
}) => {
  const [tempBackupLocation, setTempBackupLocation] = useState(backupLocation);
  const [tempAutoBackup, setTempAutoBackup] = useState(autoBackup);
  const [showEnhancedBackup, setShowEnhancedBackup] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleSaveConfig = () => {
    setBackupLocation(tempBackupLocation);
    setAutoBackup(tempAutoBackup);
    localStorage.setItem('backupLocation', tempBackupLocation);
    localStorage.setItem('autoBackup', tempAutoBackup);
    setShowConfigPopup(false);
  };

  // Bloquear scroll do body principal quando o popup está aberto
  if (typeof window !== 'undefined') {
    if (showConfigPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (!showConfigPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Configurações</h2>
          <button onClick={() => setShowConfigPopup(false)} className="close-button">×</button>
        </div>

        {showEnhancedBackup ? (
          <EnhancedBackupConfig onClose={() => setShowEnhancedBackup(false)} />
        ) : (
          <div className="popup-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <details open style={{ marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: 6, padding: 12, background: '#f9fafb' }}>
              <summary style={{ fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Backup</summary>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Configurações de Backup</h3>
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => setShowEnhancedBackup(true)}
                >
                  Sistema de Backup Avançado
                </button>
              </div>

              <div className="form-group">
                <label>Local de Backup:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Caminho para salvar backups automáticos"
                  value={tempBackupLocation}
                  onChange={e => setTempBackupLocation(e.target.value)}
                />
                <div className="form-helper">
                  <small>Este caminho é usado apenas para backups automáticos. Para backups manuais, você poderá escolher onde salvar.</small>
                </div>
              </div>
              <div className="form-group">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tempAutoBackup}
                    onChange={e => setTempAutoBackup(e.target.checked)}
                  />
                  <span className="ml-2">Backup automático após cada venda</span>
                </label>
              </div>
            </details>

            <details style={{ marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: 6, padding: 12, background: '#f9fafb' }}>
              <summary style={{ fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Personalização</summary>
              <div style={{ marginTop: 8 }}>
                <div className="form-group">
                  <label>Tema do Sistema:</label>
                  <select className="form-control">
                    <option value="green">Verde</option>
                    <option value="blue">Azul</option>
                    <option value="purple">Roxo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fonte:</label>
                  <select className="form-control">
                    <option value="Arial">Arial</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Inter">Inter</option>
                  </select>
                </div>
              </div>
            </details>

            <div className="form-actions" style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button
                className="btn-cancel"
                onClick={() => setShowConfigPopup(false)}
                style={{padding: '8px 16px', borderRadius: 5, background: '#eee', border: 'none'}}
              >
                Cancelar
              </button>
              <button
                className="btn-save"
                onClick={handleSaveConfig}
                style={{padding: '8px 16px', borderRadius: 5, background: '#1d4ed8', color: '#fff', border: 'none'}}
              >
                Salvar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigPopup;
