import { Fragment } from "react";
import logo from "../assets/test.png";
import classes from './Header.module.css'
export default function Header() {
  return (
    <>
      <img src={logo} alt="tic-tac-toe" />
      <h1>Tic-Toc-Toe</h1>
    </>
  );
}
