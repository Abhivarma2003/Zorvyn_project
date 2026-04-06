const EmptyState = ({ message }: { message: string }) => (
  <div className="empty-state">
    <h3>Nothing to show yet</h3>
    <p>{message}</p>
  </div>
);

export default EmptyState;
