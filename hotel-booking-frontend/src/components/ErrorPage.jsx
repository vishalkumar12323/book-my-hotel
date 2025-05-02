import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const getErrorDetails = () => {
    if (error.status === 404) {
      return {
        title: "404 - Page Not Found",
        message: "The page you're looking for doesn't exist.",
        icon: "🔍",
      };
    } else if (error.status === 403) {
      return {
        title: "403 - Forbidden",
        message: "You don't have permission to access this resource.",
        icon: "🚫",
      };
    } else if (error.status === 500) {
      return {
        title: "500 - Server Error",
        message: "Something went wrong on our servers.",
        icon: "⚠️",
      };
    }
    return {
      title: "Oops! Something went wrong",
      message: error.message || "An unexpected error occurred.",
      icon: "❌",
    };
  };

  const { title, message, icon } = getErrorDetails();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-4">
          <span className="text-6xl">{icon}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Go Home
          </button>
        </div>
        {import.meta.env.DEV && error.stack && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <p className="text-left text-sm text-gray-600 font-mono overflow-auto">
              {error.stack}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
