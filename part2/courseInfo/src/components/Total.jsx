const Total = ({total})=>{
    // let sum=0;
    const exArray = total.map((part=>part.exercises))
    console.log(exArray);
    // for(let i=0;i<exArray.length;i++){
    //     sum=sum+exArray[i];
    // }
    const sum = exArray.reduce((sum,current)=>sum+current,0)
    return(
        <>
        {}
        <h3>total number of exercises are {sum}</h3>
        </>
    )
}
export default Total