import useFetch from "../api/useFetch";
import Location from "./Location";


export default function LocationList({ url }) {
    const { isPending, error, data } = useFetch(url)
    console.log(data);
    return (

        <div className="location-list">
            {isPending && <div>loading...</div>}
            {error && <div>{error}</div>}
            {data && data.results.map((character) => 
            <Location key={character.id} character={character} />
            )}


        </div>
    );
}
