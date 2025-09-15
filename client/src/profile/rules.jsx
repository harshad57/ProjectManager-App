import React from "react";

function Rules() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-red-500 flex items-center gap-2 mb-4">
        📜 Rules & Regulations
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        To ensure a safe and productive environment for everyone, please follow
        these rules while using <span className="font-semibold">Project Management</span>:
      </p>

      <ul className="list-disc list-inside space-y-3 text-gray-700 text-md">
        <li>
          <span className="font-semibold text-red-400">Respect Privacy –</span>{" "}
          Do not misuse or attempt to access other users’ private projects or data.
        </li>
        <li>
          <span className="font-semibold text-red-400">No Harmful Content –</span>{" "}
          Do not create or share projects containing offensive, abusive, or illegal content.
        </li>
        <li>
          <span className="font-semibold text-red-400">Account Responsibility –</span>{" "}
          You are responsible for keeping your login credentials safe.
        </li>
        <li>
          <span className="font-semibold text-red-400">Fair Use –</span>{" "}
          Use the platform only for personal or professional project management purposes.
        </li>
        <li>
          <span className="font-semibold text-red-400">No Spamming –</span>{" "}
          Avoid creating spam projects, duplicate accounts, or using bots.
        </li>
        <li>
          <span className="font-semibold text-red-400">Data Deletion –</span>{" "}
          Once you delete your account, all related projects, tasks, and comments
          will be permanently removed.
        </li>
        <li>
          <span className="font-semibold text-red-400">Right to Suspend –</span>{" "}
          We reserve the right to suspend or delete accounts violating these rules.
        </li>
      </ul>

      <p className="mt-6 text-gray-600 text-sm italic">
        By using this platform, you agree to follow these rules and help maintain a
        respectful community.
      </p>
    </div>
  );
}

export default Rules;
