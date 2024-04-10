// ProgressSteps Component
// This component renders a set of progress steps for a multi-step process.
// Props:
// - step1: A boolean indicating whether step 1 is completed.
// - step2: A boolean indicating whether step 2 is completed.
// - step3: A boolean indicating whether step 3 is completed.
const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {/* Step 1: Login */}
      <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
        <span className="ml-2">Login</span>
        <div className="mt-2 text-lg text-center">✅</div>
      </div>

      {/* Step 2: Shipping (conditionally rendered if step2 is true) */}
      {step2 && (
        <>
          {/* Conditional line indicating progress between steps 1 and 2 */}
          {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
          <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
            <span>Shipping</span>
            <div className="mt-2 text-lg text-center">✅</div>
          </div>
        </>
      )}

      {/* Step 3: Summary (conditionally rendered if step3 is true) */}
      <>
        {/* Conditional line indicating progress between steps 2 and 3 */}
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-green-500"></div>
        ) : (
          ""
        )}

        {/* Summary step (conditionally aligned if step3 is false) */}
        <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
          <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Summary</span>
          {/* Checkmark icon displayed if all previous steps are completed */}
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center">✅</div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
