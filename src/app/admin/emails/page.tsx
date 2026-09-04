import { getContactSubmissions, updateContactSubmissionStatus, deleteContactSubmission } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function EmailsPage() {
  let submissions: Awaited<ReturnType<typeof getContactSubmissions>> = [];
  try {
    submissions = await getContactSubmissions();
  } catch {
    submissions = [];
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const respondedCount = submissions.filter((s) => s.status === "responded").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#110713]">Contact Submissions</h1>
          <p className="text-[#66556B] mt-2">View and manage contact form submissions.</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
            <span className="font-bold">{pendingCount}</span> Pending
          </div>
          <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg">
            <span className="font-bold">{respondedCount}</span> Responded
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-[#66556B]">No contact submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9F7FA] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">From</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">Message</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#110713]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-[#F9F7FA] transition-colors">
                    <td className="px-6 py-4 text-sm text-[#110713] font-medium">{submission.name}</td>
                    <td className="px-6 py-4 text-sm text-[#66556B]">
                      <a href={`mailto:${submission.email}`} className="text-[#1F2288] hover:underline">
                        {submission.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#66556B] truncate max-w-[160px]">
                      {submission.subject || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#66556B] truncate max-w-xs">
                      {submission.message.length > 50
                        ? `${submission.message.substring(0, 50)}...`
                        : submission.message}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <form
                        action={async () => {
                          "use server";
                          const newStatus =
                            submission.status === "pending" ? "responded" : "pending";
                          await updateContactSubmissionStatus(submission.id, newStatus);
                        }}
                        className="inline"
                      >
                        <button
                          type="submit"
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            submission.status === "pending"
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          {submission.status === "pending" ? (
                            <>
                              <Clock className="w-4 h-4" />
                              Pending
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Responded
                            </>
                          )}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#66556B]">
                      {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <form
                        action={async () => {
                          "use server";
                          await deleteContactSubmission(submission.id);
                        }}
                        className="inline"
                      >
                        <Button type="submit" variant="destructive" size="icon" className="h-8 w-8">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
