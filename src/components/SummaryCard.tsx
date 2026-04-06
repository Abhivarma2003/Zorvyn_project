import { ReactNode } from 'react';

const SummaryCard = ({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: ReactNode;
}) => {
  return (
    <div className="summary-card">
      <div className="summary-card__header">
        <p>{label}</p>
        <span>{children}</span>
      </div>
      <strong>{value}</strong>
    </div>
  );
};

export default SummaryCard;
