"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SMTPAccount {
  id?: string;
  name: string;
  email: string;
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
  from: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  plainTextContent: string;
  variables: string[];
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: "contact-confirmation",
    name: "Contact Confirmation",
    subject: "Thank you for contacting Manar Cargo",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you {{name}}!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p>{{message}}</p>
      </div>
    `,
    plainTextContent: "Thank you {{name}}! We have received your message and will get back to you shortly.",
    variables: ["name", "message"],
  },
  {
    id: "admin-notification",
    name: "Admin Notification",
    subject: "New Contact Submission from {{name}}",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Subject:</strong> {{subject}}</p>
        <p><strong>Message:</strong></p>
        <p>{{message}}</p>
      </div>
    `,
    plainTextContent: "New inquiry from {{name}} ({{email}}): {{message}}",
    variables: ["name", "email", "subject", "message"],
  },
];

export default function EmailSettingsPage() {
  const [activeTab, setActiveTab] = useState("smtp");
  const [smtpAccounts, setSmtpAccounts] = useState<SMTPAccount[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const [newAccount, setNewAccount] = useState<SMTPAccount>({
    name: "",
    email: "",
    host: "",
    port: 587,
    user: "",
    pass: "",
    secure: false,
    from: "",
  });

  useEffect(() => {
    fetch("/api/admin/smtp-accounts")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSmtpAccounts(data);
      })
      .catch(console.error);

    fetch("/api/admin/email-templates")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTemplates(
            data.map((t: { templateId: string; id?: string; name: string; subject: string; htmlContent: string; plainTextContent: string; variables: string[] }) => ({
              id: t.templateId || t.id,
              name: t.name,
              subject: t.subject,
              htmlContent: t.htmlContent,
              plainTextContent: t.plainTextContent,
              variables: t.variables || [],
            })),
          );
        }
      })
      .catch(console.error);
  }, []);

  const handleAddAccount = async () => {
    if (!newAccount.name || !newAccount.email || !newAccount.host || !newAccount.user) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/admin/smtp-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });
      if (!res.ok) throw new Error("Failed to add account");
      const account = await res.json();
      setSmtpAccounts([...smtpAccounts, account]);
      setNewAccount({ name: "", email: "", host: "", port: 587, user: "", pass: "", secure: false, from: "" });
      toast.success("SMTP account added successfully");
    } catch {
      toast.error("Failed to add SMTP account");
    }
  };

  const handleDeleteAccount = async (index: number) => {
    const account = smtpAccounts[index];
    try {
      const res = await fetch(`/api/admin/smtp-accounts?id=${(account as SMTPAccount & { id?: string }).id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setSmtpAccounts(smtpAccounts.filter((_, i) => i !== index));
      toast.success("SMTP account deleted");
    } catch {
      toast.error("Failed to delete account");
    }
  };

  const handleUpdateTemplate = async (template: EmailTemplate) => {
    try {
      const res = await fetch("/api/admin/email-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(template),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = templates.map((t) => (t.id === template.id ? template : t));
      setTemplates(updated);
      setEditingTemplate(null);
      toast.success("Email template updated");
    } catch {
      toast.error("Failed to update template");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Configure SMTP accounts and email templates for your website.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="smtp">SMTP Accounts</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        {/* SMTP Accounts Tab */}
        <TabsContent value="smtp" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Add New SMTP Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name *</Label>
                <Input
                  id="account-name"
                  placeholder="e.g., Dubai Support"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-email">Email Address *</Label>
                <Input
                  id="account-email"
                  type="email"
                  placeholder="support@manarcargo.com"
                  value={newAccount.email}
                  onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host *</Label>
                <Input
                  id="smtp-host"
                  placeholder="smtp.gmail.com"
                  value={newAccount.host}
                  onChange={(e) => setNewAccount({ ...newAccount, host: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input
                  id="smtp-port"
                  type="number"
                  placeholder="587"
                  value={newAccount.port}
                  onChange={(e) => setNewAccount({ ...newAccount, port: parseInt(e.target.value) || 587 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-user">Username *</Label>
                <Input
                  id="smtp-user"
                  placeholder="your-email@gmail.com"
                  value={newAccount.user}
                  onChange={(e) => setNewAccount({ ...newAccount, user: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-pass">Password *</Label>
                <Input
                  id="smtp-pass"
                  type="password"
                  placeholder="Your app password"
                  value={newAccount.pass}
                  onChange={(e) => setNewAccount({ ...newAccount, pass: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-from">From Address (Optional)</Label>
                <Input
                  id="smtp-from"
                  placeholder="Manar Cargo <support@manarcargo.com>"
                  value={newAccount.from}
                  onChange={(e) => setNewAccount({ ...newAccount, from: e.target.value })}
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newAccount.secure}
                    onChange={(e) => setNewAccount({ ...newAccount, secure: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Use Secure Connection (TLS/SSL)</span>
                </label>
              </div>
            </div>

            <Button onClick={handleAddAccount} className="mt-6 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </div>

          {/* SMTP Accounts List */}
          <div className="space-y-4">
            {smtpAccounts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                No SMTP accounts configured yet. Add one to get started.
              </div>
            ) : (
              smtpAccounts.map((account, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Account Name</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{account.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{account.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">SMTP Host</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{account.host}:{account.port}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{account.user}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Password</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {showPasswords[index] ? account.pass : "•".repeat(account.pass.length)}
                        </p>
                        <button
                          onClick={() =>
                            setShowPasswords({ ...showPasswords, [index]: !showPasswords[index] })
                          }
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {showPasswords[index] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Security</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {account.secure ? "TLS/SSL" : "None"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteAccount(index)}
                    variant="destructive"
                    className="mt-4"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Variables: {template.variables.join(", ")}
                      </p>
                    </div>
                    <Button
                      onClick={() => setEditingTemplate(template)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject:</p>
                    <p className="text-gray-600 dark:text-gray-400">{template.subject}</p>
                  </div>
                </div>

                {/* Edit Template Modal */}
                {editingTemplate?.id === template.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-750 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`subject-${template.id}`}>Email Subject</Label>
                      <Input
                        id={`subject-${template.id}`}
                        value={editingTemplate.subject}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            subject: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`html-${template.id}`}>HTML Content</Label>
                      <Textarea
                        id={`html-${template.id}`}
                        value={editingTemplate.htmlContent}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            htmlContent: e.target.value,
                          })
                        }
                        rows={10}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Use {'{variable}'} for dynamic content
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`text-${template.id}`}>Plain Text Content</Label>
                      <Textarea
                        id={`text-${template.id}`}
                        value={editingTemplate.plainTextContent}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            plainTextContent: e.target.value,
                          })
                        }
                        rows={6}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleUpdateTemplate(editingTemplate)}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Template
                      </Button>
                      <Button
                        onClick={() => setEditingTemplate(null)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Tip:</strong> Use variables like {'{name}'}, {'{email}'}, {'{subject}'}, and {'{message}'} in your templates. They will be replaced with actual data when emails are sent.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
