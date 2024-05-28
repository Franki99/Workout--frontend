import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useAuthContext } from './../hooks/useAuthContext';

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const response = await fetch('/api/workouts', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch workouts');
          }
    
          const json = await response.json();
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        } catch (error) {
          console.error('Error fetching workouts:', error.message);
          // Handle the error, e.g., show a user-friendly message or log it to an error tracking service
        }
      };
    
      if (user) {
        fetchWorkouts();
      }
    }, [dispatch, user]);
    
      
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}></WorkoutDetails>
                ))}
            </div>
            <WorkoutForm></WorkoutForm>
        </div>
    )
}

export default Home