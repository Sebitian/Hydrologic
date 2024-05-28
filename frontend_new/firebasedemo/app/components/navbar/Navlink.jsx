import Link from "next/link";

export const Navlink = ({ href, title }) => {
  return (
    <>
      <div className="py-2 px-3 hover:bg-[#505050] rounded-lg">
        <Link
          href={href}
          className="text-[#b5bfc7] sm:text-xl"
        >
          {title}
        </Link>
      </div>
    </>
  )
}