import React from "react";

function Privacy() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2 mb-4">
        🔒 Privacy
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        At <span className="font-semibold">Project Flow</span>, we value your
        privacy and are committed to protecting your personal information.
      </p>

      <ul className="list-disc list-inside space-y-3 text-gray-700 text-md">
        <li>
          <span className="font-semibold text-green-500">Account Security –</span>{" "}
          Your data is securely stored and accessible only to you.
        </li>
        <li>
          <span className="font-semibold text-green-500">Project Privacy –</span>{" "}
          Projects marked as <span className="font-semibold">Private</span> are
          only visible to you. Public projects can be shared with others.
        </li>
        <li>
          <span className="font-semibold text-green-500">Data Ownership –</span>{" "}
          You own your projects, tasks, and comments. We do not share or sell your
          data to third parties.
        </li>
        <li>
          <span className="font-semibold text-green-500">Delete Anytime –</span>{" "}
          You can delete your account at any time. Deleting your account will
          permanently remove all your projects, tasks, and comments.
        </li>
        <li>
          <span className="font-semibold text-green-500">Minimal Data –</span>{" "}
          We only collect the information necessary to provide you with project
          and task management features.
        </li>
      </ul>

      <p className="mt-6 text-gray-600 text-sm italic">
        If you have any concerns about your data or privacy, feel free to contact
        us at <span className="font-semibold">support@projectflow.com</span>.
      </p>
    </div>
  );
}

export default Privacy;
