const Select = ({ array, sport }) => {
    return array?.map((element, i) => {
        if (element === sport) {
            return (
                <option selected key={i}>{element}</option>
            )
        } else {
            return (
                <option key={i}>{element}</option>
            )
        }
    })
}

export default Select
