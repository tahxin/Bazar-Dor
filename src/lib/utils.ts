// ─── Bengali digit converter ───────────────────────────────────────────────

const BN: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
};

export function toBn(num: string | number): string {
  return String(num).replace(/[0-9]/g, (d) => BN[d]);
}

export function formatPrice(price: number): string {
  return toBn(price.toLocaleString("en-IN"));
}

// ─── Unit label ───────────────────────────────────────────────────────────

export function unitLabel(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return map[unit] ?? unit;
}
