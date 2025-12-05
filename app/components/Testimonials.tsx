export function Testimonials() {
  const testimonials = [
    {
      company: 'ACTIVISION',
      text: '"The precision and clarity in Wayne\'s design work is unmatched. He brought our vision to life."',
    },
    {
      name: 'James Connor',
      title: 'Product Lead at Airbus',
      text: '"Professional and creative. The attention to detail was exceptional."',
    },
    {
      name: 'Emily Carter',
      title: 'Creative Director at HBO',
      text: '"Wayne exceeded all our expectations. The final product was stunning and delivered on time."',
    },
    {
      name: 'Sarah Mitchell',
      title: 'Head of Design at BOSE',
      text: '"Working with Wayne was a game-changer. They took our ideas and vision to an entirely new level."',
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white">TESTIMONIALS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
            {testimonial.company ? (
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xl font-bold text-white">{testimonial.company}</div>
              </div>
            ) : (
              <div className="mb-3">
                <div className="text-lg font-bold text-white">{testimonial.name}</div>
                <div className="text-zinc-500 text-xs">{testimonial.title}</div>
              </div>
            )}
            <p className="text-zinc-400 text-sm">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
