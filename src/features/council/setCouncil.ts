import { doc, onSnapshot } from "firebase/firestore";
import { DB } from "../../control/firebase/config";

export function listenToCouncil(councilId:string, setState:Function):Function{
    try {
        const counsilRef = doc(DB,'councils',councilId);
        return onSnapshot(counsilRef,(counsilDB=>{
            if(counsilDB.exists()){
                setState(counsilDB.data());
            }
            
        }))
    } catch (error) {
        return ()=>{};
    }
}