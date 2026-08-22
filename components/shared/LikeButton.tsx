"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const STORAGE_KEY = "liked-thoughts";

/** ponytail: likes are deduped per browser via localStorage, not per person.
 *  Clearing site data or switching browsers lets someone like again. Fine for
 *  a personal site; needs a server-side identity check if it ever matters. */
function readLiked(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export const LikeButton = ({
  id,
  initialLikes,
}: {
  id: string;
  initialLikes: number;
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);

  // Read after mount: the server has no idea what this browser has liked, so
  // doing this during render would produce a hydration mismatch.
  useEffect(() => setLiked(readLiked().includes(id)), [id]);

  const like = async () => {
    if (liked || pending) return;
    setPending(true);
    setLikes((n) => n + 1); // optimistic
    setLiked(true);

    try {
      const res = await fetch(`/api/thoughts/${id}/like`, { method: "POST" });
      if (!res.ok) throw new Error(String(res.status));
      const { likes: total } = await res.json();
      setLikes(total);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([...new Set([...readLiked(), id])])
        );
      } catch {
        /* private mode — the like still counted on the server */
      }
    } catch {
      setLikes((n) => n - 1); // roll back
      setLiked(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={like}
      disabled={liked || pending}
      aria-label={liked ? `Liked, ${likes} total` : `Like this thought`}
      className={`group/like flex items-center gap-1.5 font-mono text-xs transition-colors ${
        liked ? "text-white" : "text-zinc-600 hover:text-zinc-300"
      } disabled:cursor-default`}
    >
      <Heart
        className={`h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-spring)] ${
          liked ? "fill-current" : "group-hover/like:scale-110"
        }`}
      />
      {likes > 0 && <span>{likes}</span>}
    </button>
  );
};
