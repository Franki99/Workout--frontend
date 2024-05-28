import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceTONow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const handleclick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/workouts/'+ workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <p>{formatDistanceTONow(new Date(workout.createdAt), {addsuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleclick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails