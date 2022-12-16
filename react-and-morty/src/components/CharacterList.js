import { useCallback, useRef, useState } from "react";
import useFetch from "../api/useFetch";
import Card from "./Card";

export default function CharacterList({ url }) {
  //1 is the default parameter, because /page=1 and / does the same thing.
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, error, data, fetchNextPage, hasNextPage } = useFetch(url);

  //An observer for infinite scrolling. It uses the same mechanics as in LocationList
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isPending) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setCurrentPage((pageNumber) => pageNumber + 1);
          fetchNextPage(currentPage + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [currentPage, fetchNextPage, isPending, hasNextPage]
  );

  return (
    <>
      <div className="character-list">
        {isPending && <div>loading...</div>}
        {error && <div>{error}</div>}
        {data &&
          data.map((character) => (
            <Card key={character.id} character={character} ref={lastPostRef} />
          ))}
      </div>
    </>
  );
}
