import { RetryButton } from '../Buttons/RetryButton';

export const ErrorPopup = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      {message}
      {onRetry && <RetryButton onClick={onRetry} />}
    </div>
  );
};
