// import { supabase } from "../../supabase";
// import { useAuth } from "./useAuth";

// const { createContext, useContext, useState, useEffect } = require("react");

// const DegreeContext = createContext();

// export const useDegree = () => useContext(DegreeContext);

// export const DegreeProvider = ({children}) => {

//     const { user } = useAuth();
//     console.log('entrou no useDegre');
//     const [degreeId, setDegreeId] = useState(null);

//     useEffect(() => {
//         const fetchDegreeId = async () => {

//             if(user){
//             const { data , error } = await supabase
//                 .from('profiles')
//                 .select('degree_id')
//                 .eq('id', user.id);

//                 if(error){
//                     console.error(error);
//                 } else if (data && data.length > 0){
//                     const degreeId = data[0].degree_id;
//                     setDegreeId(degreeId);
//                 }
//             }
//         };

//         fetchDegreeId();

//     },[user]);

//     return (
//         <DegreeContext.Provider value={{ degreeId, setDegreeId }}>
//             {children}
//         </DegreeContext.Provider>
//     )
// };