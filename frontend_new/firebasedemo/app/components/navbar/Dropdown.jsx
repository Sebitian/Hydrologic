import { Navlink } from "./NavLink"

export const Dropdown = ({ navLinks }) => {
  return(
    <ul className="flex flex-col items-center pb-3">
      {navLinks.map((field, index) => (
        <li key={index} className="py-2 px-3 rounded-lg w-5/6 text-center">
          <Navlink href={field.path} title={field.title}/>
        </li>
      ))}
    </ul>
  )
}