import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import LoginPage from "./pages/LoginPage/LoginPage";
import SingInPage from "./pages/SignInPage/SignInPage";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import RecordPage from "./pages/RecordPage/RecordPage";
import TodayPage from "./pages/TodayPage/TodayPage";
import { UserProvider } from "./components/UserContext";


export default function App() {
  return (
    <>
	  <UserProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
		  <Route path="/cadastro" element={<SingInPage />} />
		  <Route path="/habitos" element={<HabitsPage/>} />
		  <Route path="/historico" element={<RecordPage/>} />
		  <Route path="/hoje" element={<TodayPage/>} />
        </Routes>
      </BrowserRouter>
	  </UserProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;
