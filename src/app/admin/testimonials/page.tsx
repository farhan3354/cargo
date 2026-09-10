import { getTestimonials } from "@/app/actions/admin";
import { TestimonialForm } from "./TestimonialForm";
import TestimonialsList from "./TestimonialsList";

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  try {
    testimonials = await getTestimonials();
  } catch {
    testimonials = [];
  }

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#110713]">Our Customers &amp; Testimonials</h1>
        <p className="text-[#66556B] mt-2">
          Manage customer reviews and partner logos displayed in the &quot;Our Customers&quot; section on the homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
          <h2 className="text-xl font-semibold mb-4 text-[#110713]">Add New Testimonial</h2>
          <TestimonialForm />
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#110713]">
            Current Testimonials
            <span className="ml-2 text-sm font-normal text-[#66556B]">({testimonials.length} reviews)</span>
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
            <TestimonialsList initialTestimonials={testimonials as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
