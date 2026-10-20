import { type FormEvent, useState } from "react";

interface CheckoutDeliveryFormProps {
  totalCentsFormatted: string;
  formError: string | null;
  onSubmit: (data: {
    customerName: string;
    neighborhood: string;
    addressLine: string;
    orderNotes: string;
  }) => void;
}

export function CheckoutDeliveryForm({
  totalCentsFormatted,
  formError,
  onSubmit,
}: CheckoutDeliveryFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit({
      customerName,
      neighborhood,
      addressLine,
      orderNotes,
    });
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h3 className="form-section-title">Dados para Entrega</h3>

      <div className="form-field">
        <label htmlFor="customer-name-input">Seu nome *</label>
        <input
          id="customer-name-input"
          type="text"
          required
          placeholder="Ex.: Ana Beatriz"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="customer-neighborhood-input">Bairro *</label>
        <input
          id="customer-neighborhood-input"
          type="text"
          required
          placeholder="Ex.: Centro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="customer-address-input">
          Endereço com número e complemento *
        </label>
        <input
          id="customer-address-input"
          type="text"
          required
          placeholder="Ex.: Rua das Flores, 120 - Apto 12"
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="customer-notes-input">
          Observações do pedido (opcional)
        </label>
        <textarea
          id="customer-notes-input"
          rows={2}
          placeholder="Ex.: Sem cebola, tocar interfone 12..."
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
        />
      </div>

      {formError ? (
        <p className="form-error-banner" role="alert">
          {formError}
        </p>
      ) : null}

      <button type="submit" className="submit-order-btn">
        Enviar Pedido · {totalCentsFormatted}
      </button>
    </form>
  );
}
