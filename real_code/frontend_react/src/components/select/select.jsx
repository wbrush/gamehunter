const Select = ({ array }) => {
    console.log(array)
    if (array.length === 1) {
        return (
            <option selected>{array[0]}</option>
        )
    } else {
        return array?.map((element, i) => {
            return (
                <option key={i}>{element}</option>
            )
        })
    }
}

export default Select
