const Countries = ({ filteredArray }) => {
    // console.log(filteredArray[0])
    const languages = filteredArray.map((item) => item.languages)
    console.log(languages)

    const values = Object.values(languages[0])
    console.log(values)

    return (
        <>
            <h2>{filteredArray[0].name.common}</h2>
            <div>
                <p> capital: {filteredArray[0].capital[0]}</p>
                <p> area: {filteredArray[0].area}</p>
            </div>
            <h3>languages</h3>
            <ul>
                {values.map((value) => <li key={value}>{value}</li>)}
            </ul>
            <img src={filteredArray[0].flags.png} alt="flagImage" />
        </>
    )
}

export default Countries