import { NavLink } from "react-router-dom";

const TextBooksNav: React.FC = () => (
  <div className="h-[50px] w-[1500px] mr-auto ml-auto mt-3">
    <ul className="flex justify-between gap-3 text-sm  ">
      <li>
        <NavLink to="#">Окуу китептери</NavLink>
      </li>
      <li>
        <NavLink to="#">AI тарбиячысы</NavLink>
      </li>
      <li>
        <NavLink to="/ask-educators">Биздин тарбиячылардан сурагыла</NavLink>
      </li>
      <li>
        <NavLink to="/#">Менин китепканам</NavLink>
      </li>
      <li>
        <NavLink to="/flashcards">Флешкарталар</NavLink>
      </li>
      <li>
        <NavLink to="#">Окуу куралдары </NavLink>
      </li>
      <li>
        <NavLink to="#">Билим беруучулор учун</NavLink>
      </li>
      <li>
        <NavLink to="#">Мектептер учун</NavLink>
      </li>
    </ul>
  </div>
);

export default TextBooksNav;
