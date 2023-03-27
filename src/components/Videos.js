import Video from "../components/Video";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
        >
          {videos.map((video) => (
            <Link
              to={{
                pathname: `/quiz/${video.youtubeID}`,
                state: {
                  videoTitle: video.title,
                },
              }}
              key={video.youtubeID}
            >
              <Video title={video.title} id={video.youtubeID} noq={video.noq} />
            </Link>
          ))}
        </InfiniteScroll>
      )}

      {!loading && videos.length === 0 && <div>No data found</div>}
      {error && <div>there was error</div>}
      {loading && <div>loading</div>}
    </div>
  );
}
