import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return // ✅ prevent SSR issues

    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)

    // set initial value
    setMatches(media.matches)

    // subscribe
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [query]) // ✅ remove `matches`

  return matches
}
