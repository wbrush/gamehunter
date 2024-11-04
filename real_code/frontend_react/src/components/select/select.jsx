const Select = ({ array }) => {
    return array?.map((element, i) => {
        return (
            <option key={i}>{element}</option>
        )
    })
}

export default Select
