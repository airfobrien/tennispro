import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "TennisPro has transformed how I analyze my students' technique. The AI insights save me hours of manual video review.",
    author: 'Maria Santos',
    role: 'Head Coach, Miami Tennis Academy',
    rating: 5,
  },
  {
    quote:
      'The progression tracking keeps my students motivated. They love seeing their improvement visualized over time.',
    author: 'James Chen',
    role: 'Private Tennis Coach',
    rating: 5,
  },
  {
    quote:
      "Finally, a platform that understands what tennis coaches need. The student management features are incredibly intuitive.",
    author: 'Sophie Mueller',
    role: 'Junior Development Coach',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Coaches Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what tennis coaches are saying about TennisPro
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-2xl border bg-background p-6"
            >
              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
