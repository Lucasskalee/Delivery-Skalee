interface ActiveCartResumeBannerProps {
  itemCount: number;
  partnerName: string;
  partnerId: string;
  onResume: (partnerId: string) => void;
  onClear: () => void;
}

export function ActiveCartResumeBanner({
  itemCount,
  partnerName,
  partnerId,
  onResume,
  onClear,
}: ActiveCartResumeBannerProps) {
  return (
    <div className="cart-resume-banner">
      <div>
        <strong>Sacola em andamento</strong>
        <p>
          Você possui {itemCount} item(ns) em <strong>{partnerName}</strong>.
        </p>
      </div>
      <div className="cart-resume-actions">
        <button
          type="button"
          className="resume-cart-btn"
          onClick={() => onResume(partnerId)}
        >
          Continuar em {partnerName} →
        </button>
        <button
          type="button"
          className="clear-cart-link"
          onClick={onClear}
        >
          Limpar sacola
        </button>
      </div>
    </div>
  );
}

