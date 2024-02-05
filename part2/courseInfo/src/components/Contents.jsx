import Parts from "./Parts";
const Contents = ({parts})=>{
return(
    <>
    {parts.map((part=><Parts part={part} key={part.id}/>))}
    </>
)
}

export default Contents;