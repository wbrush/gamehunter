const Select = ({ array }) => {
    return array.map((element) => {
        return (
            <option key={element}>{element}</option>
        )
    })
}

export default Select
