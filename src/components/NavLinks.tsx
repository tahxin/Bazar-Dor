import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="flex items-center justify-start gap-4 py-2 text-lg font-medium">
      <Link href="/chal">🍚 চাল</Link>
      <Link href="/dal">🫘 ডাল</Link>
      <Link href="/tel">🛢️ তেল</Link>
      <Link href="/sobji">🥬 সবজি</Link>
      <Link href="/mach">🐟 মাছ</Link>
      <Link href="/mangsho">🍗 মাংস</Link>
      <Link href="/dim-dui">🥛 ডিম-দুধ</Link>
      <Link href="/mosla">🌶️ মসলা</Link>
    </div>
  );
};

export default NavLinks;
