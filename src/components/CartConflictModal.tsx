interface CartConflictModalProps {
  currentPartnerName: string;
  newPartnerName: string;
  onConfirmClearAndAdd: () => void;
  onCancel: () => void;
}

export function CartConflictModal({
  currentPartnerName,
  newPartnerName,
  onConfirmClearAndAdd,
  onCancel,
}: CartConflictModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="conflict-dialog-title"
        aria-describedby="conflict-dialog-desc"
      >
        <h3 id="conflict-dialog-title" className="modal-title">
          Deseja trocar de estabelecimento?
        </h3>
        <p id="conflict-dialog-desc" className="modal-body">
          Sua sacola possui itens de <strong>{currentPartnerName}</strong>.
          Cada pedido no Skalee Delivery é finalizado com apenas um parceiro por vez.
          Deseja limpar sua sacola atual e iniciar um novo pedido em{" "}
          <strong>{newPartnerName}</strong>?
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn-cancel"
            onClick={onCancel}
          >
            Manter sacola atual
          </button>
          <button
            type="button"
            className="modal-btn-confirm"
            onClick={onConfirmClearAndAdd}
          >
            Limpar e adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

