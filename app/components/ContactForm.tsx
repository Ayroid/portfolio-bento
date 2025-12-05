'use client';

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div id="contact" className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
      <h2 className="text-3xl font-bold text-white mb-6">CONTACT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-zinc-400 text-sm mb-2">Name</label>
          <input
            type="text"
            placeholder="Wayne Harkwood"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="wayne_harkwood@soupdate.com"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-2">Message</label>
          <textarea
            rows={4}
            placeholder="Tell me more about your project..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-2">Project Budget (optional)</label>
          <select className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-zinc-600">
            <option>Select budget range</option>
            <option>$1,000 - $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000+</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded-sm hover:bg-zinc-200 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
