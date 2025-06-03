import Auth from '../../utils/auth'
import { postEventRequest } from '../../utils/functions';

const RemoveButton = ({ events, update, id }) => {
    const userData = Auth.getUser()
    const ids = {
        user: userData.user.id,
        event: null
    }

    const removeEvent = async (e) => {
        ids.event = Number(e.target.dataset.key)
        const response = await postEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/remove/', ids)
        if (response) {
            let temp = [...events]
            let index = temp.map(element => element.id).indexOf(ids.event)
            temp.splice(index, 1)
            update(temp)
        }
    }

    return (
        <button data-key={id} onClick={removeEvent}>Withdraw</button>
    )
}

export default RemoveButton
