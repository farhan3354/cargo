"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactSubmission } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

interface AdminStatsProps {
  submissions: ContactSubmission[];
}

export function AdminStats({ submissions }: AdminStatsProps) {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    responded: 0,
    closed: 0,
    lastWeek: 0,
    avgResponseTime: "N/A",
  });

  useEffect(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const total = submissions.length;
    const pending = submissions.filter((s) => s.status === "pending").length;
    const responded = submissions.filter(
      (s) => s.status === "responded",
    ).length;
    const closed = submissions.filter((s) => s.status === "closed").length;
    const lastWeek = submissions.filter(
      (s) => new Date(s.createdAt) > oneWeekAgo,
    ).length;

    setStats({
      total,
      pending,
      responded,
      closed,
      lastWeek,
      avgResponseTime: "2-4 hours",
    });
  }, [submissions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-white border-[#E5E7EB] border-l-4 border-l-[#1F2288]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#66556B] flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Total Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#110713]">{stats.total}</div>
          <p className="text-xs text-[#66556B] mt-1">All time</p>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#E5E7EB] border-l-4 border-l-yellow-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#66556B] flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <p className="text-xs text-[#66556B] mt-1">Need response</p>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#E5E7EB] border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#66556B] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Responded
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
          <p className="text-xs text-[#66556B] mt-1">Completed</p>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#E5E7EB]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#66556B] flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Last 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#110713]">{stats.lastWeek}</div>
          <p className="text-xs text-[#66556B] mt-1">New submissions</p>
        </CardContent>
      </Card>
    </div>
  );
}

interface RecentSubmissionsProps {
  submissions: ContactSubmission[];
  limit?: number;
}

export function RecentSubmissions({
  submissions,
  limit = 5,
}: RecentSubmissionsProps) {
  const recent = submissions.slice(0, limit);

  return (
    <Card className="bg-white border-[#E5E7EB]">
      <CardHeader>
        <CardTitle className="text-[#110713]">Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No submissions yet
          </p>
        ) : (
          <div className="space-y-3">
            {recent.map((submission) => (
              <div
                key={submission.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {submission.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {submission.email}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">
                      {submission.message.substring(0, 80)}...
                    </p>
                  </div>
                  <div className="ml-2 flex items-center gap-2">
                    {submission.status === "pending" ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(submission.createdAt), {
                        addSuffix: false,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
