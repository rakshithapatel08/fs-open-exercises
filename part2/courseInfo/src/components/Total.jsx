const Total = ({total})=>{
    let sum=0;
    const exArray = total.map((part=>part.exercises))
    for(let i=0;i<exArray.length;i++){
        sum=sum+exArray[i];
    }
    return(
        <>
        <h3>total number of exercises are {sum}</h3>
        </>
    )
}
export default Total