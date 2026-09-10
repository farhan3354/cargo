"use client";

import { useState } from "react";
import MediaPicker from "@/components/MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateOffice } from "@/app/actions/admin";
import { toast } from "sonner";

type Office = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  phones?: string[];
  description?: string;
  address?: string;
  location?: string;
  country?: string;
  imageUrl?: string;
};

export default function EditOfficeForm({
  office,
  onSuccess,
  onCancel,
}: {
  office: Office;
  onSuccess: (updated: Office) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(office.name);
  const [email, setEmail] = useState(office.email);
  const [phonesStr, setPhonesStr] = useState(
    (office.phones && office.phones.length > 0 ? office.phones : office.phone ? [office.phone] : []).join(", ")
  );
  const [description, setDescription] = useState(office.description ?? "");
  const [address, setAddress] = useState(office.address ?? "");
  const [imageUrl, setImageUrl] = useState(office.imageUrl ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 107; // Maximum characters for description

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const phones = phonesStr
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      const updated = await updateOffice(office.id, {
        name,
        email,
        phones,
        description,
        address,
        imageUrl,
      });
      toast.success("Office updated!");
      onSuccess(updated as unknown as Office);
    } catch {
      toast.error("Failed to update office.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#110713]">Edit Office</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Office Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={MAX_CHARS}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Brief description of this office..."
            />
            <div className="flex justify-between text-xs">
              <span className={description.length > MAX_CHARS ? "text-red-500" : "text-muted-foreground"}>
                {description.length} / {MAX_CHARS} characters
              </span>
              <span className="text-muted-foreground">
                {Math.ceil(description.length / 5)} words approx.
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Example: "Our Hargeisa branch supports cargo delivery, customer assistance, and shipment tracking across Somaliland." (107 chars)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Contact Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phones">Phone Numbers</Label>
            <Input
              id="edit-phones"
              value={phonesStr}
              onChange={(e) => setPhonesStr(e.target.value)}
              placeholder="+971 52 397 9396, +971 45 476 860"
            />
            <p className="text-xs text-muted-foreground">Comma-separated phone numbers</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Address</Label>
            <Input
              id="edit-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Dubai, UAE"
            />
          </div>

          <div className="space-y-2">
            <Label>Office Image</Label>
            {imageUrl ? (
              <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 mb-2">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="object-cover w-full h-full"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-7"
                  onClick={() => setImageUrl("")}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <MediaPicker onMediaSelect={(url) => setImageUrl(url)} />
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import MediaPicker from "@/components/MediaPicker";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { updateOffice } from "@/app/actions/admin";
// import { toast } from "sonner";

// type Office = {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   phones?: string[];
//   description?: string;
//   address?: string;
//   location?: string;
//   country?: string;
//   imageUrl?: string;
// };

// export default function EditOfficeForm({
//   office,
//   onSuccess,
//   onCancel,
// }: {
//   office: Office;
//   onSuccess: (updated: Office) => void;
//   onCancel: () => void;
// }) {
//   const [name, setName] = useState(office.name);
//   const [email, setEmail] = useState(office.email);
//   const [phonesStr, setPhonesStr] = useState(
//     (office.phones && office.phones.length > 0 ? office.phones : office.phone ? [office.phone] : []).join(", ")
//   );
//   const [description, setDescription] = useState(office.description ?? "");
//   const [address, setAddress] = useState(office.address ?? "");
//   const [imageUrl, setImageUrl] = useState(office.imageUrl ?? "");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const phones = phonesStr
//         .split(",")
//         .map((p) => p.trim())
//         .filter(Boolean);

//       const updated = await updateOffice(office.id, {
//         name,
//         email,
//         phones,
//         description,
//         address,
//         imageUrl,
//       });
//       toast.success("Office updated!");
//       onSuccess(updated as unknown as Office);
//     } catch {
//       toast.error("Failed to update office.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4 text-[#110713]">Edit Office</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="edit-name">Office Name</Label>
//             <Input
//               id="edit-name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="edit-description">Description</Label>
//             <textarea
//               id="edit-description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//               className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//               placeholder="Brief description of this office..."
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="edit-email">Contact Email</Label>
//             <Input
//               id="edit-email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="edit-phones">Phone Numbers</Label>
//             <Input
//               id="edit-phones"
//               value={phonesStr}
//               onChange={(e) => setPhonesStr(e.target.value)}
//               placeholder="+971 52 397 9396, +971 45 476 860"
//             />
//             <p className="text-xs text-muted-foreground">Comma-separated phone numbers</p>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="edit-address">Address</Label>
//             <Input
//               id="edit-address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="e.g. Dubai, UAE"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Office Image</Label>
//             {imageUrl ? (
//               <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 mb-2">
//                 <img
//                   src={imageUrl}
//                   alt="Uploaded"
//                   className="object-cover w-full h-full"
//                 />
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="sm"
//                   className="absolute top-2 right-2 h-7"
//                   onClick={() => setImageUrl("")}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ) : (
//               <MediaPicker onMediaSelect={(url) => setImageUrl(url)} />
//             )}
//           </div>

//           <div className="flex gap-2 justify-end">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Saving…" : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }