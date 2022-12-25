import { toast } from "react-toastify";


export const MainTitle = "OulYas"
// export const savedToken = localStorage.getItem("token")

export const notify = (msg) =>
toast(msg, {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
});


// export const isTokenValid = () =>{
//   const token = localStorage.getItem("token");
//     if(jwtDecode(token).exp < Date.now() / 1000){
//         return false;
//     }else{
//         return true;
//     }

// }