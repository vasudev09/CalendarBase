"use client";
import { useAuth } from "@/context/AuthContext";

const LoadingSpinner = ({
  addCondition,
  children,
}: Readonly<{
  addCondition?: string;
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = useAuth();

  const shouldShowSpinner =
    addCondition === "authFalse"
      ? isAuthenticated === false ||
        isAuthenticated == null ||
        isAuthenticated == undefined
      : isAuthenticated == null || isAuthenticated == undefined;

  return (
    <>
      {shouldShowSpinner ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="spinner"></div>
          <style jsx>{`
            .spinner {
              display: inline-block;
              width: 60px;
              height: 60px;
            }
            .spinner:after {
              content: " ";
              display: block;
              width: 50px;
              height: 50px;
              margin: 8px;
              border-radius: 50%;
              border: 5px solid #4a90e2;
              border-color: #4a90e2 transparent #4a90e2 transparent;
              animation: dual-ring 1.2s linear infinite;
            }
            @keyframes dual-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LoadingSpinner;
