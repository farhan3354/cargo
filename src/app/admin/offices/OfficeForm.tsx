"use client";

import { useState } from "react";
import { createOffice } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";

export function OfficeForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const MAX_CHARS = 107; // Maximum characters for description

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const phonesRaw = formData.get("phones") as string;
      const phones = phonesRaw
        ? phonesRaw.split(",").map((p) => p.trim()).filter(Boolean)
        : [];

      await createOffice({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phones,
        description: formData.get("description") as string,
        address: formData.get("address") as string,
        imageUrl,
      });
      const form = document.getElementById("office-form") as HTMLFormElement;
      form.reset();
      setImageUrl("");
      setDescription("");
      toast.success("Office added successfully!");
    } catch {
      toast.error("Failed to add office. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="office-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Office Name</Label>
        <Input id="name" name="name" required placeholder="e.g. Dubai Office" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <Label htmlFor="email">Contact Email</Label>
        <Input id="email" name="email" type="email" required placeholder="contact@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phones">Phone Numbers</Label>
        <Input id="phones" name="phones" placeholder="+971 52 397 9396, +971 45 476 860" />
        <p className="text-xs text-muted-foreground">Comma-separated phone numbers</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" placeholder="Dubai, UAE" />
      </div>

      <div className="space-y-2">
        <Label>Office Image</Label>
        {imageUrl ? (
          <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Uploaded" className="object-cover w-full h-full" />
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

      <Button type="submit" className="w-full bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Office"}
      </Button>
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { createOffice } from "@/app/actions/admin";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import MediaPicker from "@/components/MediaPicker";
// import { toast } from "sonner";

// export function OfficeForm() {
//   const [imageUrl, setImageUrl] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function handleSubmit(formData: FormData) {
//     setIsSubmitting(true);
//     try {
//       const phonesRaw = formData.get("phones") as string;
//       const phones = phonesRaw
//         ? phonesRaw.split(",").map((p) => p.trim()).filter(Boolean)
//         : [];

//       await createOffice({
//         name: formData.get("name") as string,
//         email: formData.get("email") as string,
//         phones,
//         description: formData.get("description") as string,
//         address: formData.get("address") as string,
//         location: formData.get("location") as string,
//         country: formData.get("country") as string,
//         imageUrl,
//       });
//       const form = document.getElementById("office-form") as HTMLFormElement;
//       form.reset();
//       setImageUrl("");
//       toast.success("Office added successfully!");
//     } catch {
//       toast.error("Failed to add office. Is the backend running?");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <form id="office-form" action={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="name">Office Name</Label>
//         <Input id="name" name="name" required placeholder="e.g. Dubai Office" />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="description">Description</Label>
//         <textarea
//           id="description"
//           name="description"
//           rows={3}
//           className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           placeholder="Brief description of this office..."
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="email">Contact Email</Label>
//         <Input id="email" name="email" type="email" required placeholder="contact@example.com" />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="phones">Phone Numbers</Label>
//         <Input id="phones" name="phones" placeholder="+971 52 397 9396, +971 45 476 860" />
//         <p className="text-xs text-muted-foreground">Comma-separated phone numbers</p>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="location">Location</Label>
//         <Input id="location" name="location" placeholder="e.g. Dubai, UAE" />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="country">Country</Label>
//         <Input id="country" name="country" placeholder="e.g. UAE" />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="address">Address</Label>
//         <Input id="address" name="address" placeholder="123 Main St, City" />
//       </div>

//       <div className="space-y-2">
//         <Label>Office Image</Label>
//         {imageUrl ? (
//           <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img src={imageUrl} alt="Uploaded" className="object-cover w-full h-full" />
//             <Button
//               type="button"
//               variant="destructive"
//               size="sm"
//               className="absolute top-2 right-2 h-7"
//               onClick={() => setImageUrl("")}
//             >
//               Remove
//             </Button>
//           </div>
//         ) : (
//           <MediaPicker onMediaSelect={(url) => setImageUrl(url)} />
//         )}
//       </div>

//       <Button type="submit" className="w-full bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting}>
//         {isSubmitting ? "Adding..." : "Add Office"}
//       </Button>
//     </form>
//   );
// }
