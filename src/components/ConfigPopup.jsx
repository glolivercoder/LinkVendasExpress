import { useState, useRef, useEffect } from 'react';
import EnhancedBackupConfig from './EnhancedBackupConfig';
import { useToast } from './ui/toast';
import { createEnhancedBackup, saveBackupFile, restoreBackup } from '../services/enhancedBackupService';
import '../styles/popup.css';

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
  const popupBodyRef = useRef(null);
  const { toast } = useToast();

  const handleSaveConfig = () => {
    setBackupLocation(tempBackupLocation);
    setAutoBackup(tempAutoBackup);
    localStorage.setItem('backupLocation', tempBackupLocation);
    localStorage.setItem('autoBackup', tempAutoBackup);
    setShowConfigPopup(false);
  };

  // Bloquear scroll do body principal quando o popup está aberto
  useEffect(() => {
    if (showConfigPopup) {
      document.body.style.overflow = 'hidden';

      // Função para lidar com o evento de roda do mouse
      const handleWheel = (e) => {
        // Verifica se o elemento tem barra de rolagem
        const hasVerticalScrollbar = e.currentTarget.scrollHeight > e.currentTarget.clientHeight;

        if (hasVerticalScrollbar) {
          const { deltaY } = e;
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

          // Verifica se está no topo e tentando rolar para cima
          const isScrollingUp = deltaY < 0;
          const isAtTop = scrollTop === 0;

          // Verifica se está no fundo e tentando rolar para baixo
          const isScrollingDown = deltaY > 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

          // Se estiver no limite e tentando rolar além, previne o comportamento padrão
          if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            e.preventDefault();
          }
        } else {
          // Se não tiver barra de rolagem, previne qualquer rolagem
          e.preventDefault();
        }

        // Impede que o evento se propague para o body
        e.stopPropagation();
      };

      // Adiciona o evento a todos os elementos com a classe configuracoes-scrollable
      const scrollableElements = document.querySelectorAll('.configuracoes-scrollable');
      scrollableElements.forEach(element => {
        element.addEventListener('wheel', handleWheel, { passive: false });
      });

      // Adiciona evento de toque para dispositivos móveis
      const handleTouchMove = (e) => {
        // Impede que o evento se propague para o body
        e.stopPropagation();
      };

      scrollableElements.forEach(element => {
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
      });

      // Cleanup: remove os event listeners quando o componente for desmontado
      return () => {
        document.body.style.overflow = '';
        scrollableElements.forEach(element => {
          element.removeEventListener('wheel', handleWheel);
          element.removeEventListener('touchmove', handleTouchMove);
        });
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [showConfigPopup]);

  // Efeito para lidar com os elementos expansíveis
  useEffect(() => {
    if (showConfigPopup && !showEnhancedBackup) {
      // Função para ajustar o scroll quando um details é aberto/fechado
      const handleDetailsToggle = (e) => {
        // Aguarda um momento para que o conteúdo seja renderizado
        setTimeout(() => {
          // Se o popup tiver uma barra de rolagem, ajusta para garantir que o conteúdo seja visível
          if (popupBodyRef.current) {
            // Recalcula a altura do conteúdo
            const isOpen = e.target.hasAttribute('open');

            if (isOpen) {
              // Se o details foi aberto, verifica se o conteúdo está visível
              const detailsRect = e.target.getBoundingClientRect();
              const popupRect = popupBodyRef.current.getBoundingClientRect();

              // Se o details estiver parcialmente fora da área visível, ajusta o scroll
              if (detailsRect.bottom > popupRect.bottom) {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
            }
          }
        }, 100);
      };

      // Adiciona o evento a todos os elementos details
      const detailsElements = document.querySelectorAll('.config-section, .config-subsection');
      detailsElements.forEach(element => {
        element.addEventListener('toggle', handleDetailsToggle);
      });

      // Cleanup
      return () => {
        detailsElements.forEach(element => {
          element.removeEventListener('toggle', handleDetailsToggle);
        });
      };
    }
  }, [showConfigPopup, showEnhancedBackup]);

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
          <div ref={popupBodyRef} className="popup-body configuracoes-scrollable">
            {/* Seção de Backup com subcategorias */}
            <details open className="config-section">
              <summary className="config-section-title">
                <span>Backup</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </summary>
              <div className="config-section-content">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Configurações de Backup</h3>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => setShowEnhancedBackup(true)}
                  >
                    Sistema de Backup Avançado
                  </button>
                </div>

                {/* Subcategorias de Backup */}
                <details className="config-subsection">
                  <summary className="config-subsection-title">
                    <span>Configurações Básicas</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </summary>
                  <div className="config-subsection-content">
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
                  </div>
                </details>

                <details className="config-subsection">
                  <summary className="config-subsection-title">
                    <span>Opções Avançadas</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </summary>
                  <div className="config-subsection-content">
                    <div className="form-group">
                      <label>Frequência de Backup Automático:</label>
                      <select className="form-control">
                        <option value="after_sale">Após cada venda</option>
                        <option value="hourly">A cada hora</option>
                        <option value="daily">Diariamente</option>
                        <option value="weekly">Semanalmente</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Formato de Backup:</label>
                      <select className="form-control">
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                        <option value="sql">SQL</option>
                      </select>
                    </div>
                  </div>
                </details>
              </div>
            </details>

            {/* Seção de Personalização com subcategorias */}
            <details className="config-section">
              <summary className="config-section-title">
                <span>Personalização</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </summary>
              <div className="config-section-content">
                <details className="config-subsection" open>
                  <summary className="config-subsection-title">
                    <span>Aparência</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </summary>
                  <div className="config-subsection-content">
                    <div className="form-group">
                      <label>Tema do Sistema:</label>
                      <select className="form-control">
                        <option value="green">Verde</option>
                        <option value="blue">Azul</option>
                        <option value="purple">Roxo</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Modo:</label>
                      <select className="form-control">
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="auto">Automático (Sistema)</option>
                      </select>
                    </div>
                  </div>
                </details>

                <details className="config-subsection">
                  <summary className="config-subsection-title">
                    <span>Tipografia</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </summary>
                  <div className="config-subsection-content">
                    <div className="form-group">
                      <label>Fonte:</label>
                      <select className="form-control">
                        <option value="Arial">Arial</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Inter">Inter</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tamanho da Fonte:</label>
                      <select className="form-control">
                        <option value="small">Pequeno</option>
                        <option value="medium">Médio</option>
                        <option value="large">Grande</option>
                      </select>
                    </div>
                  </div>
                </details>
              </div>
            </details>

            {/* Seção de Interface */}
            <details className="config-section">
              <summary className="config-section-title">
                <span>Interface</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="chevron-icon">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </summary>
              <div className="config-section-content">
                <div className="form-group">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked={true} />
                    <span className="ml-2">Mostrar dicas de ferramentas</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked={true} />
                    <span className="ml-2">Animações de interface</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Densidade da Interface:</label>
                  <select className="form-control">
                    <option value="compact">Compacta</option>
                    <option value="normal">Normal</option>
                    <option value="comfortable">Confortável</option>
                  </select>
                </div>
              </div>
            </details>

            <div className="form-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowConfigPopup(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-save"
                onClick={handleSaveConfig}
              >
                Salvar
              </button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigPopup;
