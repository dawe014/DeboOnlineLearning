import { Spinner } from "flowbite-react"

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
        <Spinner size="xl" aria-label="Loading spinner" />
        <p className="text-lg font-semibold text-gray-700 dark:text-yellow-50">
          Loading...
        </p>
      </div>
    </div>
  );
}
